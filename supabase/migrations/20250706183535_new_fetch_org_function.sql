set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_organizations_for_join_page(p_user_id uuid)
 RETURNS TABLE(org_id text, org_name text, org_status text, picture_path text, cover_photo_path text, member_count bigint, event_count bigint, is_subscribed boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_student_id int;
  v_university_id text;
BEGIN
  -- Find the student and university for the given user
  SELECT s.studentid, s.universityid INTO v_student_id, v_university_id
  FROM public.student s
  WHERE s.user_id = p_user_id;

  -- The main query
  RETURN QUERY
  SELECT
    o.orgid AS org_id,
    o.orgname AS org_name,
    o.status AS org_status,
    o.picture AS picture_path,
    o.cover_photo_path AS cover_photo_path,
    -- Subquery to get the total member count for each org (unconditional)
    (SELECT count(*) FROM public.orgmember om WHERE om.orgid = o.orgid) AS member_count,
    -- Subquery to get the total event count for each org (unconditional)
    (SELECT count(*) FROM public.events e WHERE e.orgid = o.orgid) AS event_count,
    -- Check if a subscription record exists for this student and this org
    EXISTS (
      SELECT 1
      FROM public.subscribedorg so
      WHERE so.orgid = o.orgid AND so.studentid = v_student_id
    ) AS is_subscribed
  FROM
    public.organizations o
  WHERE
    o.universityid = v_university_id;
END;
$function$
;


