import { CircuitBoard, Code2, GraduationCap, Leaf, Orbit, Sprout, Zap, type LucideIcon } from "lucide-react";

export type ProjectScreen = { src: string; alt: string; label?: string };
type ProjectStory = {
    slug: string;
    steps: readonly { title: string; detail: string }[];
};

type BentoProject = {
    icon: LucideIcon;
    hue: number;
    mark?: string;
    summary?: string;
    screen?: ProjectScreen;
    additionalScreens?: readonly ProjectScreen[];
    siteUnavailable?: boolean;
    story?: ProjectStory;
};

const projects: Record<string, BentoProject> = {
    "Trio EV": {
        icon: Zap,
        hue: 147,
        screen: { src: "/images/bento/trio-ev.webp", alt: "Trio EV homepage with the Cities Move Electric headline", label: "Homepage" },
        additionalScreens: [
            { src: "/images/bento/trio-fleet-services.webp", alt: "Trio EV fleet services comparing rentals, corporate transport, and last-mile delivery", label: "Fleet services" },
            { src: "/images/bento/trio-charging.webp", alt: "Trio EV charging infrastructure homepage", label: "Charging network" },
        ],
        summary: "I built the content system and bulk sales tools for an EV fleet and charging business.",
        story: {
            slug: "building-trio-ev-platform",
            steps: [
                { title: "Content", detail: "A structured editor lets the team update fleet and charging pages." },
                { title: "Inquiries", detail: "Public site forms route fleet and charging inquiries into the sales console." },
                { title: "Sales", detail: "Bulk updates and replies are handled at the API level." },
            ],
        },
    },
    Atari: {
        icon: Sprout,
        hue: 151,
        siteUnavailable: true,
        summary: "A configuration-driven reporting platform for India’s KVK agricultural centres.",
        story: {
            slug: "building-atari-kvk-platform",
            steps: [
                { title: "Forms", detail: "One reusable view renders 180+ form modules from configuration." },
                { title: "Permissions", detail: "Requests enforce access within a six-level organisation hierarchy." },
                { title: "Reports", detail: "40+ report templates power PDF, DOCX, and XLSX exports." },
            ],
        },
    },
    Pagz: {
        icon: Orbit,
        hue: 31,
        mark: "/images/project-icons/pagz.webp",
        screen: { src: "/images/bento/pagz.webp", alt: "Pagz storefront showing its online printing services" },
        summary: "I built the storefront, pricing API, and admin panel for a custom print shop.",
        story: {
            slug: "building-pagz-print-on-demand",
            steps: [
                { title: "Files", detail: "Customers upload PDFs and configure paper, copies, and finishing." },
                { title: "Pricing", detail: "The server applies category-specific rules and validates the final total." },
                { title: "Orders", detail: "Razorpay checkout feeds payments into the print team’s admin panel." },
            ],
        },
    },
    "Libly Space": {
        icon: Orbit,
        hue: 263,
        mark: "/images/project-icons/libly.webp",
        screen: { src: "/images/bento/libly.webp", alt: "Libly Space library staff dashboard from the project demo" },
        summary: "A library management app I pitched to librarians across India.",
    },
    Eduents: {
        icon: GraduationCap,
        hue: 220,
        screen: { src: "/images/bento/eduents-dashboard.webp", alt: "Eduents dashboard showing the question bank and exam editor", label: "Product overview" },
        additionalScreens: [
            { src: "/images/bento/eduents-question-bank.webp", alt: "Eduents question bank with folders and filtering controls", label: "Question bank" },
            { src: "/images/bento/eduents-exam-editor.webp", alt: "Eduents exam editor with test configuration and a live paper preview", label: "Exam editor" },
        ],
        summary: "I built the Next.js exam editor and WebSocket service in a five-repo education platform.",
        story: {
            slug: "building-eduents-edtech-platform",
            steps: [
                { title: "Question bank", detail: "The editor integrates PDF extraction tools built by my teammate." },
                { title: "Live editing", detail: "A WebSocket server sends updates to teachers editing the same folder." },
                { title: "Print-ready PDF", detail: "The app generates question and answer sheets for offline exams." },
            ],
        },
    },
    "Hellium AI": {
        icon: CircuitBoard, hue: 38, summary: "An AI-powered sales assistant that can be embedded on a business’s website.",
        screen: { src: "/images/bento/hellium.webp", alt: "Archived Hellium AI landing page" },
    },
    "Vin UI": {
        icon: Code2, hue: 250, summary: "A component library for Next.js projects.",
        screen: { src: "/images/bento/vin-ui.webp", alt: "Vin UI component library landing page" },
    },
    theorangeleaf: {
        icon: Leaf, hue: 163, summary: "A web app for The Orange Leaf restaurant.",
        screen: { src: "/images/bento/orangeleaf.webp", alt: "The Orange Leaf restaurant homepage" },
    },
};

const fallback: BentoProject = { icon: Orbit, hue: 256 };

export function getBentoProject(name: string): BentoProject {
    return projects[name] ?? fallback;
}
