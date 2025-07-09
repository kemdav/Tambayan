drop function if exists "public"."get_current_user_university_id"();

alter table "public"."comments" drop column "comment";

alter table "public"."comments" add column "comment_text" text;

alter table "public"."eventattendance" disable row level security;

alter table "public"."eventregistrations" disable row level security;

alter table "public"."events" drop column "school";

alter table "public"."events" add column "universityid" text;

alter table "public"."organizations" drop column "school";

alter table "public"."orgmember" disable row level security;

alter table "public"."post" drop column "comments";

alter table "public"."post" drop column "likes";

alter table "public"."post" alter column "attachment" set data type text using "attachment"::text;

alter table "public"."staff" drop column "department";

alter table "public"."staff" drop column "fullname";

alter table "public"."wiki" enable row level security;

CREATE UNIQUE INDEX accreditations_pkey ON public.accreditations USING btree (id);

CREATE UNIQUE INDEX eventregistrations_pkey ON public.eventregistrations USING btree (studentid, eventid);

CREATE INDEX idx_events_universityid ON public.events USING btree (universityid);

CREATE UNIQUE INDEX post_likes_pkey ON public.post_likes USING btree (post_id, user_id);

CREATE INDEX post_likes_post_id_idx ON public.post_likes USING btree (post_id);

CREATE INDEX post_likes_user_id_idx ON public.post_likes USING btree (user_id);

CREATE UNIQUE INDEX unique_accreditation_per_year ON public.accreditations USING btree (orgid, academic_year);

alter table "public"."accreditations" add constraint "accreditations_pkey" PRIMARY KEY using index "accreditations_pkey";

alter table "public"."eventregistrations" add constraint "eventregistrations_pkey" PRIMARY KEY using index "eventregistrations_pkey";

alter table "public"."post_likes" add constraint "post_likes_pkey" PRIMARY KEY using index "post_likes_pkey";

alter table "public"."accreditations" add constraint "accreditations_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) ON DELETE CASCADE not valid;

alter table "public"."accreditations" validate constraint "accreditations_orgid_fkey";

alter table "public"."accreditations" add constraint "accreditations_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) ON DELETE CASCADE not valid;

alter table "public"."accreditations" validate constraint "accreditations_universityid_fkey";

alter table "public"."accreditations" add constraint "unique_accreditation_per_year" UNIQUE using index "unique_accreditation_per_year";

alter table "public"."eventregistrations" add constraint "eventregistrations_eventid_fkey" FOREIGN KEY (eventid) REFERENCES events(eventid) ON DELETE CASCADE not valid;

alter table "public"."eventregistrations" validate constraint "eventregistrations_eventid_fkey";

alter table "public"."eventregistrations" add constraint "eventregistrations_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) ON DELETE CASCADE not valid;

alter table "public"."eventregistrations" validate constraint "eventregistrations_studentid_fkey";

alter table "public"."events" add constraint "events_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_universityid_fkey";

alter table "public"."post_likes" add constraint "post_likes_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post(postid) ON DELETE CASCADE not valid;

alter table "public"."post_likes" validate constraint "post_likes_post_id_fkey";

