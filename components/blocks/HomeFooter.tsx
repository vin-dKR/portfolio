import FontSelector from "@/components/reusable/FontSelector";
import CommitLink from "@/components/reusable/CommitLink";
import { RandomEmoji } from "@/components/ui/RandomEmoji";

interface HomeFooterProps {
    borderColor?: string;
    className?: string;
}

export default function HomeFooter({ className = "" }: HomeFooterProps) {
    return (
        <footer className={`site-footer ${className}`}>
            <span className="footer-motto"><span>“Let’s go to mars”</span><RandomEmoji aria-hidden="true" /></span>
            <FontSelector />
            <CommitLink />
        </footer>
    );
}
