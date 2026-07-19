/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sql.js"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./prompts/**/*"],
    },
  },
};

export default nextConfig;
