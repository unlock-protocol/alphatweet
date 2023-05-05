create table "public"."post_shares" (
    "id" uuid not null default uuid_generate_v4(),
    "post_id" uuid not null,
    "author_address" text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."post_shares" enable row level security;

CREATE UNIQUE INDEX post_shares_pkey ON public.post_shares USING btree (id);

alter table "public"."post_shares" add constraint "post_shares_pkey" PRIMARY KEY using index "post_shares_pkey";


