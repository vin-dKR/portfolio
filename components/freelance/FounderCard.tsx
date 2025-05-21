import Image from "next/image"

const FounderCard = () => {
    return (
        <div className="relative flex flex-col items-center w-full mb-20">
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

                        <div className="flex items-center w-full font-lenia px-6">
                            <div className="relative flex h-[100px] w-[100px] bg-black p-[1px] rounded-full">
                                <div className="absolute bg-white/40 rounded-full h-full w-full blur-md z-0" />
                                <div className="relative rounded-full h-full w-full overflow-hidden border">
                                    <Image
                                        src="/images/dp.jpeg"
                                        alt="sdf"
                                        width={300}
                                        height={300}
                                        className=""
                                    />
                                </div>
                            </div>

                            <div className="ml-6 gap-[-2px] text-left dark:text-white/70 text-black">
                                <div className="text-3xl md:text-6xl font-bold text-shadow-sm">
                                    Vinod KR
                                </div>

                                <div className="ml-1 md:ml-4  text-sm md:text-lg text-shadow-sm">
                                    Web Developer | Designer
                                </div>

                                <span className="relative ml-1 md:ml-4 p-1 bg-linear-to-br from-blue-400 from-[40%] to-white/90 rounded-sm px-2 py-[1px] text-xs z-0">
                                    <div className="absolute left-[1.3px] top-[1px] bg-blue-500 rounded-sm w-[98%] h-[88%] z-0" />
                                    <span className="relative z-[1]">
                                        founder - Vinnetic Media
                                    </span>
                                </span>

                                <div className="ml-1 md:ml-4 text-sm text-shadow-sm">
                                    <a href="mailto:example@example.com" className="hover:underline">
                                        vinneticmedia@gmail.com
                                    </a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FounderCard
