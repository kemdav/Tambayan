set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_subscribed_org_options()
 RETURNS TABLE(value text, label text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Check if there is a logged-in user
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT NULL::TEXT, NULL::TEXT WHERE FALSE;
  ELSE
    RETURN QUERY
    SELECT
      o.orgid AS "value",
      o.orgname AS "label"
    FROM
      public.organizations o
    JOIN
      public.subscribedorg s ON o.orgid = s.orgid
    JOIN
      public.student st ON s.studentid = st.studentid
    WHERE
      st.user_id = auth.uid();
  END IF;
END;
$function$
;


