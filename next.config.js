/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

module.exports = nextConfig;
