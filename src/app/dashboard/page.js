"use client";

import { useState, useEffect } from "react";
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

// Demo Fallback Data
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
  
  // Real Data State
  const [address, setAddress] = useState(DUMMY_ADDRESS);
  const [balanceEth, setBalanceEth] = useState(DUMMY_BALANCE_ETH);
  const [balanceUsd, setBalanceUsd] = useState(DUMMY_BALANCE_USD);
  const [isRealWallet, setIsRealWallet] = useState(false);

  useEffect(() => {
    const fetchRealBalance = async () => {
      // Check if we have a saved connection or active ethereum provider
      const savedAddress = localStorage.getItem("connectedWallet");
      
      if (typeof window !== "undefined" && window.ethereum && savedAddress) {
        try {
          // Get balance in Wei (hex)
          const balanceHex = await window.ethereum.request({
            method: "eth_getBalance",
            params: [savedAddress, "latest"],
          });
          
          // Convert Wei to ETH
          const wei = parseInt(balanceHex, 16);
          const eth = (wei / Math.pow(10, 18)).toFixed(4);
          
          // Simple mock for USD (ETH Price approx $2500)
          const usd = (parseFloat(eth) * 2500).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          });
          
          setAddress(savedAddress);
          setBalanceEth(eth);
          setBalanceUsd(usd);
          setIsRealWallet(true);
        } catch (error) {
          console.error("Failed to fetch real balance:", error);
          // Keep dummy data on error
        }
      }
    };

    fetchRealBalance();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScreenContainer scrollable className="pb-24 cyber-grid no-scrollbar">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-10 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 border border-violet-400/20">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="font-bold text-white text-base tracking-tight">Bolt-Dev</span>
          {isRealWallet && (
            <div className="flex items-center gap-1.5 ml-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Live</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <Bell className="w-4.5 h-4.5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-slate-950" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 border border-white/20 shadow-lg shadow-fuchsia-500/20" />
        </div>
      </div>

      {/* ── Balance Hero ── */}
      <div className="px-6 pt-8 pb-10 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Address pill */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl mb-8 mx-auto hover:border-violet-500/40 hover:bg-white/10 transition-all shadow-xl"
        >
          <div className={`w-2 h-2 ${isRealWallet ? "bg-emerald-400" : "bg-blue-400"} rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]`} />
          <span className="text-xs font-mono text-slate-300 tracking-wider">
            {address.slice(0, 8)}...{address.slice(-6)}
          </span>
          {copied ? (
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>

        <div className="text-center space-y-2 mb-10">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Net Assets</p>
          <button
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="flex items-center justify-center gap-3 mx-auto group"
          >
            <h1 className="text-5xl font-bold text-white tracking-tighter drop-shadow-2xl">
              {balanceVisible ? balanceUsd : "••••••"}
            </h1>
            <div className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
              {balanceVisible ? (
                <EyeOff className="w-4 h-4 text-slate-400" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{balanceVisible ? "+$305.20 (2.5%)" : "••••"}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Send", icon: Send, href: "/send", primary: true },
            { label: "Receive", icon: QrCode, onClick: () => setShowReceive(!showReceive) },
            { label: "Activity", icon: History, href: "/transaction/review" },
          ].map((action) => (
            <div key={action.label} className="flex flex-col items-center gap-2">
              <button
                onClick={action.onClick}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                  action.primary 
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-violet-500/20 border border-violet-400/30 hover:scale-105" 
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {action.href ? (
                  <Link href={action.href}><action.icon className="w-6 h-6" /></Link>
                ) : (
                  <action.icon className="w-6 h-6" />
                )}
              </button>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{action.label}</span>
            </div>
          ))}
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
              <p className="text-xs font-mono text-slate-300 flex-1 break-all">{address}</p>
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
                  <p className="font-semibold text-white text-sm">
                    {balanceVisible ? (asset.symbol === "ETH" ? `${balanceEth} ETH` : asset.value) : "••••"}
                  </p>
                  <p className={`text-xs flex items-center justify-end gap-0.5 ${asset.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {asset.change} <span className="text-slate-500 ml-1">{asset.symbol === "ETH" ? balanceEth : asset.amount} {asset.symbol}</span>
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
