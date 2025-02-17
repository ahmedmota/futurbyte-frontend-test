/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fb-co-strapi.s3.me-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "http://13.201.188.14:5000",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
  trailingSlash: true,
  reactStrictMode: false,
};

export default nextConfig;
