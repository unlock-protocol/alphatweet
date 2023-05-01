export const AppConfig = {
  name: "Alpha Tweet",
  production: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV!,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabasePublicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  editorNamespace: "alpha_tweet",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  unlockAppUrl: process.env.NEXT_PUBLIC_UNLOCK_APP_URL!,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!,
  hotjarId: Number(process.env.NEXT_PUBLIC_HOTJAR_ID!),
} as const;
