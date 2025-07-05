drop policy "Enable read access for authenticated users" on "public"."student";

alter table "public"."post" enable row level security;

create policy "Enable read access for all authenticated users"
on "public"."post"
as permissive
for select
to authenticated
using (true);


create policy "Allow authenticated users to read all student profiles"
on "public"."student"
as permissive
for select
to authenticated
using (true);



