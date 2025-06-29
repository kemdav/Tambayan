create sequence "public"."events_eventid_seq";

create sequence "public"."post_postid_seq";

create sequence "public"."staff_teacherid_seq";

create sequence "public"."student_studentid_seq";

create sequence "public"."wiki_wikiid_seq";

create table "public"."broadcast" (
    "universityid" text,
    "recipient" text,
    "title" text,
    "message" text,
    "attachment" bytea,
    "date" timestamp without time zone
);


create table "public"."comments" (
    "orgid" text,
    "studentid" integer,
    "postid" integer,
    "comment" text,
    "attachment" bytea,
    "posted" timestamp without time zone
);


create table "public"."eventanalytics" (
    "orgid" text not null,
    "totalevents" integer,
    "total" integer
);


create table "public"."eventattendance" (
    "studentid" integer not null,
    "eventid" integer not null,
    "rating" integer
);


create table "public"."eventdata" (
    "eventid" integer not null,
    "totalparticipants" integer
);


create table "public"."events" (
    "eventid" integer not null default nextval('events_eventid_seq'::regclass),
    "orgid" text,
    "title" text,
    "date" timestamp without time zone,
    "location" text,
    "description" text,
    "status" text,
    "registered" integer
);


create table "public"."likedby" (
    "postid" integer not null,
    "studentid" integer not null
);


create table "public"."organizations" (
    "orgid" text not null,
    "universityid" text,
    "orgname" text,
    "picture" bytea,
    "created" timestamp without time zone,
    "status" text
);


create table "public"."orgmember" (
    "studentid" integer not null,
    "orgid" text not null,
    "position" text
);


create table "public"."post" (
    "postid" integer not null default nextval('post_postid_seq'::regclass),
    "orgid" text,
    "isofficial" boolean,
    "studentid" integer,
    "subject" text,
    "body" text,
    "attachment" bytea,
    "likes" integer,
    "comments" integer,
    "posted" timestamp without time zone,
    "ispinned" boolean
);


create table "public"."staff" (
    "teacherid" integer not null default nextval('staff_teacherid_seq'::regclass),
    "email" text,
    "position" text,
    "isadvisor" boolean,
    "orgid" text,
    "profile" bytea
);


create table "public"."student" (
    "studentid" integer not null default nextval('student_studentid_seq'::regclass),
    "fname" text,
    "lname" text,
    "email" text,
    "password" text,
    "picture" bytea,
    "universityid" text,
    "course" text,
    "yearlevel" text,
    "about" text
);


create table "public"."subscribedorg" (
    "studentid" integer not null,
    "orgid" text not null
);


create table "public"."university" (
    "universityid" text not null,
    "uname" text,
    "universityemail" text,
    "unicontact" text,
    "password" text,
    "attachment" bytea
);


create table "public"."verification" (
    "studentid" integer not null,
    "code" text,
    "isconfirmed" boolean
);


create table "public"."wiki" (
    "wikiid" integer not null default nextval('wiki_wikiid_seq'::regclass),
    "orgid" text,
    "section" text,
    "content" text,
    "lastupdated" timestamp without time zone,
    "created" timestamp without time zone,
    "position" text
);


alter sequence "public"."events_eventid_seq" owned by "public"."events"."eventid";

alter sequence "public"."post_postid_seq" owned by "public"."post"."postid";

alter sequence "public"."staff_teacherid_seq" owned by "public"."staff"."teacherid";

alter sequence "public"."student_studentid_seq" owned by "public"."student"."studentid";

alter sequence "public"."wiki_wikiid_seq" owned by "public"."wiki"."wikiid";

CREATE UNIQUE INDEX eventanalytics_pkey ON public.eventanalytics USING btree (orgid);

CREATE UNIQUE INDEX eventattendance_pkey ON public.eventattendance USING btree (studentid, eventid);

CREATE UNIQUE INDEX eventdata_pkey ON public.eventdata USING btree (eventid);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (eventid);

CREATE UNIQUE INDEX likedby_pkey ON public.likedby USING btree (postid, studentid);

CREATE UNIQUE INDEX organizations_pkey ON public.organizations USING btree (orgid);

