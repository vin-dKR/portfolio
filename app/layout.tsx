import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ReactNode } from "react";
import Navbar from "@/components/blocks/Navbar";

export const metadata: Metadata = {
    metadataBase: new URL("https://vinodkr.in"),
    title: "Vinod KR",
    description: "Full Stack Portfolio",
    openGraph: {
        title: "Vinod KR",
        description: "Full Stack Portfolio",
        images: [
            {
                url: "/images/vinod-kr.png",
                width: 1200,
                height: 630,
                alt: "Vinod KR Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Vinod KR",
        description: "Full Stack Portfolio",
        images: ["/images/vinod-kr.png"],
    },
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
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-28 w-4/5 max-w-2xl bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_70%)]"
                    />
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
