'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/StepProgress';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function SendBank() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        bankName: '',
        iban: '',
        swift: '',
        amount: ''
    });

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSend = () => {
        const params = new URLSearchParams({ type: 'bank', amount: formData.amount, destination: formData.bankName });
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
                        <h1 className="text-xl font-bold">Send to Bank</h1>
                        <p className="text-xs text-slate-400">International wire transfer</p>
                    </div>
                </div>

                <Card className="space-y-4">
                    <Input
                        label="Bank Name"
                        placeholder="e.g. Chase"
                        value={formData.bankName}
                        onChange={(e) => handleChange(e, 'bankName')}
                    />
                    <Input
                        label="IBAN / Account Number"
                        placeholder="Enter account details"
                        value={formData.iban}
                        onChange={(e) => handleChange(e, 'iban')}
                    />
                    <Input
                        label="SWIFT / BIC"
                        placeholder="Sort code or SWIFT"
                        value={formData.swift}
                        onChange={(e) => handleChange(e, 'swift')}
                    />
                    <Input
                        label="Amount (USD)"
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => handleChange(e, 'amount')}
                    />

                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                        <div className="flex justify-between text-sm text-indigo-300 font-medium">
                            <span>Conversion Rate</span>
                            <span>1 USD ≈ 0.92 EUR</span>
                        </div>
                        <div className="flex justify-between text-xs text-indigo-400/70 mt-1">
                            <span>Estimated Fee</span>
                            <span>$5.00</span>
                        </div>
                    </div>

                    <Button onClick={handleSend} className="w-full" disabled={!formData.amount || !formData.iban} variant="primary">
                        Convert & Send
                    </Button>
                </Card>
            </main>
        </div>
    );
}
