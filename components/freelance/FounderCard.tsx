import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function FounderCard() {
    return (
        <section className="freelance-founder" aria-labelledby="freelance-founder-heading">
            <div className="freelance-founder-portrait">
                <Image src="/images/profile-192.webp" alt="Vinod KR" width={96} height={96} unoptimized />
            </div>
            <div className="freelance-founder-copy">
                <h2 id="freelance-founder-heading">Vinod KR</h2>
                <p>Developer. Designer. Your direct line.</p>
                <span className="freelance-founder-studio">Founder, Vinnetic Media</span>
                <a href="mailto:vinneticmedia@gmail.com">vinneticmedia@gmail.com <ArrowUpRight aria-hidden="true" size={14} /></a>
            </div>
        </section>
    );
}
