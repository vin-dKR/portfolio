"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SwitchTheme from '../reusable/SwitchTheme';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import MobileDropDown from '../reusable/navbar/MobileDropDown';
import { DesktopNav } from '../reusable/navbar/DesktopNav';
import Link from 'next/link';

const Navbar = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { scrollY } = useScroll();
    const width = useTransform(scrollY, [0, 100], ['44rem', '40rem']);
    const opacity = useTransform(scrollY, [0, 100], [0.5, 0.8]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

    useEffect(() => {
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        setMounted(true);
        window.addEventListener('scroll', updateScroll);

        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    if (!mounted) return <div className='size-14' />;

    const expandedHeight = isOpen ? (4 * 40 + 80) : (isScrolled ? 60 : 80);

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-[99]">
            <motion.nav
                style={{
                    width,
                    height: expandedHeight,
                    scale,
                    transformOrigin: "top center"
                }}
                animate={{
                    height: expandedHeight
                }}
                className={`transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-black/30' : 'backdrop-blur-sm bg-black/20'
                    } rounded-b-2xl w-1/3 flex flex-col overflow-hidden`}
            >
                <motion.div
                    style={{ opacity }}
                    className="h-16 flex items-center justify-between px-8 z-[101]"
                >
                    <Link href={"/"}>
                        <Image
                            src={resolvedTheme === "light" ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
                            alt="logo image"
                            width={70}
                            height={40}
                            className='z-[200]!'
                        />
                    </Link>
                    <DesktopNav />
                    <div className='flex items-center justify-center space-x-4'>
                        <SwitchTheme />
                        <MobileDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </motion.div>
            </motion.nav>
        </div>
    );
};

export default Navbar
