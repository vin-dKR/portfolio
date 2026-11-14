"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolioNavItems } from "./DesktopNav";

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main" className="portfolio-mobile-nav">
            {portfolioNavItems.map(({ name, href, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    prefetch={false}
                    aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}
                >
                    <Icon aria-hidden="true" size={18} strokeWidth={1.75} />
                    <span>{name}</span>
                </Link>
            ))}
        </nav>
    );
}
