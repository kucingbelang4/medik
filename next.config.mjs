/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode — required for Redis caching and dynamic search pages.
  // Cloudflare Pages deployment: use @cloudflare/next-on-pages adapter.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;