/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', process.env.API_DOMAIN],
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
};

module.exports = nextConfig;
