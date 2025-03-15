import React from 'react';
import { NAV_ITEMS } from '@/constant/NavItems';

export const DesktopNav = () => {
    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
                <a 
                    key={item.name} 
                    href={item.href} 
                    className="text-gray-700 hover:text-stone-950 dark:text-gray-400 dark:hover:text-zinc-50 transition-colors"
                >
                    {item.name}
                </a>
            ))}
        </div>
    );
};
