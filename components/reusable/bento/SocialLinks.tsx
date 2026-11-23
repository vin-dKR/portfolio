import { ArrowUpRight, AtSign, Mail } from "lucide-react";
import Image from "next/image";
import { socialMedia } from "@/constant/SocialMedia";
import BentoCard from "./BentoCard";

const socialIcons: Record<string, { image: string; invert?: boolean; label?: string }> = {
    GitHub: { image: "github", invert: true },
    Twitter: { image: "xcom", invert: true, label: "X" },
    LinkedIn: { image: "linkedin" },
    Discord: { image: "discord" },
    YouTube: { image: "youtube" },
};

export default function SocialLinksCard() {
    return (
        <BentoCard className="col-span-12 px-3.5 py-2.5 sm:px-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 sm:flex sm:justify-between">
                <h3 className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
                    <AtSign aria-hidden="true" className="size-4 text-(--bento-accent)" />
                    Connect
                </h3>

                <ul className="order-last col-span-2 mt-1.5 flex flex-wrap items-center gap-x-0.5 border-t border-(--bento-rule) pt-1 sm:order-none sm:mt-0 sm:border-0 sm:pt-0">
                    {socialMedia.map(({ name, url }) => {
                        const icon = socialIcons[name];

                        return (
                            <li key={name}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name === "Twitter" ? "X (Twitter)" : undefined}
                                    className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-md px-1.5 text-xs font-medium text-(--bento-muted) transition-colors hover:bg-(--bento-inset) hover:text-(--bento-accent) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
                                >
                                    {icon && (
                                        <Image
                                            src={`/images/socials/${icon.image}.svg`}
                                            width={14}
                                            height={14}
                                            alt=""
                                            className={`size-3.5 shrink-0 ${icon.invert ? "dark:invert" : ""}`}
                                        />
                                    )}
                                    {icon?.label ?? name}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <a
                    href="mailto:vinodkumarmurmu62@gmail.com"
                    className="site-link"
                >
                    <Mail aria-hidden="true" className="size-3.5" />
                    Email
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
            </div>
        </BentoCard>
    );
}
