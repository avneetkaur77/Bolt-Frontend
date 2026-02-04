"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, Shield, Camera, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

export default function KYCPage() {
    const router = useRouter();
    const [idUploaded, setIdUploaded] = useState(false);
    const [selfieUploaded, setSelfieUploaded] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleUploadId = () => {
        // Simulate file selection
        setTimeout(() => setIdUploaded(true), 800);
    };

    const handleUploadSelfie = () => {
        // Simulate file selection
        setTimeout(() => setSelfieUploaded(true), 800);
    };

    const handleSubmit = () => {
        if (!idUploaded || !selfieUploaded) return;

        setIsVerifying(true);
        // Simulate verification process
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
        }, 2500);
    };

    const handleContinue = () => {
        router.push("/dashboard");
    };

    return (
        <ScreenContainer className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">Identify Verification</h1>
                <p className="text-slate-400 text-sm">We need to verify your identity to ensure secure transactions.</p>
            </div>

            {!isVerified ? (
                <div className="space-y-4 flex-1">
                    {/* Government ID Upload */}
                    <Card className="p-4 space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/20 rounded-lg">
                                <Shield className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white">Government ID</p>
                                <p className="text-xs text-slate-400">Passport or Driver's License</p>
                            </div>
                        </div>

                        <div
                            onClick={!idUploaded ? handleUploadId : undefined}
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${idUploaded
                                    ? "border-emerald-500/30 bg-emerald-500/5"
                                    : "border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600"
                                }`}
                        >
                            {idUploaded ? (
                                <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                    <span className="text-sm text-emerald-400 font-medium">Uploaded Successfully</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <Upload className="w-6 h-6" />
                                    <span className="text-xs">Tap to upload document</span>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Selfie Upload */}
                    <Card className="p-4 space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                <Camera className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                                <p className="font-medium text-white">Selfie Photo</p>
                                <p className="text-xs text-slate-400">Clear face photo</p>
                            </div>
                        </div>

                        <div
                            onClick={!selfieUploaded ? handleUploadSelfie : undefined}
                            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${selfieUploaded
                                    ? "border-emerald-500/30 bg-emerald-500/5"
                                    : "border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600"
                                }`}
                        >
                            {selfieUploaded ? (
                                <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                    <span className="text-sm text-emerald-400 font-medium">Captured Successfully</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <Camera className="w-6 h-6" />
                                    <span className="text-xs">Tap to take a selfie</span>
                                </div>
                            )}
                        </div>
                    </Card>

                    <div className="flex-1"></div>

                    <Button
                        fullWidth
                        size="lg"
                        onClick={handleSubmit}
                        disabled={!idUploaded || !selfieUploaded || isVerifying}
                        isLoading={isVerifying}
                    >
                        {isVerifying ? "Verifying..." : "Verify Identity"}
                    </Button>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Verification Complete</h2>
                        <p className="text-slate-400 mt-2">Your identity has been verified successfully.</p>
                    </div>

                    <div className="w-full pt-8">
                        <Button fullWidth size="lg" onClick={handleContinue} icon={ArrowRight}>
                            Continue via Dashboard
                        </Button>
                    </div>
                </div>
            )}
        </ScreenContainer>
    );
}
