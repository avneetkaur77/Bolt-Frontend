import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 w-full z-50 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl">
            <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center transform rotate-3">
                        <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Bolt
                    </span>
                </Link>
                {/* Placeholder for status or user icon */}
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <span className="text-xs text-slate-400">U</span>
                </div>
            </div>
        </nav>
    );
}
