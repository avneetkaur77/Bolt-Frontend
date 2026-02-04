import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function ReviewPage() {
    return (
        <ScreenContainer className="p-6">
            <div className="mb-6">
                <Link href="/send" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Cancel
                </Link>
                <h1 className="text-2xl font-bold text-white">Review Transaction</h1>
                <p className="text-slate-400 text-sm mt-1">Please double-check the details.</p>
            </div>

            <div className="space-y-4 flex-1">
                <Card className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-400 text-sm">Amount</span>
                        <span className="text-xl font-bold text-white">0.45 ETH</span>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Sender</span>
                            <span className="text-white text-sm font-mono bg-slate-800 px-2 py-0.5 rounded">0x71C...9A23</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Receiver</span>
                            <span className="text-white text-sm font-mono bg-slate-800 px-2 py-0.5 rounded">0x8AB...2F91</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Network Fee</span>
                            <span className="text-white text-sm">0.002 ETH</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400 text-sm">Total</span>
                            <span className="text-violet-400 text-sm font-bold">0.452 ETH</span>
                        </div>
                    </div>
                </Card>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <p className="text-xs text-yellow-200/80 leading-relaxed">
                        Transactions are irreversible. Please ensure the receiver address is correct.
                    </p>
                </div>

                <div className="flex-1"></div>

                <Button href="/transaction/status" fullWidth size="lg" icon={ShieldCheck}>
                    Confirm Transaction
                </Button>
            </div>
        </ScreenContainer>
    );
}
