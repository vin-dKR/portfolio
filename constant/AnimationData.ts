export const menuIconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
};

export const dropdownVariants = {
    hidden: { 
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    },
    visible: { 
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};

export const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    })
}
