import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking by forbidding embedding in frames/iframes
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent MIME-sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Protect sensitive query parameters (e.g., birth dates, times) from leaking via Referer
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict browser features to minimal required permissions
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  // Content Security Policy compatible with Next.js, local landscape background video, and fonts
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      "font-src 'self' data: https://fonts.gstatic.com;",
      "img-src 'self' data: blob: https:;",
      "media-src 'self' data: blob:;",
      "connect-src 'self' https: http: ws: wss:;",
      "frame-ancestors 'none';",
    ]
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
