import { NAV_ITEMS } from "@/constant/NavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ name, href }) => {
                const active = pathname === href || pathname.startsWith(href + "/");

                return (
                    <Link
                        key={href}
                        href={href}
                        prefetch={false}
                        aria-current={active ? "page" : undefined}
                        className="rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-violet-500/8 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-violet-500 aria-[current=page]:bg-violet-500/10 aria-[current=page]:text-violet-800 dark:text-zinc-300 dark:hover:text-violet-300 dark:aria-[current=page]:text-violet-300"
                    >
                        {name}
                    </Link>
                );
            })}
        </div>
    );
}
