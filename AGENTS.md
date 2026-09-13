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

## Shared Frontend Rules

- This app is the reference shape for the other static-export frontends.
- Do not add `app/error.tsx` or `app/global-error.tsx`; Strapi failures are handled at build time.
- `npm run build` must check Strapi availability before `next build`.

## Verification

- Run `npm run build` before handoff.
- `npm run lint` currently calls `next lint`, which is legacy for newer Next.js versions and may need modernization before it is reliable.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
