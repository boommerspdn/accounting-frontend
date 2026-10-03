/** @type {import('next').NextConfig} */
const path = require("node:path");
const cmsUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: { root: path.resolve(__dirname, "..") },
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL(`${cmsUrl.origin}/uploads/**`),
      new URL(`${cmsUrl.origin}/wp-content/uploads/**`),
    ],
  },
};

module.exports = nextConfig;
