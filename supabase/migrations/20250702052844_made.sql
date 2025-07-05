alter table "public"."student" add column "user_id" uuid;

alter table "public"."student" enable row level security;

CREATE UNIQUE INDEX student_user_id_key ON public.student USING btree (user_id);

alter table "public"."student" add constraint "student_user_id_key" UNIQUE using index "student_user_id_key";

create policy "Students can delete their own row"
on "public"."student"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Students can insert their own row"
on "public"."student"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Students can select their own row"
on "public"."student"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Students can update their own row"
on "public"."student"
as permissive
for update
to public
using ((auth.uid() = user_id));



