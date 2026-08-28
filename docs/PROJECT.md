# Accounting Frontend Project Notes

## Purpose

`accounting-frontend` is the Fast On Time public website. It is a Next.js 14 App Router project using React 18, TypeScript, Tailwind CSS, shadcn-style UI components, and Strapi REST content.

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

This app consumes the `fastontime-*` Strapi API group from `../strapi-global`:

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
- This app is configured for static export, so avoid runtime-only Next.js features unless deployment strategy changes.

## Verification

Run before handoff:

```bash
npm run build
```

The older `npm run lint` script uses `next lint`, which is not available in newer Next versions. Prefer build/type errors as the reliable baseline until linting is modernized.
