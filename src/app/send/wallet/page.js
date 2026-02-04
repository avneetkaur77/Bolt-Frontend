import Link from "next/link";
import { ArrowLeft, Wallet, DollarSign } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

export default function SendToWalletPage() {
    return (
        <ScreenContainer className="p-6">
            <div className="mb-6">
                <Link href="/send" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                    Send to Wallet
                </h1>
            </div>

            <form className="flex flex-col flex-1 space-y-6" action="/transaction/review">
                <div className="space-y-4">
                    <Input
                        label="Receiver Address"
                        placeholder="0x..."
                        icon={Wallet}
                        required
                    />
                    <Input
                        label="Amount (ETH)"
                        type="number"
                        step="0.0001"
                        placeholder="0.00"
                        icon={DollarSign}
                        required
                    />
                    <div className="text-right text-xs text-slate-400">
                        Available Balance: 4.54 ETH
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
