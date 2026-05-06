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
        primary: "bg-gradient-to-r from-[#4a5fc1] to-[#394f8a] hover:from-[#394f8a] hover:to-[#4a5fc1] text-white shadow-[0_0_20px_-5px_rgba(74,95,193,0.3)] border border-[#4a5fc1]/20",
        secondary: "bg-[#9cf6fb]/80 hover:bg-[#9cf6fb]/90 text-[#7a5c65] border border-[#9cf6fb]/50 shadow-sm backdrop-blur-sm",
        outline: "bg-transparent border border-[#4a5fc1]/30 text-[#7a5c65] hover:border-[#4a5fc1]/50 hover:bg-[#9cf6fb]/20 backdrop-blur-sm",
        ghost: "bg-transparent text-[#7a5c65]/70 hover:text-[#7a5c65] hover:bg-[#ead6cd]/50 transition-colors backdrop-blur-sm",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
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
