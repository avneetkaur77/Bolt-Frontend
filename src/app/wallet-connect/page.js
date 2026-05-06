"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Wallet,
    CheckCircle,
    ArrowRight,
    Loader2,
    ArrowLeft
} from "lucide-react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function WalletConnectPage() {
    const router = useRouter();

    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [error, setError] = useState("");

    const handleConnect = async () => {
        try {
            setIsConnecting(true);
            setError("");

            if (!window.ethereum) {
                throw new Error("MetaMask not installed");
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const address = accounts[0];

            setWalletAddress(address);
            setIsConnected(true);

            // ✅ SAVE IN LOCAL STORAGE (VERY IMPORTANT)
            localStorage.setItem("connectedWallet", address);

            // Send to backend
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5001/api/wallet/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    wallet_address: address,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to save wallet");
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleContinue = () => {
        router.push("/send/wallet");
    };

    return (
        <ScreenContainer className="p-6 justify-center">

            <div className="mb-4">
                <Link href="/login" className="text-slate-400 hover:text-white">
                    <ArrowLeft className="inline w-4 h-4 mr-1" />
                    Back
                </Link>
            </div>

            <div className="text-center mb-8">
                <Wallet className="w-10 h-10 mx-auto text-violet-400 mb-3" />
                <h1 className="text-2xl font-bold text-white">
                    Connect Wallet
                </h1>
                <p className="text-slate-700 text-sm">
                    Connect MetaMask to continue
                </p>
            </div>

            <Card className="mb-6">
                {!isConnected ? (
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-lg">🦊</span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-violet-400">MetaMask</p>
                                <p className="text-xs text-slate-400">Ethereum Network</p>
                            </div>
                        </div>
                        {isConnecting && <Loader2 className="animate-spin" />}
                    </div>
                ) : (
                    <div className="text-center">
                        <CheckCircle className="text-green-400 mx-auto mb-2" />
                        <p className="text-green-400">Connected</p>
                        <p className="text-xs text-slate-400">
                            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        </p>
                    </div>
                )}
            </Card>

            {error && (
                <p className="text-red-400 text-sm mb-2">{error}</p>
            )}

            {!isConnected ? (
                <Button onClick={handleConnect} isLoading={isConnecting} fullWidth>
                    Connect MetaMask
                </Button>
            ) : (
                <Button onClick={handleContinue} fullWidth icon={ArrowRight}>
                    Continue
                </Button>
            )}

        </ScreenContainer>
    );
}