alter table "public"."post_likes" add constraint "post_likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."post_likes" validate constraint "post_likes_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_like_count(p_post_id bigint)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM public.post_likes
    WHERE post_id = p_post_id
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_organizations_for_join_page(p_user_id uuid)
 RETURNS TABLE(org_id text, org_name text, org_status text, picture_path text, cover_photo_path text, member_count bigint, event_count bigint, is_subscribed boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_student_id int;
  v_university_id text;
BEGIN
  -- Find the student and university for the given user
  SELECT s.studentid, s.universityid INTO v_student_id, v_university_id
  FROM public.student s
  WHERE s.user_id = p_user_id;

  -- The main query
  RETURN QUERY
  SELECT
    o.orgid AS org_id,
    o.orgname AS org_name,
    o.status AS org_status,
    o.picture AS picture_path,
    o.cover_photo_path AS cover_photo_path,
    -- Subquery to get the total member count for each org (unconditional)
    (SELECT count(*) FROM public.orgmember om WHERE om.orgid = o.orgid) AS member_count,
    -- Subquery to get the total event count for each org (unconditional)
    (SELECT count(*) FROM public.events e WHERE e.orgid = o.orgid) AS event_count,
    -- Check if a subscription record exists for this student and this org
    EXISTS (
      SELECT 1
      FROM public.subscribedorg so
      WHERE so.orgid = o.orgid AND so.studentid = v_student_id
    ) AS is_subscribed
  FROM
    public.organizations o
  WHERE
    o.universityid = v_university_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_subscribed_organizations(p_user_id uuid)
 RETURNS TABLE(org_id text, org_name text, org_status text, picture_path text, cover_photo_path text, member_count bigint, event_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_student_id INT;
BEGIN
    -- First, securely find the student_id for the calling user.
    SELECT studentid INTO v_student_id
    FROM public.student
    WHERE user_id = p_user_id;

    -- If no student profile is found, return nothing.
    IF NOT FOUND THEN
        RETURN;
    END IF;

    -- Now, perform the main query.
    RETURN QUERY
    SELECT
        o.orgid,
        o.orgname,
        o.status,
        o.picture,
        o.cover_photo_path,
        (SELECT COUNT(*) FROM public.orgmember om WHERE om.orgid = o.orgid) AS members,
        (SELECT COUNT(*) FROM public.events e WHERE e.orgid = o.orgid) AS events
    FROM
        public.organizations AS o
    -- Join directly to orgmember to find the orgs this student is in.
    JOIN
        public.orgmember m ON o.orgid = m.orgid
    WHERE
        m.studentid = v_student_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_org_options()
 RETURNS TABLE(value text, label text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- This query joins the tables together to find the orgs for the current user
    RETURN QUERY
    SELECT
        o.orgid AS value,    -- Select the organization ID and alias it as "value"
        o.orgname AS label   -- Select the organization name and alias it as "label"
    FROM
        public.organizations AS o
    -- Join to find memberships
    INNER JOIN
        public.orgmember AS m ON o.orgid = m.orgid
    -- Join to find the student record associated with the membership
    INNER JOIN
        public.student AS s ON m.studentid = s.studentid
    WHERE
        -- Filter to only the memberships belonging to the currently authenticated user
        s.user_id = auth.uid();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_subscribed_org_options()
 RETURNS TABLE(value text, label text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Check if there is a logged-in user
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT NULL::TEXT, NULL::TEXT WHERE FALSE;
  ELSE
    RETURN QUERY
    SELECT
      o.orgid AS "value",
      o.orgname AS "label"
    FROM
      public.organizations o
    JOIN
      public.subscribedorg s ON o.orgid = s.orgid
    JOIN
      public.student st ON s.studentid = st.studentid
    WHERE
      st.user_id = auth.uid();
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_org_member(user_id_to_check uuid, org_id_to_check text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  -- The core logic is the same as your old policy's subquery
  SELECT EXISTS (
    SELECT 1
    FROM public.orgmember om
    JOIN public.student s ON om.studentid = s.studentid
    WHERE s.user_id = user_id_to_check AND om.orgid = org_id_to_check
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_org_officer(user_id_to_check uuid, org_id_to_check text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.orgmember om
    JOIN public.student s ON om.studentid = s.studentid
    WHERE 
      s.user_id = user_id_to_check AND 
      om.orgid = org_id_to_check AND
      om.position = 'President' -- Or use: IN ('President', 'Vice President')
  );
$function$
;

grant delete on table "public"."accreditations" to "anon";

grant insert on table "public"."accreditations" to "anon";

grant references on table "public"."accreditations" to "anon";

grant select on table "public"."accreditations" to "anon";

grant trigger on table "public"."accreditations" to "anon";

grant truncate on table "public"."accreditations" to "anon";

grant update on table "public"."accreditations" to "anon";

grant delete on table "public"."accreditations" to "authenticated";

grant insert on table "public"."accreditations" to "authenticated";

grant references on table "public"."accreditations" to "authenticated";

grant select on table "public"."accreditations" to "authenticated";

grant trigger on table "public"."accreditations" to "authenticated";

grant truncate on table "public"."accreditations" to "authenticated";

grant update on table "public"."accreditations" to "authenticated";

grant delete on table "public"."accreditations" to "service_role";

grant insert on table "public"."accreditations" to "service_role";

grant references on table "public"."accreditations" to "service_role";

grant select on table "public"."accreditations" to "service_role";

grant trigger on table "public"."accreditations" to "service_role";

grant truncate on table "public"."accreditations" to "service_role";

grant update on table "public"."accreditations" to "service_role";

grant delete on table "public"."eventregistrations" to "anon";

grant insert on table "public"."eventregistrations" to "anon";

grant references on table "public"."eventregistrations" to "anon";

grant select on table "public"."eventregistrations" to "anon";

grant trigger on table "public"."eventregistrations" to "anon";

grant truncate on table "public"."eventregistrations" to "anon";

grant update on table "public"."eventregistrations" to "anon";

grant delete on table "public"."eventregistrations" to "authenticated";

grant insert on table "public"."eventregistrations" to "authenticated";

grant references on table "public"."eventregistrations" to "authenticated";

grant select on table "public"."eventregistrations" to "authenticated";

grant trigger on table "public"."eventregistrations" to "authenticated";

grant truncate on table "public"."eventregistrations" to "authenticated";

grant update on table "public"."eventregistrations" to "authenticated";

grant delete on table "public"."eventregistrations" to "service_role";

grant insert on table "public"."eventregistrations" to "service_role";

grant references on table "public"."eventregistrations" to "service_role";

grant select on table "public"."eventregistrations" to "service_role";

grant trigger on table "public"."eventregistrations" to "service_role";

grant truncate on table "public"."eventregistrations" to "service_role";

grant update on table "public"."eventregistrations" to "service_role";

grant delete on table "public"."post_likes" to "anon";

grant insert on table "public"."post_likes" to "anon";

grant references on table "public"."post_likes" to "anon";

grant select on table "public"."post_likes" to "anon";

grant trigger on table "public"."post_likes" to "anon";

grant truncate on table "public"."post_likes" to "anon";

grant update on table "public"."post_likes" to "anon";

grant delete on table "public"."post_likes" to "authenticated";

grant insert on table "public"."post_likes" to "authenticated";

grant references on table "public"."post_likes" to "authenticated";

grant select on table "public"."post_likes" to "authenticated";

grant trigger on table "public"."post_likes" to "authenticated";

grant truncate on table "public"."post_likes" to "authenticated";

grant update on table "public"."post_likes" to "authenticated";

grant delete on table "public"."post_likes" to "service_role";

grant insert on table "public"."post_likes" to "service_role";

grant references on table "public"."post_likes" to "service_role";

grant select on table "public"."post_likes" to "service_role";

grant trigger on table "public"."post_likes" to "service_role";

grant truncate on table "public"."post_likes" to "service_role";

grant update on table "public"."post_likes" to "service_role";

create policy "Members can view their org accreditation"
on "public"."accreditations"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (orgmember
     JOIN student ON ((orgmember.studentid = student.studentid)))
  WHERE ((student.user_id = auth.uid()) AND (orgmember.orgid = accreditations.orgid)))));


create policy "Officers can insert accreditation records"
on "public"."accreditations"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM (orgmember
     JOIN student ON ((orgmember.studentid = student.studentid)))
  WHERE ((student.user_id = auth.uid()) AND (orgmember.orgid = accreditations.orgid) AND (orgmember."position" = ANY (ARRAY['President'::text, 'Vice President'::text, 'PRO'::text, 'Secretary'::text, 'Treasurer'::text]))))));


