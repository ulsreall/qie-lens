"use client";

import { ExternalLink } from "lucide-react";

interface Transaction {
  hash: string;
  block: number;
  timestamp: string;
  from: { hash: string; name?: string };
  to: { hash: string; name?: string };
  value: string;
  status: string;
  method: string;
}

function shortenHash(hash: string) {
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
}

function timeAgo(timestamp: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / 1000
  );
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatValue(wei: string) {
  const val = parseFloat(wei) / 1e18;
  if (val === 0) return "0";
  if (val < 0.001) return "<0.001";
  return val.toFixed(4);
}

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 pulse-dot" />
          <h3 className="text-white text-sm font-semibold">Latest Transactions</h3>
        </div>
        <a
          href="https://testnet.qie.digital/transactions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
        >
          View All →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#475569] text-[10px] uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-medium">Tx Hash</th>
              <th className="px-6 py-3 text-left font-medium">Method</th>
              <th className="px-6 py-3 text-left font-medium">Block</th>
              <th className="px-6 py-3 text-left font-medium">From</th>
              <th className="px-6 py-3 text-left font-medium">To</th>
              <th className="px-6 py-3 text-right font-medium">Value</th>
              <th className="px-6 py-3 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.hash}
                className="border-t border-[#1e293b]/50 hover:bg-[#111827]/50 transition-colors"
              >
                <td className="px-6 py-3">
                  <a
                    href={`https://testnet.qie.digital/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    {shortenHash(tx.hash)}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </td>
                <td className="px-6 py-3">
                  <span className="bg-[#111827] text-[#94a3b8] px-2.5 py-1 rounded-lg text-xs font-mono border border-[#1e293b]">
                    {tx.method || "transfer"}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-[#64748b]">
                  {tx.block}
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[#94a3b8]">
                    {tx.from?.name || shortenHash(tx.from?.hash || "")}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[#94a3b8]">
                    {tx.to?.name || shortenHash(tx.to?.hash || "")}
                  </span>
                </td>
                <td className="px-6 py-3 text-right text-sm text-white font-medium">
                  {formatValue(tx.value)} <span className="text-[#475569] text-xs">QIE</span>
                </td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      tx.status === "ok"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {tx.status === "ok" ? "Success" : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
