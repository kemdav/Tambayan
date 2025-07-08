set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.top_performing_orgs(uid text)
 RETURNS TABLE(orgid text, name text, total_events integer, engagement_percent text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  WITH org_stats AS (
    SELECT
      o.orgid,
      o.orgname,
      COUNT(DISTINCT e.eventid) AS total_events,
      COUNT(DISTINCT ea.studentid || '-' || ea.eventid) AS total_attendees,
      COUNT(DISTINCT om.studentid) AS total_members
    FROM organizations o
    LEFT JOIN events e ON o.orgid = e.orgid
    LEFT JOIN eventattendance ea ON ea.eventid = e.eventid
    LEFT JOIN orgmember om ON om.orgid = o.orgid
    WHERE o.universityid = uid
    GROUP BY o.orgid, o.orgname
  )
  SELECT
    org_stats.orgid,
    org_stats.orgname AS name,
    org_stats.total_events,
    CASE
      WHEN org_stats.total_members = 0 OR org_stats.total_events = 0 THEN '0%'
      ELSE TO_CHAR(
        ROUND(
          ((org_stats.total_attendees::float / (org_stats.total_members * org_stats.total_events)) * 100)::numeric,
          2
        ),
        'FM999990.00'
      ) || '%'
    END AS engagement_percent
  FROM org_stats
  ORDER BY engagement_percent DESC;
END;
$function$
;
