import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { contact } from "@/constant/Portfolio";
import SwitchTheme from "../reusable/SwitchTheme";
import { DesktopNav } from "../reusable/navbar/DesktopNav";
import MobileBottomNav from "../reusable/navbar/MobileBottomNav";
import "./Navbar.css";

export default function Navbar() {
    return (
        <>
            <header className="portfolio-header">
                <div className="site-container portfolio-header-inner">
                    <div aria-hidden="true" className="portfolio-aurora">
                        <span />
                    </div>
                    <div className="portfolio-nav-bar theme-surface">
                        <Link href="/" prefetch={false} aria-label="Vinod KR home" className="portfolio-brand">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
                                <path d="m3.75 6.75 5.5 10.5L14.5 6.75m3 0v10.5m3-10.5-3 4 3 3.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Vinod KR</span>
                        </Link>

                        <DesktopNav />

                        <div className="portfolio-nav-actions">
                            <SwitchTheme />
                            <a href={`mailto:${contact.email}`} className="portfolio-nav-contact" aria-label="Get in touch by email">
                                <Mail aria-hidden="true" size={16} className="portfolio-nav-mail" />
                                <span>Get in touch</span>
                                <ArrowUpRight aria-hidden="true" size={15} className="portfolio-nav-arrow" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <MobileBottomNav />
        </>
    );
}
