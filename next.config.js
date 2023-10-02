/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.' + process.env.API_DOMAIN,
      },
      {
        protocol: 'http',
        hostname: '**.' + process.env.API_DOMAIN,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/', // Matches '/' & ''
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
