/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  // Optional: Prevent automatic `/me` -> `/me/`
  // skipTrailingSlashRedirect: true,
  // Optional: Add basePath for vercel deployments
  // basePath: '',
  // Optional: Add assetPrefix for vercel deployments
  // assetPrefix: '',
  // Experimental: Cloudflare Pages support
  experimental: {
    // Enable for Cloudflare Pages
    // Missing: Actually Next.js 14 doesn't need special config for Cloudflare Pages
    // Just need to set output: 'export' for static export
  },
  // For Cloudflare Pages, we might need to adjust
  images: {
    unoptimized: true,
  },
};

export default nextConfig;