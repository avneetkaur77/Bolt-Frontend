'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/StepProgress';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function WalletConnect() {
    const router = useRouter();
    const [status, setStatus] = useState('idle'); // idle, connecting, connected
    const [wallet, setWallet] = useState(null);

    const connectWallet = () => {
        setStatus('connecting');
        // Simulate delay
        setTimeout(() => {
            setStatus('connected');
            setWallet('0x71C...9A23');
        }, 1500);
    };

    const handleContinue = () => {
        router.push('/kyc');
    };

    return (
        <div className="min-h-screen pb-20 bg-slate-950">
            <Navbar />
            <main className="pt-10 px-6 max-w-md mx-auto">
                <StepProgress currentStep={1} />

                <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
                <p className="text-slate-400 mb-8 text-sm">Select a provider to connect your wallet.</p>

                <Card className="flex flex-col items-center space-y-6">
                    <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-orange-500/20 blur-xl" />
                        <div className="w-12 h-12 bg-orange-500 rounded-xl transform rotate-12 shadow-lg shadow-orange-500/30" />
                    </div>

                    <div className="text-center">
                        <h2 className="text-lg font-bold mb-2">MetaMask</h2>
                        <p className="text-slate-400 text-sm">
                            The most popular wallet for Ethereum and other EVM chains.
                        </p>
                    </div>

                    {status === 'idle' && (
                        <Button onClick={connectWallet} className="w-full bg-orange-600 hover:bg-orange-500 border-none shadow-orange-500/20">
                            Connect MetaMask
                        </Button>
                    )}

                    {status === 'connecting' && (
                        <Button disabled className="w-full bg-slate-800 text-slate-400 border-none">
                            Connecting...
                        </Button>
                    )}

                    {status === 'connected' && (
                        <div className="w-full space-y-4">
                            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-between">
                                <span className="text-sm text-slate-400">Address</span>
                                <span className="text-sm font-mono text-indigo-400">{wallet}</span>
                            </div>
                            <Button onClick={handleContinue} className="w-full" variant="primary">
                                Continue
                            </Button>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