CREATE UNIQUE INDEX orgmember_pkey ON public.orgmember USING btree (studentid, orgid);

CREATE UNIQUE INDEX post_pkey ON public.post USING btree (postid);

CREATE UNIQUE INDEX staff_pkey ON public.staff USING btree (teacherid);

CREATE UNIQUE INDEX student_pkey ON public.student USING btree (studentid);

CREATE UNIQUE INDEX subscribedorg_pkey ON public.subscribedorg USING btree (studentid, orgid);

CREATE UNIQUE INDEX university_pkey ON public.university USING btree (universityid);

CREATE UNIQUE INDEX verification_pkey ON public.verification USING btree (studentid);

CREATE UNIQUE INDEX wiki_pkey ON public.wiki USING btree (wikiid);

alter table "public"."eventanalytics" add constraint "eventanalytics_pkey" PRIMARY KEY using index "eventanalytics_pkey";

alter table "public"."eventattendance" add constraint "eventattendance_pkey" PRIMARY KEY using index "eventattendance_pkey";

alter table "public"."eventdata" add constraint "eventdata_pkey" PRIMARY KEY using index "eventdata_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."likedby" add constraint "likedby_pkey" PRIMARY KEY using index "likedby_pkey";

alter table "public"."organizations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."orgmember" add constraint "orgmember_pkey" PRIMARY KEY using index "orgmember_pkey";

alter table "public"."post" add constraint "post_pkey" PRIMARY KEY using index "post_pkey";

alter table "public"."staff" add constraint "staff_pkey" PRIMARY KEY using index "staff_pkey";

alter table "public"."student" add constraint "student_pkey" PRIMARY KEY using index "student_pkey";

alter table "public"."subscribedorg" add constraint "subscribedorg_pkey" PRIMARY KEY using index "subscribedorg_pkey";

alter table "public"."university" add constraint "university_pkey" PRIMARY KEY using index "university_pkey";

alter table "public"."verification" add constraint "verification_pkey" PRIMARY KEY using index "verification_pkey";

alter table "public"."wiki" add constraint "wiki_pkey" PRIMARY KEY using index "wiki_pkey";

alter table "public"."broadcast" add constraint "broadcast_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) not valid;

alter table "public"."broadcast" validate constraint "broadcast_universityid_fkey";

alter table "public"."comments" add constraint "comments_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."comments" validate constraint "comments_orgid_fkey";

alter table "public"."comments" add constraint "comments_postid_fkey" FOREIGN KEY (postid) REFERENCES post(postid) not valid;

alter table "public"."comments" validate constraint "comments_postid_fkey";

alter table "public"."comments" add constraint "comments_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."comments" validate constraint "comments_studentid_fkey";

alter table "public"."eventanalytics" add constraint "eventanalytics_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."eventanalytics" validate constraint "eventanalytics_orgid_fkey";

alter table "public"."eventattendance" add constraint "eventattendance_eventid_fkey" FOREIGN KEY (eventid) REFERENCES events(eventid) not valid;

alter table "public"."eventattendance" validate constraint "eventattendance_eventid_fkey";

alter table "public"."eventattendance" add constraint "eventattendance_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."eventattendance" validate constraint "eventattendance_studentid_fkey";

alter table "public"."eventdata" add constraint "eventdata_eventid_fkey" FOREIGN KEY (eventid) REFERENCES events(eventid) not valid;

alter table "public"."eventdata" validate constraint "eventdata_eventid_fkey";

alter table "public"."events" add constraint "events_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."events" validate constraint "events_orgid_fkey";

alter table "public"."likedby" add constraint "likedby_postid_fkey" FOREIGN KEY (postid) REFERENCES post(postid) not valid;

alter table "public"."likedby" validate constraint "likedby_postid_fkey";

alter table "public"."likedby" add constraint "likedby_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."likedby" validate constraint "likedby_studentid_fkey";

alter table "public"."organizations" add constraint "organizations_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) not valid;

alter table "public"."organizations" validate constraint "organizations_universityid_fkey";

alter table "public"."orgmember" add constraint "orgmember_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."orgmember" validate constraint "orgmember_orgid_fkey";

alter table "public"."orgmember" add constraint "orgmember_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."orgmember" validate constraint "orgmember_studentid_fkey";

