"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Copy,
  CheckCircle,
  ChevronRight,
  QrCode,
  Bell,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ScreenContainer from "@/components/ScreenContainer";

const DUMMY_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
const DUMMY_BALANCE_ETH = "4.5420";
const DUMMY_BALANCE_USD = "$12,450.00";

const TRANSACTIONS = [
  { id: 1, type: "sent", amount: "0.45 ETH", fiat: "$1,250", to: "Gagan test", date: "Today, 10:23 AM", status: "Completed" },
  { id: 2, type: "received", amount: "1.20 ETH", fiat: "$3,400", from: "gagantest123", date: "Yesterday, 3:45 PM", status: "Completed" },
  { id: 3, type: "sent", amount: "0.10 ETH", fiat: "$280", to: "0x22F...9B34", date: "Apr 23, 9:00 AM", status: "Completed" },
  { id: 4, type: "received", amount: "2.00 ETH", fiat: "$5,710", from: "Gagan test", date: "Apr 20, 2:30 PM", status: "Completed" },
];

const CRYPTO_ASSETS = [
  { name: "Ethereum", symbol: "ETH", amount: "4.542", value: "$12,450", change: "+2.5%", positive: true, color: "from-indigo-500 to-violet-500", icon: "⟠" },
  { name: "Bitcoin", symbol: "BTC", amount: "0.021", value: "$1,890", change: "+1.8%", positive: true, color: "from-orange-500 to-amber-500", icon: "₿" },
  { name: "USDT", symbol: "USDT", amount: "320.00", value: "$320", change: "0.0%", positive: true, color: "from-emerald-500 to-teal-500", icon: "₮" },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showReceive, setShowReceive] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DUMMY_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScreenContainer scrollable className="pb-24">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="font-bold text-white text-sm">Bolt-Dev</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors">
            <Bell className="w-4 h-4 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full border border-slate-950" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-slate-900 shadow-lg" />
        </div>
      </div>

      {/* ── Balance Hero ── */}
      <div className="bg-gradient-to-b from-indigo-900/40 to-slate-950 px-6 pt-6 pb-8 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Address pill */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-slate-800/60 border border-white/10 px-3 py-1.5 rounded-full mb-5 mx-auto hover:border-violet-500/40 transition-all"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-slate-300">
            {DUMMY_ADDRESS.slice(0, 8)}...{DUMMY_ADDRESS.slice(-6)}
          </span>
          {copied ? (
            <CheckCircle className="w-3 h-3 text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3 text-slate-500" />
          )}
        </button>

        <div className="text-center space-y-1 mb-6">
          <p className="text-slate-400 text-sm font-medium">Total Portfolio Value</p>
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center justify-center gap-2 mx-auto"
          >
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {balanceVisible ? DUMMY_BALANCE_USD : "••••••"}
            </h1>
            {balanceVisible ? (
              <EyeOff className="w-4 h-4 text-slate-500" />
            ) : (
              <Eye className="w-4 h-4 text-slate-500" />
            )}
          </button>
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-sm">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{balanceVisible ? "+$305.20 (2.5%) today" : "••••"}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button href="/send" fullWidth icon={Send} size="md">
            Send
          </Button>
          <Button
            fullWidth
            variant="secondary"
            icon={QrCode}
            size="md"
            onClick={() => setShowReceive(!showReceive)}
          >
            Receive
          </Button>
          <Button href="/transaction/review" fullWidth variant="secondary" icon={History} size="md">
            History
          </Button>
        </div>
      </div>

      {/* ── Receive Modal ── */}
      {showReceive && (
        <div className="mx-6 -mt-4 mb-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Card className="p-5 border border-violet-500/20 bg-slate-900/80">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-white">Receive Crypto</p>
              <button
                onClick={() => setShowReceive(false)}
                className="text-slate-500 hover:text-white text-xs transition-colors"
              >
                ✕ Close
              </button>
            </div>
            {/* Dummy QR code placeholder */}
            <div className="w-40 h-40 mx-auto bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-violet-500/10">
              <div className="grid grid-cols-5 grid-rows-5 gap-1 p-3">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-sm ${
                      [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,7,11,13,17].includes(i)
                        ? "bg-slate-900"
                        : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-white/5 rounded-lg p-3">
              <p className="text-xs font-mono text-slate-300 flex-1 break-all">{DUMMY_ADDRESS}</p>
              <button onClick={handleCopy} className="text-slate-400 hover:text-violet-400 transition-colors shrink-0">
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">Only send Ethereum (ETH) or ERC-20 tokens to this address.</p>
          </Card>
        </div>
      )}

      <div className="px-5 space-y-6 mt-2">

        {/* ── Assets ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white">My Assets</h2>
            <Link href="#" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              Manage <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {CRYPTO_ASSETS.map((asset) => (
              <Card key={asset.symbol} className="p-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${asset.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {asset.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{asset.name}</p>
                    <p className="text-xs text-slate-400">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white text-sm">{balanceVisible ? asset.value : "••••"}</p>
                  <p className={`text-xs flex items-center justify-end gap-0.5 ${asset.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {asset.change} <span className="text-slate-500 ml-1">{asset.amount} {asset.symbol}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Recent Transactions ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white">Recent Activity</h2>
            <Link href="#" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {TRANSACTIONS.map((tx) => (
              <Card key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/60 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "sent"
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {tx.type === "sent"
                      ? <ArrowUpRight className="w-4 h-4" />
                      : <ArrowDownLeft className="w-4 h-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {tx.type === "sent" ? "Sent ETH" : "Received ETH"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {tx.type === "sent" ? `To: ${tx.to}` : `From: ${tx.from}`}
                    </p>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${tx.type === "sent" ? "text-white" : "text-emerald-400"}`}>
                    {tx.type === "sent" ? "-" : "+"}{tx.amount}
                  </p>
                  <p className="text-xs text-slate-500">{tx.fiat}</p>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                    {tx.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </ScreenContainer>
  );
}
