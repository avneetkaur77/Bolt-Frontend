export default function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    const baseStyles = "px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 border border-indigo-500/50",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600",
        outline: "bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
