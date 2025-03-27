import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['i.scdn.co'], 
    },
    experimental: {
        mdxRs: true, // Use Rust-based MDX compiler
    },
    transpilePackages: ['next-mdx-remote'],
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mdx?$/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        providerImportSource: '@mdx-js/react'
                    }
                }
            ]
        })

        return config
    }
}

export default nextConfig;
