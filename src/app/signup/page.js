"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

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

                <Input label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} icon={User} required />
                <Input label="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} icon={User} required />
                <Input label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail} required />
                <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} icon={Lock} required />

                {error && <p className="text-red-400">{error}</p>}

                <Button type="submit" isLoading={loading} fullWidth>
                    Sign Up
                </Button>

            </form>
        </ScreenContainer>
    );
}