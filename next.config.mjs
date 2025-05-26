/** @type {import('next').NextConfig} */

// Проверяем, находимся ли мы в окружении Vercel или делаем статический экспорт
const isVercel = process.env.VERCEL === "1"; // Переменная, которую устанавливает Vercel

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "export", // Убираем отсюда

  // Применяем output, basePath и assetPrefix только если не на Vercel
  output: isVercel ? undefined : "export",
  basePath: isVercel ? "" : "/test-avtobus", // basePath должен быть пустым на Vercel
  assetPrefix: isVercel ? "" : "/test-avtobus/", // assetPrefix должен быть пустым на Vercel

  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
    // Если ты используешь Image из 'next/image' и деплоишь на GitHub Pages,
    // возможно потребуется добавить unoptimized: true
    // unoptimized: isGithubPages || !isVercel,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
