"use client";

import { ExternalLink, Box } from "lucide-react";

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
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-800">
        <h3 className="text-gray-400 text-sm font-medium">Recent Blocks</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-xs uppercase">
              <th className="px-5 py-3 text-left">Block</th>
              <th className="px-5 py-3 text-left">Age</th>
              <th className="px-5 py-3 text-center">Txs</th>
              <th className="px-5 py-3 text-left">Miner</th>
              <th className="px-5 py-3 text-right">Gas Used</th>
              <th className="px-5 py-3 text-right">Gas Limit</th>
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
                  className="border-t border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <a
                      href={`https://testnet.qie.digital/block/${block.height}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm"
                    >
                      <Box className="w-4 h-4" />
                      {block.height}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {timeAgo(block.timestamp)}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                      {block.tx_count}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-gray-400">
                      {block.miner?.name || shortenHash(block.miner?.hash || "")}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="text-sm text-gray-400">
                      {gasUsed.toLocaleString()}
                      <span className="text-gray-600 ml-1">({gasPercent}%)</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${Math.min(parseFloat(gasPercent), 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-sm text-gray-500">
                    {gasLimit.toLocaleString()}
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
