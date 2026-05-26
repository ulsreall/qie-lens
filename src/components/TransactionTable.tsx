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
    <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
      <div className="px-6 py-4 border-b border-[#0c2a4a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#5be5ff] pulse-dot" />
          <h3 className="text-white text-sm font-semibold">Latest Transactions</h3>
        </div>
        <a
          href="https://testnet.qie.digital/transactions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00d4ff] hover:text-[#5be5ff] text-xs transition-colors"
        >
          View All →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#2a5a7a] text-[10px] uppercase tracking-wider">
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
                className="border-t border-[#0c2a4a]/40 hover:bg-[#0a1a30]/50 transition-colors"
              >
                <td className="px-6 py-3">
                  <a
                    href={`https://testnet.qie.digital/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] hover:text-[#5be5ff] flex items-center gap-1.5 text-sm font-medium transition-colors"
                  >
                    {shortenHash(tx.hash)}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </td>
                <td className="px-6 py-3">
                  <span className="bg-[#0a1a30] text-[#5a8aaa] px-2.5 py-1 rounded-lg text-xs font-mono border border-[#0c2a4a]">
                    {tx.method || "transfer"}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-[#3a6b8a]">
                  {tx.block}
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[#5a8aaa]">
                    {tx.from?.name || shortenHash(tx.from?.hash || "")}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className="text-sm text-[#5a8aaa]">
                    {tx.to?.name || shortenHash(tx.to?.hash || "")}
                  </span>
                </td>
                <td className="px-6 py-3 text-right text-sm text-white font-medium">
                  {formatValue(tx.value)} <span className="text-[#2a5a7a] text-xs">QIE</span>
                </td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      tx.status === "ok"
                        ? "bg-[#00d4ff]/10 text-[#5be5ff]"
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
