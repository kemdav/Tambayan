drop policy "Members can view their org accreditation" on "public"."accreditations";

drop policy "Officers can insert accreditation records" on "public"."accreditations";

drop policy "Officers can update accreditation records" on "public"."accreditations";

drop policy "Allow authenticated users to insert comments" on "public"."comments";

drop policy "Allow read access to everyone" on "public"."comments";

drop policy "Authenticated users can register for events" on "public"."eventregistrations";

drop policy "Users can see their own event registrations" on "public"."eventregistrations";

drop policy "Users can unregister from events" on "public"."eventregistrations";

drop policy "Org officers can delete events for their organization" on "public"."events";

drop policy "Users can view events in their own university" on "public"."events";

drop policy "Officers can remove members from their own org" on "public"."orgmember";

drop policy "Officers can update roles in their own org" on "public"."orgmember";

drop policy "Org members can view the member list" on "public"."orgmember";

drop policy "Allow authenticated users to insert their own posts" on "public"."post";

drop policy "Enable read access for all authenticated users" on "public"."post";

drop policy "Officers can create official posts" on "public"."post";

drop policy "Users can delete their own posts" on "public"."post";

drop policy "Users can update their own posts" on "public"."post";

drop policy "Allow read access to everyone" on "public"."post_likes";

drop policy "Allow users to manage their own likes" on "public"."post_likes";

drop policy "Allow authenticated users to read all student profiles" on "public"."student";

drop policy "Anyone can view wiki pages" on "public"."wiki";

drop policy "Users can create wiki pages if they are a member of the org" on "public"."wiki";

drop policy "Users can delete wiki pages if they are a member of the org" on "public"."wiki";

drop policy "Org admins can create events for their organization." on "public"."events";

revoke delete on table "public"."accreditations" from "anon";

revoke insert on table "public"."accreditations" from "anon";

revoke references on table "public"."accreditations" from "anon";

revoke select on table "public"."accreditations" from "anon";

revoke trigger on table "public"."accreditations" from "anon";

revoke truncate on table "public"."accreditations" from "anon";

revoke update on table "public"."accreditations" from "anon";

revoke delete on table "public"."accreditations" from "authenticated";

revoke insert on table "public"."accreditations" from "authenticated";

revoke references on table "public"."accreditations" from "authenticated";

revoke select on table "public"."accreditations" from "authenticated";

revoke trigger on table "public"."accreditations" from "authenticated";

revoke truncate on table "public"."accreditations" from "authenticated";

revoke update on table "public"."accreditations" from "authenticated";

revoke delete on table "public"."accreditations" from "service_role";

revoke insert on table "public"."accreditations" from "service_role";

revoke references on table "public"."accreditations" from "service_role";

revoke select on table "public"."accreditations" from "service_role";

revoke trigger on table "public"."accreditations" from "service_role";

revoke truncate on table "public"."accreditations" from "service_role";

revoke update on table "public"."accreditations" from "service_role";

revoke delete on table "public"."eventregistrations" from "anon";

revoke insert on table "public"."eventregistrations" from "anon";

revoke references on table "public"."eventregistrations" from "anon";

revoke select on table "public"."eventregistrations" from "anon";

revoke trigger on table "public"."eventregistrations" from "anon";

revoke truncate on table "public"."eventregistrations" from "anon";

revoke update on table "public"."eventregistrations" from "anon";

revoke delete on table "public"."eventregistrations" from "authenticated";

revoke insert on table "public"."eventregistrations" from "authenticated";

revoke references on table "public"."eventregistrations" from "authenticated";

revoke select on table "public"."eventregistrations" from "authenticated";

revoke trigger on table "public"."eventregistrations" from "authenticated";

revoke truncate on table "public"."eventregistrations" from "authenticated";

revoke update on table "public"."eventregistrations" from "authenticated";

revoke delete on table "public"."eventregistrations" from "service_role";

revoke insert on table "public"."eventregistrations" from "service_role";

revoke references on table "public"."eventregistrations" from "service_role";

revoke select on table "public"."eventregistrations" from "service_role";

revoke trigger on table "public"."eventregistrations" from "service_role";

revoke truncate on table "public"."eventregistrations" from "service_role";

revoke update on table "public"."eventregistrations" from "service_role";

revoke delete on table "public"."post_likes" from "anon";

revoke insert on table "public"."post_likes" from "anon";

revoke references on table "public"."post_likes" from "anon";

revoke select on table "public"."post_likes" from "anon";

revoke trigger on table "public"."post_likes" from "anon";

revoke truncate on table "public"."post_likes" from "anon";

revoke update on table "public"."post_likes" from "anon";

revoke delete on table "public"."post_likes" from "authenticated";

revoke insert on table "public"."post_likes" from "authenticated";

revoke references on table "public"."post_likes" from "authenticated";

revoke select on table "public"."post_likes" from "authenticated";

revoke trigger on table "public"."post_likes" from "authenticated";

revoke truncate on table "public"."post_likes" from "authenticated";

revoke update on table "public"."post_likes" from "authenticated";