alter table "public"."post" add constraint "post_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."post" validate constraint "post_orgid_fkey";

alter table "public"."post" add constraint "post_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."post" validate constraint "post_studentid_fkey";

alter table "public"."staff" add constraint "staff_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."staff" validate constraint "staff_orgid_fkey";

alter table "public"."student" add constraint "student_universityid_fkey" FOREIGN KEY (universityid) REFERENCES university(universityid) not valid;

alter table "public"."student" validate constraint "student_universityid_fkey";

alter table "public"."subscribedorg" add constraint "subscribedorg_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."subscribedorg" validate constraint "subscribedorg_orgid_fkey";

alter table "public"."subscribedorg" add constraint "subscribedorg_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."subscribedorg" validate constraint "subscribedorg_studentid_fkey";

alter table "public"."verification" add constraint "verification_studentid_fkey" FOREIGN KEY (studentid) REFERENCES student(studentid) not valid;

alter table "public"."verification" validate constraint "verification_studentid_fkey";

alter table "public"."wiki" add constraint "wiki_orgid_fkey" FOREIGN KEY (orgid) REFERENCES organizations(orgid) not valid;

alter table "public"."wiki" validate constraint "wiki_orgid_fkey";

grant delete on table "public"."broadcast" to "anon";

grant insert on table "public"."broadcast" to "anon";

grant references on table "public"."broadcast" to "anon";

grant select on table "public"."broadcast" to "anon";

grant trigger on table "public"."broadcast" to "anon";

grant truncate on table "public"."broadcast" to "anon";

grant update on table "public"."broadcast" to "anon";

grant delete on table "public"."broadcast" to "authenticated";

grant insert on table "public"."broadcast" to "authenticated";

grant references on table "public"."broadcast" to "authenticated";

grant select on table "public"."broadcast" to "authenticated";

grant trigger on table "public"."broadcast" to "authenticated";

grant truncate on table "public"."broadcast" to "authenticated";

grant update on table "public"."broadcast" to "authenticated";

grant delete on table "public"."broadcast" to "service_role";

grant insert on table "public"."broadcast" to "service_role";

grant references on table "public"."broadcast" to "service_role";

grant select on table "public"."broadcast" to "service_role";

grant trigger on table "public"."broadcast" to "service_role";

grant truncate on table "public"."broadcast" to "service_role";

grant update on table "public"."broadcast" to "service_role";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."eventanalytics" to "anon";

grant insert on table "public"."eventanalytics" to "anon";

grant references on table "public"."eventanalytics" to "anon";

grant select on table "public"."eventanalytics" to "anon";

grant trigger on table "public"."eventanalytics" to "anon";

grant truncate on table "public"."eventanalytics" to "anon";

grant update on table "public"."eventanalytics" to "anon";

grant delete on table "public"."eventanalytics" to "authenticated";

grant insert on table "public"."eventanalytics" to "authenticated";

grant references on table "public"."eventanalytics" to "authenticated";

grant select on table "public"."eventanalytics" to "authenticated";

grant trigger on table "public"."eventanalytics" to "authenticated";

grant truncate on table "public"."eventanalytics" to "authenticated";

grant update on table "public"."eventanalytics" to "authenticated";

grant delete on table "public"."eventanalytics" to "service_role";

grant insert on table "public"."eventanalytics" to "service_role";

grant references on table "public"."eventanalytics" to "service_role";

grant select on table "public"."eventanalytics" to "service_role";

grant trigger on table "public"."eventanalytics" to "service_role";

grant truncate on table "public"."eventanalytics" to "service_role";

grant update on table "public"."eventanalytics" to "service_role";

grant delete on table "public"."eventattendance" to "anon";

grant insert on table "public"."eventattendance" to "anon";

grant references on table "public"."eventattendance" to "anon";

grant select on table "public"."eventattendance" to "anon";

grant trigger on table "public"."eventattendance" to "anon";

grant truncate on table "public"."eventattendance" to "anon";

grant update on table "public"."eventattendance" to "anon";

grant delete on table "public"."eventattendance" to "authenticated";

grant insert on table "public"."eventattendance" to "authenticated";

grant references on table "public"."eventattendance" to "authenticated";

