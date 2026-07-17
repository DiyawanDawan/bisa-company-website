import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL?.trim()?.replace(/\/+$/, "").replace(/\/api\/v1$/i, "")
  ?? (process.env.NODE_ENV === "production"
    ? "https://backend-dev-v1.bisaagri.com"
    : "http://localhost:3000");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cdn.bisaagri.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/forum/post/:id",
        destination: "/forum/posts/:id",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
