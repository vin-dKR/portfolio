import Image from 'next/image';
import React, { useState } from 'react';

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
    // State to track current image index
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Handler for previous image
    const handlePrevious = (): void => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Handler for next image
    const handleNext = (): void => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // If no images, return null
    if (images.length === 0) {
        return null;
    }

    return (
        <div className="relative w-[200px] md:w-[250px] ">
            {/* Main Image Display */}
            <div className="h-auto overflow-hidden relative">
                <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    width={200}
                    height={200}
                    className="w-[200px] md:w-[250px] max-w-xs mb-4 rounded-lg transition-transform duration-300"
                />

                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-50"
                >
                    ←
                </button>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-50"
                >
                    →
                </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-2 mb-2">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${index === currentIndex
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel
