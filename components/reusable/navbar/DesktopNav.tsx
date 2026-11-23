import { NAV_ITEMS } from "@/constant/NavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <div className="portfolio-nav-links">
            {NAV_ITEMS.map(({ name, href }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                    <Link key={href} href={href} prefetch={false} aria-current={active ? "page" : undefined}>
                        {name}
                    </Link>
                );
            })}
        </div>
    );
}
