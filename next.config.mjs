/** @type {import('next').NextConfig} */
const nextConfig = {
    // Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // Prevent clickjacking attacks
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // Prevent MIME type sniffing
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Enable XSS protection
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Strict referrer policy
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Permissions policy - restrict browser features
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
                    },
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https:",
                            "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
                            "frame-src 'self' https://cal.com https://cal.eu https://vercel.live",
                            "frame-ancestors 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                        ].join('; '),
                    },
                    // Strict Transport Security (HTTPS only)
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },

    // Powered by header removal
    poweredByHeader: false,

    // Enable React strict mode
    reactStrictMode: true,
};

export default nextConfig;
