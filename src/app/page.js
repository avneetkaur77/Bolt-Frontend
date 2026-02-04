import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="z-10 flex flex-col items-center text-center max-w-md w-full space-y-12">
        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 transform rotate-6 mb-8">
            <span className="text-white font-bold text-4xl">B</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Bolt
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            The future of decentralized finance. <br />Fast, secure, and borderless.
          </p>
        </div>

        <div className="w-full">
          <Link href="/wallet-connect">
            <Button className="w-full py-4 text-lg shadow-xl shadow-indigo-500/20">
              Connect MetaMask
            </Button>
          </Link>
          <p className="mt-6 text-xs text-slate-600">
            By connecting, you agree to our Terms of Service.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-indigo-400 mb-3 text-2xl">⚡</div>
            <div className="text-sm font-medium text-slate-200">Instant</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-emerald-400 mb-3 text-2xl">🛡</div>
            <div className="text-sm font-medium text-slate-200">Secure</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-blue-400 mb-3 text-2xl">🌐</div>
            <div className="text-sm font-medium text-slate-200">Global</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="text-amber-400 mb-3 text-2xl">💳</div>
            <div className="text-sm font-medium text-slate-200">Low Fees</div>
          </div>
        </div>
      </div>
    </main>
  );
}
