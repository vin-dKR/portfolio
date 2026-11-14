"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ImageCarousel({ images, label }: CarouselProps & { label: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentImage = images[currentIndex] ?? images[0]
    if (!currentImage) return null

    const move = (step: number) => {
        setCurrentIndex((index) => (index + step + images.length) % images.length)
    }

    return (
        <figure className="om-timeline-gallery" aria-label={`${label} photos`}>
            <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(min-width: 1100px) 415px, (min-width: 760px) 42vw, calc(100vw - 76px)"
                className="object-cover"
            />

            {images.length > 1 && (
                <div className="om-timeline-gallery-controls">
                    <button type="button" onClick={() => move(-1)} className="om-timeline-gallery-arrow" aria-label="Previous photo">
                        <ChevronLeft aria-hidden="true" size={18} />
                    </button>
                    <div className="flex">
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                type="button"
                                onClick={() => setCurrentIndex(index)}
                                className="om-timeline-gallery-choice"
                                aria-label={`Show photo ${index + 1} of ${images.length}`}
                                aria-current={index === currentIndex ? "true" : undefined}
                            />
                        ))}
                    </div>
                    <button type="button" onClick={() => move(1)} className="om-timeline-gallery-arrow" aria-label="Next photo">
                        <ChevronRight aria-hidden="true" size={18} />
                    </button>
                    <span role="status" className="sr-only">Photo {currentIndex + 1} of {images.length}</span>
                </div>
            )}
        </figure>
    )
}