create policy "Officers can update accreditation records"
on "public"."accreditations"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM (orgmember
     JOIN student ON ((orgmember.studentid = student.studentid)))
  WHERE ((student.user_id = auth.uid()) AND (orgmember.orgid = accreditations.orgid) AND (orgmember."position" = ANY (ARRAY['President'::text, 'Vice President'::text, 'PRO'::text, 'Secretary'::text, 'Treasurer'::text]))))));


create policy "Allow authenticated users to insert comments"
on "public"."comments"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow read access to everyone"
on "public"."comments"
as permissive
for select
to public
using (true);


create policy "Authenticated users can register for events"
on "public"."eventregistrations"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM student
  WHERE ((student.studentid = eventregistrations.studentid) AND (student.user_id = auth.uid())))));


create policy "Users can see their own event registrations"
on "public"."eventregistrations"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM student
  WHERE ((student.studentid = eventregistrations.studentid) AND (student.user_id = auth.uid())))));


create policy "Users can unregister from events"
on "public"."eventregistrations"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM student
  WHERE ((student.studentid = eventregistrations.studentid) AND (student.user_id = auth.uid())))));


create policy "Org admins can create events for their organization."
on "public"."events"
as permissive
for insert
to public
with check (is_org_officer(auth.uid(), orgid));