revoke delete on table "public"."post_likes" from "service_role";

revoke insert on table "public"."post_likes" from "service_role";

revoke references on table "public"."post_likes" from "service_role";

revoke select on table "public"."post_likes" from "service_role";

revoke trigger on table "public"."post_likes" from "service_role";

revoke truncate on table "public"."post_likes" from "service_role";

revoke update on table "public"."post_likes" from "service_role";

alter table "public"."accreditations" drop constraint "accreditations_orgid_fkey";

alter table "public"."accreditations" drop constraint "accreditations_universityid_fkey";

alter table "public"."accreditations" drop constraint "unique_accreditation_per_year";

alter table "public"."eventregistrations" drop constraint "eventregistrations_eventid_fkey";

alter table "public"."eventregistrations" drop constraint "eventregistrations_studentid_fkey";

alter table "public"."events" drop constraint "events_universityid_fkey";

alter table "public"."post_likes" drop constraint "post_likes_post_id_fkey";

alter table "public"."post_likes" drop constraint "post_likes_user_id_fkey";

drop function if exists "public"."get_like_count"(p_post_id bigint);

drop function if exists "public"."get_organizations_for_join_page"(p_user_id uuid);

drop function if exists "public"."get_subscribed_organizations"(p_user_id uuid);

drop function if exists "public"."get_user_org_options"();

drop function if exists "public"."get_user_subscribed_org_options"();

drop function if exists "public"."is_org_member"(user_id_to_check uuid, org_id_to_check text);

drop function if exists "public"."is_org_officer"(user_id_to_check uuid, org_id_to_check text);

alter table "public"."accreditations" drop constraint "accreditations_pkey";

alter table "public"."eventregistrations" drop constraint "eventregistrations_pkey";

alter table "public"."post_likes" drop constraint "post_likes_pkey";

drop index if exists "public"."accreditations_pkey";

drop index if exists "public"."eventregistrations_pkey";

drop index if exists "public"."idx_events_universityid";

drop index if exists "public"."post_likes_pkey";

drop index if exists "public"."post_likes_post_id_idx";

drop index if exists "public"."post_likes_user_id_idx";

drop index if exists "public"."unique_accreditation_per_year";

drop table "public"."accreditations";

drop table "public"."eventregistrations";

drop table "public"."post_likes";

alter table "public"."comments" drop column "comment_text";

alter table "public"."comments" add column "comment" text;

alter table "public"."comments" disable row level security;

alter table "public"."eventattendance" enable row level security;

alter table "public"."events" drop column "universityid";

alter table "public"."events" add column "school" text;

alter table "public"."organizations" add column "school" text;

alter table "public"."post" add column "comments" integer;

alter table "public"."post" add column "likes" integer;

alter table "public"."post" alter column "attachment" set data type bytea using "attachment"::bytea;

alter table "public"."staff" add column "department" text;

alter table "public"."staff" add column "fullname" text;

alter table "public"."wiki" disable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.top_performing_orgs(uid text)
 RETURNS TABLE(orgid text, name text, total_events integer, engagement_percent text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  WITH org_stats AS (
    SELECT
      o.orgid,
      o.orgname,
      COUNT(DISTINCT e.eventid) AS total_events,
      COUNT(DISTINCT ea.studentid || '-' || ea.eventid) AS total_attendees,
      COUNT(DISTINCT om.studentid) AS total_members
    FROM organizations o
    LEFT JOIN events e ON o.orgid = e.orgid
    LEFT JOIN eventattendance ea ON ea.eventid = e.eventid
    LEFT JOIN orgmember om ON om.orgid = o.orgid
    WHERE o.universityid = uid
    GROUP BY o.orgid, o.orgname
  )
  SELECT
    org_stats.orgid,
    org_stats.orgname AS name,
    org_stats.total_events,
    CASE
      WHEN org_stats.total_members = 0 OR org_stats.total_events = 0 THEN '0%'
      ELSE TO_CHAR(
        ROUND(
          ((org_stats.total_attendees::float / (org_stats.total_members * org_stats.total_events)) * 100)::numeric,
          2
        ),
        'FM999990.00'
      ) || '%'
    END AS engagement_percent
  FROM org_stats
  ORDER BY engagement_percent DESC;
END;
$function$
;

create policy "Allow read for all"
on "public"."eventattendance"
as permissive
for select
to public
using (true);


create policy "Allow select for all"
on "public"."events"
as permissive
for select
to public
using (true);


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


create policy "Allow public read"
on "public"."organizations"
as permissive
for select
to public
using (true);


create policy "Allow read for all"
on "public"."orgmember"
as permissive
for select
to public
using (true);


create policy "Allow read access to posts"
on "public"."post"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable read access for authenticated users"
on "public"."student"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Org admins can create events for their organization."
on "public"."events"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM (orgmember om
     JOIN student s ON ((om.studentid = s.studentid)))
  WHERE ((s.user_id = auth.uid()) AND (om.orgid = events.orgid) AND (om."position" = ANY (ARRAY['Admin'::text, 'President'::text, 'Event Coordinator'::text]))))));



