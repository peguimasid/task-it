import { ZodError, z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  // Next Auth Google Provider
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  // Next Auth Discord Provider
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  // Next Auth Facebook Provider
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  // Next Auth Github Provider
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  // Next Auth Auth0 Provider
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_DOMAIN: z.string(),
  // Next Auth 42 School Provider
  FORTY_TWO_CLIENT_ID: z.string(),
  FORTY_TWO_CLIENT_SECRET: z.string()
});

export const env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      const missingVariables = error.errors.map(({ path }) => path.join('')).join(', ');
      throw new Error(`❌ Missing environment variables: [${missingVariables}]`);
    }
    throw error;
  }
})();
