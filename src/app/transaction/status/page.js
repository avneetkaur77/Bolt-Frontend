"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Circle, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function StatusPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [txHash, setTxHash] = useState("");
    const [txMode, setTxMode] = useState("real"); // real | demo

    // 🔥 LOAD TX DATA
    useEffect(() => {
        const hash = localStorage.getItem("txHash");
        const mode = localStorage.getItem("txMode");

        if (hash) setTxHash(hash);
        if (mode) setTxMode(mode);
    }, []);

    // 🔥 TIMELINE SIMULATION (works for both demo + real)
    useEffect(() => {
        const timer1 = setTimeout(() => setStep(2), 2000);
        const timer2 = setTimeout(() => setStep(3), 5000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleContinue = () => {
        router.push("/transaction/success");
    };

    const steps = [
        { id: 1, label: "Initiated", completed: step >= 1 },
        { id: 2, label: "Processing", completed: step >= 2 },
        { id: 3, label: "Confirmed", completed: step >= 3 },
    ];

    return (
        <ScreenContainer className="p-6 justify-center">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Tracking Transaction
                </h1>

                <p className="text-slate-400 text-sm">
                    {txMode === "demo"
                        ? "Demo transaction (simulation mode)"
                        : "Processing blockchain transaction on Sepolia"}
                </p>
            </div>

            {/* CARD */}
            <Card className="mb-8 overflow-hidden relative">

                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <div className="space-y-6 py-4">
                    {steps.map((s, index) => (
                        <div key={s.id} className="flex items-center gap-4 relative">

                            {index !== steps.length - 1 && (
                                <div className={`absolute left-[15px] top-8 w-0.5 h-8 ${step > s.id ? 'bg-emerald-500/50' : 'bg-slate-700'}`} />
                            )}

                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                                    s.completed
                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                        : step === s.id
                                        ? "border-violet-500 text-violet-400 bg-violet-500/10"
                                        : "border-slate-700 text-slate-700 bg-slate-800"
                                }`}
                            >
                                {s.completed ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : step === s.id ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Circle className="w-5 h-5" />
                                )}
                            </div>

                            <div>
                                <p className={`font-medium ${
                                    s.completed
                                        ? "text-white"
                                        : step === s.id
                                        ? "text-violet-400"
                                        : "text-slate-500"
                                }`}>
                                    {s.label}
                                </p>

                                {step === s.id && (
                                    <p className="text-xs text-slate-400 animate-pulse">
                                        In progress...
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* TX INFO */}
                <div className="mt-6 pt-4 border-t border-white/5">

                    <p className="text-xs text-slate-500 mb-1">
                        Transaction Hash
                    </p>

                    <p className="text-xs font-mono text-slate-300 bg-slate-900/50 p-2 rounded border border-white/5 break-all">
                        {txHash
                            ? txHash
                            : "Waiting for transaction..."}
                    </p>

                    <p className="text-xs mt-2 text-slate-500">
                        Mode:{" "}
                        <span className={txMode === "demo" ? "text-yellow-400" : "text-emerald-400"}>
                            {txMode}
                        </span>
                    </p>
                </div>
            </Card>

            {/* BUTTON */}
            {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    <Button fullWidth size="lg" onClick={handleContinue} icon={ArrowRight}>
                        View Receipt
                    </Button>
                </div>
            )}
        </ScreenContainer>
    );
}