grant select on table "public"."eventattendance" to "authenticated";

grant trigger on table "public"."eventattendance" to "authenticated";

grant truncate on table "public"."eventattendance" to "authenticated";

grant update on table "public"."eventattendance" to "authenticated";

grant delete on table "public"."eventattendance" to "service_role";

grant insert on table "public"."eventattendance" to "service_role";

grant references on table "public"."eventattendance" to "service_role";

grant select on table "public"."eventattendance" to "service_role";

grant trigger on table "public"."eventattendance" to "service_role";

grant truncate on table "public"."eventattendance" to "service_role";

grant update on table "public"."eventattendance" to "service_role";

grant delete on table "public"."eventdata" to "anon";

grant insert on table "public"."eventdata" to "anon";

grant references on table "public"."eventdata" to "anon";

grant select on table "public"."eventdata" to "anon";

grant trigger on table "public"."eventdata" to "anon";

grant truncate on table "public"."eventdata" to "anon";

grant update on table "public"."eventdata" to "anon";

grant delete on table "public"."eventdata" to "authenticated";

grant insert on table "public"."eventdata" to "authenticated";

grant references on table "public"."eventdata" to "authenticated";

grant select on table "public"."eventdata" to "authenticated";

grant trigger on table "public"."eventdata" to "authenticated";

grant truncate on table "public"."eventdata" to "authenticated";

grant update on table "public"."eventdata" to "authenticated";

grant delete on table "public"."eventdata" to "service_role";

grant insert on table "public"."eventdata" to "service_role";

grant references on table "public"."eventdata" to "service_role";

grant select on table "public"."eventdata" to "service_role";

grant trigger on table "public"."eventdata" to "service_role";

grant truncate on table "public"."eventdata" to "service_role";

grant update on table "public"."eventdata" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."likedby" to "anon";

grant insert on table "public"."likedby" to "anon";

grant references on table "public"."likedby" to "anon";

grant select on table "public"."likedby" to "anon";

grant trigger on table "public"."likedby" to "anon";

grant truncate on table "public"."likedby" to "anon";

grant update on table "public"."likedby" to "anon";

grant delete on table "public"."likedby" to "authenticated";

grant insert on table "public"."likedby" to "authenticated";

grant references on table "public"."likedby" to "authenticated";

grant select on table "public"."likedby" to "authenticated";

grant trigger on table "public"."likedby" to "authenticated";

grant truncate on table "public"."likedby" to "authenticated";

grant update on table "public"."likedby" to "authenticated";

grant delete on table "public"."likedby" to "service_role";

grant insert on table "public"."likedby" to "service_role";

grant references on table "public"."likedby" to "service_role";

grant select on table "public"."likedby" to "service_role";

grant trigger on table "public"."likedby" to "service_role";

grant truncate on table "public"."likedby" to "service_role";

grant update on table "public"."likedby" to "service_role";

grant delete on table "public"."organizations" to "anon";

grant insert on table "public"."organizations" to "anon";

grant references on table "public"."organizations" to "anon";

grant select on table "public"."organizations" to "anon";

grant trigger on table "public"."organizations" to "anon";

grant truncate on table "public"."organizations" to "anon";

grant update on table "public"."organizations" to "anon";

grant delete on table "public"."organizations" to "authenticated";

grant insert on table "public"."organizations" to "authenticated";

grant references on table "public"."organizations" to "authenticated";

grant select on table "public"."organizations" to "authenticated";

grant trigger on table "public"."organizations" to "authenticated";

grant truncate on table "public"."organizations" to "authenticated";

grant update on table "public"."organizations" to "authenticated";

grant delete on table "public"."organizations" to "service_role";

grant insert on table "public"."organizations" to "service_role";

grant references on table "public"."organizations" to "service_role";

grant select on table "public"."organizations" to "service_role";

grant trigger on table "public"."organizations" to "service_role";

grant truncate on table "public"."organizations" to "service_role";

grant update on table "public"."organizations" to "service_role";

grant delete on table "public"."orgmember" to "anon";

grant insert on table "public"."orgmember" to "anon";

grant references on table "public"."orgmember" to "anon";

grant select on table "public"."orgmember" to "anon";

