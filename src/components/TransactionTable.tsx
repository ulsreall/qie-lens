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
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-800">
        <h3 className="text-gray-400 text-sm font-medium">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-xs uppercase">
              <th className="px-5 py-3 text-left">Tx Hash</th>
              <th className="px-5 py-3 text-left">Method</th>
              <th className="px-5 py-3 text-left">Block</th>
              <th className="px-5 py-3 text-left">Age</th>
              <th className="px-5 py-3 text-left">From</th>
              <th className="px-5 py-3 text-left">To</th>
              <th className="px-5 py-3 text-right">Value</th>
              <th className="px-5 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.hash}
                className="border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-5 py-3">
                  <a
                    href={`https://testnet.qie.digital/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                  >
                    {shortenHash(tx.hash)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-5 py-3">
                  <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                    {tx.method || "transfer"}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-400">
                  {tx.block}
                </td>
                <td className="px-5 py-3 text-sm text-gray-500">
                  {timeAgo(tx.timestamp)}
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm text-gray-400">
                    {tx.from?.name || shortenHash(tx.from?.hash || "")}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm text-gray-400">
                    {tx.to?.name || shortenHash(tx.to?.hash || "")}
                  </span>
                </td>
                <td className="px-5 py-3 text-right text-sm text-white font-medium">
                  {formatValue(tx.value)} QIE
                </td>
                <td className="px-5 py-3 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === "ok"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-red-900/30 text-red-400"
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
