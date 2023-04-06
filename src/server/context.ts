import { siweServer } from "@/config/siwe.server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  const getUserFromHeader = async () => {
    const { address, chainId } = await siweServer.getSession(req, res);
    return {
      address: address?.toLowerCase()?.trim(),
      chainId,
    };
  };
  const user = await getUserFromHeader();
  return {
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
