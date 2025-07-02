set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO student (user_id, email, fname, lname, mname, universityid, course, yearlevel)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'fname',
    new.raw_user_meta_data->>'lname',
    new.raw_user_meta_data->>'mname',
    new.raw_user_meta_data->>'universityid',
    new.raw_user_meta_data->>'course',
    new.raw_user_meta_data->>'yearlevel'
  );
  RETURN new;
END;
$function$
;


