![cherry](https://user-images.githubusercontent.com/17735/235762052-573bbb41-2d52-43cf-ba5a-b50ff2b2b9c5.svg)

[ALPHAtweet](https://alphatweet.xyz/) is a open-source project for content sharing powered by [Unlock Protocol](https://unlock-protocol.com/).

![](/public/home-2.png)

An “Alpha” is a piece of exclusive content that is being shared, where **both the creator and the sharer participate in the benefits of sharing when someone unlocks the Alpha**.

While this particular ALPHAtweet experiment emphasizes sharing on Twitter, the magic is that these items of Alpha can be shared _anywhere_ by way of share links and, in every case, the creators and sharers **both** have the opportunity to be compensated across _any_ platform, every time an Alpha is shared.

This is not something that could be done before today.

Creators set their own price for unlocking their premium content, the Alpha. They also set a referral percentage bonus that is split with those who share or amplify the content.

In this model, the creator can set the referral percentage bonus to any level they want, based on the creator’s own goals.

## Supabase

We use supabase for powering our backend. You can create a free account at [supabase](https://supabase.com/). You will need to create a new project on supabase and link it using the supabase cli.

```bash
# start local supabase instance. This will start a docker container and spin up a local supabase instance. You can copy paste the variables from the output and add them to your .env.local file
yarn supabase start


# reset your local supabase instance
yarn supabase db reset
```

### Supabase migrations

We use supabase migrations to manage our database schema. You can find the migrations in the `migrations` folder. You can read more about supabase migrations [here](https://supabase.com/docs/guides/getting-started/local-development).

1. Create a new migration

```bash
yarn supabase migrate create --name <migration-name>

# Add the sql to the migration file. You can find the migration file in the `migrations` folder. 

# If you use supabase studio to create your tables, then you can run the following command to generate the migration file

yarn supabase db diff -f <migration-name>
```

2. Apply the migration

```bash
yarn supabase db reset
```

#### Pushing changes to hosted supabase instance

Once you have created the migration, you can push the changes to your hosted supabase instance.

```bash

# Login into supabase. You will need to provide an access token which you can generate from user settings
yarn supabase auth login

# link your project - you can find the project ref in the project settings
yarn supabase link --project-ref <project-ref>

# push the changes
yarn supabase db push

```

## Develop

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Rename `.env.template` to `.env.local` and fill in the values.

```bash
NEXT_PUBLIC_SUPABASE_URL= # you can get this from your project supabase settings
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY= # you can get this from your supabase project settings
SUPABASE_SERVICE_ROLE_KEY= # you can get this from your supabase project settings
SESSION_SECRET= # generate a random string that is at least 32 characters long. You can run `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
NEXT_PUBLIC_WALLET_CONNECT_ID= # you can get this from https://www.walletconnect.org/apps
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID= # optional
NEXT_PUBLIC_HOT_JAR_ID= # optional
NEXT_PUBLIC_UNLOCK_APP_URL=https://app.unlock-protocol.com # The URL of the Unlock app you want to use. Staging or production.
```

5. Run the development server

```bash
yarn dev
```

### Production

For production deployment, you should use the hosted supabase instance. You can apply migration to your hosted instance using the following command

```bash

# Login into supabase. You will need to provide an access token which you can generate from user settings
yarn supabase auth login

# link your project - you can find the project ref in the project settings
yarn supabase link --project-ref <project-ref>

# push the changes
yarn supabase db push

```