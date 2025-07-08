alter table "public"."accreditations" disable row level security;

alter table "public"."broadcast" drop column "attachment";

alter table "public"."broadcast" disable row level security;

alter table "public"."events" disable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_current_user_university_id()
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  SELECT universityid
  FROM public.student
  WHERE user_id = auth.uid()
  LIMIT 1;
$function$
;

create policy "Users can create broadcasts for their university"
on "public"."broadcast"
as permissive
for insert
to public
with check ((universityid = get_current_user_university_id()));


create policy "Users can view broadcasts from their university"
on "public"."broadcast"
as permissive
for select
to public
using ((universityid = get_current_user_university_id()));


create policy "Officers can update their own organization"
on "public"."organizations"
as permissive
for update
to public
using (is_org_officer(auth.uid(), orgid));



