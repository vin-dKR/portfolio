const Star = () => {
    return (
        <div
            className={`
                    absolute top-[-8px] left-[-8px] w-4 h-4 z-10
                    group-hover:animate-spin-star
                    before:absolute before:w-4 before:h-1 before:bg-gray-800 before:rounded before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                    after:absolute after:w-1 after:h-4 after:bg-gray-800 after:rounded after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
                `}
        >
            <div
                className="
                        absolute w-4 h-1 bg-gray-800 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rotate-45
                    "
            />
            <div
                className="
                        absolute w-1 h-4 bg-gray-800 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rotate-45
                    "
            />
        </div>
    )
}

export default Star
