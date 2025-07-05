drop policy "Authenticated users can view active orgs in their university." on "public"."organizations";

drop policy "Users can view their own organization memberships." on "public"."orgmember";

create policy "Authenticated users can join an organization (insert themselves"
on "public"."orgmember"
as permissive
for insert
to authenticated
with check ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


create policy "Users can leave an organization (delete their own membership)."
on "public"."orgmember"
as permissive
for delete
to authenticated
using ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


create policy "Authenticated users can view active orgs in their university."
on "public"."organizations"
as permissive
for select
to authenticated
using (((status = 'active'::text) AND (EXISTS ( SELECT 1
   FROM student s
  WHERE ((s.user_id = auth.uid()) AND (s.universityid = organizations.universityid))))));


create policy "Users can view their own organization memberships."
on "public"."orgmember"
as permissive
for select
to authenticated
using ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));



