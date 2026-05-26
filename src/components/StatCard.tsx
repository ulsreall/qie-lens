"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
}: StatCardProps) {
  return (
    <div className="group relative bg-[#061024] border border-[#0c2a4a] rounded-2xl p-5 hover:border-[#00d4ff]/30 transition-all duration-300 overflow-hidden lens-ring">
      {/* Cyan glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#3a6b8a] text-[10px] font-semibold uppercase tracking-widest">{title}</span>
          <div className="w-9 h-9 rounded-xl bg-[#0a1a30] border border-[#0c2a4a] flex items-center justify-center text-[#00d4ff] group-hover:border-[#00d4ff]/30 group-hover:shadow-[0_0_12px_rgba(0,212,255,0.1)] transition-all duration-300">
            {icon}
          </div>
        </div>

        <div className="text-2xl font-bold text-white tracking-tight mb-2">{value}</div>

        <div className="flex items-center gap-2">
          {change !== undefined && (
            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
              change >= 0
                ? "bg-[#00d4ff]/10 text-[#5be5ff]"
                : "bg-red-500/10 text-red-400"
            }`}>
              {change >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(change).toFixed(2)}%
            </span>
          )}
          {subtitle && (
            <span className="text-[#2a5a7a] text-xs">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
