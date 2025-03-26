import React from 'react';
import { NAV_ITEMS, myColors } from '@/constant/NavItems';
import NeonUnderline from '@/components/ui/NeonUnderline';
import Link from 'next/link';

export const DesktopNav = () => {

    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
                <NeonUnderline 
                    key={item.name}
                    colors={myColors}
                    width="100%"
                >
                    <Link 
                        href={item.href} 
                        className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        {item.name}
                    </Link>
                </NeonUnderline>
            ))}
        </div>
    );
};
