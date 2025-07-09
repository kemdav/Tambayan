alter table "public"."comments" drop constraint "comments_orgid_fkey";

alter table "public"."eventattendance" drop constraint "eventattendance_eventid_fkey";

alter table "public"."events" drop constraint "events_orgid_fkey";

alter table "public"."orgmember" drop constraint "orgmember_orgid_fkey";

alter table "public"."post" drop constraint "post_orgid_fkey";

drop function if exists "public"."top_performing_orgs"(uid text);

alter table "public"."accreditations" enable row level security;

alter table "public"."broadcast" drop column "attachment";

alter table "public"."broadcast" enable row level security;

alter table "public"."comments" disable row level security;

alter table "public"."organizations" add column "category" text;

alter table "public"."organizations" disable row level security;

alter table "public"."post" disable row level security;

alter table "public"."staff" drop column "name";

alter table "public"."staff" add column "isadvisor" boolean;

alter table "public"."staff" add column "orgid" text;

alter table "public"."student" disable row level security;

alter table "public"."university" disable row level security;

alter table "public"."staff" add constraint "staff_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."staff" validate constraint "staff_orgid_fkey";

alter table "public"."comments" add constraint "comments_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_orgid_fkey";

alter table "public"."eventattendance" add constraint "eventattendance_eventid_fkey" FOREIGN KEY (eventid) REFERENCES events(eventid) ON DELETE CASCADE not valid;

alter table "public"."eventattendance" validate constraint "eventattendance_eventid_fkey";

alter table "public"."events" add constraint "events_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_orgid_fkey";

alter table "public"."orgmember" add constraint "orgmember_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) ON DELETE CASCADE not valid;

alter table "public"."orgmember" validate constraint "orgmember_orgid_fkey";

alter table "public"."post" add constraint "post_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) ON DELETE CASCADE not valid;

alter table "public"."post" validate constraint "post_orgid_fkey";


