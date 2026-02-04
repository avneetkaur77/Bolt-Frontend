import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                "bg-slate-800/40 border border-white/5 rounded-2xl p-5 backdrop-blur-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
