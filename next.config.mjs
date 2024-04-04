/** @type {import('next').NextConfig} */
const nextConfig = {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "cdn-icons-png.flaticon.com",
            port: "",
            pathname: "",
        },
    ],
};

export default nextConfig;
