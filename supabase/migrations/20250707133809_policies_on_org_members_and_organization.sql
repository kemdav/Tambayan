set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_org_member(user_id_to_check uuid, org_id_to_check text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  -- The core logic is the same as your old policy's subquery
  SELECT EXISTS (
    SELECT 1
    FROM public.orgmember om
    JOIN public.student s ON om.studentid = s.studentid
    WHERE s.user_id = user_id_to_check AND om.orgid = org_id_to_check
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_org_officer(user_id_to_check uuid, org_id_to_check text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.orgmember om
    JOIN public.student s ON om.studentid = s.studentid
    WHERE 
      s.user_id = user_id_to_check AND 
      om.orgid = org_id_to_check AND
      om.position = 'President' -- Or use: IN ('President', 'Vice President')
  );
$function$
;

create policy "Officers can remove members from their own org"
on "public"."orgmember"
as permissive
for delete
to public
using (is_org_officer(auth.uid(), orgid));


create policy "Officers can update roles in their own org"
on "public"."orgmember"
as permissive
for update
to public
using (is_org_officer(auth.uid(), orgid))
with check (is_org_officer(auth.uid(), orgid));


create policy "Org members can view the member list"
on "public"."orgmember"
as permissive
for select
to public
using (is_org_member(auth.uid(), orgid));



