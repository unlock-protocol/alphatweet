import { z } from "zod";
import { authenticatedProcedure, procedure, router } from "../trpc";
import { supabaseAdminClient } from "@/config/supabase.server";
import { subgraph } from "@/config/subgraph";
import { KeyOrderBy, OrderDirection } from "@unlock-protocol/unlock-js";
import { UnlockWeb3Client } from "@/config/unlock";
import { getLock } from "@/utils/lock";
import { Post } from "../schema";

export const appRouter = router({
  health: procedure.query(({ ctx }) => {
    return {
      ping: Date.now(),
    };
  }),
  feed: procedure.query(async ({ input }) => {
    const response = await supabaseAdminClient
      .from("posts")
      .select("id", "preview_content", "lock_address", "lock_network", "author_address", "is_published", "updated_at", "created_at")
      .order("updated_at", { ascending: false })
      .filter("is_published", "eq", true)
      .limit(100);
    if (response.error) {
      throw new Error(response.error.message);
    }
    return z.array(Post).parse(response.data);
  }),

  fetchPost: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const owner = ctx.user?.address;
    const response = await supabaseAdminClient
      .from("posts")
      .select("*")
      .eq("id", input)
      .single();
    if (response.error) {
      throw new Error(response.error.message);
    } else {
      const post = response.data;
      if (!post) {
        throw new Error("Unable to find post");
      }
      const parsed = Post.parse(post);
      const hasKeyPromise = owner
        ? await Promise.all([
            UnlockWeb3Client.getHasValidKey(
              parsed.lock_address,
              owner,
              parsed.lock_network
            ),
            UnlockWeb3Client.isLockManager(
              parsed.lock_address,
              owner,
              parsed.lock_network
            ),
          ])
        : [false, false];

      const hasKey = hasKeyPromise[0] || hasKeyPromise[1];
      return z
        .object({
          hasAccess: z.boolean(),
        })
        .merge(Post)
        .parse({
          ...parsed,
          content: hasKey ? parsed.content : parsed.preview_content,
          hasAccess: hasKey,
        });
    }
  }),

  addPost: authenticatedProcedure
    .input(
      Post.omit({
        id: true,
        created_at: true,
        updated_at: true,
        author_address: true,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const lock = await getLock({
        address: input.lock_address,
        network: input.lock_network,
      });
      if (lock && lock.managers?.includes(ctx.user.address)) {
        const response = await supabaseAdminClient
          .from("posts")
          .insert([
            {
              ...input,
              author_address: ctx.user.address,
            },
          ])
          .select()
          .single();
        if (response.error) {
          throw new Error(response.error.message);
        } else {
          const post = response.data;
          if (!post) {
            throw new Error("Unable to create post");
          }
          return Post.parse(post);
        }
      } else {
        throw new Error("You are not a manager of this lock");
      }
    }),

  removePost: authenticatedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const response = await supabaseAdminClient
        .from("posts")
        .delete()
        .eq("id", input)
        .eq("author_address", ctx.user.address);
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        return true;
      }
    }),

  authorPurchaseFeed: procedure
    .input(
      z.object({
        address: z.string().transform((item) => item.toLowerCase().trim()),
      })
    )
    .query(async ({ input: { address: owner } }) => {
      const keys = await subgraph.keys({
        where: {
          owner,
        },
        orderDirection: OrderDirection.Desc,
        orderBy: KeyOrderBy.CreatedAt,
        first: 25,
      });

      const lockAddresses = keys.map((key) =>
        key.lock.address.toLowerCase().trim()
      );

      const response = await supabaseAdminClient
        .from("posts")
        .select("*")
        .in("lock_address", lockAddresses)
        .eq("is_published", true)
        .order("updated_at", { ascending: false })
        .limit(100);

      if (response.error) {
        throw new Error(response.error.message);
      }
      return z.array(Post).parse(response.data);
    }),

  authorCreatedFeed: procedure
    .input(
      z.object({
        address: z.string().transform((item) => item.toLowerCase().trim()),
      })
    )
    .query(async ({ input: { address } }) => {
      const response = await supabaseAdminClient
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .eq("author_address", address)
        .order("updated_at", { ascending: false })
        .limit(100);

      if (response.error) {
        throw new Error(response.error.message);
      }
      return z.array(Post).parse(response.data);
    }),

  authorStats: authenticatedProcedure.query(async ({ ctx }) => {
    const owner = ctx.user.address;

    const created = await supabaseAdminClient
      .from("posts")
      .select("id", { count: "exact" })
      .eq("author_address", owner)
      .eq("is_published", true);

    const keys = await subgraph.keys({
      where: {
        owner,
      },
      orderDirection: OrderDirection.Desc,
      orderBy: KeyOrderBy.CreatedAt,
      first: 1000,
    });

    const lockAddresses = keys.map((key) => key.lock.address);
    const unlocked = await supabaseAdminClient
      .from("posts")
      .select("id", { count: "exact" })
      .in("lock_address", lockAddresses)
      .eq("is_published", true);

    if (created.error || unlocked.error) {
      throw new Error("Unable to fetch stats");
    }
    return {
      created: created.count,
      unlocked: unlocked.count,
      totalEarned: "50 USDC",
      totalSold: 50,
    };
  }),

  addShare: authenticatedProcedure
    .input(
      z.object({
        post_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const author_address = ctx.user.address;
      const response = await supabaseAdminClient
        .from("post_shares")
        .insert({
          author_address,
          post_id: input.post_id,
        })
        .single();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return true;
    }),

  postStats: procedure
    .input(
      z.object({
        post_id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const post_id = input.post_id;
      const shares = await supabaseAdminClient
        .from("post_shares")
        .select("id", { count: "exact" })
        .eq("post_id", post_id);
      return {
        shares: shares.count,
        earned: "20 USDC",
      };
    }),

  TopReferralFeed: procedure.query(async () => {
    // Temporary - until subgraph has referral data
    const response = await supabaseAdminClient.rpc(
      "get_author_post_share_count"
    );

    if (response.error) {
      throw new Error(response.error.message);
    }
    // sort by share count
    return response.data
      ?.map((item: any) => {
        return {
          author_address: item.author_address,
          share_count: item.share_count,
        } as const;
      })
      .sort((a: any, b: any) => {
        return b.share_count - a.share_count;
      });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
