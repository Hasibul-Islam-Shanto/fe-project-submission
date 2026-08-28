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

The products page applies filters and sorting to the **complete product dataset** before pagination:

```text
Fetch products → filter all matches → sort → count → paginate → render
```

Both the server-rendered page and client refetches use the shared `queryProductList` helper in `lib/products/queryProductList.ts`.

### Architecture

- **UI state** lives in `ProductsClient` (`filters`, `sortBy`, `page`).
- **Conversion helpers** in `utils/productFilters.ts` map UI values to GraphQL inputs.
- **Pipeline** in `lib/products/applyProductListPipeline.ts` handles price, availability, and rating sort client-side.
- **Capabilities** in `lib/graphql/productListCapabilities.ts` detect which features the connected GraphQL endpoint supports.

### API capability differences

| Feature             | Local mock                              | Walton API                                     |
| ------------------- | --------------------------------------- | ---------------------------------------------- |
| Price filter        | Client-side pipeline                    | Client-side pipeline                           |
| Availability filter | Client-side pipeline                    | Client-side pipeline                           |
| Category filter     | Client-side (when category data exists) | Server-side via `categoryUid`                  |
| Price sort          | Client-side pipeline                    | Server-side via `ProductStockSort` or pipeline |
| Rating sort         | Hidden (no rating field)                | Client-side when `rating.average` is available |
| Categories list     | Not available                           | `getCategories` query                          |

When filters or sorting are active, the app fetches the full matching product set and applies the pipeline before slicing the requested page. This is correct for small evaluation datasets but should be replaced with full server-side filtering when the catalog grows.

### Filter controls

- **Price range** — debounced min/max inputs; invalid ranges show an error and do not trigger a refetch.
- **Category** — shown when the API provides a categories query.
- **Availability** — all / in-stock / out-of-stock.
- **Sort** — price options always; rating options only when the API exposes rating data.

Changing any filter or sort resets pagination to page 1.
