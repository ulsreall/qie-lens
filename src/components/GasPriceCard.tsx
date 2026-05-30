import { Fuel } from "lucide-react";

interface GasPrices {
  slow: number;
  average: number;
  fast: number;
}

export default function GasPriceCard({ gasPrices }: { gasPrices: GasPrices }) {
  const max = Math.max(gasPrices.slow, gasPrices.average, gasPrices.fast, 1);
  const levels = [
    { label: "Slow", value: gasPrices.slow, color: "#10B981", width: `${(gasPrices.slow / max) * 100}%` },
    { label: "Average", value: gasPrices.average, color: "#00d4ff", width: `${(gasPrices.average / max) * 100}%` },
    { label: "Fast", value: gasPrices.fast, color: "#5be5ff", width: `${(gasPrices.fast / max) * 100}%` },
  ];

  return (
    <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-6 lens-ring">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
          <Fuel className="w-4 h-4 text-[#00d4ff]" />
        </div>
        <h3 className="text-white text-sm font-semibold">Gas Prices</h3>
      </div>

      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#3a6b8a] text-xs">{level.label}</span>
              <span className="font-mono text-sm font-bold text-white">
                {level.value} <span className="text-[#2a5a7a] text-xs font-normal">Gwei</span>
              </span>
            </div>
            <div className="w-full bg-[#0a1a30] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: level.width,
                  backgroundColor: level.color,
                  boxShadow: `0 0 10px ${level.color}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#0c2a4a]">
        <p className="text-[#2a5a7a] text-xs">
          QIE gas is extremely cheap — transactions cost fractions of a cent.
        </p>
      </div>
    </div>
  );
}
