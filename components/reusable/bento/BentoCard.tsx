import type { ReactNode } from "react";

export default function BentoCard({ children, className = "", hoverable = true }: {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
}) {
    return (
        <div className={`bento-tile relative min-w-0 overflow-hidden rounded-2xl p-4 ${hoverable ? "bento-tile-hover" : ""} ${className}`}>
            {children}
        </div>
    );
}
