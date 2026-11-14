import Image from "next/image";

export default function VisualCard() {
    return (
        <figure className="bento-bat-art col-span-4">
            <Image
                src="/images/batman-card.webp"
                alt="Batman overlooking Gotham beneath the Bat-Signal"
                fill
                sizes="(max-width: 639px) 33vw, 200px"
                unoptimized
                className="object-cover object-center"
            />
        </figure>
    );
}
