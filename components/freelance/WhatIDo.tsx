import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";

export default function WhatIDo() {
    return (
        <header className="freelance-hero">
            <span className="freelance-hero-light" aria-hidden="true" />
            <p className="freelance-hero-studio">Vinnetic Media <span>by Vinod KR</span></p>
            <h1>
                I help businesses grow<br />
                <span>with <em>technology.</em></span>
            </h1>
            <p className="freelance-hero-description">
                Websites, storefronts, and custom web apps.<br className="freelance-desktop-break" />
                Designed and built by me, from the first idea to launch.
            </p>
            <div className="freelance-hero-actions">
                <a className="freelance-hire-button" href="mailto:vinodkumarmurmu62@gmail.com?subject=Let%27s%20work%20together">
                    <Mail aria-hidden="true" size={16} /> Let’s work together <ArrowUpRight aria-hidden="true" size={16} />
                </a>
                <a className="site-link" href="#freelance-work">See the work <ArrowDown aria-hidden="true" size={14} /></a>
            </div>
            <p className="freelance-availability"><span aria-hidden="true" /> Available for design & development</p>
        </header>
    );
}
