import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ReactNode } from "react";
import Navbar from "@/components/blocks/Navbar";

export const metadata: Metadata = {
    metadataBase: new URL("https://vinodkr.in"),
    title: "Vinod KR",
    description: "Full-stack developer building web products, from interfaces to backend systems. Explore my projects, experience, and engineering notes.",
    openGraph: {
        title: "Vinod KR",
        description: "Web products, engineering notes, and independent work by Vinod KR.",
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
        description: "Web products, engineering notes, and independent work by Vinod KR.",
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
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
