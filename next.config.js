const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    modern: true,
  },
};

module.exports = nextConfig;
