/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: (() => {
      const patterns = [
        // Local development
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337",
          pathname: "/uploads/**",
        },
        // External image sources
        {
          protocol: "https",
          hostname: "images.pexels.com",
        },
      ];

      // Add Strapi Cloud domain from environment variable
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      if (strapiUrl) {
        try {
          const url = new URL(strapiUrl);
          // Only add if it's not localhost (already covered above)
          if (url.hostname !== "localhost") {
            patterns.push({
              protocol: url.protocol.replace(":", "") || "https",
              hostname: url.hostname,
              ...(url.port && { port: url.port }),
              pathname: "/uploads/**",
            });
          }
        } catch (error) {
          console.warn(
            "Failed to parse NEXT_PUBLIC_STRAPI_API_URL for image config:",
            error
          );
        }
      }

      return patterns;
    })(),
  },
};

module.exports = nextConfig;
