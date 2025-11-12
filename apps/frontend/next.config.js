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

      // Add Strapi Cloud domains from environment variable
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      if (strapiUrl) {
        try {
          const url = new URL(strapiUrl);
          // Only add if it's not localhost (already covered above)
          if (url.hostname !== "localhost") {
            // Add API domain for uploads (if images are served from API domain)
            patterns.push({
              protocol: url.protocol.replace(":", "") || "https",
              hostname: url.hostname,
              ...(url.port && { port: url.port }),
              pathname: "/uploads/**",
            });

            // Strapi Cloud uses a separate media subdomain: {project-id}.media.strapiapp.com
            // Extract project ID from hostname (e.g., "dazzling-eggs-0324233771" from "dazzling-eggs-0324233771.strapiapp.com")
            if (url.hostname.endsWith(".strapiapp.com")) {
              const projectId = url.hostname.replace(".strapiapp.com", "");
              // Add media subdomain pattern
              patterns.push({
                protocol: "https",
                hostname: `${projectId}.media.strapiapp.com`,
                pathname: "/**",
              });
            }
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
