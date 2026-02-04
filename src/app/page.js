"use client";

import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";

export default function LandingPage() {
  return (
    <ScreenContainer className="justify-center items-center p-6 text-center">
      <div className="flex-1 flex flex-col justify-center items-center w-full space-y-8">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
              ChainPay
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xs mx-auto leading-relaxed">
            The world's most secure international crypto payments platform.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <div className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Secure
          </div>
          <div className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
            <Wallet className="w-3.5 h-3.5 text-blue-400" />
            Fast
          </div>
          <div className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10 flex items-center gap-2 text-xs font-medium text-slate-300">
            <Globe className="w-3.5 h-3.5 text-violet-400" />
            Global
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full space-y-3"
      >
        <Button href="/signup" fullWidth size="lg">
          Create Account
        </Button>
        <Button href="/login" variant="secondary" fullWidth size="lg">
          Login
        </Button>
      </motion.div>

    </ScreenContainer>
  );
}
