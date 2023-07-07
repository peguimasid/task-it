import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string()
});

export const env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    const missingVariables = error.errors.map(({ path }) => path.join('')).join(', ');
    throw new Error(`❌ Missing environment variables: [${missingVariables}]`);
  }
})();