grant trigger on table "public"."orgmember" to "anon";

grant truncate on table "public"."orgmember" to "anon";

grant update on table "public"."orgmember" to "anon";

grant delete on table "public"."orgmember" to "authenticated";

grant insert on table "public"."orgmember" to "authenticated";

grant references on table "public"."orgmember" to "authenticated";

grant select on table "public"."orgmember" to "authenticated";

grant trigger on table "public"."orgmember" to "authenticated";

grant truncate on table "public"."orgmember" to "authenticated";

grant update on table "public"."orgmember" to "authenticated";

grant delete on table "public"."orgmember" to "service_role";

grant insert on table "public"."orgmember" to "service_role";

grant references on table "public"."orgmember" to "service_role";

grant select on table "public"."orgmember" to "service_role";

grant trigger on table "public"."orgmember" to "service_role";

grant truncate on table "public"."orgmember" to "service_role";

grant update on table "public"."orgmember" to "service_role";

grant delete on table "public"."post" to "anon";

grant insert on table "public"."post" to "anon";

grant references on table "public"."post" to "anon";

grant select on table "public"."post" to "anon";

grant trigger on table "public"."post" to "anon";

grant truncate on table "public"."post" to "anon";

grant update on table "public"."post" to "anon";

grant delete on table "public"."post" to "authenticated";

grant insert on table "public"."post" to "authenticated";

grant references on table "public"."post" to "authenticated";

grant select on table "public"."post" to "authenticated";

grant trigger on table "public"."post" to "authenticated";

grant truncate on table "public"."post" to "authenticated";

grant update on table "public"."post" to "authenticated";

grant delete on table "public"."post" to "service_role";

grant insert on table "public"."post" to "service_role";

grant references on table "public"."post" to "service_role";

grant select on table "public"."post" to "service_role";

grant trigger on table "public"."post" to "service_role";

grant truncate on table "public"."post" to "service_role";

grant update on table "public"."post" to "service_role";

grant delete on table "public"."staff" to "anon";

grant insert on table "public"."staff" to "anon";

grant references on table "public"."staff" to "anon";

grant select on table "public"."staff" to "anon";

grant trigger on table "public"."staff" to "anon";

grant truncate on table "public"."staff" to "anon";

grant update on table "public"."staff" to "anon";

grant delete on table "public"."staff" to "authenticated";

grant insert on table "public"."staff" to "authenticated";

grant references on table "public"."staff" to "authenticated";

grant select on table "public"."staff" to "authenticated";

grant trigger on table "public"."staff" to "authenticated";

grant truncate on table "public"."staff" to "authenticated";

grant update on table "public"."staff" to "authenticated";

grant delete on table "public"."staff" to "service_role";

grant insert on table "public"."staff" to "service_role";

grant references on table "public"."staff" to "service_role";

grant select on table "public"."staff" to "service_role";

grant trigger on table "public"."staff" to "service_role";

grant truncate on table "public"."staff" to "service_role";

grant update on table "public"."staff" to "service_role";

grant delete on table "public"."student" to "anon";

grant insert on table "public"."student" to "anon";

grant references on table "public"."student" to "anon";

grant select on table "public"."student" to "anon";

grant trigger on table "public"."student" to "anon";

grant truncate on table "public"."student" to "anon";

grant update on table "public"."student" to "anon";

grant delete on table "public"."student" to "authenticated";

grant insert on table "public"."student" to "authenticated";

grant references on table "public"."student" to "authenticated";

grant select on table "public"."student" to "authenticated";

grant trigger on table "public"."student" to "authenticated";

grant truncate on table "public"."student" to "authenticated";

grant update on table "public"."student" to "authenticated";

grant delete on table "public"."student" to "service_role";

grant insert on table "public"."student" to "service_role";

grant references on table "public"."student" to "service_role";

grant select on table "public"."student" to "service_role";

grant trigger on table "public"."student" to "service_role";

grant truncate on table "public"."student" to "service_role";

grant update on table "public"."student" to "service_role";

grant delete on table "public"."subscribedorg" to "anon";

grant insert on table "public"."subscribedorg" to "anon";

grant references on table "public"."subscribedorg" to "anon";

grant select on table "public"."subscribedorg" to "anon";

