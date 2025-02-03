"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu } from 'lucide-react';
import SwitchTheme from './reusable/SwitchTheme';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Navbar = () => {
    const { resolvedTheme } = useTheme();
    console.log(resolvedTheme)

    const [mounted, setMounted] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const width = useTransform(scrollY, [0, 100], ['48rem', '40rem']);
    const height = useTransform(scrollY, [0, 100], [80, 60]);
    const opacity = useTransform(scrollY, [0, 100], [0.5, 0.8]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

    useEffect(() => {
        const updateScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };

        setMounted(true)
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    if (!mounted) return <div className='size-14' />

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <motion.nav
            style={{ width, height, scale }}
            className={`transition-all duration-300 ${
              isScrolled ? 'backdrop-blur-md bg-black/30' : 'backdrop-blur-sm bg-black/20'
            } rounded-b-2xl`}
            >
                <motion.div 
                  style={{ opacity }}
                  className="h-full flex items-center justify-between px-8"
                >
                    <Image 
                        src={ resolvedTheme === "light" ? "/images/logo-dark.svg" : "/images/logo-light.svg" }
                        alt="logo image"
                        width={70}
                        height={40}
                    />
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
                        <a href="#work" className="hover:text-gray-300 transition-colors">Work</a>
                        <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
                        <SwitchTheme />
                    </div>
                    <button className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                </motion.div>
            </motion.nav>
        </div>
    );
};

export default Navbar
