export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 rounded-3xl p-8 ${className}`}>
            {children}
        </div>
    );
}
