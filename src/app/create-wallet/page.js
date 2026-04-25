"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  ShieldCheck,
  Lock,
  RefreshCw,
  AlertTriangle,
  Wallet,
  Sparkles,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

// Dummy seed phrase words pool
const WORD_POOL = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "absurd", "abuse", "access", "accident", "account", "accuse", "achieve", "acid",
  "acoustic", "acquire", "across", "action", "actor", "actual", "adapt", "admit",
  "advance", "advice", "aerobic", "afford", "afraid", "again", "agent", "agree",
  "ahead", "aim", "airport", "aisle", "alarm", "album", "alcohol", "alert",
  "alien", "alley", "allow", "almost", "alone", "alpha", "already", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor",
];

function generateSeedPhrase() {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 12);
}

const STEPS = ["Generate", "Backup", "Verify", "Secure", "Done"];

export default function CreateWalletPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [seedPhrase, setSeedPhrase] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [verifyError, setVerifyError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const phrase = generateSeedPhrase();
    setSeedPhrase(phrase);
    // Shuffle options for verification (use 6 of the real words + 6 extras)
    const extras = WORD_POOL.filter((w) => !phrase.includes(w)).slice(0, 6);
    setShuffledOptions([...phrase.slice(0, 6), ...extras].sort(() => Math.random() - 0.5));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(seedPhrase.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    const phrase = generateSeedPhrase();
    setSeedPhrase(phrase);
    setRevealed(false);
    setCopied(false);
    const extras = WORD_POOL.filter((w) => !phrase.includes(w)).slice(0, 6);
    setShuffledOptions([...phrase.slice(0, 6), ...extras].sort(() => Math.random() - 0.5));
  };

  const toggleWord = (word) => {
    setVerifyError("");
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleVerify = () => {
    // Verify that the user selected exactly 4 words from the real phrase
    const correctWords = seedPhrase.slice(0, 4);
    const allCorrect = correctWords.every((w) => selectedWords.includes(w));
    if (selectedWords.length < 4) {
      setVerifyError("Please select 4 words from your seed phrase.");
      return;
    }
    if (!allCorrect) {
      setVerifyError("Incorrect selection. Please choose the first 4 words of your phrase.");
      return;
    }
    setStep(3);
  };

  const handlePasswordSubmit = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setIsCreating(true);
    // Simulate wallet creation
    setTimeout(() => {
      const dummyAddr = "0x" + Array.from({ length: 40 }, () =>
        "0123456789abcdef"[Math.floor(Math.random() * 16)]
      ).join("");
      setWalletAddress(dummyAddr);
      setIsCreating(false);
      setStep(4);
    }, 2500);
  };

  const progressPercent = (step / (STEPS.length - 1)) * 100;

  return (
    <ScreenContainer className="p-6">
      {/* Header */}
      <div className="mb-6">
        {step < 4 && (
          <button
            onClick={() => (step === 0 ? router.back() : setStep(step - 1))}
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {step === 0 ? "Back" : "Previous"}
          </button>
        )}

        {step < 4 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-white">Create New Wallet</h1>
              <span className="text-xs text-slate-400 font-medium">
                Step {step + 1} of {STEPS.length - 1}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              {STEPS.slice(0, -1).map((s, i) => (
                <span
                  key={s}
                  className={`text-[10px] font-medium ${i <= step ? "text-violet-400" : "text-slate-600"}`}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Step 0: Generate Seed Phrase ── */}
      {step === 0 && (
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
                  <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /><span>Copy to clipboard</span></>
                )}
              </button>
            )}
          </Card>

          <div className="flex-1" />

          <Button
            fullWidth
            size="lg"
            disabled={!revealed}
            onClick={() => setStep(1)}
            icon={ArrowRight}
          >
            I&apos;ve Saved My Phrase
          </Button>
        </div>
      )}

      {/* ── Step 1: Backup Warning ── */}
      {step === 1 && (
        <div className="flex flex-col flex-1 space-y-4">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-indigo-500/30">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Backup Your Phrase</h2>
            <p className="text-slate-400 text-sm">Before proceeding, confirm you understand the risks.</p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "🔒", title: "Never share with anyone", desc: "Anyone with your phrase can steal all your funds permanently." },
              { icon: "📝", title: "Write it on paper", desc: "Store it in multiple secure physical locations offline." },
              { icon: "🚫", title: "Never store digitally", desc: "Screenshots, cloud storage, or email are all unsafe." },
              { icon: "✅", title: "You're responsible", desc: "ChainPay cannot recover your wallet if you lose this phrase." },
            ].map((item) => (
              <Card key={item.title} className="p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex-1" />
          <Button fullWidth size="lg" onClick={() => setStep(2)} icon={ArrowRight}>
            I Understand, Continue
          </Button>
        </div>
      )}

      {/* ── Step 2: Verify Seed Phrase ── */}
      {step === 2 && (
        <div className="flex flex-col flex-1 space-y-5">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-1">Verify Your Phrase</h2>
            <p className="text-slate-400 text-sm">
              Select the <strong className="text-violet-400">first 4 words</strong> of your seed phrase in order.
            </p>
          </div>

          {/* Selected words display */}
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

          {/* Word options */}
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
      )}

      {/* ── Step 3: Set Password ── */}
      {step === 3 && (
        <div className="flex flex-col flex-1 space-y-5">
          <div className="text-center">
            <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-violet-500/30">
              <Lock className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Secure Your Wallet</h2>
            <p className="text-slate-400 text-sm">Create a strong password to protect access to your wallet.</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                label="New Password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                icon={Lock}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const strength =
                      password.length >= 8 &&
                      /[A-Z]/.test(password) &&
                      /[0-9]/.test(password) &&
                      /[^A-Za-z0-9]/.test(password)
                        ? 4
                        : password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
                        ? 3
                        : password.length >= 8
                        ? 2
                        : 1;
                    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
                    return (
                      <div
                        key={level}
                        className={`flex-1 h-1 rounded-full transition-all ${level <= strength ? colors[strength - 1] : "bg-slate-700"}`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400">
                  {password.length < 8 ? "Too short" :
                    !(/[A-Z]/.test(password) && /[0-9]/.test(password)) ? "Add uppercase & numbers for better security" :
                    !(/[^A-Za-z0-9]/.test(password)) ? "Add a symbol for strong password" : "Strong password ✓"}
                </p>
              </div>
            )}

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                icon={Lock}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(""); }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-white transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {passwordError && (
            <p className="text-xs text-red-400 ml-1 animate-in fade-in">{passwordError}</p>
          )}

          <div className="flex-1" />

          <Button
            fullWidth
            size="lg"
            onClick={handlePasswordSubmit}
            isLoading={isCreating}
            icon={isCreating ? undefined : Sparkles}
          >
            {isCreating ? "Creating Your Wallet…" : "Create Wallet"}
          </Button>
        </div>
      )}

      {/* ── Step 4: Success ── */}
      {step === 4 && (
        <div className="flex flex-col flex-1 items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-[60px] opacity-30 rounded-full" />
            <div className="relative w-28 h-28 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/40">
              <Wallet className="w-14 h-14 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Wallet Created!</h1>
            <p className="text-slate-400 text-sm">Your new ChainPay wallet is ready to use.</p>
          </div>

          <Card className="w-full text-left space-y-3">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Your Wallet Address</p>
            <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3 border border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex-shrink-0" />
              <p className="text-xs font-mono text-slate-300 break-all flex-1">
                {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
              </p>
              <button
                onClick={() => { navigator.clipboard.writeText(walletAddress); }}
                className="text-slate-400 hover:text-white transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Balance", value: "0.00 ETH" },
                { label: "Network", value: "Ethereum" },
                { label: "Status", value: "✓ Active" },
                { label: "Type", value: "HD Wallet" },
              ].map((item) => (
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
      )}
    </ScreenContainer>
  );
}
