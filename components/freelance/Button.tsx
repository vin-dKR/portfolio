import Star from '../svgs/Star';
import React from 'react';

interface ButtonProps {
    maxWidth?: string;
    label: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    maxWidth = '220px',
    label,
    disabled = false,
    onClick,
}) => {
    return (
        <div
            className={`relative group p-[1px] rounded-2xl mx-4 md:mx-10 lg:mx-0 text-xl font-lenia ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
            style={{ maxWidth, height: '48px' }}
        >
            <div className='absolute top-[10px] -left-1 bg-gradient-to-br from-white to-purple-500 filter blur-lg w-[90%] h-[100%] dark:h-[60%] z-0' />
            {/* Background layer */}
            <div className="absolute inset-[1px] bg-gradient-to-br from-white to-purple-950 rounded-[20px] overflow-hidden z-0">
                <div className="absolute inset-[2px] bg-gradient-to-tr from-white to-purple-500 filter blur-xs rounded-[7px] z-0" />
            </div>

            {/* Button content */}
            <button
                className="relative z-20 w-full h-full flex items-center justify-center text-gray-800 text-shadow font-medium rounded-[6px] px-3 transition-colors duration-200 cursor-pointer"
                onClick={onClick}
                disabled={disabled}
            >
                {label}

                <div className='relative ml-4 group-hover:animate-spin-star'>
                    <Star />
                </div>
            </button>
        </div>
    );
};

export default Button;

