# TonMart

Electronics and appliances storefront built with Next.js, wired to the Walton Plaza GraphQL API.

## Prerequisites

- Node.js 20+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and set your GraphQL endpoint:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command            | Description                       |
| ------------------ | --------------------------------- |
| `npm run dev`      | Start the dev server              |
| `npm run build`    | Production build                  |
| `npm run start`    | Run the production server         |
| `npm run validate` | Typecheck, lint, and format check |

## Environment variables

| Variable                       | Description                          |
| ------------------------------ | ------------------------------------ |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | GraphQL API URL (see `.env.example`) |

## Project structure

- `app/` — Next.js App Router pages and routes
- `components/` — UI (home, product, filters, cart)
- `lib/` — GraphQL clients, fetch helpers, cart utilities
- `store/` — Zustand stores (cart state with localStorage persistence)
- `types/` — TypeScript domain types
- `utils/` — Normalization and product helpers

## Product cards and optimistic cart

Product cards include an add-to-cart button outside the product link. The button uses React 19's `useOptimistic` for in-flight UI updates; Zustand remains the committed cart state (persisted to localStorage). A 300 ms delay simulates an async cart request until a real API exists.

To test failure handling locally, set `NEXT_PUBLIC_CART_MOCK_FAIL=true` in `.env.local` and restart the dev server. Failed adds revert the optimistic quantity and show an error message.

## Product list filtering

The products page is URL-driven. Filter, sort, and pagination state live in query parameters:

```text
/products?minPrice=1000&maxPrice=50000&availability=in-stock&sort=price-asc&page=2
```

The server parses those params, loads a cached product catalog, applies the in-memory pipeline, and renders the page. Client controls update the URL via `router.replace`; there is no client-side refetch effect.

### Architecture

```text
URL params → parseProductListSearchParams → getProductCatalog (cached)
  → applyProductListPipeline → render ProductsClient
```

- **Catalog cache** — `lib/products/getProductCatalog.ts` fetches active products once per process (5-minute TTL, max 1,000 products).
- **Pipeline** — `lib/products/applyProductListPipeline.ts` handles price range, availability, and price sort before pagination.
- **URL helpers** — `lib/products/parseProductListSearchParams.ts` and `utils/productListUrl.ts`.

The Walton API only supports `uid`, `posItemCode`, and `isActive` filters with skip/limit pagination. Price, availability, and sort are applied in-app against the cached catalog.

### Filter controls

- **Price range** — debounced min/max inputs; invalid ranges show an error and do not navigate.
- **Availability** — all / in-stock / out-of-stock.
- **Sort** — default, price low-to-high, price high-to-low.

Changing any filter or sort resets pagination to page 1.
