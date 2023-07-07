import NextAuth, { type AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { env } from 'env.mjs';

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
