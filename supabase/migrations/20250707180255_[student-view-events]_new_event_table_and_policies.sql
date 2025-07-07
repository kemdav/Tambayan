drop policy "Authenticated users can view active events in their university." on "public"."events";

drop policy "Deny all deletes from users." on "public"."events";

create table "public"."eventregistrations" (
    "studentid" bigint not null,
    "eventid" bigint not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."eventregistrations" enable row level security;

alter table "public"."events" add column "universityid" text;

CREATE UNIQUE INDEX eventregistrations_pkey ON public.eventregistrations USING btree (studentid, eventid);

CREATE INDEX idx_events_universityid ON public.events USING btree (universityid);

alter table "public"."eventregistrations" add constraint "eventregistrations_pkey" PRIMARY KEY using index "eventregistrations_pkey";

alter table "public"."eventregistrations" add constraint "eventregistrations_eventid_fkey" FOREIGN KEY (eventid) REFERENCES events(eventid) ON DELETE CASCADE not valid;

alter table "public"."eventregistrations" validate constraint "eventregistrations_eventid_fkey";

alter table "public"."eventregistrations" add constraint "eventregistrations_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) ON DELETE CASCADE not valid;

alter table "public"."eventregistrations" validate constraint "eventregistrations_studentid_fkey";

alter table "public"."events" add constraint "events_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_universityid_fkey";

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



