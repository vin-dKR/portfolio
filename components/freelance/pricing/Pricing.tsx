import PricingCard from "./PricingCard"

const Pricing = () => {
    return (
        <div className="text-black dark:text-white rounded rounded-lg mt-40">
            <div>
                <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-lenia">
                        What do you want us to
                    </div>
                    <div className="text-2xl sm:text-3xl font-instrui">
                        Develop / Design
                    </div>
                </div>
            </div>

            <PricingCard />
        </div>
    )
}

export default Pricing