create policy "Org officers can delete events for their organization"
on "public"."events"
as permissive
for delete
to public
using (is_org_officer(auth.uid(), orgid));


create policy "Users can view events in their own university"
on "public"."events"
as permissive
for select
to public
using ((universityid = ( SELECT s.universityid
   FROM student s
  WHERE (s.user_id = auth.uid())
 LIMIT 1)));


create policy "Officers can remove members from their own org"
on "public"."orgmember"
as permissive
for delete
to public
using (is_org_officer(auth.uid(), orgid));


create policy "Officers can update roles in their own org"
on "public"."orgmember"
as permissive
for update
to public
using (is_org_officer(auth.uid(), orgid))
with check (is_org_officer(auth.uid(), orgid));


create policy "Org members can view the member list"
on "public"."orgmember"
as permissive
for select
to public
using (is_org_member(auth.uid(), orgid));


create policy "Allow authenticated users to insert their own posts"
on "public"."post"
as permissive
for insert
to authenticated
with check ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


create policy "Enable read access for all authenticated users"
on "public"."post"
as permissive
for select
to authenticated
using (true);


create policy "Officers can create official posts"
on "public"."post"
as permissive
for insert
to public
with check (((isofficial = true) AND is_org_officer(auth.uid(), orgid)));


create policy "Users can delete their own posts"
on "public"."post"
as permissive
for delete
to authenticated
using ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


create policy "Users can update their own posts"
on "public"."post"
as permissive
for update
to authenticated
using ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))))
with check ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


create policy "Allow read access to everyone"
on "public"."post_likes"
as permissive
for select
to public
using (true);


create policy "Allow users to manage their own likes"
on "public"."post_likes"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Allow authenticated users to read all student profiles"
on "public"."student"
as permissive
for select
to authenticated
using (true);


create policy "Anyone can view wiki pages"
on "public"."wiki"
as permissive
for select
to public
using (true);


create policy "Users can create wiki pages if they are a member of the org"
on "public"."wiki"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM orgmember om,
    student s
  WHERE ((om.studentid = s.studentid) AND (om.orgid = wiki.orgid) AND (s.user_id = auth.uid())))));


create policy "Users can delete wiki pages if they are a member of the org"
on "public"."wiki"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM orgmember om,
    student s
  WHERE ((om.studentid = s.studentid) AND (om.orgid = wiki.orgid) AND (s.user_id = auth.uid())))));



