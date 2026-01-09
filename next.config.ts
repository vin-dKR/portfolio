import type { NextConfig } from "next";
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ['i.scdn.co', 'miro.medium.com', 'cdn.simpleicons.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.simpleicons.org',
            },
        ],
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true
    },
    reactStrictMode: false,
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: []
    }
})

export default withMDX(nextConfig)
