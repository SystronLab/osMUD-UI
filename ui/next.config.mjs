const API_URL = process.env.API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL ?? "http://localhost:8080"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
