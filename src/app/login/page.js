"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email_id: email,
                    password: password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            // ✅ store token
            localStorage.setItem("token", data.token);

            // ✅ go to next step
            router.push("/wallet-connect");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer className="p-6">
            {/* Header */}
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Welcome Back
                </h1>
                <p className="text-slate-400 mt-1">Login to access your wallet.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col space-y-5 flex-1">
                
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                )}

                <div className="flex justify-end">
                    <Link href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <div className="flex-1"></div>

                <Button fullWidth size="lg" type="submit" isLoading={loading}>
                    Login
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium">
                    Sign Up
                </Link>
            </div>
        </ScreenContainer>
    );
}