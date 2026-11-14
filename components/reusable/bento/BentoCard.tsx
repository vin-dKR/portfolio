import type { ReactNode } from "react";

export default function BentoCard({ children, className = "", hoverable = true }: {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
}) {
    return (
        <div className={`relative min-w-0 overflow-hidden rounded-2xl border border-zinc-950/9 bg-white p-3.5 shadow-sm sm:p-4 dark:border-white/10 dark:bg-zinc-900/50 ${hoverable ? "motion-safe:transition-[box-shadow,background-color,border-color] motion-safe:duration-200 hover:shadow-md" : ""} ${className}`}>
            {children}
        </div>
    );
}
