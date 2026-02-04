'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

function StatusContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount');
    const destination = searchParams.get('destination');

    const [status, setStatus] = useState('pending'); // pending, confirmed, failed

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('confirmed');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // ... (imports remain)

    return (
        <Card className="flex flex-col items-center text-center space-y-6 py-10">

            {status === 'pending' && (
                <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            )}
            {status === 'confirmed' && (
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl animate-bounce shadow-lg shadow-emerald-500/30">
                    ✓
                </div>
            )}

            <div>
                <h2 className="text-xl font-bold mb-1 text-white">
                    {status === 'pending' ? 'Processing Transaction' : 'Transaction Confirmed'}
                </h2>
                <p className="text-slate-400 text-sm">
                    {status === 'pending'
                        ? 'Please wait while we secure your transfer.'
                        : `Successfully sent $${amount} to ${destination}.`}
                </p>
            </div>

            <div className="w-full bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status</span>
                    <span className={`capitalize font-medium ${status === 'confirmed' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                        {status}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Transaction Hash</span>
                    <span className="font-mono text-slate-300">0x8a...4b2d</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Network Fee</span>
                    <span className="text-slate-300">$0.00 (Mock)</span>
                </div>
            </div>

            <Button onClick={() => router.push('/dashboard')} className="w-full" variant="secondary">
                Return to Dashboard
            </Button>
        </Card>
    );
}

export default function TransactionStatus() {
    return (
        <div className="min-h-screen pb-20 bg-slate-950">
            <Navbar />
            <main className="pt-20 px-6 max-w-md mx-auto">
                <Suspense fallback={<div className="text-center text-slate-500">Loading...</div>}>
                    <StatusContent />
                </Suspense>
            </main>
        </div>
    );
}
