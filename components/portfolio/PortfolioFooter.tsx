import { ArrowUpRight, ArrowRight, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { contact } from "@/constant/Portfolio"

export default function PortfolioFooter() {
    return (
        <footer className="site-container portfolio-footer">
            <div className="footer-contact">
                <div>
                    <p className="eyebrow">Contact</p>
                    <h2>Have a role in mind?</h2>
                    <p>I’d like to hear what your team is building.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <a href={`mailto:${contact.email}`} className="site-button site-button--primary">
                        Email me <ArrowRight aria-hidden="true" size={16} />
                    </a>
                    <a href={contact.resume} target="_blank" rel="noreferrer" className="site-button">
                        Résumé <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                </div>
            </div>
            <div className="footer-baseline">
                <Link href="/" prefetch={false}>Vinod KR</Link>
                <div>
                    <a href={contact.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" size={15} /> GitHub</a>
                    <a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" size={15} /> LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}
