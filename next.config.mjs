/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**', // Allow all paths within this domain
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
            },
            {
                source: "/robots.txt",
                destination: "/api/robots",
            }
        ];
    },
};

export default nextConfig;
