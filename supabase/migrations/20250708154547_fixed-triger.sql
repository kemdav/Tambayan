set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
   DECLARE
     user_role text;
   BEGIN
     user_role := NEW.raw_user_meta_data->>'role';
     IF user_role = 'student' THEN
       INSERT INTO public.student (user_id, email, fname, lname, mname, universityid, course, yearlevel)
       VALUES (
         NEW.id,
         NEW.email,
         NEW.raw_user_meta_data->>'fname',
         NEW.raw_user_meta_data->>'lname',
         NEW.raw_user_meta_data->>'mname',
         NEW.raw_user_meta_data->>'universityid',
         NEW.raw_user_meta_data->>'course',
         NEW.raw_user_meta_data->>'yearlevel'
       );
     END IF;
     RETURN NEW;
   END;
   $function$
;

create policy "Enable insert for authenticated users only"
on "public"."university"
as permissive
for insert
to authenticated
with check (true);



