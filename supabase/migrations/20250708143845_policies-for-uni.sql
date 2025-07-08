alter table "public"."university" enable row level security;

create policy "Allow public read"
on "public"."university"
as permissive
for select
to public
using (true);



