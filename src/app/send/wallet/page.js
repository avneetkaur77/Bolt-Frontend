"use client";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, DollarSign } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

export default function SendToWalletPage() {
    const router = useRouter();

    const [fromWallet, setFromWallet] = useState("");
    const [toWallet, setToWallet] = useState("");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("0");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load wallet safely
    useEffect(() => {
        const wallet = localStorage.getItem("connectedWallet");
        if (wallet) setFromWallet(wallet);
    }, []);

    // Fetch balance
    useEffect(() => {
        const fetchBalance = async () => {
            if (!fromWallet) return;

            try {
                const res = await fetch(
                    `http://localhost:5001/api/wallet/balance?address=${fromWallet}`
                );

                const data = await res.json();

                if (res.ok && data.balance) {
                    setBalance(data.balance);
                } else {
                    setBalance("0");
                }

            } catch (err) {
                setBalance("0");
            }
        };

        fetchBalance();
    }, [fromWallet]);

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            if (!toWallet || !amount) {
                throw new Error("Fill all fields");
            }
    
            if (!window.ethereum) {
                throw new Error("MetaMask not found");
            }
    
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
    
            const from = accounts[0];
    
            let txHash;
    
            try {
                // REAL TRANSACTION
                txHash = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from,
                            to: toWallet,
                            value: (Number(amount) * 1e18).toString(16),
                        },
                    ],
                });
    
            } catch (metaMaskError) {
                console.log("MetaMask failed, switching to demo mode:", metaMaskError.message);
    
                // 🔥 DEMO FALLBACK TX
                txHash = "DEMO_" + Date.now();
            }
    
            localStorage.setItem("txHash", txHash);
            localStorage.setItem("txMode", txHash.startsWith("DEMO_") ? "demo" : "real");
    
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
                <Link href="/send" className="text-slate-400">
                    <ArrowLeft className="inline w-4 h-4 mr-1" />
                    Back
                </Link>

                <h1 className="text-white text-2xl font-bold">
                    Send to Wallet
                </h1>
            </div>

            <form onSubmit={handleSend} className="flex flex-col space-y-6">

                <Input
                    label="Receiver Address"
                    placeholder="0x..."
                    value={toWallet}
                    onChange={(e) => setToWallet(e.target.value)}
                    icon={Wallet}
                    required
                />

                <Input
                    label="Amount (ETH)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    icon={DollarSign}
                    required
                />

                <div className="text-right text-xs text-slate-400">
                Available Balance: {balance ? `${Number(balance).toFixed(4)} ETH` : "0.0000 ETH"}
                </div>

                {error && <p className="text-red-400">{error}</p>}

                <Button type="submit" isLoading={loading} fullWidth>
                    Send
                </Button>

            </form>

        </ScreenContainer>
    );
}