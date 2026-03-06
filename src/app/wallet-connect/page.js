"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
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
            if (window.ethereum) {
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

        if (window.ethereum) {

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

            if (!window.ethereum) {
                alert("MetaMask is not installed");
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

            // Send wallet address to backend
            await fetch("http://localhost:8080/wallet/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wallet_address: address
                })
            });

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

            <div className="text-center mb-8">

                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-violet-500/10">
                    <Wallet className="w-8 h-8 text-violet-400" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                    Connect Wallet
                </h1>

                <p className="text-slate-400">
                    Link your MetaMask wallet to continue.
                </p>

            </div>

            <Card className="mb-6 space-y-4">

                {!isConnected ? (

                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-white/5">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-lg">🦊</span>
                            </div>

                            <div className="text-left">
                                <p className="font-medium text-white">MetaMask</p>
                                <p className="text-xs text-slate-400">
                                    Ethereum Network
                                </p>
                            </div>

                        </div>

                        {isConnecting && (
                            <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                        )}

                    </div>

                ) : (

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center space-y-2 animate-in fade-in zoom-in duration-300">

                        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />

                        <p className="text-emerald-400 font-medium">
                            Wallet Connected
                        </p>

                        <p className="text-xs text-slate-400 font-mono bg-slate-900/50 py-1.5 px-3 rounded-lg mx-auto inline-block">
                            {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}
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