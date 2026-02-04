'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
    return (
        <div className="min-h-screen pb-20 bg-slate-950">
            <Navbar />
            <main className="pt-8 px-6 max-w-md mx-auto space-y-6">

                {/* Balance Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                    <Card className="relative bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-slate-400 text-sm font-medium mb-1">Total Balance</h2>
                                <div className="text-4xl font-bold text-white tracking-tight">
                                    $12,450.00
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                +2.4%
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <Link href="/send/wallet">
                                <Button variant="primary" className="w-full text-sm h-auto py-3 flex flex-col gap-2">
                                    <span className="text-xl">⚡</span>
                                    <span>Send Crypto</span>
                                </Button>
                            </Link>
                            <Link href="/send/bank">
                                <Button variant="secondary" className="w-full text-sm h-auto py-3 flex flex-col gap-2 bg-slate-800/80">
                                    <span className="text-xl">🏦</span>
                                    <span>Withdraw</span>
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions / Stats or Recent Transactions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between pl-1">
                        <h3 className="text-lg font-bold text-slate-200">Recent Activity</h3>
                        <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
                    </div>

                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50 hover:bg-slate-900/60 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                                        ${i === 1 ? 'bg-orange-500/10 text-orange-500' :
                                            i === 2 ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-emerald-500/10 text-emerald-500'}`}>
                                        {i === 1 ? '🏦' : i === 2 ? '📤' : '📥'}
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm text-slate-200">
                                            {i === 1 ? 'Bank Withdrawal' : i === 2 ? 'Sent to 0x33...' : 'Received Funds'}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Today, 10:23 AM
                                        </div>
                                    </div>
                                </div>
                                <div className={`font-medium ${i === 3 ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {i === 3 ? '+' : '-'}${(i * 150).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
