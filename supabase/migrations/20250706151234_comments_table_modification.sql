alter table "public"."comments" drop column "comment";

alter table "public"."comments" add column "comment_text" text;

alter table "public"."comments" enable row level security;

alter table "public"."post" drop column "comments";

alter table "public"."post" drop column "likes";

create policy "Allow authenticated users to insert comments"
on "public"."comments"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow read access to everyone"
on "public"."comments"
as permissive
for select
to public
using (true);



