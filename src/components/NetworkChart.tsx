"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartData {
  label: string;
  value: number;
}

export default function NetworkChart({
  data,
  title,
}: {
  data: ChartData[];
  title: string;
}) {
  return (
    <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-6 lens-ring">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <span className="text-[#2a5a7a] text-xs">Last 24h</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#0c2a4a"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#3a6b8a", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#3a6b8a", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              v >= 1000000
                ? `${(v / 1000000).toFixed(1)}M`
                : v >= 1000
                ? `${(v / 1000).toFixed(1)}K`
                : v.toString()
            }
          />
          <Tooltip
            contentStyle={{
              background: "#061024",
              border: "1px solid #0c2a4a",
              borderRadius: "12px",
              color: "#e8f4ff",
              fontSize: "12px",
              padding: "8px 12px",
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)",
            }}
            formatter={(value: unknown) => [Number(value).toLocaleString(), "Count"]}
            labelStyle={{ color: "#3a6b8a" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00d4ff"
            strokeWidth={2}
            fill="url(#cyanGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#00d4ff",
              stroke: "#061024",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
