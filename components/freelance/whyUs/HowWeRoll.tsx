"use client";

// Define interface for type safety
interface HowWeRollStep {
    id: number;
    text: string;
}

import { howWeRoll } from "@/constant/HowWeRoll";

const HowWeRoll = () => {
    return (
        <div className="w-full max-w-[90vw] backdrop-blur-md sm:max-w-[600px] mx-auto p-4 my-8 font-lenia mt-40">
            <div className="text-center text-black dark:text-white mb-4">
                <div className="text-3xl sm:text-4xl font-lenia">
                    {howWeRoll.title.split(" at ")[0]}
                </div>
                <div className="text-2xl sm:text-3xl font-instrui">
                    @ Vinnetic Media
                </div>
            </div>

            <div className="grid gap-4">
                {howWeRoll.steps.map((step: HowWeRollStep, index) => (
                    <div key={index}>
                        <div className="relative flex justify-center items-center w-full">
                            <div className='absolute top-[10px] bg-gradient-to-br from-white to-purple-500 filter blur-lg w-10 h-10 z-0' />
                            {/* Background layer */}
                            <div className="absolute h-10 w-10 bg-gradient-to-br from-white to-purple-950 rounded-[20px] overflow-hidden z-0">
                                <div className="absolute inset-[2px] bg-gradient-to-tr from-white to-purple-500 filter blur-xs rounded-[7px] z-0" />
                            </div>
                            <div className="relative flex justify-center items-center w-10 h-10 text-black rounded-full z-50">
                                {index + 1}
                            </div>
                        </div>
                        <div
                            key={step.id}
                            className="bg-gradient-to-br from-white/10 to-purple-800/20 dark:from-gray-800/20 dark:to-purple-600/10 p-4 rounded-xl shadow-md border border-white/4 transition-all hover:shadow-lg"
                        >
                            <p className="text-gray-700 dark:text-gray-300">
                                {step.text.split(" ").map((word, index) => (
                                    <span key={index}>{word} </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowWeRoll;
