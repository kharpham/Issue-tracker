/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*', //All endpoint of our application
                headers: [
                    {key: 'referrer-policy', value: 'no-referrer'}
                ]
            }
        ]
    }
};

export default nextConfig;
