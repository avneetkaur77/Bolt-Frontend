import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Input = ({
    label,
    error,
    icon: Icon,
    className,
    containerClassName,
    ...props
}) => {
    return (
        <div className={twMerge("w-full space-y-1.5", containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-slate-300 ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-400 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    className={twMerge(
                        "glass-input w-full rounded-xl py-3 px-4",
                        Icon && "pl-10",
                        error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-400 ml-1 animate-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
