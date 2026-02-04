import Link from "next/link";
import { Check, Home, Share2 } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function SuccessPage() {
    return (
        <ScreenContainer className="p-6 justify-center text-center">

            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 rounded-full"></div>
                <div className="relative w-32 h-32 mx-auto bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-in zoom-in duration-500">
                    <Check className="w-16 h-16 text-white" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2 animate-in fade-in slide-in-from-bottom-4 delay-200 fill-mode-forwards opacity-0">
                Transaction Successful
            </h1>
            <p className="text-slate-400 mb-8 animate-in fade-in slide-in-from-bottom-4 delay-300 fill-mode-forwards opacity-0">
                Your payment has been processed securely.
            </p>

            <Card className="mb-8 text-left animate-in fade-in slide-in-from-bottom-4 delay-500 fill-mode-forwards opacity-0">
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Status</span>
                        <span className="text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Completed</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Amount Sent</span>
                        <span className="text-white text-sm font-bold">0.45 ETH</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400 text-sm">Date</span>
                        <span className="text-white text-sm">Feb 24, 2026</span>
                    </div>
                </div>
            </Card>

            <div className="space-y-3 w-full animate-in fade-in slide-in-from-bottom-4 delay-700 fill-mode-forwards opacity-0">
                <Button href="/dashboard" fullWidth size="lg" icon={Home}>
                    Back to Dashboard
                </Button>
                <Button href="#" variant="ghost" fullWidth size="sm" icon={Share2}>
                    Share Receipt
                </Button>
            </div>

        </ScreenContainer>
    );
}
