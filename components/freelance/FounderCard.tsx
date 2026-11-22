import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function FounderCard() {
    return (
        <section className="freelance-founder" aria-labelledby="freelance-founder-heading">
            <Image src="/images/profile-192.webp" alt="Vinod KR" width={56} height={56} unoptimized className="freelance-founder-photo" />
            <div>
                <h2 id="freelance-founder-heading">Vinod KR</h2>
                <p>Developer, designer & founder of Vinnetic Media</p>
                <a className="site-link" href="mailto:vinneticmedia@gmail.com">vinneticmedia@gmail.com <ArrowUpRight aria-hidden="true" size={13} /></a>
            </div>
        </section>
    );
}
