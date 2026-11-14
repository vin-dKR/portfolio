import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays, Code2, LayoutTemplate, Mail, PanelTop } from "lucide-react";
import Link from "next/link";
import { contact } from "@/constant/Portfolio";
import { designServices } from "@/constant/Pricing";

export const metadata: Metadata = {
    title: "Freelance | Vinod KR",
    description: "Design and development for landing pages, custom web apps, and web projects.",
    openGraph: {
        title: "Freelance | Vinod KR",
        description: "Design and development for landing pages, custom web apps, and web projects.",
        images: [{ url: "/images/freelance.png", width: 1200, height: 630, alt: "Freelance services" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Freelance | Vinod KR",
        description: "Design and development for landing pages, custom web apps, and web projects.",
        images: ["/images/freelance.png"],
    },
};

const bookingUrl = designServices.coreServices.services[0].href;
const serviceIcons = [PanelTop, LayoutTemplate, Code2];

const recentBuilds = [
    { name: "Trio EV", scope: "A fleet and charging website with a self-serve content system and sales console.", slug: "building-trio-ev-platform" },
    { name: "Pagz", scope: "An online print shop with configurable orders, payments, and an admin dashboard.", slug: "building-pagz-print-on-demand" },
];

function formatPrice(price: Service["price"]) {
    if (price == null) return "Custom quote";
    return typeof price === "number" ? `$${price}` : price;
}

export default function FreelancePage() {
    return (
        <main id="main-content" className="site-container page-shell">
            <header className="grid gap-7 border-b border-[var(--line)] pb-10 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.42fr)] md:items-end md:gap-12 sm:pb-14">
                <div>
                    <p className="eyebrow mb-4">Freelance</p>
                    <h1 className="page-heading">Let&apos;s build your next web product.</h1>
                    <p className="page-lede">I design and develop landing pages, storefronts, and custom web apps.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        {bookingUrl && (
                            <a href={bookingUrl} target="_blank" rel="noreferrer" className="site-button site-button--primary">
                                Book a 15-minute call <ArrowUpRight aria-hidden="true" className="size-4" />
                            </a>
                        )}
                        <a href={`mailto:${contact.email}`} className="site-button"><Mail aria-hidden="true" className="size-4" /> Email me</a>
                    </div>
                </div>

                <aside className="site-panel p-5 sm:p-6">
                    <CalendarDays aria-hidden="true" className="mb-4 size-5 text-[var(--accent)]" />
                    <h2 className="mb-2 text-xl font-semibold tracking-tight">Tell me what you need</h2>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">Bring a brief, a link, or a design. We can use the call to agree on scope, timing, and what I&apos;ll deliver.</p>
                </aside>
            </header>

            <section className="mt-10 sm:mt-14" aria-labelledby="services">
                <h2 id="services" className="mb-6 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">Services</h2>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                    {designServices.coreServices.services.map((service, index) => {
                        const Icon = serviceIcons[index] ?? Code2;
                        return (
                            <article key={service.id} className="site-panel flex min-w-0 flex-col p-5 sm:p-6">
                                <div className="mb-4 flex items-center justify-between gap-2 text-[var(--accent)]">
                                    <Icon aria-hidden="true" className="size-5 shrink-0" />
                                    <p className="text-right text-sm font-semibold">{formatPrice(service.price)}</p>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold tracking-tight">{service.title}</h3>
                                <p className="mb-4 grow text-sm leading-relaxed text-[var(--muted)]">{service.description}</p>
                                <p className="text-sm text-[var(--muted)]">{service.deliveryTime}</p>
                                <details className="mt-4 border-t border-[var(--line)] pt-3 text-sm">
                                    <summary className="cursor-pointer rounded text-[var(--accent)]">Project details</summary>
                                    <p className="mt-3 font-medium">What you get</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 leading-relaxed text-[var(--muted)]">
                                        {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                                    </ul>
                                    <p className="mt-3 font-medium">What I need</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 leading-relaxed text-[var(--muted)]">
                                        {service.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
                                    </ul>
                                </details>
                            </article>
                        );
                    })}
                </div>

                <h3 className="mt-8 mb-3 text-lg font-semibold">Additional services</h3>
                <dl className="border-t border-[var(--line)]">
                    {designServices.additionalServices.services.map((service) => (
                        <div key={service.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--line)] py-3.5">
                            <dt className="text-sm font-medium sm:text-base">{service.title}</dt>
                            <dd className="text-sm text-[var(--muted)]">{formatPrice(service.price)}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="mt-12 sm:mt-16" aria-labelledby="client-work">
                <h2 id="client-work" className="mb-5 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">Recent client work</h2>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {recentBuilds.map((project) => (
                        <Link key={project.slug} href={`/posts/${project.slug}`} prefetch={false} className="site-panel group flex items-start justify-between gap-3 p-5 transition-colors hover:border-[var(--accent)] sm:p-6">
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">{project.name}</h3>
                                <p className="text-sm leading-relaxed text-[var(--muted)]">{project.scope}</p>
                            </div>
                            <ArrowRight aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--accent)] motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
