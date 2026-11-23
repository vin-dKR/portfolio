import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ImageCarousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentImage = images[currentIndex] ?? images[0]
    if (!currentImage) return null

    const buttonClass = "absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

    const move = (step: number) => {
        setCurrentIndex((index) => (index + step + images.length) % images.length)
    }

    return (
        <div className="w-56 max-w-full sm:w-64">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-black/5 ring-1 ring-inset ring-black/10 dark:bg-white/5 dark:ring-white/15">
                <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="(min-width: 640px) 256px, (min-width: 360px) 224px, calc(100vw - 96px)"
                    className="object-cover"
                />

                {images.length > 1 && (
                    <>
                        <button type="button" onClick={() => move(-1)} className={`${buttonClass} left-2`} aria-label="Previous photo">
                            <ChevronLeft aria-hidden="true" size={18} />
                        </button>
                        <button type="button" onClick={() => move(1)} className={`${buttonClass} right-2`} aria-label="Next photo">
                            <ChevronRight aria-hidden="true" size={18} />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-1 flex justify-center" aria-label="Choose a photo">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className="grid size-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-1"
                            aria-label={`Show photo ${index + 1} of ${images.length}`}
                            aria-current={index === currentIndex ? "true" : undefined}
                        >
                            <span className={`size-1.5 rounded-full ${index === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-neutral-400 dark:bg-neutral-600"}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
