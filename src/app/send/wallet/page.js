"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { ethers } from "ethers";

import Link from "next/link";

import {
    ArrowLeft,
    Wallet,
    AlertCircle,
} from "lucide-react";

import Button from "@/components/Button";

import Card from "@/components/Card";

import ScreenContainer from "@/components/ScreenContainer";

export default function SendWalletPage() {

    const router = useRouter();

    const [receiver, setReceiver] = useState("");

    const [amount, setAmount] = useState("");

    const [walletAddress, setWalletAddress] = useState("");

    const [balance, setBalance] = useState("0.0000");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        const loadWallet = async () => {

            try {

                const savedWallet =
                    localStorage.getItem("connectedWallet");

                if (!savedWallet || !window.ethereum) return;

                setWalletAddress(savedWallet);

                const provider =
                    new ethers.BrowserProvider(window.ethereum);

                const balanceWei =
                    await provider.getBalance(savedWallet);

                const balanceEth =
                    ethers.formatEther(balanceWei);

                setBalance(
                    parseFloat(balanceEth).toFixed(4)
                );

            } catch (err) {

                console.log(err);
            }
        };

        loadWallet();

    }, []);

    const handleSend = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            if (!receiver || !amount) {
                throw new Error("Fill all fields");
            }

            if (!window.ethereum) {
                throw new Error("MetaMask not found");
            }

            const accounts =
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

            const from = accounts[0];

            let txHash;

            try {

                // THIS OPENS REAL METAMASK TRANSACTION
                txHash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from,
                            to: receiver,
                            value: (
                                Number(amount) * 1e18
                            ).toString(16),
                        },
                    ],
                });

                localStorage.setItem(
                    "walletMode",
                    "real"
                );

            } catch (metaMaskError) {

                console.log(
                    "MetaMask failed, switching demo:",
                    metaMaskError
                );

                // FALLBACK DEMO FLOW
                txHash = "DEMO_" + Date.now();

                localStorage.setItem(
                    "walletMode",
                    "demo"
                );
            }

            localStorage.setItem("txHash", txHash);

            localStorage.setItem(
                "txMode",
                txHash.startsWith("DEMO_")
                    ? "demo"
                    : "real"
            );

            router.push("/transaction/status");

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    return (

        <ScreenContainer className="p-6">

            <div className="mb-6">

                <Link
                    href="/send"
                    className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>

                <h1 className="text-2xl font-bold text-white">
                    Send to Wallet
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    Transfer crypto securely using MetaMask
                </p>

            </div>

            <Card className="space-y-5">

                <div>

                    <label className="text-sm text-slate-400 block mb-2">
                        Receiver Address
                    </label>

                    <input
                        type="text"
                        value={receiver}
                        onChange={(e) =>
                            setReceiver(e.target.value)
                        }
                        placeholder="0x..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
                    />

                </div>

                <div>

                    <label className="text-sm text-slate-400 block mb-2">
                        Amount (ETH)
                    </label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        placeholder="0.0"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
                    />

                </div>

                <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">

                    <p className="text-sm text-slate-400">
                        Connected Wallet
                    </p>

                    <p className="text-sm text-violet-400 break-all">
                        {walletAddress}
                    </p>

                    <p className="text-sm text-slate-400 mt-2">
                        Available Balance
                    </p>

                    <p className="text-lg font-bold text-emerald-400">
                        {balance} ETH
                    </p>

                </div>

                {error && (

                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">

                        <AlertCircle className="w-4 h-4 text-red-400" />

                        <p className="text-red-400 text-sm">
                            {error}
                        </p>

                    </div>

                )}

                <Button
                    onClick={handleSend}
                    isLoading={loading}
                    fullWidth
                    size="lg"
                    icon={Wallet}
                >
                    Send with MetaMask
                </Button>

            </Card>

        </ScreenContainer>
    );
}