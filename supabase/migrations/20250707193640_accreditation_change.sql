create policy "Org Presidents can upload their own files 16ihgro_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'accreditation-files'::text));


create policy "Org Presidents can upload their own files 16ihgro_1"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'accreditation-files'::text));


create policy "Org Presidents can upload their own files 16ihgro_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'accreditation-files'::text));


create policy "Org Presidents can upload their own files 16ihgro_3"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'accreditation-files'::text));



