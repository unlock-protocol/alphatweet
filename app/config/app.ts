export const AppConfig = {
  production: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
