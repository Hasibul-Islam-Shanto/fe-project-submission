import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

export const GRAPHQL_ENDPOINT = parsedEnv.data.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
