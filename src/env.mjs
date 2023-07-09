import { z } from 'zod';

const validatePort = (value) => {
  const parsedValue = Number(value);
  return !isNaN(parsedValue) && Number.isInteger(parsedValue);
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  // Next Auth Config
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
  FORTY_TWO_CLIENT_SECRET: z.string(),
  // Prisma DB
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string().refine(validatePort, 'Expected a valid port number'),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string().url()
});

export const env = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(({ path, message }) => `👉 ${path.join('')}: ${message}`);
      throw new Error(`❌ Missing or incorrect environment variables:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
})();
