import { Wallet, Copy, ArrowRight } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { WALLET_INFO_TILES } from "../constants";

export default function StepDone({ walletAddress }) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-violet-500 blur-[60px] opacity-30 rounded-full" />
        <div className="relative w-28 h-28 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/40">
          <Wallet className="w-14 h-14 text-white" />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Wallet Created!</h1>
        <p className="text-slate-400 text-sm">Your new Bolt-Dev wallet is ready to use.</p>
      </div>

      <Card className="w-full text-left space-y-3">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Your Wallet Address</p>
        <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex-shrink-0" />
          <p className="text-xs font-mono text-slate-300 break-all flex-1">
            {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
          </p>
          <button
            onClick={handleCopyAddress}
            className="text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {WALLET_INFO_TILES.map((item) => (
            <div key={item.label} className="bg-slate-900/50 rounded-lg p-2.5 border border-white/5">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="w-full space-y-3 pt-2">
        <Button fullWidth size="lg" href="/kyc" icon={ArrowRight}>
          Complete KYC Verification
        </Button>
        <Button fullWidth size="sm" variant="ghost" href="/dashboard">
          Skip for now → Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
