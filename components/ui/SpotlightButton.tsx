import SpotlightButton from "@/components/SpotlightButton.jsx"

export default function Page() {
    return (
        <div className="mx-auto flex h-screen w-screen max-w-xl items-center justify-center">
            <SpotlightButton>
                <span className="relative mt-px bg-gradient-to-b from-white/25 to-white bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-200">
                    Spotlight Button
                </span>
            </SpotlightButton>
        </div>
    )
}

