create table "public"."posts" (
    "id" uuid not null default uuid_generate_v4(),
    "content" text,
    "preview_content" text,
    "lock_address" text not null,
    "lock_network" bigint not null,
    "author_address" text not null,
    "is_published" boolean not null default true,
    "updated_at" timestamp with time zone default now(),
    "created_at" timestamp with time zone default now()
);

alter table "public"."posts" enable row level security;

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";


