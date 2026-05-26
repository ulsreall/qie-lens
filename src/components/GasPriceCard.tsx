"use client";

import { Fuel } from "lucide-react";

interface GasPrices {
  slow: number;
  average: number;
  fast: number;
}

export default function GasPriceCard({ gasPrices }: { gasPrices: GasPrices }) {
  const levels = [
    { label: "Slow", value: gasPrices.slow, color: "bg-green-500", text: "text-green-400" },
    { label: "Average", value: gasPrices.average, color: "bg-yellow-500", text: "text-yellow-400" },
    { label: "Fast", value: gasPrices.fast, color: "bg-red-500", text: "text-red-400" },
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Fuel className="w-4 h-4 text-orange-400" />
        <h3 className="text-gray-400 text-sm font-medium">Gas Prices (Gwei)</h3>
      </div>
      <div className="space-y-3">
        {levels.map((level) => (
          <div key={level.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${level.color}`} />
              <span className="text-gray-400 text-sm">{level.label}</span>
            </div>
            <span className={`font-mono font-bold ${level.text}`}>
              {level.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-gray-600 text-xs">
          QIE gas is extremely cheap — transactions cost fractions of a cent.
        </p>
      </div>
    </div>
  );
}
