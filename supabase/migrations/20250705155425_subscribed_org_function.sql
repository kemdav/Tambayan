set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_subscribed_organizations(p_user_id uuid)
 RETURNS TABLE(org_id text, org_name text, org_status text, picture_path text, cover_photo_path text, member_count bigint, event_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_student_id INT;
BEGIN
    -- First, securely find the student_id for the calling user.
    SELECT studentid INTO v_student_id
    FROM public.student
    WHERE user_id = p_user_id;

    -- If no student profile is found, return nothing.
    IF NOT FOUND THEN
        RETURN;
    END IF;

    -- Now, perform the main query.
    RETURN QUERY
    SELECT
        o.orgid,
        o.orgname,
        o.status,
        o.picture,
        o.cover_photo_path,
        (SELECT COUNT(*) FROM public.orgmember om WHERE om.orgid = o.orgid) AS members,
        (SELECT COUNT(*) FROM public.events e WHERE e.orgid = o.orgid) AS events
    FROM
        public.organizations AS o
    -- Join directly to orgmember to find the orgs this student is in.
    JOIN
        public.orgmember m ON o.orgid = m.orgid
    WHERE
        m.studentid = v_student_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_org_options()
 RETURNS TABLE(value text, label text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- This query joins the tables together to find the orgs for the current user
    RETURN QUERY
    SELECT
        o.orgid AS value,    -- Select the organization ID and alias it as "value"
        o.orgname AS label   -- Select the organization name and alias it as "label"
    FROM
        public.organizations AS o
    -- Join to find memberships
    INNER JOIN
        public.orgmember AS m ON o.orgid = m.orgid
    -- Join to find the student record associated with the membership
    INNER JOIN
        public.student AS s ON m.studentid = s.studentid
    WHERE
        -- Filter to only the memberships belonging to the currently authenticated user
        s.user_id = auth.uid();
END;
$function$
;


