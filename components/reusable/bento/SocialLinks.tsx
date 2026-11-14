import { AtSign, Mail } from "lucide-react";
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
        <BentoCard className="col-span-12">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <h3 className="flex shrink-0 items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    <AtSign aria-hidden="true" className="size-4 text-violet-700 dark:text-violet-300" />
                    Connect
                </h3>

                <ul className="order-last flex basis-full flex-wrap items-center gap-x-0.5 gap-y-1 sm:order-0 sm:basis-auto">
                    {socialMedia.map(({ name, url }) => {
                        const icon = socialIcons[name];

                        return (
                            <li key={name}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-indigo-500/10 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-300 dark:hover:text-indigo-200"
                                >
                                    {icon && (
                                        <Image
                                            src={`/images/socials/${icon.image}.svg`}
                                            width={15}
                                            height={15}
                                            alt=""
                                            className={`size-[15px] shrink-0 ${icon.invert ? "dark:invert" : ""}`}
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
                    className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-md border border-indigo-500/20 bg-indigo-500/8 px-2 text-xs font-semibold text-indigo-800 transition-colors hover:bg-indigo-500/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:text-indigo-200"
                >
                    <Mail aria-hidden="true" className="size-3.5" />
                    Email
                </a>
            </div>
        </BentoCard>
    );
}
