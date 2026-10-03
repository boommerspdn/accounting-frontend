# Accounting Frontend

This is a Next.js frontend for the accounting website. Follow the instructions below to set up and configure the project.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd accounting-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or update the existing one) with the following variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:1337
   NEXT_PUBLIC_API_TOKEN=
   NEXT_PUBLIC_EMAIL_TOKEN=
   NEXT_PUBLIC_DOMAIN_URL=
   ```

   The exported site fetches CMS content from the browser using `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_TOKEN`. Use a read-only Strapi token or configure the required content types for public read access. Anything prefixed with `NEXT_PUBLIC_` is included in browser code and must not be a secret.

   - `NEXT_PUBLIC_API_URL`: The base URL of your Strapi API (e.g., `https://your-strapi-instance.com`).
   - `NEXT_PUBLIC_API_TOKEN`: An optional read-only token for browser-side content requests. It is visible to site visitors.
   - `NEXT_PUBLIC_EMAIL_TOKEN`: The Strapi API token with **email send access**. Generate this in your Strapi dashboard under **Settings > API Tokens**.
   - `NEXT_PUBLIC_DOMAIN_URL`: The domain where this frontend will be hosted (e.g., `https://yourdomain.com`).

   > **Note:** You can generate API tokens in Strapi by navigating to **Settings > API Tokens**. Make sure to create separate tokens for read access and email sending as needed.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3001](http://localhost:3001).

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the application for production
- `npm start` — Start the production server

## Additional Notes

- Make sure your Strapi backend is running and accessible from the API URL you provide.
- This app uses Next.js static export. TanStack Query prefetches CMS content during the build, so the first HTML already contains content. The browser refreshes it from Strapi after hydration without a loading message. New service slugs still need a rebuild and redeploy.
- `NEXT_PUBLIC_API_TOKEN` is visible to visitors. Use a read-only token with the minimum content permissions and configure Strapi CORS for the site domain.
- This app consumes the `fastontime-*` API domain from `../strapi-global`.
- See `docs/PROJECT.md` for the repo map and `API_ENDPOINTS.md` for endpoint notes.

---

For more information, see the [Next.js documentation](https://nextjs.org/docs) and [Strapi documentation](https://docs.strapi.io/).
