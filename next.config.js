/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Matches '/' & ''
        destination: '/login',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
