import { withRedact } from '@tanstack/redact/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [60, 70, 75],
    },
    experimental: {
        optimizePackageImports: ["lucide-react", "lenis"]
    }
};

export default withRedact(nextConfig);
