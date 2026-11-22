const process = [
    { title: "Share the brief", description: "Send your idea, website, designs, or existing screens. We agree on the scope, deliverables, and timeline." },
    { title: "Build & refine", description: "I work through the design and implementation with you. Feedback shapes the work before the final handoff." },
    { title: "Make it yours", description: "You receive the final files and code with full rights to use the work. Deployment support is included where listed in your service." },
];

export default function HowWeRoll() {
    return (
        <section className="freelance-section" aria-labelledby="freelance-process-heading">
            <h2 id="freelance-process-heading" className="section-heading">Working together</h2>
            <ol className="freelance-process">
                {process.map(({ title, description }) => (
                    <li key={title}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
