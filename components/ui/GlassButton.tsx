import React, { ButtonHTMLAttributes, useState, useRef, useEffect } from "react";

type GlowDirection = "left" | "right" | "top" | "bottom" | "circular";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    glowDirection?: GlowDirection;
    glowColor?: string;
    borderSpeed?: number;
    children: React.ReactNode;
}

const GlassButton: React.FC<GlassButtonProps> = ({
    glowDirection = "circular",
    glowColor = "rgba(255,255,255,0.8)",
    borderSpeed = 2,
    children,
    className = "",
    ...props
}) => {
    const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
            setHoverPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        const button = buttonRef.current;
        if (button) {
            button.addEventListener("mousemove", handleMouseMove);
            return () => {
                button.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, []);

    const getGradientDirection = () => {
        switch (glowDirection) {
            case "left":
                return "to left";
            case "right":
                return "to right";
            case "top":
                return "to top";
            case "bottom":
                return "to bottom";
            default:
                return "";
        }
    };

    return (
        <button
            ref={buttonRef}
            {...props}
            className={`
                relative
                px-4 py-2
                font-medium
                text-white
                bg-purple-900/30 dark:bg-white/10
                backdrop-blur-lg
                rounded-xl
                overflow-hidden
                transition-all duration-500
                hover:bg-white/20
                hover:shadow-[0_0_20px_5px_${glowColor.replace(/ /g, "_")}]
                border border-blur-md border-white/30 border-2
                group
                ${className}
            `}
            onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) => handleMouseMove(e as unknown as MouseEvent)}
        >
            <span className="relative z-10">{children}</span>

            {/* Animated border */}
            <span
                className={`
                    absolute
                    inset-0
                    rounded-xl
                    p-[2px]
                    bg-gradient-to-r
                    from-transparent
                    via-${glowColor.replace(/ /g, "_")}
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    ${glowDirection === "circular" ? "animate-[borderSpin_4s_linear_infinite]" : ""}
                `}
                style={{
                    backgroundImage: glowDirection !== "circular"
                        ? `linear-gradient(${getGradientDirection()}, transparent, ${glowColor}, transparent)`
                        : undefined,
                    animationDuration: `${borderSpeed}s`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                }}
            />

            {/* Background glow */}
            <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at ${hoverPosition.x}px ${hoverPosition.y}px, ${glowColor} 0%, transparent 70%)`,
                }}
            />
        </button>
    );
};

export default GlassButton;
