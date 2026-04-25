"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wallet, CheckCircle, ArrowRight, Loader2, Plus, ArrowLeft, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function WalletConnectPage() {
  const router = useRouter();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Check if wallet already connected when page loads
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection", error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  // Detect account change in MetaMask
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress("");
          setIsConnected(false);
        }
      });
    }
  }, []);

  const handleConnect = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        // Simulate connection for demo purposes
        setIsConnecting(true);
        setTimeout(() => {
          setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
          setIsConnected(true);
          setIsConnecting(false);
        }, 2000);
        return;
      }

      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);
      setIsConnected(true);
      setIsConnecting(false);
      console.log("Connected wallet:", address);
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      setIsConnecting(false);
    }
  };

  const handleContinue = () => {
    router.push("/kyc");
  };

  return (
    <ScreenContainer className="p-6 justify-center">

      {/* Back nav */}
      <div className="mb-4">
        <Link
          href="/login"
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-violet-500/10">
          <Wallet className="w-8 h-8 text-violet-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Set Up Your Wallet</h1>
        <p className="text-slate-400 text-sm">
          Create a new wallet or connect an existing one.
        </p>
      </div>

      {/* Option: Create New Wallet */}
      <Link href="/create-wallet" className="block mb-4">
        <div className="group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-900/30 to-indigo-900/20 p-5 hover:border-violet-500/60 hover:shadow-lg hover:shadow-violet-500/10 transition-all cursor-pointer">
          {/* Glow */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-violet-500/20 rounded-full blur-xl group-hover:opacity-100 opacity-60 transition-opacity" />
          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-white">Create New Wallet</h3>
                <span className="text-[10px] font-bold text-violet-300 bg-violet-500/20 border border-violet-500/30 px-1.5 py-0.5 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate a brand new wallet with a secure seed phrase
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0" />
          </div>

          <div className="mt-4 flex items-center gap-4">
            {["🔐 Non-custodial", "💎 12-word phrase", "⚡ Instant setup"].map((tag) => (
              <span key={tag} className="text-[10px] text-slate-400 font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </Link>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-slate-500 font-medium">OR</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Option: Connect MetaMask */}
      <Card className="mb-6 space-y-4">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Connect Existing Wallet</p>

        {!isConnected ? (
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">🦊</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-white">MetaMask</p>
                <p className="text-xs text-slate-400">Ethereum Network</p>
              </div>
            </div>
            {isConnecting && (
              <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
            )}
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center space-y-2 animate-in fade-in zoom-in duration-300">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-emerald-400 font-medium">Wallet Connected</p>
            <p className="text-xs text-slate-400 font-mono bg-slate-900/50 py-1.5 px-3 rounded-lg mx-auto inline-block">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        )}
      </Card>

      {!isConnected ? (
        <Button
          fullWidth
          size="lg"
          onClick={handleConnect}
          isLoading={isConnecting}
          variant="secondary"
        >
          {isConnecting ? "Connecting…" : "Connect MetaMask"}
        </Button>
      ) : (
        <Button
          fullWidth
          size="lg"
          onClick={handleContinue}
          icon={ArrowRight}
        >
          Continue
        </Button>
      )}
    </ScreenContainer>
  );
}