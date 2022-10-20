/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
  ...nextConfig,
  images: {
    domains: ['10.117.128.92'],
  },
}

module.exports = nextConfig
