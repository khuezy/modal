/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: true,
  },
  // headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: securityHeaders,

  //     }
  //   ]
  // },
  rewrites: () => ({
    beforeFiles: [
      {
        source: "/config_rewrite",
        destination: "/help",
      },
    ],
  }),
  images: {
    remotePatterns: [
      {
        hostname: "**.unsplash.com",
      },
      {
        hostname: '**.datocms-assets.com'
      }
    ],
  },
};

module.exports = nextConfig;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];