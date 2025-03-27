import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'

const BLOG_POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts')

    export async function getBlogPosts(): Promise<BlogPost[]> {
        const fileNames = fs.readdirSync(BLOG_POSTS_DIRECTORY)

        const posts = await Promise.all(
            fileNames
                .filter(fileName => fileName.endsWith('.mdx'))
                .map(async (fileName) => {
                    const fullPath = path.join(BLOG_POSTS_DIRECTORY, fileName)
                    const fileContents = fs.readFileSync(fullPath, 'utf8')

                    const { data, content } = matter(fileContents)
                    const mdxSource = await serialize(content, {
                        parseFrontmatter: true,
                        mdxOptions: {
                            remarkPlugins: [],
                            rehypePlugins: []
                        }
                    })

                    const frontmatter: BlogPostFrontmatter = {
                        title: data.title || '',
                        date: data.date || new Date().toISOString(),
                        description: data.description || '',
                        tags: data.tags || [],
                        slug: fileName.replace('.mdx', ''),
                        readingTime: Math.ceil(readingTime(content).minutes)
                    }

                    return {
                        frontmatter,
                        content: mdxSource
                    }
                }
            )    
        )

        // Sort posts by date (most recent first)
        return posts.sort((a, b) => 
            new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        )
    }

    export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
        const posts = await getBlogPosts()
        return posts.find(post => post.frontmatter.slug === slug) || null
    }
