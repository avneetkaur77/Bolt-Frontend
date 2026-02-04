import Link from "next/link";
import { Send, History, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function DashboardPage() {
    const transactions = [
        { id: 1, type: "sent", amount: "0.45 ETH", fiat: "$1,250", date: "Today, 10:23 AM", status: "Completed" },
        { id: 2, type: "received", amount: "1.2 ETH", fiat: "$3,400", date: "Yesterday", status: "Completed" },
        { id: 3, type: "sent", amount: "0.1 ETH", fiat: "$280", date: "Feb 12", status: "Completed" },
    ];

    return (
        <ScreenContainer scrollable className="pb-20">
            {/* Header / Balance Card */}
            <div className="bg-gradient-to-b from-indigo-900/50 to-slate-900 p-6 rounded-b-[2rem] shadow-2xl mb-6 border-b border-white/5">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/10">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-mono text-slate-300">0x71C...9A23</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-slate-900 shadow-lg"></div>
                </div>

                <div className="text-center space-y-1">
                    <p className="text-slate-400 text-sm font-medium">Total Balance</p>
                    <h1 className="text-4xl font-bold text-white tracking-tight">$12,450.00</h1>
                    <p className="text-emerald-400 text-sm flex items-center justify-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +2.5% today
                    </p>
                </div>

                <div className="flex gap-4 mt-8">
                    <Button href="/send" fullWidth icon={Send}>
                        Send
                    </Button>
                    <Button href="#" variant="secondary" fullWidth icon={History}>
                        History
                    </Button>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="px-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                    <Link href="#" className="text-xs text-violet-400 hover:text-white">View All</Link>
                </div>

                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <Card key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'sent' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'
                                    }`}>
                                    {tx.type === 'sent' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-white">{tx.type === 'sent' ? 'Sent ETH' : 'Received ETH'}</p>
                                    <p className="text-xs text-slate-400">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium ${tx.type === 'sent' ? 'text-white' : 'text-emerald-400'}`}>
                                    {tx.type === 'sent' ? '-' : '+'}{tx.amount}
                                </p>
                                <p className="text-xs text-slate-500">{tx.fiat}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </ScreenContainer>
    );
}
