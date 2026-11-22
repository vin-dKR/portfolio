import { ArrowDownToLine, ArrowUpRight, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

export default function HomeBio() {
    return (
        <section className="home-bio" aria-label="About me">
            <p>
                I build web applications with Next.js, TypeScript, and Node.js.
                My recent work spans EV fleet operations, education tools, and
                reporting systems for agricultural centres.
            </p>
            <p>
                I’ve shipped <a href="#bento">5+ freelance projects</a> since December 2025
                and contribute to open source, including{' '}
                <a href="https://github.com/polarsource/polar/pulls?q=is%3Apr+author%3Avin-dKR" target="_blank" rel="noreferrer">
                    two pull requests in Polar
                </a>.
            </p>

            <div className="home-actions">
                <a href="mailto:vinodkumarmurmu62@gmail.com" className="site-button">
                    <Mail aria-hidden="true" size={15} /> Email me
                </a>
                <a
                    href="https://drive.google.com/file/d/1bbKx8tkUMtvuAI33hiT6nKX84IwDWawt/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="site-link"
                >
                    Résumé <ArrowDownToLine aria-hidden="true" size={14} />
                </a>
                <Link href="/work" prefetch={false} className="site-link">
                    Work & experience <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
            </div>

            <details className="home-about">
                <summary><ChevronRight aria-hidden="true" size={13} /> A little more about me</summary>
                <div className="home-about-copy">
                    <p>
                        Beyond code, I like building businesses. I co-founded Clothing GO,
                        an apparel venture, and later built{' '}
                        <a href="https://libly.space" target="_blank" rel="noreferrer">Libly Space</a>,
                        a library management platform. I cold-called 600+ librarians across
                        India. Both ventures failed, and I learned a lot from trying.
                    </p>
                    <p>
                        I’m now working on a SaaS ideas platform for indie hackers and
                        startup builders, while exploring backend systems, DevOps, and Web3.
                        You can find more of my{' '}
                        <a href="https://onlyfans.vinodkr.in" target="_blank" rel="noreferrer">builds</a>{' '}
                        or catch me on{' '}
                        <a href="https://x.com/always_VinodKr" target="_blank" rel="noreferrer">X</a>.
                    </p>
                </div>
            </details>
        </section>
    );
}
