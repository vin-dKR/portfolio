"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BentoCard from "./BentoCard";

function ActivityPlaceholder({ name }: { name: string }) {
    return (
        <BentoCard className="activity-placeholder col-span-12 sm:col-span-6" hoverable={false}>
            <h3 className="section-heading">{name}</h3>
            <p role="status">Loading activity…</p>
        </BentoCard>
    );
}

const GithubStats = dynamic(() => import("./GithubStats"), {
    loading: () => <ActivityPlaceholder name="GitHub" />,
});
const WakatimeStats = dynamic(() => import("./WakatimeStats"), {
    loading: () => <ActivityPlaceholder name="Coding time" />,
});

export default function ActivityCards() {
    const region = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = region.current;
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setVisible(true);
            observer.disconnect();
        }, { rootMargin: "360px" });
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={region} className="bento-activities col-span-12" aria-label="Development activity">
            {visible ? <><GithubStats username="vin-dKR" /><WakatimeStats /></> : (
                <><ActivityPlaceholder name="GitHub" /><ActivityPlaceholder name="Coding time" /></>
            )}
        </div>
    );
}
