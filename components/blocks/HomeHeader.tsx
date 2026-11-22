import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeader() {
    return (
        <header className="home-header">
            <div>
                <h1 className="home-name">
                    Vinod KR
                </h1>
                <p className="home-role">Full-stack developer</p>
            </div>

            <Link
                href="/work"
                prefetch={false}
                aria-label="View work and experience"
                className="home-portrait"
            >
                <Image
                    src="/images/profile-192.webp"
                    alt="Vinod KR"
                    width={72}
                    height={72}
                    priority
                    unoptimized
                    className="size-16 sm:size-[72px]"
                />
                <span>
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </span>
            </Link>
        </header>
    );
}
