import { twMerge } from "tailwind-merge";

const ScreenContainer = ({ children, className, scrollable = true }) => {
    return (
        <div
            className={twMerge(
                "flex flex-col w-full h-full relative",
                scrollable ? "overflow-y-auto no-scrollbar" : "overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    );
};

export default ScreenContainer;
