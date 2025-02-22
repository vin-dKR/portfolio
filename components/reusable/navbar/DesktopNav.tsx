import React from 'react';
import { NAV_ITEMS } from '@/constant/NavItems';

export const DesktopNav = () => {
    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
                <a 
                    key={item.name} 
                    href={item.href} 
                    className="hover:text-gray-300 transition-colors"
                >
                    {item.name}
                </a>
            ))}
        </div>
    );
};
