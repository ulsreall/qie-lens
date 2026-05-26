"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  icon: React.ReactNode;
  gradient?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
  gradient = "from-blue-500/10 to-blue-600/5",
}: StatCardProps) {
  return (
    <div className="group relative bg-[#0a0f1e] border border-[#1e293b] rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#64748b] text-xs font-medium uppercase tracking-wider">{title}</span>
          <div className="w-9 h-9 rounded-xl bg-[#111827] border border-[#1e293b] flex items-center justify-center text-blue-400 group-hover:border-blue-500/30 transition-colors">
            {icon}
          </div>
        </div>
        
        <div className="text-2xl font-bold text-white tracking-tight mb-2">{value}</div>
        
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
              change >= 0 
                ? "bg-green-500/10 text-green-400" 
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
            <span className="text-[#475569] text-xs">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
