'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/components/StepProgress';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

export default function KYC() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const handleSubmit = () => {
        // Mock submission
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen pb-20 bg-slate-950">
            <Navbar />
            <main className="pt-10 px-6 max-w-md mx-auto">
                <StepProgress currentStep={2} />

                <h1 className="text-2xl font-bold mb-2">Identity Verification</h1>
                <p className="text-slate-400 mb-8 text-sm">Please verify your identity to continue.</p>

                <Card className="space-y-6">
                    {/* ID Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Government ID</label>
                        <div className="border-2 border-dashed border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500/50 hover:bg-slate-800/50 hover:text-indigo-400 transition-all cursor-pointer bg-slate-900/30 group">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">🆔</span>
                            </div>
                            <span className="text-xs font-medium">Click to upload Front of ID</span>
                        </div>
                    </div>

                    {/* Selfie Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Selfie</label>
                        <div className="border-2 border-dashed border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500/50 hover:bg-slate-800/50 hover:text-indigo-400 transition-all cursor-pointer bg-slate-900/30 group">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">📸</span>
                            </div>
                            <span className="text-xs font-medium">Click to take a Selfie</span>
                        </div>
                    </div>

                    <Button onClick={handleSubmit} className="w-full mt-4" variant="primary">
                        Verify Identity
                    </Button>

                    <p className="text-center text-xs text-slate-600">
                        Your data is encrypted and stored securely.
                    </p>
                </Card>
            </main>
        </div>
    );
}
