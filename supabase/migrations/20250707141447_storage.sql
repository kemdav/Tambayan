create policy "Allow authenticated read"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'post-attachments'::text));


create policy "Allow authenticated upload"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'post-attachments'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Allow authenticated users to upload own avatar"
on "storage"."objects"
as permissive
for all
to authenticated
using (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));



