import Image from "next/image";

export default function VisualCard() {
    return (
        <figure className="group relative min-h-32 overflow-hidden rounded-2xl border border-zinc-950/10 shadow-sm sm:min-h-44 sm:flex-1 dark:border-white/10">
            <Image
                src="/images/batman-card.webp"
                alt="Batman in profile"
                fill
                sizes="(max-width: 640px) 33vw, 180px"
                unoptimized
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
            />
        </figure>
    );
}
