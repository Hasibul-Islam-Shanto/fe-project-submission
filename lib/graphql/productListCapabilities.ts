import { GRAPHQL_ENDPOINT } from "@/lib/env";

export interface ProductListCapabilities {
  extendedProductFields: boolean;
  categoryFilter: boolean;
  serverSort: boolean;
  categoriesQuery: boolean;
}

const DEFAULT_CAPABILITIES: ProductListCapabilities = {
  extendedProductFields: false,
  categoryFilter: false,
  serverSort: false,
  categoriesQuery: false,
};

let cachedCapabilities: ProductListCapabilities | null = null;

async function probeGraphQL(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: null, errors: [{ message: response.statusText }] };
  }

  return (await response.json()) as {
    data?: unknown;
    errors?: { message: string }[];
  };
}

async function detectCapabilities(): Promise<ProductListCapabilities> {
  const capabilities: ProductListCapabilities = { ...DEFAULT_CAPABILITIES };

  const extendedProbe = await probeGraphQL(
    `query ProductsExtendedProbe {
      getProducts(pagination: { skip: 0, limit: 1 }, filter: null) {
        statusCode
        result {
          products {
            uid
            category { uid enName }
            rating { average }
          }
        }
      }
    }`,
  );

  if (!extendedProbe.errors?.length) {
    capabilities.extendedProductFields = true;
  }

  const categoryFilterProbe = await probeGraphQL(
    `query CategoryFilterProbe {
      getProducts(
        pagination: { skip: 0, limit: 1 }
        filter: { categoryUid: "probe" }
      ) {
        statusCode
        result { count }
      }
    }`,
  );

  if (!categoryFilterProbe.errors?.length) {
    capabilities.categoryFilter = true;
  }

  const sortProbe = await probeGraphQL(
    `query SortProbe($sort: ProductStockSort) {
      getProducts(
        pagination: { skip: 0, limit: 1 }
        filter: null
        sort: $sort
      ) {
        statusCode
        result { count }
      }
    }`,
    { sort: "PRICE_LOW_TO_HIGH" },
  );

  if (!sortProbe.errors?.length) {
    capabilities.serverSort = true;
  }

  const categoriesProbe = await probeGraphQL(
    `query CategoriesProbe {
      getCategories {
        statusCode
        result {
          categories { uid enName }
        }
      }
    }`,
  );

  if (!categoriesProbe.errors?.length) {
    capabilities.categoriesQuery = true;
  }

  return capabilities;
}

export async function getProductListCapabilities(): Promise<ProductListCapabilities> {
  if (cachedCapabilities) {
    return cachedCapabilities;
  }

  cachedCapabilities = await detectCapabilities();
  return cachedCapabilities;
}
