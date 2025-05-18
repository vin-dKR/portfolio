type ServiceButtonProps = {
    service?: Service;
    onClick: () => void;
    isSelected?: boolean;
    isSubmit?: boolean;
    children?: React.ReactNode;
};

const ServiceButton: React.FC<ServiceButtonProps> = ({
    service,
    onClick,
    isSelected = false,
    isSubmit = false,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            className={`relative group transition-all ${isSubmit
                ? "w-full text-white font-medium py-2 px-4 cursor-pointer"
                : `h-12 px-1 ${isSelected ? "text-white" : "text-gray-200"}`
                }`}
        >
            {(isSelected || isSubmit) && (
                <>
                    <div className="absolute top-[2px] -left-0 bg-gradient-to-br from-white to-purple-950 dark:to-purple-500 filter blur-lg w-[100%] dark:w-[90%] h-[100%] dark:h-[70%] z-0" />
                    <div className="absolute inset-[1px] bg-gradient-to-br from-white to-purple-950 rounded-[20px] overflow-hidden z-0">
                        <div className="absolute inset-[6px] bg-gradient-to-tr from-white to-purple-500 filter blur-xs rounded-[20px] z-0" />
                    </div>
                </>
            )}

            <div
                className={`relative z-20 ${isSubmit
                    ? "w-full h-full flex items-center justify-center"
                    : `w-full h-[90%] flex items-center justify-center rounded-[20px] px-3 transition-colors duration-200 ${isSelected
                        ? "bg-gradient-to-bl from-purple-500/40 to-white/30"
                        : "bg-gradient-to-bl dark:from-black/10 dark:to-white/30 from-black/80 to-black/30 border border-2 border-white/30"
                    }`
                    }`}
            >
                {children || (service ? service.title : "Get This Service")}

                {!isSubmit && isSelected && (
                    <div className="relative group-hover:animate-spin-star">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                )}
            </div>
        </button>
    );
};

export default ServiceButton

