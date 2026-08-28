# Accounting Frontend Agent Notes

## Project Shape

- Next.js 14 App Router project using React 18, TypeScript, Tailwind CSS, and shadcn-style UI primitives.
- Dev port is `3001`.
- Content comes from the shared Strapi backend in `../strapi-global`.
- This app owns the `fastontime-*` API domain.
- The app is configured with `output: "export"` and `trailingSlash: true`.

## API Rules

- Keep Fast On Time CMS reads in `lib/data.ts` unless there is a strong reason to create a small domain helper.
- Use `NEXT_PUBLIC_API_URL` for the Strapi origin and `NEXT_PUBLIC_API_TOKEN` for read access.
- Service detail pages use `slug`.
- Populate media/component/SEO fields explicitly when adding new frontend reads.
- The shared contact email endpoint is `POST /api/contact`.

## Structure

- `app/` contains routes, route groups, layouts, and metadata files.
- `components/` contains shared site UI and UI primitives.
- Route-only components should stay near their route under `app/.../components`.
- `app/types.ts` contains frontend-facing content contracts.

## Verification

- Run `npm run build` before handoff.
- `npm run lint` currently calls `next lint`, which is legacy for newer Next.js versions and may need modernization before it is reliable.
