"use client";

import { Box } from "lucide-react";

interface Block {
  height: number;
  hash: string;
  timestamp: string;
  tx_count: number;
  gas_used: string;
  gas_limit: string;
  miner: { hash: string; name?: string };
  size: string;
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

export default function BlockTable({ blocks }: { blocks: Block[] }) {
  return (
    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 pulse-dot" />
          <h3 className="text-white text-sm font-semibold">Latest Blocks</h3>
        </div>
        <a
          href="https://testnet.qie.digital/blocks"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
        >
          View All →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[#475569] text-[10px] uppercase tracking-wider">
              <th className="px-6 py-3 text-left font-medium">Block</th>
              <th className="px-6 py-3 text-left font-medium">Age</th>
              <th className="px-6 py-3 text-center font-medium">Txs</th>
              <th className="px-6 py-3 text-left font-medium">Miner</th>
              <th className="px-6 py-3 text-right font-medium">Gas Used</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => {
              const gasUsed = parseInt(block.gas_used);
              const gasLimit = parseInt(block.gas_limit);
              const gasPercent =
                gasLimit > 0 ? ((gasUsed / gasLimit) * 100).toFixed(1) : "0";

              return (
                <tr
                  key={block.height}
                  className="border-t border-[#1e293b]/50 hover:bg-[#111827]/50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <a
                      href={`https://testnet.qie.digital/block/${block.height}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Box className="w-3.5 h-3.5" />
                      {block.height}
                    </a>
                  </td>
                  <td className="px-6 py-3 text-sm text-[#64748b]">
                    {timeAgo(block.timestamp)}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg text-xs font-medium">
                      {block.tx_count}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-[#94a3b8]">
                      {block.miner?.name || shortenHash(block.miner?.hash || "")}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="text-sm text-[#94a3b8]">
                      {gasUsed.toLocaleString()}
                      <span className="text-[#475569] ml-1">({gasPercent}%)</span>
                    </div>
                    <div className="w-full bg-[#111827] rounded-full h-1 mt-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-1 rounded-full"
                        style={{ width: `${Math.min(parseFloat(gasPercent), 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
