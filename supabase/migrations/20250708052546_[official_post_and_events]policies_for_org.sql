drop policy "Org admins can create events for their organization." on "public"."events";

create policy "Officers can create official posts"
on "public"."post"
as permissive
for insert
to public
with check (((isofficial = true) AND is_org_officer(auth.uid(), orgid)));


create policy "Org admins can create events for their organization."
on "public"."events"
as permissive
for insert
to public
with check (is_org_officer(auth.uid(), orgid));



