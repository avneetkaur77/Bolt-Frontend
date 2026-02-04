"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function WalletConnectPage() {
    const router = useRouter();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        // Simulate connection delay
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
        }, 2000);
    };

    const handleContinue = () => {
        router.push("/kyc");
    };

    return (
        <ScreenContainer className="p-6 justify-center">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-violet-500/10">
                    <Wallet className="w-8 h-8 text-violet-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Connect Wallet</h1>
                <p className="text-slate-400">Link your MetaMask wallet to continue.</p>
            </div>

            <Card className="mb-6 space-y-4">
                {!isConnected ? (
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                {/* MetaMask Fox Icon Placeholder - using generic shape or emoji since can't load SVG assets easily right now */}
                                <span className="text-lg">🦊</span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-white">MetaMask</p>
                                <p className="text-xs text-slate-400">Ethereum Network</p>
                            </div>
                        </div>
                        {isConnecting && <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />}
                    </div>
                ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center space-y-2 animate-in fade-in zoom-in duration-300">
                        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                        <p className="text-emerald-400 font-medium">Wallet Connected</p>
                        <p className="text-xs text-slate-400 font-mono bg-slate-900/50 py-1.5 px-3 rounded-lg mx-auto inline-block">
                            0x71C...9A23
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
                >
                    {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
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
