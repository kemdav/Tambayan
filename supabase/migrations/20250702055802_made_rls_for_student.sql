drop policy "Students can delete their own row" on "public"."student";

drop policy "Students can insert their own row" on "public"."student";

drop policy "Students can select their own row" on "public"."student";

drop policy "Students can update their own row" on "public"."student";

alter table "public"."student" add column "mname" text;

create policy "Allow user to insert own student row"
on "public"."student"
as permissive
for insert
to authenticated
with check ((user_id = auth.uid()));



