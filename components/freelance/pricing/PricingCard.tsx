"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Root as Tabs, List as TabList, Trigger as Tab, Content as TabPanel } from "@radix-ui/react-tabs";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { designServices } from "@/constant/Pricing";
import { Flow } from "@/components/ui/Flow";

const services = [...designServices.coreServices.services, ...designServices.additionalServices.services];
const titles: Record<number, string> = {
    1: "Hero section",
    2: "Landing page",
    3: "Custom app",
    5: "Figma to code",
    6: "Full website",
    7: "Hosting setup",
    8: "Complete package",
};
const descriptions: Record<number, string> = {
    1: "Give your website a first impression that makes people want to stay. A new hero, designed in Figma or built in code.",
    2: "A landing page with a clear story, a considered design, and an implementation that works across screen sizes.",
    3: "Turn your product idea into app screens, reusable components, and a cohesive design system.",
    5: "Take the design you already love into production, with responsive layouts and reusable code.",
    6: "Design, development, and the details that get a complete website ready for launch.",
    7: "Connect your domain, configure hosting, and get your website online with SSL.",
    8: "One person across design, development, and deployment, with a month of maintenance after handoff.",
};
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Price({ service }: { service: Service }) {
    if (service.price === null) return <span className="freelance-price-quote">Let’s scope it</span>;
    const amount = typeof service.price === "number" ? service.price : Number(service.price.match(/\$([\d,]+)/)?.[1].replaceAll(",", ""));
    if (!Number.isFinite(amount)) return <span>{service.price}</span>;

    return (
        <>
            {typeof service.price === "string" && service.price.startsWith("Starting") && <span className="freelance-price-prefix">From</span>}
            <Flow value={amount} format={currency.format} />
            {service.id === 7 && <span className="freelance-price-suffix">setup + hosting fees</span>}
        </>
    );
}

export default function PricingCard() {
    const [selected, setSelected] = useState(String(services[0].id));
    const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const list = useRef<HTMLDivElement>(null);
    const service = services.find((item) => String(item.id) === selected) ?? services[0];
    const deliveryDays = service.deliveryTime.match(/^(\d+) Days Delivery$/i)?.[1];

    useEffect(() => {
        const element = list.current;
        if (!element) return;
        const measure = () => {
            const active = element.querySelector<HTMLButtonElement>('[data-state="active"]');
            if (active) setIndicator({ left: active.offsetLeft, top: active.offsetTop, width: active.offsetWidth, height: active.offsetHeight });
        };
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        element.querySelectorAll("button").forEach((button) => observer.observe(button));
        measure();
        return () => observer.disconnect();
    }, [selected]);

    const style = {
        "--service-indicator-left": `${indicator.left}px`,
        "--service-indicator-top": `${indicator.top}px`,
        "--service-indicator-width": `${indicator.width}px`,
        "--service-indicator-height": `${indicator.height}px`,
    } as CSSProperties;

    return (
        <Tabs value={selected} onValueChange={setSelected} className="freelance-service-picker">
            <TabList ref={list} aria-label="Design and development services" className="freelance-service-nav" style={style} data-measured={indicator.width > 0}>
                <span aria-hidden="true" className="freelance-service-indicator" />
                {services.map((service) => (
                    <Tab key={service.id} value={String(service.id)} className="freelance-service-choice">
                        {titles[service.id] ?? service.title}
                    </Tab>
                ))}
            </TabList>
            <TabPanel value={selected} className="freelance-service-panel">
                <article className="freelance-service-card">
                    <header className="freelance-service-card-heading">
                        <div>
                            <h3>{titles[service.id] ?? service.title}</h3>
                            <p className="freelance-service-discipline">Design / develop</p>
                        </div>
                        <span className="freelance-service-delivery"><Clock3 aria-hidden="true" size={13} />{deliveryDays ? <><Flow value={Number(deliveryDays)} /><span>days</span></> : service.deliveryTime}</span>
                    </header>
                    <p className="freelance-service-description">{descriptions[service.id] ?? service.description}</p>
                    <div className="freelance-service-price"><Price service={service} /></div>
                    <a className="freelance-hire-button freelance-service-action" href={`mailto:vinneticmedia@gmail.com?subject=${encodeURIComponent(`Project inquiry: ${service.serviceName}`)}`}>
                        Let’s build this <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                    <div className="freelance-service-lists">
                        <section>
                            <h4>What I’ll need</h4>
                            <ul>{service.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
                        </section>
                        <section>
                            <h4>What you’ll get</h4>
                            <ul>{service.deliverables.map((deliverable) => <li key={deliverable}><Check aria-hidden="true" size={13} />{deliverable}</li>)}</ul>
                        </section>
                    </div>
                    <footer className="freelance-service-fineprint">
                        <span>{service.urgentDelivery}</span>
                        {service.includes && <span>Includes {service.includes.join(" · ")}</span>}
                    </footer>
                </article>
            </TabPanel>
            {services.filter((item) => String(item.id) !== selected).map((item) => <TabPanel key={item.id} value={String(item.id)} className="freelance-service-panel" />)}
        </Tabs>
    );
}
