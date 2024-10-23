/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.snitch.co.in',
            port: '',
            pathname: '/cdn/shop/files/**',
          },
        ],
      },
};

export default nextConfig;
