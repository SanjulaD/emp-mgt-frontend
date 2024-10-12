/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employee/list',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['randomuser.me', 'robohash.org'],
  },
};

module.exports = nextConfig;
