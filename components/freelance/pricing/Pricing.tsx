import PricingCard from "./PricingCard";

export default function Pricing() {
    return (
        <section className="freelance-section freelance-pricing" aria-labelledby="freelance-services-heading">
            <header className="freelance-section-header freelance-section-header-centered">
                <h2 id="freelance-services-heading">What are we <em>making?</em></h2>
                <p>Pick the starting point that fits your project.</p>
            </header>
            <PricingCard />
        </section>
    );
}
