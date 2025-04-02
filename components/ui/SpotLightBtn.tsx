import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface SpotlightButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href: string;
}

const SpotlightButton: React.FC<SpotlightButtonProps> = ({ children, className, onClick, href }) => {
    const { theme } = useTheme();
    const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (event: MouseEvent) => {
        const button = buttonRef.current;
        if (button) {
            const rect = button.getBoundingClientRect();
            setSpotlightPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (button) {
            button.addEventListener('mousemove', handleMouseMove);
            return () => {
                button.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    return (
        <Link href={href} target='_blank'>
            <button
                ref={buttonRef}
                className={`relative overflow-hidden rounded-full px-4 py-2 font-medium text-black dark:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 hover:bg-opacity-80 ${className}`}
                onClick={onClick}
                onMouseMove={(e) => handleMouseMove(e as unknown as MouseEvent)}
            >
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-40 hover:opacity-100 dark:from-transparent dark:via-white dark:to-transparent dark:opacity-20 transition-opacity duration-300 ease-in-out dark:hover:opacity-40 "
                    style={{
                        background: `radial-gradient(circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(75, 75, 75, 0.5)'
                            }, transparent)`,
                    }}
                />
                <div className="relative z-10">{children}</div>
            </button>
        </Link>
    );
};

export default SpotlightButton;
