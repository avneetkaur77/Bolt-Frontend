import { Eye, EyeOff, RefreshCw, CheckCircle, Copy, AlertTriangle, ArrowRight } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function StepGenerate({
  seedPhrase,
  revealed,
  setRevealed,
  handleRegenerate,
  handleCopy,
  copied,
  onNext,
}) {
  return (
    <div className="flex flex-col flex-1 space-y-5">
      <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="text-xs text-amber-200/80 leading-relaxed">
          Your <strong className="text-amber-300">Secret Recovery Phrase</strong> is the master key to your wallet.
          Never share it. Write it down and store it safely offline.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Your 12-Word Phrase</p>
          <div className="flex gap-2">
            <button
              onClick={handleRegenerate}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRevealed(!revealed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 relative">
          {seedPhrase.map((word, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-slate-900/60 border border-white/5 rounded-lg px-2 py-2"
            >
              <span className="text-slate-500 text-xs w-4 text-right shrink-0">{i + 1}.</span>
              <span className={`text-white text-xs font-mono transition-all ${!revealed ? "blur-sm select-none" : ""}`}>
                {word}
              </span>
            </div>
          ))}
          {!revealed && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer rounded-xl"
              onClick={() => setRevealed(true)}
            >
              <Eye className="w-6 h-6 text-violet-400 mb-1" />
              <span className="text-xs text-violet-300 font-medium">Tap to reveal</span>
            </div>
          )}
        </div>

        {revealed && (
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-900/50 border border-white/5 text-xs text-slate-400 hover:text-white hover:border-violet-500/30 transition-all"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to clipboard</span>
              </>
            )}
          </button>
        )}
      </Card>

      <div className="flex-1" />

      <Button
        fullWidth
        size="lg"
        disabled={!revealed}
        onClick={onNext}
        icon={ArrowRight}
      >
        I&apos;ve Saved My Phrase
      </Button>
    </div>
  );
}
