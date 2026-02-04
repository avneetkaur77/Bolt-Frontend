'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/StepProgress';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function SendWallet() {
    const router = useRouter();
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSend = () => {
        // Navigate to status
        const params = new URLSearchParams({ type: 'wallet', amount, destination: address });
        router.push(`/transaction-status?${params.toString()}`);
    };

    return (
        <div className="min-h-screen pb-20 bg-slate-950">
            <Navbar />
            <main className="pt-8 px-6 max-w-md mx-auto">
                <StepProgress currentStep={3} />

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors"
                    >
                        ←
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">Send to Wallet</h1>
                        <p className="text-xs text-slate-400">Transfer funds to another crypto wallet</p>
                    </div>
                </div>

                <Card className="space-y-6">
                    <Input
                        label="Wallet Address"
                        placeholder="0x..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <div>
                        <Input
                            label="Amount (USD)"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-slate-500">Fee: $0.00</span>
                            <span className="text-xs text-indigo-400 cursor-pointer">Max: $12,450.00</span>
                        </div>
                    </div>

                    <Button onClick={handleSend} className="w-full" disabled={!address || !amount} variant="primary">
                        Send Funds
                    </Button>
                </Card>
            </main>
        </div>
    );
}
