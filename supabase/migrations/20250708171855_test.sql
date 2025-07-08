alter table "public"."accreditations" disable row level security;


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


