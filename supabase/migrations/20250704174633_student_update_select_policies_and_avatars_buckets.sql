alter table "public"."student" add column "cover_photo" text;

alter table "public"."student" alter column "picture" set data type text using "picture"::text;

create policy "Enable read access for authenticated users"
on "public"."student"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."student"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



