import { z } from "zod";
import { authenticatedProcedure, procedure, router } from "../trpc";
import { supabaseAdminClient } from "@/config/supabase.server";
import { subgraph } from "@/config/subgraph";
import { KeyOrderBy, OrderDirection } from "@unlock-protocol/unlock-js";
import { ethers } from "ethers";
import { UnlockWeb3Client } from "@/config/unlock";
import { getLock } from "@/utils/lock";

const Post = z.object({
  id: z.string(),
  lock_network: z.number(),
  lock_address: z
    .string()
    .transform((item) => ethers.utils.getAddress(item))
    .transform((item) => item.trim().toLowerCase()),
  author_address: z
    .string()
    .transform((item) => ethers.utils.getAddress(item))
    .transform((item) => item.toLowerCase().trim()),
  content: z.string(),
  preview_content: z.string(),
  is_published: z.boolean().optional().default(true),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const appRouter = router({
  health: procedure.query(({ ctx }) => {
    return {
      ping: Date.now(),
    };
  }),
  feed: procedure.query(async ({ input }) => {
    const response = await supabaseAdminClient
      .from("posts")
      .select("*")
      .order("updated_at", { ascending: false })
      .filter("is_published", "eq", true)
      .limit(5);
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
        ? UnlockWeb3Client.getHasValidKey(
            parsed.lock_address,
            owner,
            parsed.lock_network
          )
        : false;
      const hasKey = await hasKeyPromise;
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
        .limit(25);

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
        .limit(25);

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
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
