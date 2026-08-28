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
   NEXT_PUBLIC_API_URL=
   NEXT_PUBLIC_API_TOKEN=
   NEXT_PUBLIC_EMAIL_TOKEN=
   NEXT_PUBLIC_DOMAIN_URL=
   ```

   - `NEXT_PUBLIC_API_URL`: The base URL of your Strapi API (e.g., `https://your-strapi-instance.com`).
   - `NEXT_PUBLIC_API_TOKEN`: The Strapi API token with **read access**. Generate this in your Strapi dashboard under **Settings > API Tokens**.
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
- Keep your API tokens secure and do not expose them publicly.
- This app consumes the `fastontime-*` API domain from `../strapi-global`.
- See `docs/PROJECT.md` for the repo map and `API_ENDPOINTS.md` for endpoint notes.

---

For more information, see the [Next.js documentation](https://nextjs.org/docs) and [Strapi documentation](https://docs.strapi.io/).
