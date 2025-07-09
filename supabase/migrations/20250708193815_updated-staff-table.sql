alter table "public"."staff" drop constraint "staff_orgid_fkey";

alter table "public"."broadcast" add column "attachment" bytea;

alter table "public"."staff" drop column "isadvisor";

alter table "public"."staff" drop column "orgid";

alter table "public"."staff" add column "name" text;


