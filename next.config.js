/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=180, stale-while-revalidate=180",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["fireship.io"],
  },
};

module.exports = nextConfig;
