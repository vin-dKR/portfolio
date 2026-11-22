import { ArrowUpRight, Github } from "lucide-react";

interface HomeFooterProps {
    borderColor?: string;
    className?: string;
}

export default function HomeFooter({ className = "" }: HomeFooterProps) {
    return (
        <footer className={`site-footer ${className}`}>
            <span>“Let’s go to Mars.”</span>
            <a href="https://github.com/vin-dKR/portfolio" target="_blank" rel="noreferrer">
                <Github aria-hidden="true" size={13} /> Source <ArrowUpRight aria-hidden="true" size={12} />
            </a>
        </footer>
    );
}
