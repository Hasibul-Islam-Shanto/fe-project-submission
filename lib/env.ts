const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error(
    "Missing NEXT_PUBLIC_GRAPHQL_ENDPOINT environment variable. Add it to .env.local.",
  );
}

export const GRAPHQL_ENDPOINT = endpoint;
