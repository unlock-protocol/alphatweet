create type "auth"."code_challenge_method" as enum ('s256', 'plain');

create table "auth"."flow_state" (
    "id" uuid not null,
    "user_id" uuid,
    "auth_code" text not null,
    "code_challenge_method" auth.code_challenge_method not null,
    "code_challenge" text not null,
    "provider_type" text not null,
    "provider_access_token" text,
    "provider_refresh_token" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "authentication_method" text not null
);


CREATE UNIQUE INDEX flow_state_pkey ON auth.flow_state USING btree (id);

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);

alter table "auth"."flow_state" add constraint "flow_state_pkey" PRIMARY KEY using index "flow_state_pkey";


create table "public"."post_shares" (
    "id" uuid default uuid_generate_v4(),
    "post_id" uuid not null,
    "author_address" text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."post_shares" enable row level security;

create table "public"."post_views" (
    "post_id" uuid not null,
    "count" numeric not null default '0'::numeric,
    "created_at" timestamp with time zone default now()
);


alter table "public"."post_views" enable row level security;

CREATE UNIQUE INDEX post_views_pkey ON public.post_views USING btree (post_id);

alter table "public"."post_views" add constraint "post_views_pkey" PRIMARY KEY using index "post_views_pkey";

alter table "public"."post_shares" add constraint "post_shares_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."post_shares" validate constraint "post_shares_post_id_fkey";

alter table "public"."post_views" add constraint "post_views_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."post_views" validate constraint "post_views_post_id_fkey";


