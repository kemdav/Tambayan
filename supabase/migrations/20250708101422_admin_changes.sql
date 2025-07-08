alter table "public"."university" alter column "universityid" set default gen_random_uuid();

CREATE UNIQUE INDEX university_universityemail_key ON public.university USING btree (universityemail);

alter table "public"."university" add constraint "university_universityemail_key" UNIQUE using index "university_universityemail_key";


