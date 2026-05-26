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
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-blue-500/30 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="text-blue-400 opacity-60">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="flex items-center gap-2">
        {change !== undefined && (
          <span
            className={`flex items-center text-xs font-medium ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(change).toFixed(2)}%
          </span>
        )}
        {subtitle && (
          <span className="text-gray-500 text-xs">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
