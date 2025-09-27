"use client"

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import { BlurFade } from "../ui/blur-fade";
import { RoughNotation } from "react-rough-notation";

const HomeBio = () => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])


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
                            color="red"
                            strokeWidth={1}
                            animationDuration={800}
                            animationDelay={1500}
                        >
                            clean,
                        </RoughNotation>{' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="green"
                            strokeWidth={1}
                            animationDuration={800}
                            animationDelay={1500}
                        >
                            responsive,
                        </RoughNotation>{' '}
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="purple"
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
                        I love tinkering with new technologies, optimizing code, and bringing creative ideas to life. You can check out some of my {' '}

                        <Link href="https://onlyfans-vinodkr.vercel.app/" target="_blank">
                            <span className="underline decoration-wavy underline-offset-2">builds</span>
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
                            className="underline decoration-wavy underline-offset-2"
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
        </section>
    )
}

export default HomeBio;
