import { GRAPHQL_ENDPOINT } from "@/lib/env";

export type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

export async function graphqlFetcher<TData>(
  query: string,
  variables?: Record<string, unknown>,
  options: FetchOptions = {},
): Promise<TData> {
  const { cache = "no-store", revalidate, tags } = options;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(revalidate !== undefined || tags?.length
      ? {
          next: {
            ...(revalidate !== undefined && { revalidate }),
            ...(tags?.length && { tags }),
          },
        }
      : {}),
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed with status ${response.status}: ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data");
  }

  return json.data;
}
