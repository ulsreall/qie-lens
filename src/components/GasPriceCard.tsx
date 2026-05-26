"use client";

import { Fuel } from "lucide-react";

interface GasPrices {
  slow: number;
  average: number;
  fast: number;
}

export default function GasPriceCard({ gasPrices }: { gasPrices: GasPrices }) {
  const levels = [
    { label: "Slow", value: gasPrices.slow, color: "#10B981", width: "33%" },
    { label: "Average", value: gasPrices.average, color: "#F59E0B", width: "66%" },
    { label: "Fast", value: gasPrices.fast, color: "#EF4444", width: "100%" },
  ];

  return (
    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
          <Fuel className="w-4 h-4 text-orange-400" />
        </div>
        <h3 className="text-white text-sm font-semibold">Gas Prices</h3>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#64748b] text-xs">{level.label}</span>
              <span className="font-mono text-sm font-bold text-white">
                {level.value} <span className="text-[#475569] text-xs font-normal">Gwei</span>
              </span>
            </div>
            <div className="w-full bg-[#111827] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: level.width,
                  backgroundColor: level.color,
                  boxShadow: `0 0 8px ${level.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#1e293b]">
        <p className="text-[#475569] text-xs">
          QIE gas is extremely cheap — transactions cost fractions of a cent.
        </p>
      </div>
    </div>
  );
}
