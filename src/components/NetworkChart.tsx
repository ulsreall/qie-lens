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
    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <span className="text-[#475569] text-xs">Last 24h</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#475569", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 11 }}
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
              background: "#0a0f1e",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              color: "#f9fafb",
              fontSize: "12px",
              padding: "8px 12px",
            }}
            formatter={(value: unknown) => [Number(value).toLocaleString(), "Count"]}
            labelStyle={{ color: "#64748b" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#gradientArea)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#3B82F6",
              stroke: "#0a0f1e",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
