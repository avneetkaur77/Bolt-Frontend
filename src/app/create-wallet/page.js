"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ScreenContainer from "@/components/ScreenContainer";

// Components
import StepGenerate from "./components/StepGenerate";
import StepBackup from "./components/StepBackup";
import StepVerify from "./components/StepVerify";
import StepSecure from "./components/StepSecure";
import StepDone from "./components/StepDone";

// Constants & Utils
import {
  STEPS,
  generateSeedPhrase,
  buildShuffledOptions,
  generateDummyAddress,
} from "./constants";

export default function CreateWalletPage() {
  const router = useRouter();
  
  // State
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

  // Initialize seed phrase
  useEffect(() => {
    const phrase = generateSeedPhrase();
    setSeedPhrase(phrase);
    setShuffledOptions(buildShuffledOptions(phrase));
  }, []);

  // Handlers
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
    setShuffledOptions(buildShuffledOptions(phrase));
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
      const dummyAddr = generateDummyAddress();
      setWalletAddress(dummyAddr);
      setIsCreating(false);
      setStep(4);
      localStorage.setItem("connectedWallet", dummyAddr);
    }, 2500);
  };

  const progressPercent = (step / (STEPS.length - 1)) * 100;

  return (
    <ScreenContainer className="p-6">
      {/* Header & Navigation */}
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

      {/* Step Content */}
      {step === 0 && (
        <StepGenerate
          seedPhrase={seedPhrase}
          revealed={revealed}
          setRevealed={setRevealed}
          handleRegenerate={handleRegenerate}
          handleCopy={handleCopy}
          copied={copied}
          onNext={() => setStep(1)}
        />
      )}

      {step === 1 && <StepBackup onNext={() => setStep(2)} />}

      {step === 2 && (
        <StepVerify
          selectedWords={selectedWords}
          setSelectedWords={setSelectedWords}
          shuffledOptions={shuffledOptions}
          verifyError={verifyError}
          handleVerify={handleVerify}
          toggleWord={toggleWord}
        />
      )}

      {step === 3 && (
        <StepSecure
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          showPass={showPass}
          setShowPass={setShowPass}
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          isCreating={isCreating}
          handlePasswordSubmit={handlePasswordSubmit}
        />
      )}

      {step === 4 && <StepDone walletAddress={walletAddress} />}
    </ScreenContainer>
  );
}
