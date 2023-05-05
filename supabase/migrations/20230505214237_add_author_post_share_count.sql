alter table "public"."post_shares" alter column "id" drop default;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_author_post_share_count()
 RETURNS TABLE(author_address text, share_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT post_shares.author_address, COUNT(*) as share_count
    FROM post_shares
    GROUP BY post_shares.author_address;
END;
$function$
;


