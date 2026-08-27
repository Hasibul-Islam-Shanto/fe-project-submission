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
- `components/` — UI components (home, product, filters)
- `lib/graphql/queries/` — GraphQL fetch functions
- `types/` — TypeScript domain types
- `utils/` — Normalization and product helpers
