import { cacheExchange, createClient, fetchExchange } from "urql";
import { GRAPHQL_ENDPOINT } from "@/lib/env";

export const urqlClient = createClient({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});
