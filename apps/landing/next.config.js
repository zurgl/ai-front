/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cuda.ai-generated.fr",
        port: "7443",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
