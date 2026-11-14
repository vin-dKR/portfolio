"use client";

import { BriefcaseBusiness, Layers3, NotebookPen, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const portfolioNavItems = [
    { name: "Work", href: "/projects", icon: PanelsTopLeft },
    { name: "Experience", href: "/work", icon: BriefcaseBusiness },
    { name: "Writing", href: "/posts", icon: NotebookPen },
    { name: "Freelance", href: "/freelance", icon: Layers3 },
] as const;

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main" className="portfolio-desktop-nav">
            {portfolioNavItems.map(({ name, href }) => (
                <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}
                >
                    {name}
                </Link>
            ))}
        </nav>
    );
}
