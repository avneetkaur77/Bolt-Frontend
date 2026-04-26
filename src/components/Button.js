import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon: Icon,
    isLoading = false,
    href,
    className,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] border border-violet-400/20",
        secondary: "bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 shadow-lg",
        outline: "bg-transparent border border-white/10 text-white hover:border-violet-500/50 hover:bg-violet-500/5",
        ghost: "bg-transparent text-slate-400 hover:text-white transition-colors",
        danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-3 text-sm",
        lg: "px-6 py-4 text-base",
    };

    const classes = twMerge(
        clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && "w-full",
            className
        )
    );

    const content = (
        <>
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : Icon ? (
                <Icon className="w-4 h-4 mr-2" />
            ) : null}
            {children}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} disabled={isLoading} {...props}>
            {content}
        </button>
    );
};

export default Button;
