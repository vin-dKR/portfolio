import type { NextConfig } from "next";
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'miro.medium.com' },
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
