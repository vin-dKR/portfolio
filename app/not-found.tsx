import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main id="main-content" className="site-container page-shell grid min-h-[60vh] content-center">
            <p className="eyebrow mb-4">404</p>
            <h1 className="page-heading">Page not found</h1>
            <p className="page-lede">This page may have moved. You can start over or jump straight to my projects.</p>
            <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/" prefetch={false} className="site-button site-button--primary">
                    <ArrowLeft aria-hidden="true" className="size-4" /> Back to home
                </Link>
                <Link href="/projects" prefetch={false} className="site-button">
                    View projects <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
            </div>
        </main>
    );
}
