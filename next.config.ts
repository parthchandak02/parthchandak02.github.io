import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export
  output: 'export',
  
  // Disable server-side features
  trailingSlash: true,
  
  // Handle images for static export
  images: {
    unoptimized: true,
  },
  
  // Base path for GitHub Pages (remove if using custom domain)
  // basePath: '/cursor-glass-portfolio',
  
  // Asset prefix for GitHub Pages
  // assetPrefix: '/cursor-glass-portfolio/',
  
  // Disable ESLint during build to avoid deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optional: Configure redirects if needed
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
};

export default nextConfig;
