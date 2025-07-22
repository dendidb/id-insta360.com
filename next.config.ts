import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'insta360.co.id', 'forum.insta360.co.id', 'images.unsplash.com', 'www.insta360.com', 'plus.unsplash.com', 'media.insta360.com', 'insta360.com', 'picsum.photos', 'loremflickr.com', 'via.placeholder.com'],
  },
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';
    const appUrl = isProduction ? 'insta360.co.id' : 'localhost:3000';
    const forumUrl = isProduction ? 'forum.insta360.co.id' : 'forum.localhost:3000';
    
    return [
      // Forum subdomain handling
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: forumUrl,
          },
        ],
        destination: '/forum/:path*',
      },
    ];
  },
  // Make environment variables available on both client and server
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_FORUM_URL: process.env.NEXT_PUBLIC_FORUM_URL,
  },
};

export default nextConfig;
