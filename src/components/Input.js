export default function Input({ label, type = "text", placeholder, value, onChange, className = "" }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && <label className="text-sm text-zinc-400 pl-1">{label}</label>}
            <input
                type={type}
                className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
