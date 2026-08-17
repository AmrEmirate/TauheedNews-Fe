/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: `${process.env.INTERNAL_API_URL || 'http://127.0.0.1:5000/api'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

