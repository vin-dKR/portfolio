import { ArrowUpRight, ChevronDown } from "lucide-react";
import { designServices } from "@/constant/Pricing";

const serviceCopy: Record<number, { title: string; description: string }> = {
    1: { title: "Hero section", description: "A new first impression for your website, designed in Figma or built in code." },
    2: { title: "Landing page", description: "A complete landing page design or a responsive implementation of your design." },
    3: { title: "Custom apps", description: "App screens, reusable components, and a design system for your product." },
    5: { title: "Figma to code", description: "Turn your Figma designs into responsive HTML, CSS, JavaScript, or React components." },
    6: { title: "Full website development", description: "Website design and development, with hosting assistance and basic SEO." },
    7: { title: "Website hosting setup", description: "Domain configuration, SSL, and deployment for your website." },
    8: { title: "Comprehensive package", description: "Design, development, deployment, and one month of maintenance." },
};

function servicePrice(price: Service["price"]) {
    if (price === null) return "Custom quote";
    return typeof price === "number" ? `$${price}` : price.replace("Starting from", "From");
}

function deliveryLabel(label: string) {
    return label.replace(/Days Delivery/i, "days").replace(/Days/i, "days");
}

export default function PricingCard() {
    const services = [...designServices.coreServices.services, ...designServices.additionalServices.services];

    return (
        <div className="freelance-services">
            {services.map((service) => (
                <details key={service.id} className="freelance-service" open={service.id === 1}>
                    <summary>
                        <span className="freelance-service-title">{serviceCopy[service.id]?.title ?? service.title}</span>
                        <span className="freelance-service-price">{servicePrice(service.price)}</span>
                        <ChevronDown aria-hidden="true" size={15} />
                    </summary>
                    <div className="freelance-service-content">
                        <p>{serviceCopy[service.id]?.description ?? service.description}</p>
                        <p className="freelance-delivery">{deliveryLabel(service.deliveryTime)}<span aria-hidden="true"> · </span>{service.urgentDelivery}</p>
                        <div className="freelance-service-lists">
                            <div>
                                <h3>What I need</h3>
                                <ul>{service.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                            </div>
                            <div>
                                <h3>What you get</h3>
                                <ul>{service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul>
                            </div>
                        </div>
                        {service.includes && <p className="freelance-includes">Includes {service.includes.join(" · ")}</p>}
                        <a className="site-link" href={`mailto:vinneticmedia@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${service.serviceName}`)}`}>
                            Discuss this project <ArrowUpRight aria-hidden="true" size={14} />
                        </a>
                    </div>
                </details>
            ))}
        </div>
    );
}
