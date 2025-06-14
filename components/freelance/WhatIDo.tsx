"use client";
import Button from "./Button";

const WhatIDo = () => {

    const handleSubmit = () => {
        window.location.href = "mailto:vinodkumarmurmu62@gmail.com";
    };

    return (
        <div className="relative flex flex-col items-center mx-auto">
            <div className="w-full max-w-[90vw] sm:max-w-[600px] mt-[120px]">
                <div className="dark:bg-gray-200/5 bg-black/5 w-full py-6 sm:py-8 md:py-10 rounded-3xl border border-black/10 dark:border-white/5">
                    {/* Rainbow gradient headline */}
                    <div className="relative mx-4 sm:mx-6 md:mx-10 text-center text-shadow-sm">
                        <div
                            className="
                                pointer-events-none absolute inset-0 h-16 sm:h-20 md:h-24 w-full
                                before:absolute before:bottom-[-40%] sm:before:bottom-[-45%] md:before:bottom-[-50%]
                                before:left-1/2 before:z-0 before:h-4/5 before:w-3/5 before:-translate-x-1/2
                                before:animate-rainbow before:bg-no-repeat
                                before:bg-[linear-gradient(90deg,hsl(var(--color-color-1)),hsl(var(--color-color-5)),hsl(var(--color-color-3)),hsl(var(--color-color-4)),hsl(var(--color-color-2)))]
                                before:bg-[length:200%] before:opacity-50 dark:before:opacity-20
                                before:[filter:blur(calc(2*1rem))] sm:before:[filter:blur(calc(3*1rem))] md:before:[filter:blur(calc(4*1rem))]
                            "
                        />
                        <span
                            className="
                                font-lenia font-bold text-3xl sm:text-3xl md:text-4xl
                                dark:bg-gradient-to-tr dark:from-white dark:from-60% dark:to-white/20
                                bg-gradient-to-tr from-black from-30% to-white
                                inline-block text-transparent bg-clip-text
                            "
                        >
                            i help business to grow with
                        </span>{' '}
                        <span
                            className="
                                font-instrui text-4xl sm:text-4xl md:text-5xl
                                bg-gradient-to-tr dark:from-purple-600 from-purple-950 dark:to-white to-white/90
                                inline-block text-transparent bg-clip-text leading-[1.1]
                            "
                        >
                            technology.
                        </span>
                    </div>

                    {/* Availability indicator */}
                    <div className="flex w-full items-center gap-2 font-lenia justify-center mt-4 text-sm sm:text-base">
                        <span className="relative flex size-2 sm:size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-700 dark:bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex size-2 sm:size-3 rounded-full bg-purple-900"></span>
                        </span>
                        <span className="text-black dark:text-white">Available for design and develop</span>
                    </div>

                    {/* Button */}
                    <div className="px-4 md:px-20 lg:px-30">
                        <Button
                            maxWidth="100%"
                            label="Hire Me"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatIDo;

