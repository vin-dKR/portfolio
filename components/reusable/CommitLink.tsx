"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

export default function CommitLink() {
    const link = useRef<HTMLAnchorElement>(null);
    const [commit, setCommit] = useState<string | null>(null);

    useEffect(() => {
        const target = link.current;
        if (!target) return;
        const controller = new AbortController();
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            void fetch("/api/commit", { cache: "no-store", signal: controller.signal })
                .then((response) => response.ok ? response.json() : null)
                .then((data) => { if (/^[0-9a-f]{40}$/i.test(data?.hash)) setCommit(data.hash); })
                .catch(() => {});
        }, { rootMargin: "160px" });
        observer.observe(target);
        return () => {
            observer.disconnect();
            controller.abort();
        };
    }, []);

    return (
        <a
            ref={link}
            className="footer-source"
            href={commit ? `https://github.com/vin-dKR/portfolio/commit/${commit}` : "https://github.com/vin-dKR/portfolio"}
            target="_blank"
            rel="noreferrer"
            aria-label={commit ? `Source code at commit ${commit.slice(0, 7)}` : "Portfolio source code"}
        >
            <Github aria-hidden="true" size={13} />
            Source <code aria-hidden={!commit}>{commit ? `#${commit.slice(0, 7)}` : "\u00a0"}</code>
            <ArrowUpRight aria-hidden="true" size={12} />
        </a>
    );
}
