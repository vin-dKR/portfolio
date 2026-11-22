import { ArrowUpRight, Mail } from "lucide-react";

export default function WhatIDo() {
    return (
        <header className="page-heading">
            <h1 className="page-title">Freelance</h1>
            <p className="page-intro">
                I design and build websites, storefronts, and custom web apps through Vinnetic Media.
                You work directly with me, from the first brief to the final deployment.
            </p>
            <div className="freelance-contact-actions">
                <a className="site-button" href="mailto:vinodkumarmurmu62@gmail.com?subject=Let%27s%20work%20together">
                    <Mail aria-hidden="true" size={15} /> Email me
                </a>
                <a className="site-link" href="https://cal.com/vinod-kr/30min" target="_blank" rel="noreferrer">
                    Book a 30 min call <ArrowUpRight aria-hidden="true" size={14} />
                </a>
            </div>
        </header>
    );
}
