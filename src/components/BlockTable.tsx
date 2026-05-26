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
    <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
      <div className="px-6 py-4 border-b border-[#0c2a4a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-dot" />
          <h3 className="text-white text-sm font-semibold">Latest Blocks</h3>
        </div>
        <a
          href="https://testnet.qie.digital/blocks"
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
                  className="border-t border-[#0c2a4a]/40 hover:bg-[#0a1a30]/50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <a
                      href={`https://testnet.qie.digital/block/${block.height}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00d4ff] hover:text-[#5be5ff] flex items-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Box className="w-3.5 h-3.5" />
                      {block.height}
                    </a>
                  </td>
                  <td className="px-6 py-3 text-sm text-[#3a6b8a]">
                    {timeAgo(block.timestamp)}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className="bg-[#00d4ff]/10 text-[#00d4ff] px-2.5 py-1 rounded-lg text-xs font-medium">
                      {block.tx_count}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-[#5a8aaa]">
                      {block.miner?.name || shortenHash(block.miner?.hash || "")}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="text-sm text-[#5a8aaa]">
                      {gasUsed.toLocaleString()}
                      <span className="text-[#2a5a7a] ml-1">({gasPercent}%)</span>
                    </div>
                    <div className="w-full bg-[#0a1a30] rounded-full h-1 mt-1.5">
                      <div
                        className="bg-gradient-to-r from-[#0091b3] to-[#00d4ff] h-1 rounded-full"
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
