"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
} from "lucide-react";

import ScreenContainer from "@/components/ScreenContainer";
import Button from "@/components/Button";
import Card from "@/components/Card";

// ==========================
// CONSTANTS
// ==========================

const STEPS = [
  "Generate",
  "Backup",
  "Verify",
  "Secure",
  "Done",
];

const WORDS = [
  "apple",
  "banana",
  "wallet",
  "secure",
  "blockchain",
  "crypto",
  "future",
  "network",
  "token",
  "mining",
  "ledger",
  "random",
  "galaxy",
  "rocket",
  "orange",
  "planet",
  "system",
  "matrix",
  "shadow",
  "diamond",
  "eth",
  "bolt",
  "vault",
  "privacy",
  "guardian",
  "finance",
  "ninja",
  "quantum",
  "pixel",
  "phoenix",
];

function generateSeedPhrase() {

  const shuffled = [...WORDS].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 12);
}

function shuffleArray(arr) {

  return [...arr].sort(() => Math.random() - 0.5);
}

function generateDummyAddress() {

  const chars = "abcdef0123456789";

  let result = "0x";

  for (let i = 0; i < 40; i++) {

    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

export default function CreateWalletPage() {

  const router = useRouter();

  // ==========================
  // STATE
  // ==========================

  const [step, setStep] = useState(0);

  const [seedPhrase, setSeedPhrase] = useState([]);

  const [revealed, setRevealed] = useState(false);

  const [copied, setCopied] = useState(false);

  const [selectedWords, setSelectedWords] = useState([]);

  const [shuffledOptions, setShuffledOptions] = useState([]);

  const [verifyError, setVerifyError] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");

  // ==========================
  // INIT
  // ==========================

  useEffect(() => {

    const phrase = generateSeedPhrase();

    setSeedPhrase(phrase);

    setShuffledOptions(shuffleArray(phrase));

  }, []);

  // ==========================
  // COPY
  // ==========================

  const handleCopy = async () => {

    await navigator.clipboard.writeText(
      seedPhrase.join(" ")
    );

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================
  // REGENERATE
  // ==========================

  const handleRegenerate = () => {

    const phrase = generateSeedPhrase();

    setSeedPhrase(phrase);

    setShuffledOptions(shuffleArray(phrase));

    setRevealed(false);

    setCopied(false);
  };

  // ==========================
  // VERIFY WORD SELECTION
  // ==========================

  const toggleWord = (word) => {

    setVerifyError("");

    if (selectedWords.includes(word)) {

      setSelectedWords(
        selectedWords.filter((w) => w !== word)
      );

    } else {

      if (selectedWords.length < 4) {

        setSelectedWords([
          ...selectedWords,
          word,
        ]);
      }
    }
  };

  // ==========================
  // VERIFY STEP
  // ==========================

  const handleVerify = () => {

    const correctWords = seedPhrase.slice(0, 4);

    const valid = correctWords.every((word) =>
      selectedWords.includes(word)
    );

    if (selectedWords.length < 4) {

      setVerifyError(
        "Please select 4 words."
      );

      return;
    }

    if (!valid) {

      setVerifyError(
        "Incorrect words selected."
      );

      return;
    }

    setStep(3);
  };

  // ==========================
  // PASSWORD SUBMIT
  // ==========================

  const handlePasswordSubmit = () => {

    if (password.length < 8) {

      setPasswordError(
        "Password must be at least 8 characters."
      );

      return;
    }

    if (password !== confirmPassword) {

      setPasswordError(
        "Passwords do not match."
      );

      return;
    }

    setPasswordError("");

    setIsCreating(true);

    setTimeout(() => {

      const address = generateDummyAddress();

      setWalletAddress(address);

      localStorage.setItem(
        "connectedWallet",
        address
      );

      localStorage.setItem(
        "walletMode",
        "bolt-generated"
      );

      setIsCreating(false);

      setStep(4);

    }, 2500);
  };

  // ==========================
  // UI
  // ==========================

  const progressPercent =
    (step / (STEPS.length - 1)) * 100;

  return (

    <ScreenContainer className="p-6">

      {/* HEADER */}

      {step < 4 && (

        <div className="mb-6">

          <button
            onClick={() =>
              step === 0
                ? router.back()
                : setStep(step - 1)
            }
            className="inline-flex items-center text-slate-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {step === 0 ? "Back" : "Previous"}
          </button>

          <div className="flex justify-between items-center mb-2">

            <h1 className="text-xl font-bold text-white">
              Create New Wallet
            </h1>

            <span className="text-xs text-slate-400">
              Step {step + 1} of 4
            </span>

          </div>

          {/* PROGRESS */}

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
              }}
            />

          </div>

        </div>

      )}

      {/* ==========================
          STEP 1 - GENERATE
      ========================== */}

      {step === 0 && (

        <div className="space-y-5">

          <Card className="p-5">

            <h2 className="text-white text-lg font-bold mb-2">
              Your Secret Recovery Phrase
            </h2>

            <p className="text-slate-400 text-sm mb-5">
              Write down these 12 words and store them safely.
            </p>

            {!revealed ? (

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center">

                <p className="text-slate-400 mb-4">
                  Tap below to reveal your phrase
                </p>

                <Button
                  fullWidth
                  onClick={() => setRevealed(true)}
                >
                  Reveal Phrase
                </Button>

              </div>

            ) : (

              <>

                <div className="grid grid-cols-2 gap-3">

                  {seedPhrase.map((word, index) => (

                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm"
                    >
                      <span className="text-violet-400 mr-2">
                        {index + 1}.
                      </span>

                      {word}
                    </div>

                  ))}

                </div>

                <div className="space-y-3 mt-5">

                  <Button
                    fullWidth
                    onClick={handleCopy}
                  >
                    {copied
                      ? "Copied!"
                      : "Copy Phrase"}
                  </Button>

                  <Button
                    fullWidth
                    variant="ghost"
                    onClick={handleRegenerate}
                  >
                    Generate New Phrase
                  </Button>

                </div>

              </>

            )}

          </Card>

          <Button
            fullWidth
            size="lg"
            disabled={!revealed}
            onClick={() => setStep(1)}
          >
            I Have Saved My Phrase
          </Button>

        </div>

      )}

      {/* ==========================
          STEP 2 - BACKUP
      ========================== */}

      {step === 1 && (

        <div className="space-y-5">

          <Card className="p-5">

            <h2 className="text-white text-xl font-bold mb-3">
              Backup Your Phrase
            </h2>

            <div className="space-y-3 text-sm text-slate-300">

              <p>
                • Never share your recovery phrase.
              </p>

              <p>
                • Anyone with this phrase can access your wallet.
              </p>

              <p>
                • Store it offline in a secure place.
              </p>

              <p>
                • Bolt cannot recover your phrase if lost.
              </p>

            </div>

          </Card>

          <Button
            fullWidth
            size="lg"
            onClick={() => setStep(2)}
          >
            I Understand & Continue
          </Button>

        </div>

      )}

      {/* ==========================
          STEP 3 - VERIFY
      ========================== */}

      {step === 2 && (

        <div className="space-y-5">

          <Card className="p-5">

            <h2 className="text-white text-xl font-bold mb-2">
              Verify Recovery Phrase
            </h2>

            <p className="text-slate-400 text-sm mb-5">
              Select the FIRST 4 words of your phrase.
            </p>

            {/* SELECTED */}

            <div className="flex flex-wrap gap-2 mb-5 min-h-[50px]">

              {selectedWords.map((word) => (

                <button
                  key={word}
                  onClick={() => toggleWord(word)}
                  className="bg-violet-500 text-white px-3 py-2 rounded-lg text-sm"
                >
                  {word}
                </button>

              ))}

            </div>

            {/* OPTIONS */}

            <div className="flex flex-wrap gap-2">

              {shuffledOptions.map((word) => (

                <button
                  key={word}
                  onClick={() => toggleWord(word)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    selectedWords.includes(word)
                      ? "bg-violet-500 border-violet-500 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-300"
                  }`}
                >
                  {word}
                </button>

              ))}

            </div>

            {verifyError && (

              <p className="text-red-400 text-sm mt-4">
                {verifyError}
              </p>

            )}

          </Card>

          <Button
            fullWidth
            size="lg"
            onClick={handleVerify}
          >
            Verify Phrase
          </Button>

        </div>

      )}

      {/* ==========================
          STEP 4 - SECURE
      ========================== */}

      {step === 3 && (

        <div className="space-y-5">

          <Card className="p-5">

            <h2 className="text-white text-xl font-bold mb-2">
              Secure Your Wallet
            </h2>

            <p className="text-slate-400 text-sm mb-5">
              Create a password to protect wallet access.
            </p>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
              />

              {passwordError && (

                <p className="text-red-400 text-sm">
                  {passwordError}
                </p>

              )}

            </div>

          </Card>

          <Button
            fullWidth
            size="lg"
            onClick={handlePasswordSubmit}
            isLoading={isCreating}
          >
            {isCreating
              ? "Creating Wallet..."
              : "Create Wallet"}
          </Button>

        </div>

      )}

      {/* ==========================
          STEP 5 - DONE
      ========================== */}

      {step === 4 && (

        <div className="flex flex-col justify-center items-center text-center flex-1">

          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">

            <div className="text-5xl">
              ✅
            </div>

          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Wallet Created
          </h1>

          <p className="text-slate-400 mb-6">
            Your Bolt wallet is now active and secure.
          </p>

          <Card className="w-full p-5 mb-6 text-left">

            <div className="space-y-3">

              <div className="flex justify-between">

                <span className="text-slate-400 text-sm">
                  Wallet Address
                </span>

              </div>

              <p className="text-violet-400 text-sm break-all">
                {walletAddress}
              </p>

              <div className="flex justify-between">

                <span className="text-slate-400 text-sm">
                  Network
                </span>

                <span className="text-white text-sm">
                  Ethereum
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400 text-sm">
                  Wallet Type
                </span>

                <span className="text-white text-sm">
                  Bolt Generated
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400 text-sm">
                  Balance
                </span>

                <span className="text-emerald-400 text-sm">
                  0.000 ETH
                </span>

              </div>

            </div>

          </Card>

          <Button
            fullWidth
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            Go To Dashboard
          </Button>

        </div>

      )}

    </ScreenContainer>
  );
}