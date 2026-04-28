"use client"

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { BlurFade } from "../ui/blur-fade";
import { RoughNotation } from "react-rough-notation";

const HomeBio = () => {

    const [mounted, setMounted] = useState(false)
    const [isHoveringBuilds, setIsHoveringBuilds] = useState(false)
    const [isHoveringTwitter, setIsHoveringTwitter] = useState(false)
    const [isHoveringFreelance, setIsHoveringFreelance] = useState(false)
    const [isHoveringPolar, setIsHoveringPolar] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const freelanceHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const polarHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleBuildsMouseEnter = () => {
        setIsHoveringBuilds(true)
    }

    const handleBuildsMouseLeave = () => {
        setIsHoveringBuilds(false)
    }

    const handleBuildsMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        })
    }

    const handleTwitterMouseEnter = () => {
        setIsHoveringTwitter(true)
    }

    const handleTwitterMouseLeave = () => {
        setIsHoveringTwitter(false)
    }

    const handleTwitterMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        })
    }

    const showFreelance = () => {
        if (freelanceHideTimer.current) clearTimeout(freelanceHideTimer.current)
        setIsHoveringFreelance(true)
    }
    const hideFreelance = () => {
        freelanceHideTimer.current = setTimeout(() => setIsHoveringFreelance(false), 150)
    }
    const handleFreelanceMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const showPolar = () => {
        if (polarHideTimer.current) clearTimeout(polarHideTimer.current)
        setIsHoveringPolar(true)
    }
    const hidePolar = () => {
        polarHideTimer.current = setTimeout(() => setIsHoveringPolar(false), 150)
    }
    const handlePolarMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const freelanceProjects = [
        { name: "Atari", href: "https://onlyfans.vinodkr.in/atari", comingSoon: false },
        { name: "Pagz", href: "https://onlyfans.vinodkr.in/pagz", comingSoon: false },
        { name: "Libly Space", href: "https://onlyfans.vinodkr.in/libly-space", comingSoon: false },
        { name: "Eduents", href: "https://onlyfans.vinodkr.in/eduents", comingSoon: false },
        { name: "Trio EV", href: "#", comingSoon: true },
    ]

    const polarPRs = [
        { title: "#7005", href: "https://github.com/polarsource/polar/pull/7005" },
        { title: "#8739", href: "https://github.com/polarsource/polar/pull/8739" },
    ]

    if (!mounted) return <div className="size-14" />

    return (
        <section className="mt-2 text-zinc-600 dark:text-zinc-400 font-lenia">
            <BlurFade delay={0.25} inView >
                <div className="space-y-5 text-left">
                    <p>
                        Hi, I thrive on building {' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="#06b6d4"
                            strokeWidth={1}
                            animationDuration={800}
                            animationDelay={1500}
                        >
                            clean,
                        </RoughNotation>{' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="#3b82f6"
                            strokeWidth={1}
                            animationDuration={800}
                            animationDelay={1500}
                        >
                            responsive,
                        </RoughNotation>{' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="#f59e0b"
                            strokeWidth={1}
                            animationDuration={800}
                            animationDelay={1500}
                        >
                            engaging,
                        </RoughNotation>{' '}
                        {' '} web applications with modern tools like Next.js and React.
                    </p>

                    <p>
                        I specialize in delivering seamless user experiences, with a focus on performance, scalability, and pixel-perfect design.
                    </p>

                    <p>
                        Beyond coding, I enjoy building things - whether it&apos;s scalable tech or brands. Previously, I helped lead the tech side of an apparel venture as a co-founder.
                    </p>

                    <p>
                        Since January 2026, I&apos;ve shipped{' '}
                        <span
                            className="underline decoration-wavy underline-offset-2 cursor-pointer"
                            onMouseEnter={showFreelance}
                            onMouseLeave={hideFreelance}
                            onMouseMove={handleFreelanceMouseMove}
                        >
                            5+ freelance projects
                        </span>{' '}
                        in the last{' '}
                        <span className="whitespace-nowrap">
                            <RoughNotation
                                type="underline"
                                show={true}
                                color="#ec4899"
                                strokeWidth={1}
                                animationDuration={800}
                                animationDelay={1500}
                            >
                                3&nbsp;months
                            </RoughNotation>.
                        </span>
                    </p>

                    <p>
                        I also contribute to open-source — including{' '}
                        <Link
                            href="https://github.com/polarsource/polar/pulls?q=is%3Apr+author%3Avin-dKR"
                            target="_blank"
                            className="underline decoration-wavy underline-offset-2 cursor-pointer"
                            onMouseEnter={showPolar}
                            onMouseLeave={hidePolar}
                            onMouseMove={handlePolarMouseMove}
                        >
                            2 PRs in polar.sh
                        </Link>.
                    </p>

                    <p>
                        I love tinkering with new technologies, optimizing code, and bringing creative ideas to life. You can check out some of my {' '}

                        <Link href="https://onlyfans.vinodkr.in" target="_blank" className="relative inline-block">
                            <span 
                                className="underline decoration-wavy underline-offset-2 cursor-pointer"
                                onMouseEnter={handleBuildsMouseEnter}
                                onMouseLeave={handleBuildsMouseLeave}
                                onMouseMove={handleBuildsMouseMove}
                            >
                                builds
                            </span>
                        </Link>{' '}

                        here. Lately, I&apos;m diving deeper into Opensource, backend systems, DevOps, and Web-3.
                    </p>

                    <div className="flex">
                        A glimpse of my{' '}{' '}
                        <Link href={'/work'} className="group ml-1 flex">{' '}
                            <RoughNotation
                                type="circle"
                                show={true}
                                color="skyblue"
                                strokeWidth={1}
                                animationDuration={800}
                                animationDelay={1500}
                                padding={4}
                            >
                                work & experiences.
                            </RoughNotation>{' '}

                            <div className="relative size-5 -translate-x-px translate-y-[-2px] overflow-hidden">
                                <ArrowUpRight className="size-4 transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:translate-x-full" />
                                <ArrowUpRight className="relative size-4 -translate-x-full transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:translate-x-0" />
                            </div>
                        </Link>
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <Separator className="w-14 bg-[#888]/40 dark:bg-gray" />
                    </div>

                    <p>
                        Catch me on Twitter at {' '}

                        <Link
                            target="_blank"
                            href={'https://x.com/always_VinodKr'}
                            className="underline decoration-wavy underline-offset-2 cursor-pointer"
                            onMouseEnter={handleTwitterMouseEnter}
                            onMouseLeave={handleTwitterMouseLeave}
                            onMouseMove={handleTwitterMouseMove}
                        >
                            x.com
                        </Link>{' '}

                        or feel free to connect via {' '}

                        <Link
                            target="_blank"
                            href={'mailto:vinodkumarmurmu62@gmail.com'}
                            className="underline decoration-wavy underline-offset-2"
                        >
                            email
                        </Link>
                    </p>
                </div>
            </BlurFade>
            {isHoveringBuilds && (
                <div 
                    className="fixed pointer-events-none z-50 transition-opacity duration-200"
                    style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 50}px`,
                        transform: 'translate(-50%, 0)'
                    }}
                >
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap relative">
                        <div className="flex items-center gap-2">
                            <Image 
                                src="/onlyfans.ico" 
                                alt="OnlyFans icon" 
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                            />
                            <span className="text-xs font-medium">my projects</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
                    </div>
                </div>
            )}
            {isHoveringTwitter && (
                <div
                    className="fixed pointer-events-none z-50 transition-opacity duration-200"
                    style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 50}px`,
                        transform: 'translate(-50%, 0)'
                    }}
                >
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap relative">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/socials/xcom.svg"
                                alt="X/Twitter icon"
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain dark:invert"
                            />
                            <span className="text-xs font-medium">Let&apos;s chat!</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
                    </div>
                </div>
            )}
            {isHoveringFreelance && (
                <div
                    className="fixed z-50 transition-opacity duration-200"
                    style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 12}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                    onMouseEnter={showFreelance}
                    onMouseLeave={hideFreelance}
                >
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap relative">
                        <div className="flex flex-col gap-1.5">
                            {freelanceProjects.map((p) => (
                                p.comingSoon ? (
                                    <span
                                        key={p.name}
                                        className="text-xs font-medium flex items-center gap-1 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                                    >
                                        {p.name} <span className="text-[10px] italic">(coming soon)</span>
                                    </span>
                                ) : (
                                    <Link
                                        key={p.name}
                                        href={p.href}
                                        target="_blank"
                                        className="text-xs font-medium hover:underline decoration-wavy underline-offset-2 flex items-center gap-1"
                                    >
                                        {p.name}
                                        <ArrowUpRight className="size-3" />
                                    </Link>
                                )
                            ))}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
                    </div>
                </div>
            )}
            {isHoveringPolar && (
                <div
                    className="fixed z-50 transition-opacity duration-200"
                    style={{
                        left: `${mousePosition.x}px`,
                        top: `${mousePosition.y - 12}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                    onMouseEnter={showPolar}
                    onMouseLeave={hidePolar}
                >
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 whitespace-nowrap relative">
                        <div className="flex flex-col gap-1.5">
                            {polarPRs.map((p) => (
                                <Link
                                    key={p.title}
                                    href={p.href}
                                    target="_blank"
                                    className="text-xs font-medium hover:underline decoration-wavy underline-offset-2 flex items-center gap-1"
                                >
                                    {p.title}
                                    <ArrowUpRight className="size-3" />
                                </Link>
                            ))}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default HomeBio;
