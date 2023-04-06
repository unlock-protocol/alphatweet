import { createClient } from "@supabase/supabase-js";
import { AppConfig } from "./app";

export const supabaseAdminClient = createClient(
  AppConfig.supabaseUrl,
  AppConfig.supabaseServiceRoleKey
);
