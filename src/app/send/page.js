import Link from "next/link";
import { Wallet, Building2, ArrowLeft, ChevronRight } from "lucide-react";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function SendOptionsPage() {
    return (
        <ScreenContainer className="p-6">
            <div className="mb-6">
                <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold text-white">Send Crypto</h1>
                <p className="text-slate-400 text-sm mt-1">Choose your transfer method.</p>
            </div>

            <div className="space-y-4">
                <Link href="/send/wallet">
                    <Card className="p-6 flex items-center justify-between group hover:bg-slate-800/60 hover:border-violet-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                                <Wallet className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Send to Wallet</h3>
                                <p className="text-sm text-slate-400">Transfer functionality to another crypto wallet</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </Card>
                </Link>

                <Link href="/send/bank">
                    <Card className="p-6 flex items-center justify-between group hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                <Building2 className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Send to Bank</h3>
                                <p className="text-sm text-slate-400">International wire transfer to bank account</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </Card>
                </Link>
            </div>
        </ScreenContainer>
    );
}
