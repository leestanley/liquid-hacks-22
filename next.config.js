/** @type {import('next').NextConfig} */
const withImages = require("next-images");

module.exports = withImages({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.valorant-api.com',
                port: '',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false
            }
        }

        return config;
    }
});

