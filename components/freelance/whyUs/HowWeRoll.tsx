import { FileText, PenTool, Send } from "lucide-react";

const process = [
    { title: "The first conversation", icon: FileText, description: "Share your idea, existing screens, or a rough brief. We decide the scope, deliverables, and timeline together." },
    { title: "Make, share, refine", icon: PenTool, description: "You see the design and the build as they take shape. Your feedback gets worked in before the final handoff." },
    { title: "Ready for the real world", icon: Send, description: "You get the final files and code, with full rights to use the work. Deployment support follows your chosen service." },
];

export default function HowWeRoll() {
    return (
        <section className="freelance-section freelance-process-section" aria-labelledby="freelance-process-heading">
            <header className="freelance-section-header"><h2 id="freelance-process-heading">Good work starts with <em>a conversation.</em></h2></header>
            <ol className="freelance-process">
                {process.map(({ title, description, icon: Icon }) => (
                    <li key={title}>
                        <span className="freelance-process-glyph"><Icon aria-hidden="true" size={18} strokeWidth={1.5} /></span>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </li>
                ))}
            </ol>
            <a className="site-link freelance-call-link" href="https://cal.com/vinod-kr/30min" target="_blank" rel="noreferrer">Talk it through on a 30 min call <span aria-hidden="true">↗</span></a>
        </section>
    );
}
