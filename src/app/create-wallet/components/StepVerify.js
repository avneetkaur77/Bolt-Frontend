import { ArrowRight } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function StepVerify({
  selectedWords,
  setSelectedWords,
  shuffledOptions,
  verifyError,
  handleVerify,
  toggleWord,
}) {
  return (
    <div className="flex flex-col flex-1 space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">Verify Your Phrase</h2>
        <p className="text-slate-400 text-sm">
          Select the <strong className="text-violet-400">first 4 words</strong> of your seed phrase in order.
        </p>
      </div>

      <Card className="min-h-[60px]">
        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {selectedWords.length === 0 ? (
            <p className="text-slate-500 text-xs my-auto">Your selected words appear here…</p>
          ) : (
            selectedWords.map((word, i) => (
              <button
                key={i}
                onClick={() => setSelectedWords(selectedWords.filter((w) => w !== word))}
                className="px-3 py-1 bg-violet-600/30 border border-violet-500/40 rounded-lg text-xs text-violet-300 font-mono hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300 transition-all"
              >
                {word} ×
              </button>
            ))
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {shuffledOptions.map((word) => (
          <button
            key={word}
            onClick={() => toggleWord(word)}
            className={`px-2 py-2.5 rounded-xl text-xs font-mono font-medium border transition-all ${
              selectedWords.includes(word)
                ? "bg-violet-600/30 border-violet-500/50 text-violet-300"
                : "bg-slate-800/50 border-white/5 text-slate-300 hover:border-violet-500/30 hover:text-white"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {verifyError && (
        <p className="text-xs text-red-400 text-center animate-in fade-in">{verifyError}</p>
      )}

      <div className="flex-1" />
      <Button fullWidth size="lg" onClick={handleVerify} icon={ArrowRight}>
        Verify Phrase
      </Button>
    </div>
  );
}
