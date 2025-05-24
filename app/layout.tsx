import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { GithubProvider } from "@/context/GithubContext";
import { WakatimeProvider } from "@/context/WakatimeContext";
import { SpotifyProvider } from "@/context/SpotifyContext";
import { ReactNode } from "react";
import Navbar from "@/components/blocks/Navbar";

export const metadata: Metadata = {
    title: "Vinod KR",
    description: "Full Stack Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased font-lenia w-full">
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange
                >
                    <GithubProvider>
                        <WakatimeProvider>
                            <SpotifyProvider>
                                <div className="pointer-events-none absolute inset-0 h-24 w-full before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-4/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:opacity-20 before:[filter:blur(calc(4*1rem))]" />
                                <Navbar />
                                {children}
                            </SpotifyProvider>
                        </WakatimeProvider>
                    </GithubProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
