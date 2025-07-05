alter table "public"."events" enable row level security;

alter table "public"."organizations" add column "cover_photo_path" text;

alter table "public"."organizations" alter column "picture" set data type text using "picture"::text;

alter table "public"."organizations" enable row level security;

alter table "public"."orgmember" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.test_add_event_count(p_uni_id text)
 RETURNS TABLE(org_id text, org_name text, event_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        o.orgid AS org_id,
        o.orgname AS org_name,
        COALESCE(ec.total_events, 0) AS event_count
    FROM
        public.organizations AS o
    LEFT JOIN (
        -- This is the isolated part we are testing
        SELECT orgid, COUNT(*) AS total_events FROM public.events GROUP BY orgid
    ) AS ec ON o.orgid = ec.orgid
    WHERE
        o.universityid = p_uni_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_add_member_count(p_uni_id text)
 RETURNS TABLE(org_id text, org_name text, member_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        o.orgid AS org_id,
        o.orgname AS org_name,
        COALESCE(mc.total_members, 0) AS member_count
    FROM
        public.organizations AS o
    LEFT JOIN (
        SELECT orgid, COUNT(*) AS total_members FROM public.orgmember GROUP BY orgid
    ) AS mc ON o.orgid = mc.orgid
    WHERE
        o.universityid = p_uni_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_function(uni_id text)
 RETURNS TABLE(orgid text, orgname text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        o.orgid,
        o.orgname
    FROM
        public.organizations AS o
    WHERE
        o.universityid = uni_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_function_creation()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN 'Success';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.test_read_organizations(p_uni_id text)
 RETURNS TABLE(org_id text, org_name text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        o.orgid AS org_id,
        o.orgname AS org_name
    FROM
        public.organizations AS o
    WHERE
        o.universityid = p_uni_id;
END;
$function$
;

create policy "Authenticated users can view active events in their university."
on "public"."events"
as permissive
for select
to authenticated
using (((status = 'active'::text) AND (EXISTS ( SELECT 1
   FROM organizations o
  WHERE ((o.orgid = events.orgid) AND (o.universityid IN ( SELECT s.universityid
           FROM student s
          WHERE (s.user_id = auth.uid()))))))));


create policy "Deny all deletes from users."
on "public"."events"
as permissive
for delete
to authenticated
using (false);


create policy "Org admins can create events for their organization."
on "public"."events"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (orgmember om
     JOIN student s ON ((om.studentid = s.studentid)))
  WHERE ((s.user_id = auth.uid()) AND (om.orgid = events.orgid) AND (om."position" = ANY (ARRAY['Admin'::text, 'President'::text, 'Event Coordinator'::text]))))));


create policy "Org admins can update events for their organization."
on "public"."events"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (orgmember om
     JOIN student s ON ((om.studentid = s.studentid)))
  WHERE ((s.user_id = auth.uid()) AND (om.orgid = events.orgid) AND (om."position" = ANY (ARRAY['Admin'::text, 'President'::text, 'Event Coordinator'::text]))))))
with check ((EXISTS ( SELECT 1
   FROM (orgmember om
     JOIN student s ON ((om.studentid = s.studentid)))
  WHERE ((s.user_id = auth.uid()) AND (om.orgid = events.orgid) AND (om."position" = ANY (ARRAY['Admin'::text, 'President'::text, 'Event Coordinator'::text]))))));


create policy "Authenticated users can view active orgs in their university."
on "public"."organizations"
as permissive
for select
to authenticated
using (((status = 'active'::text) AND (universityid IN ( SELECT s.universityid
   FROM student s
  WHERE (s.user_id = auth.uid())))));


create policy "Deny all deletes from users."
on "public"."organizations"
as permissive
for delete
to authenticated
using (false);


create policy "Deny inserts from users."
on "public"."organizations"
as permissive
for insert
to authenticated
with check (false);


create policy "Org admins can update their own organization."
on "public"."organizations"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM (orgmember om
     JOIN student s ON ((om.studentid = s.studentid)))
  WHERE ((s.user_id = auth.uid()) AND (om.orgid = organizations.orgid) AND (om."position" = ANY (ARRAY['Admin'::text, 'President'::text]))))));


create policy "Users can view their own organization memberships."
on "public"."orgmember"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM student s
  WHERE ((s.user_id = auth.uid()) AND (s.studentid = orgmember.studentid)))));



