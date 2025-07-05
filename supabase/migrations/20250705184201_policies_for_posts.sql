create policy "Allow authenticated users to insert their own posts"
on "public"."post"
as permissive
for insert
to authenticated
with check ((studentid = ( SELECT s.studentid
   FROM student s
  WHERE (s.user_id = auth.uid()))));


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



