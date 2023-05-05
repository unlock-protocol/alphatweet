import * as z from "zod";
import { ethers } from "ethers";

export const Post = z.object({
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