grant trigger on table "public"."subscribedorg" to "anon";

grant truncate on table "public"."subscribedorg" to "anon";

grant update on table "public"."subscribedorg" to "anon";

grant delete on table "public"."subscribedorg" to "authenticated";

grant insert on table "public"."subscribedorg" to "authenticated";

grant references on table "public"."subscribedorg" to "authenticated";

grant select on table "public"."subscribedorg" to "authenticated";

grant trigger on table "public"."subscribedorg" to "authenticated";

grant truncate on table "public"."subscribedorg" to "authenticated";

grant update on table "public"."subscribedorg" to "authenticated";

grant delete on table "public"."subscribedorg" to "service_role";

grant insert on table "public"."subscribedorg" to "service_role";

grant references on table "public"."subscribedorg" to "service_role";

grant select on table "public"."subscribedorg" to "service_role";

grant trigger on table "public"."subscribedorg" to "service_role";

grant truncate on table "public"."subscribedorg" to "service_role";

grant update on table "public"."subscribedorg" to "service_role";

grant delete on table "public"."university" to "anon";

grant insert on table "public"."university" to "anon";

grant references on table "public"."university" to "anon";

grant select on table "public"."university" to "anon";

grant trigger on table "public"."university" to "anon";

grant truncate on table "public"."university" to "anon";

grant update on table "public"."university" to "anon";

grant delete on table "public"."university" to "authenticated";

grant insert on table "public"."university" to "authenticated";

grant references on table "public"."university" to "authenticated";

grant select on table "public"."university" to "authenticated";

grant trigger on table "public"."university" to "authenticated";

grant truncate on table "public"."university" to "authenticated";

grant update on table "public"."university" to "authenticated";

grant delete on table "public"."university" to "service_role";

grant insert on table "public"."university" to "service_role";

grant references on table "public"."university" to "service_role";

grant select on table "public"."university" to "service_role";

grant trigger on table "public"."university" to "service_role";

grant truncate on table "public"."university" to "service_role";

grant update on table "public"."university" to "service_role";

grant delete on table "public"."verification" to "anon";

grant insert on table "public"."verification" to "anon";

grant references on table "public"."verification" to "anon";

grant select on table "public"."verification" to "anon";

grant trigger on table "public"."verification" to "anon";

grant truncate on table "public"."verification" to "anon";

grant update on table "public"."verification" to "anon";

grant delete on table "public"."verification" to "authenticated";

grant insert on table "public"."verification" to "authenticated";

grant references on table "public"."verification" to "authenticated";

grant select on table "public"."verification" to "authenticated";

grant trigger on table "public"."verification" to "authenticated";

grant truncate on table "public"."verification" to "authenticated";

grant update on table "public"."verification" to "authenticated";

grant delete on table "public"."verification" to "service_role";

grant insert on table "public"."verification" to "service_role";

grant references on table "public"."verification" to "service_role";

grant select on table "public"."verification" to "service_role";

grant trigger on table "public"."verification" to "service_role";

grant truncate on table "public"."verification" to "service_role";

grant update on table "public"."verification" to "service_role";

grant delete on table "public"."wiki" to "anon";

grant insert on table "public"."wiki" to "anon";

grant references on table "public"."wiki" to "anon";

grant select on table "public"."wiki" to "anon";

grant trigger on table "public"."wiki" to "anon";

grant truncate on table "public"."wiki" to "anon";

grant update on table "public"."wiki" to "anon";

grant delete on table "public"."wiki" to "authenticated";

grant insert on table "public"."wiki" to "authenticated";

grant references on table "public"."wiki" to "authenticated";

grant select on table "public"."wiki" to "authenticated";

grant trigger on table "public"."wiki" to "authenticated";

grant truncate on table "public"."wiki" to "authenticated";

grant update on table "public"."wiki" to "authenticated";

grant delete on table "public"."wiki" to "service_role";

grant insert on table "public"."wiki" to "service_role";

grant references on table "public"."wiki" to "service_role";

grant select on table "public"."wiki" to "service_role";

grant trigger on table "public"."wiki" to "service_role";

grant truncate on table "public"."wiki" to "service_role";

grant update on table "public"."wiki" to "service_role";


