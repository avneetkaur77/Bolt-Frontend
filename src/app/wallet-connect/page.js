"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Wallet,
    CheckCircle,
    ArrowRight,
    Loader2,
    ArrowLeft,
    PlusCircle,
    ShieldCheck
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

    // =========================
    // CONNECT EXISTING METAMASK
    // =========================

    const handleConnect = async () => {

        try {

            setIsConnecting(true);

            setError("");

            localStorage.removeItem("walletMode");
            localStorage.removeItem("connectedWallet");

            if (!window.ethereum) {
                throw new Error("MetaMask not installed");
            }

            // FORCE METAMASK POPUP
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [{ eth_accounts: {} }],
            });

            // OPEN ACCOUNT SELECTOR
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const address = accounts[0];

            setWalletAddress(address);

            // CHECK BALANCE
            const balanceHex = await window.ethereum.request({
                method: "eth_getBalance",
                params: [address, "latest"],
            });

            const wei = parseInt(balanceHex, 16);

            const ethBalance = wei / Math.pow(10, 18);

            console.log("ETH Balance:", ethBalance);

            // REAL MODE
            if (ethBalance > 0) {

                localStorage.setItem("walletMode", "real");

                localStorage.setItem(
                    "connectedWallet",
                    address
                );

            } else {

                localStorage.setItem("walletMode", "demo");

                setError(
                    "0 ETH detected. Demo fallback mode enabled."
                );
            }

            setIsConnected(true);

            // SAVE WALLET TO BACKEND
            const token = localStorage.getItem("token");

            await fetch(
                "http://localhost:5001/api/wallet/connect",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        wallet_address: address,
                    }),
                }
            );

        } catch (err) {

            console.log(err);

            if (err.code === 4001) {

                setError(
                    "MetaMask connection cancelled."
                );

            } else {

                setError(err.message);
            }

        } finally {

            setIsConnecting(false);
        }
    };

    // =========================
    // CONTINUE
    // =========================

    const handleContinue = () => {

        router.push("/dashboard");
    };

    // =========================
    // UI
    // =========================

    return (

        <ScreenContainer className="p-6 justify-center">

            {/* Back */}
            <div className="mb-4">

                <Link
                    href="/login"
                    className="text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="inline w-4 h-4 mr-1" />
                    Back
                </Link>

            </div>

            {/* Header */}
            <div className="text-center mb-8">

                <Wallet className="w-10 h-10 mx-auto text-violet-400 mb-3" />

                <h1 className="text-3xl font-bold text-white">
                    Setup Your Wallet
                </h1>

                <p className="text-slate-400 text-sm mt-2">
                    Create a new wallet or connect an existing one.
                </p>

            </div>

            {/* CREATE NEW WALLET */}
            <Card className="mb-4 p-5 border border-violet-500/20 hover:border-violet-500/40 transition-all">

                <div className="flex items-center gap-4">

                    <div className="w-14 h-14 bg-violet-500/20 rounded-2xl flex items-center justify-center">
                        <PlusCircle className="w-7 h-7 text-violet-400" />
                    </div>

                    <div className="flex-1">

                        <h2 className="text-white font-semibold text-lg">
                            Create New Wallet
                        </h2>

                        <p className="text-sm text-slate-400 mt-1">
                            Generate a secure Bolt wallet with recovery phrase.
                        </p>

                    </div>

                </div>

                <div className="mt-5">

                    <Button
                        fullWidth
                        size="lg"
                        onClick={() => router.push("/create-wallet")}
                    >
                        Create Wallet
                    </Button>

                </div>

            </Card>

            {/* OR */}
            <div className="flex items-center gap-3 my-5">

                <div className="h-px bg-slate-700 flex-1"></div>

                <span className="text-slate-500 text-sm">
                    OR
                </span>

                <div className="h-px bg-slate-700 flex-1"></div>

            </div>

            {/* CONNECT EXISTING */}
            <Card className="mb-6 p-5">

                {!isConnected ? (

                    <>

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">🦊</span>
                            </div>

                            <div className="flex-1">

                                <h2 className="text-white font-semibold text-lg">
                                    Connect Existing Wallet
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Connect MetaMask or another Ethereum wallet.
                                </p>

                            </div>

                            {isConnecting && (
                                <Loader2 className="animate-spin text-violet-400" />
                            )}

                        </div>

                        <div className="mt-5">

                            <Button
                                onClick={handleConnect}
                                isLoading={isConnecting}
                                fullWidth
                                size="lg"
                            >
                                Connect MetaMask
                            </Button>

                        </div>

                    </>

                ) : (

                    <div className="text-center py-2">

                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-emerald-400 w-8 h-8" />
                        </div>

                        <h2 className="text-xl font-bold text-white">
                            Wallet Connected
                        </h2>

                        <p className="text-slate-400 text-sm mt-2">
                            Your wallet has been connected successfully.
                        </p>

                        <div className="mt-5 bg-slate-900 rounded-xl p-4 border border-slate-700">

                            <p className="text-xs text-slate-500 mb-1">
                                Wallet Address
                            </p>

                            <p className="text-sm text-violet-400 break-all">
                                {walletAddress}
                            </p>

                            <div className="mt-3 flex items-center justify-center gap-2">

                                <ShieldCheck className="w-4 h-4 text-emerald-400" />

                                <span className="text-xs text-emerald-400">
                                    Secure Connection Active
                                </span>

                            </div>

                        </div>

                        <div className="mt-6">

                            <Button
                                onClick={handleContinue}
                                fullWidth
                                size="lg"
                                icon={ArrowRight}
                            >
                                Go To Dashboard
                            </Button>

                        </div>

                    </div>

                )}

            </Card>

            {/* ERROR */}
            {error && (

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">

                    <p className="text-red-400 text-sm text-center">
                        {error}
                    </p>

                </div>

            )}

        </ScreenContainer>
    );
}