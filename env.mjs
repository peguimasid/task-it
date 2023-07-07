import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  // Next Auth Discord Provider
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  // Next Auth Github Provider
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  // Next Auth Auth0 Provider
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_DOMAIN: z.string()
});

export const env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    const missingVariables = error.errors.map(({ path }) => path.join('')).join(', ');
    throw new Error(`❌ Missing environment variables: [${missingVariables}]`);
  }
})();
