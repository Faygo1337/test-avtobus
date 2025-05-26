/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === "1";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: isVercel ? undefined : "export",
  basePath: isVercel ? "" : "/test-avtobus",
  assetPrefix: isVercel ? "" : "/test-avtobus/",

  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
