"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, BriefcaseBusiness, Code2, Folder } from "lucide-react";
import { NAV_ITEMS } from "@/constant/NavItems";

const icons = { Projects: Folder, Work: BriefcaseBusiness, Blog: BookOpen, Freelance: Code2 };

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav aria-label="Mobile navigation" className="portfolio-mobile-nav">
            <div>
                {NAV_ITEMS.map(({ name, href }) => {
                    const Icon = icons[name as keyof typeof icons];
                    const active = pathname === href || pathname.startsWith(href + "/");
                    return (
                        <Link key={href} href={href} prefetch={false} aria-current={active ? "page" : undefined}>
                            <Icon aria-hidden="true" size={18} strokeWidth={1.65} />
                            <span>{name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
