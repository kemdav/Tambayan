import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      // Configuration for placehold.co
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Configuration for your Supabase Storage
      {
        protocol: 'https',
        hostname: 'wabqiwxsgicmqzcibypi.supabase.co', // <-- IMPORTANT: REPLACE THIS
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'http', // Local Supabase uses http, not https
        hostname: '127.0.0.1',
        port: '54321', // The default port for Supabase local storage
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
