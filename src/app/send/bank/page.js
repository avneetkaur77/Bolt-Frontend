import Link from "next/link";
import { ArrowLeft, Building2, Hash, Globe, DollarSign, RefreshCw } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

export default function SendToBankPage() {
    return (
        <ScreenContainer className="p-6">
            <div className="mb-6">
                <Link href="/send" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                    Send to Bank
                </h1>
            </div>

            <form className="flex flex-col flex-1 space-y-5" action="/transaction/review">

                <Input
                    label="Bank Name"
                    placeholder="e.g. Chase Bank"
                    icon={Building2}
                    required
                />

                <Input
                    label="Account Number"
                    placeholder="0000 0000 0000"
                    icon={Hash}
                    required
                />

                <Input
                    label="IFSC / SWIFT Code"
                    placeholder="CHASUS33"
                    icon={Globe}
                    required
                />

                <div className="pt-2 pb-2">
                    <Input
                        label="Amount (USD)"
                        type="number"
                        placeholder="0.00"
                        icon={DollarSign}
                        required
                    />

                    <div className="mt-3 p-3 bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-between text-sm">
                        <span className="text-slate-400">Conversion Rate</span>
                        <span className="text-white font-mono flex items-center gap-1">
                            <RefreshCw className="w-3 h-3 text-emerald-400" />
                            1 ETH ≈ $2,850.45
                        </span>
                    </div>
                </div>

                <div className="flex-1"></div>

                <Button fullWidth size="lg" type="submit">
                    Continue
                </Button>
            </form>
        </ScreenContainer>
    );
}
