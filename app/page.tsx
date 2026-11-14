import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react"
import CaseWork from "@/components/portfolio/CaseWork"
import GithubStats from "@/components/reusable/bento/GithubStats"
import WakatimeStats from "@/components/reusable/bento/WakatimeStats"
import { contact, polarContributions } from "@/constant/Portfolio"
import { getBlogPosts } from "@/lib/blogs"

export default async function Home() {
    const writing = (await getBlogPosts()).slice(0, 3)

    return (
        <main id="main-content" className="site-container home">
            <section className="portfolio-hero" aria-labelledby="home-heading">
                <div className="hero-intro">
                    <p className="eyebrow hero-name"><span aria-hidden="true" /> Vinod KR <span className="hero-role">/ Full-stack developer</span></p>
                    <h1 id="home-heading">I build web<br className="hero-break" /> products <em>that ship.</em></h1>
                    <p className="hero-description">I work across the interface, APIs, and data behind each product, with React, Next.js, and TypeScript.</p>
                    <div className="hero-actions">
                        <a href="#selected-work" className="site-button site-button--primary">Explore my work <ArrowDown aria-hidden="true" size={17} /></a>
                        <a href={contact.resume} target="_blank" rel="noreferrer" className="site-button">View résumé <ArrowUpRight aria-hidden="true" size={16} /></a>
                        <a href={`mailto:${contact.email}`} className="text-link hero-email"><Mail aria-hidden="true" size={16} /> Email me</a>
                    </div>
                </div>

                <figure className="hero-art">
                    <Image className="hero-artwork" src="/images/studio-route.webp" alt="" fill sizes="(max-width: 700px) 92vw, 430px" priority unoptimized />
                    <div className="hero-portrait">
                        <Image src="/images/profile-224.webp" alt="Vinod KR" width={112} height={112} unoptimized />
                    </div>
                    <figcaption>
                        <span>Product engineering</span>
                        <span>Interface <ArrowRight aria-hidden="true" size={13} /> API <ArrowRight aria-hidden="true" size={13} /> Production</span>
                    </figcaption>
                </figure>
            </section>

            <section id="selected-work" className="home-section" aria-labelledby="work-heading">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">Portfolio</p>
                        <h2 id="work-heading">Selected work</h2>
                    </div>
                    <Link href="/projects" prefetch={false} className="text-link">All projects <ArrowUpRight aria-hidden="true" size={17} /></Link>
                </div>
                <CaseWork />
            </section>

            <section className="home-section about-section" aria-labelledby="about-heading">
                <div>
                    <p className="eyebrow">Experience</p>
                    <h2 id="about-heading">I work across the stack.</h2>
                    <p>I’ve worked in financial systems support at HCLTech, co-founded an apparel startup, and shipped client products as an independent developer since December 2025.</p>
                    <Link href="/work" prefetch={false} className="text-link">View experience <ArrowUpRight aria-hidden="true" size={17} /></Link>
                </div>
                <div className="about-contributions site-panel">
                    <p className="eyebrow"><Github aria-hidden="true" size={16} /> Open source</p>
                    <h3>Contributions to Polar</h3>
                    <ul>
                        {polarContributions.slice(0, 2).map((entry) => (
                            <li key={entry.id}>
                                <a href={entry.url} target="_blank" rel="noreferrer">
                                    <span>{entry.title}</span>
                                    <small>#{entry.id} <ArrowUpRight aria-hidden="true" size={14} /></small>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="home-section" aria-labelledby="activity-heading">
                <div className="section-heading">
                    <h2 id="activity-heading">Engineering activity</h2>
                </div>
                <div className="activity-grid">
                    <GithubStats username="vin-dKR" />
                    <WakatimeStats />
                </div>
            </section>

            <section className="home-section" aria-labelledby="writing-heading">
                <div className="section-heading">
                    <h2 id="writing-heading">Field notes</h2>
                    <Link href="/posts" prefetch={false} className="text-link">All writing <ArrowUpRight aria-hidden="true" size={17} /></Link>
                </div>
                <div className="writing-preview">
                    {writing.map(({ frontmatter: post }) => (
                        <Link key={post.slug} className="site-panel writing-preview-card" href={`/posts/${post.slug}`} prefetch={false}>
                            <span className="eyebrow">{post.readingTime} min read</span>
                            <h3>{post.title.replace(" - ", " — ")}</h3>
                            <ArrowUpRight aria-hidden="true" size={18} />
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}
