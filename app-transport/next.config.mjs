/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
        domains: ['localhost'],
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
