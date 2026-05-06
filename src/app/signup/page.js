"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5001/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email_id: email,
                    password: password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }

            router.push("/login");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer className="p-6">
            <form onSubmit={handleSignup} className="flex flex-col space-y-5">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-[#7a5c65]/70 hover:text-[#7a5c65] transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back
                    </Link>
                    <h1 className="text-2xl font-bold text-[#7a5c65]">
                        Create Account
                    </h1>
                    <p className="text-[#7a5c65]/80 mt-1">
                        Start your crypto journey today.
                    </p>
                </div>
                <Input label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} icon={User} required />
                <Input label="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} icon={User} required />
                <Input label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail} required />
                <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} icon={Lock} required />

                {error && <p className="text-red-400">{error}</p>}

                <Button type="submit" isLoading={loading} fullWidth>
                    Sign Up
                </Button>
                {/* Footer */}
                <div className="mt-6 text-center text-sm text-[#7a5c65]/70">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#479ac4] hover:text-[#e5eaf5] font-medium">
                        Login
                    </Link>
            </div>
            </form>
        </ScreenContainer>
    );
}