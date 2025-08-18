/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    reactStrictMode: false,
    compiler: { removeConsole: true },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'st2.depositphotos.com',
            },
            {
                protocol: 'https',
                hostname: 'straitslaundry.co.id',
            },
            {
                protocol: 'https',
                hostname: 'img.okezone.com',
            },
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'www.ngucek.com',
            },
            {
                protocol: 'https',
                hostname: 'developers.google.com',
            },
            {
                protocol: 'https',
                hostname: 'assets-v2.lottiefiles.com',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            },
            {
                protocol: 'https',
                hostname: 'cdn.svgator.com',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
            {
                protocol: 'https',
                hostname: 'idebiz.id',
            },
            {
                protocol: 'https',
                hostname: 'www.imaury.com',
            },
        ],
    },

    experimental: {
        optimizePackageImports: ['react-icons'],
    },

    modularizeImports: {
        "@mui/material/?(((\\w*)?/?)*)": {
            transform: "@mui/material/{{ matches.[1] }}/{{member}}",
        },
        "@mui/icons-material/?(((\\w*)?/?)*)": {
            transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
        },
    },

    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value: `
    //             default-src 'self';
    //             script-src 'self' https://assets-v2.lottiefiles.com https://www.googletagmanager.com https://www.google-analytics.com;
    //             connect-src 'self' ${process.env.NEXT_PUBLIC_BASE_URL};
    //             img-src 'self' http://localhost https://res.cloudinary.com https://static.vecteezy.com https://randomuser.me https://lh3.googleusercontent.com https://st2.depositphotos.com https://straitslaundry.co.id https://img.okezone.com https://static.wixstatic.com https://www.ngucek.com https://developers.google.com https://assets-v2.lottiefiles.com https://images.ctfassets.net https://cdn.svgator.com https://img.freepik.com https://idebiz.id https://www.imaury.com data:;
    //             style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    //             font-src 'self' https://fonts.gstatic.com;
    //             frame-src 'self';
    //             object-src 'none';
    //                         `.replace(/\n/g, ''),
    //                 },
    //             ],
    //         },
    //     ]
    // },
}

module.exports = withBundleAnalyzer(nextConfig)
