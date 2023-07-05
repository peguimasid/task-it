import NextAuth, { type AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  providers: [
    // TODO: Add type safety to environment variables
    DiscordProvider({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.DISCORD_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
