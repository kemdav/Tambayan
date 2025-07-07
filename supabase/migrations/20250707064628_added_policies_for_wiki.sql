alter table "public"."wiki" enable row level security;

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



