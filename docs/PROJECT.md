# Accounting Frontend Project Notes

## Purpose

`accounting-frontend` is the Fast On Time public website. It is a Next.js App Router project using TypeScript, Tailwind CSS, shadcn-style UI components, and Strapi REST content.

## Local Development

- Dev URL: `http://localhost:3001`
- Backend: `http://localhost:1337`
- Start only this app: `npm run dev`
- Start from workspace root: `npm run dev:accounting`

Required environment values:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_API_TOKEN=your-strapi-read-token
NEXT_PUBLIC_EMAIL_TOKEN=your-strapi-email-token
NEXT_PUBLIC_DOMAIN_URL=http://localhost:3001
```

## Source Map

- `app/`: Next.js App Router routes, layouts, metadata files, and route-specific components.
- `components/`: shared site components and reusable UI primitives.
- `lib/data.ts`: Strapi fetch layer for Fast On Time content.
- `lib/structured-data.tsx`: JSON-LD helpers.
- `app/types.ts`: frontend data contracts for Strapi responses.
- `public/`: static images and contact/social assets.

## Strapi Domain

This app consumes the `fastontime-*` Strapi API group from `../strapi-global` at request time:

- `GET /api/fastontime-layout`
- `GET /api/fastontime-home-page`
- `GET /api/fastontime-about-page`
- `GET /api/fastontime-contact-page`
- `GET /api/fastontime-services`
- `GET /api/fastontime-services/:id`

The custom email route is shared:

- `POST /api/contact`

Use `populate` for media/component fields and keep `slug` available for service pages.

## Frontend Architecture

- Keep pages thin. Put CMS reads in `lib/data.ts` or a small domain-specific helper when the fetch surface grows.
- Route groups such as `(root)`, `(services)`, `(about-us)`, and `(contact-us)` are organizational only and do not affect URLs.
- Shared UI belongs in `components/`; route-only UI belongs near the route under `app/.../components`.
- This app produces a static export (`output: "export"`). TanStack Query prefetches content during build and hydrates it into the browser cache. Pages and shared navigation/footer render immediately from that data, then refetch Strapi in the background. The browser token is visible; use a read-only token or public read permissions.
- Service routes are enumerated during export, so adding a new service slug requires a rebuild and redeploy. Content, metadata, and the sitemap that are generated at build time can also lag until the next build.
- Set `NEXT_PUBLIC_API_URL` and, if required, `NEXT_PUBLIC_API_TOKEN` in the build environment. The exported site calls the API directly from visitors' browsers, so configure Strapi CORS for the deployed domain.
- The build runs `scripts/alias-next-prefetch.mjs` to add static route payload filenames requested by Next.js link prefetch on Apache.

## Verification

Run before handoff:

```bash
npm run build
```

The older `npm run lint` script uses `next lint`, which is not available in newer Next versions. Prefer build/type errors as the reliable baseline until linting is modernized.
