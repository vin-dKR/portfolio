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
            <a href="#main-content" className="skip-link">Skip to content</a>
            <div className="portfolio-nav-frame">
                <nav aria-label="Main navigation" className={`portfolio-nav ${scrolled ? "is-scrolled" : ""}`}>
                    <div aria-hidden="true" className="portfolio-aurora"><span /></div>
                    <Link href="/" prefetch={false} aria-label="Vinod KR home" className="portfolio-signature">
                        <Image src="/images/logo-dark.svg" alt="" width={72} height={44} loading="eager" className="dark:invert" />
                    </Link>
                    <DesktopNav />
                    <SwitchTheme />
                </nav>
            </div>
            <MobileBottomNav />
        </>
    );
}
