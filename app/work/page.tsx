import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Timeline from "@/components/ui/Timeline"
import { contact } from "@/constant/Portfolio"
import { timelineData } from "@/constant/Work"

export const metadata: Metadata = {
    title: "Work experience | Vinod KR",
    description: "Vinod KR's experience across co-founding Clothing GO, interning at HCLTech, and building websites as a freelancer.",
}

export default function WorkPage() {
    return (
        <main id="main-content" className="site-container page-shell">
            <header className="mb-5 border-b pb-8 md:mb-7 md:pb-12" style={{ borderColor: "var(--line)" }}>
                <h1 className="page-heading">Work experience</h1>
                <p className="page-lede mt-4 max-w-xl">
                    I co-founded Clothing GO, supported financial systems at HCLTech, and now build web applications for freelance clients.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5 md:mt-8">
                    <a
                        href={contact.resume}
                        target="_blank"
                        rel="noopener"
                        className="site-button site-button--primary"
                    >
                        View résumé <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                    <Link href="/projects" prefetch={false} className="site-button">
                        View projects <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                </div>
            </header>
            <Timeline data={timelineData} />
        </main>
    )
}
