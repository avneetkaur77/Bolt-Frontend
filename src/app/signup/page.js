import Link from "next/link";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";

export default function SignupPage() {
    return (
        <ScreenContainer className="p-6">
            {/* Header */}
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Create Account
                </h1>
                <p className="text-slate-400 mt-1">Start your crypto journey today.</p>
            </div>

            {/* Form */}
            <form className="flexflex-col space-y-5 flex-1" action="/login">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    icon={User}
                    required
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    icon={Mail}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    required
                />

                <div className="flex-1"></div>

                <Button fullWidth size="lg" type="submit">
                    Sign Up
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
                    Login
                </Link>
            </div>
        </ScreenContainer>
    );
}
