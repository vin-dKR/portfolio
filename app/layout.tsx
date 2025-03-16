import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { GithubProvider } from "@/context/GithubContext";
import { WakatimeProvider } from "@/context/WakatimeContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Vinod KR",
    description: "Full Stack Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    disableTransitionOnChange
                >            
                    <GithubProvider>
                        <WakatimeProvider>
                            {children}
                        </WakatimeProvider>
                    </GithubProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
