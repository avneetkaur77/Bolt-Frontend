"use client";

import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";

export default function LandingPage() {
  return (
    <ScreenContainer className="justify-center items-center p-6 text-center cyber-grid">
      <div className="flex-1 flex flex-col justify-center items-center w-full space-y-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[#4a5fc1] to-[#394f8a] rounded-3xl flex items-center justify-center shadow-[0_0_40px_-5px_rgba(74,95,193,0.5)] border  border-[#4a5fc1]/30 animate-float">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tighter">
              <span className="neon-text">
                Bolt-Dev
              </span>
            </h1>
            <p className="text-[#7a5c65]/70 text-base font-medium tracking-wide uppercase">
              Next-Gen Payments
            </p>
          </div>
          <p className="text-[#7a5c65]/80 text-lg max-w-xs mx-auto leading-relaxed font-light">
            Secure, instant international crypto payments at your fingertips.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="px-4 py-2 rounded-xl bg-[#ead6cd]/90 border border-[#4a5fc1]/20 flex items-center gap-2 text-xs font-semibold text-[#7a5c65] backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#4a5fc1]" />
            Military Grade
          </div>
          <div className="px-4 py-2 rounded-xl bg-[#ead6cd]/90 border border-[#4a5fc1]/20 flex items-center gap-2 text-xs font-semibold text-[#7a5c65] backdrop-blur-md">
            <Wallet className="w-4 h-4 text-[#cf7956]" />
            Instant
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full space-y-4 pb-8"
      >
        <Button href="/signup" fullWidth size="lg">
          Initialize Account
        </Button>
        <Button href="/login" variant="secondary" fullWidth size="lg">
          Sign In
        </Button>
      </motion.div>

    </ScreenContainer>
  );
}
