/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "mybucket-smart-mark.s3.us-east-2.amazonaws.com",
                port: "",
                pathname: "/**",
            },
            //https://mybucket-smart-mark.s3.us-east-2.amazonaws.com/Captura+de+pantalla_20221026_150539.png
        ],
    },
    typescript: {
        ignoreBuildErrors: process.env.NODE_ENV === "production",
    },
    eslint: {
        ignoreDuringBuilds: process.env.NODE_ENV === "production",
    },
};

export default nextConfig;
