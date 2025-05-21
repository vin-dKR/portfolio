"use client";

import { vinneticTestimonials } from "@/constant/WhyWorkWithUs";
import { Check } from "lucide-react";

const WhyVinneticMedia = () => {
    return (
        <div className="w-full max-w-[90vw] backdrop-blur-md sm:max-w-[600px] mx-auto p-4 my-8 font-lenia mt-40">
            <div className="text-center text-black dark:text-white mb-4">
                <div className="text-3xl sm:text-4xl font-lenia">
                    Why You&apos;ll Dig Working with
                </div>
                <div className="text-2xl sm:text-3xl font-instrui">
                    Vinnetic Media
                </div>
            </div>

            <div className="grid gap-4">
                {vinneticTestimonials.items.map((testimonial: Testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-gradient-to-br from-white/10 to-purple-800/20 dark:from-gray-800/20 dark:to-purple-600/10 p-4 rounded-xl shadow-md border border-white/4 transition-all hover:shadow-lg"
                    >
                        <p className="flex items-center text-gray-700 dark:text-gray-300">
                            <Check className="mr-3" />{testimonial.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyVinneticMedia;
