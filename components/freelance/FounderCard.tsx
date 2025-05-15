import Image from "next/image"

const FounderCard = () => {
    return (
        <div>
            <div className="flex mx-10 mt-10">
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

                <div className="ml-6 gap-[-2px]">
                    <div className="text-6xl font-bold text-shadow-sm">
                        Vinod KR
                    </div>

                    <div className="ml-4 text-white/70 text-sm text-shadow-sm">
                        Web Developer | Designer
                    </div>

                    <span className="relative ml-4 p-1 bg-linear-to-br from-blue-400 from-[40%] to-white/90 rounded-sm px-2 py-[1px] text-xs text-black z-0">
                        <div className="absolute left-[1.3px] top-[1px] bg-blue-500 rounded-sm w-[98%] h-[88%] z-0" />
                        <span className="relative z-[1]">
                            founder - Vinnetic Media
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}


export default FounderCard
