"use client";

import { useEffect, useState } from "react";
import SwitchTheme from "../reusable/SwitchTheme";
import Image from "next/image";
import { DesktopNav } from "../reusable/navbar/DesktopNav";
import MobileBottomNav from "../reusable/navbar/MobileBottomNav";
import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > 24);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <>
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[99] flex justify-center px-3">
                <nav
                    aria-label="Main navigation"
                    className={`pointer-events-auto relative isolate flex w-full items-center justify-between gap-4 rounded-b-2xl border-x border-b border-zinc-950/8 bg-white/90 px-4 shadow-sm backdrop-blur-md sm:px-6 dark:border-white/10 dark:bg-zinc-950/85 motion-safe:transition-[max-width,height,background-color] motion-safe:duration-200 ${scrolled ? "h-14 max-w-[40rem]" : "h-16 max-w-[44rem] md:h-[76px]"}`}
                >
                    <div aria-hidden="true" className="portfolio-aurora"><span /></div>
                    <Link href="/" prefetch={false} aria-label="Vinod KR home" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500">
                        <Image
                            src="/images/logo-dark.svg"
                            alt=""
                            width={72}
                            height={44}
                            loading="eager"
                            className={`h-auto transition-[width] duration-200 motion-reduce:transition-none dark:invert ${scrolled ? "w-14" : "w-16 sm:w-[4.5rem]"}`}
                        />
                    </Link>
                    <DesktopNav />
                    <SwitchTheme />
                </nav>
            </div>
            <MobileBottomNav />
        </>
    );
}
