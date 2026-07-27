/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sql.js"],
    outputFileTracingIncludes: {
      "/api/**/*": [
        "./prompts/**/*",
        "./node_modules/sql.js/dist/sql-wasm.wasm",
      ],
    },
  },
};

export default nextConfig;
