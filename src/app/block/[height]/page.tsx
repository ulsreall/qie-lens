import { getBlock, getBlockTransactions } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  ArrowLeft,
  Clock,
  Fuel,
  Pickaxe,
  Layers,
  Flame,
  ExternalLink,
} from "lucide-react";

function shortenHash(hash: string) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
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
  return val.toFixed(6);
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ height: string }>;
}) {
  const { height } = await params;
  const blockNum = parseInt(height);

  if (isNaN(blockNum) || blockNum < 0) notFound();

  let block, txData;
  try {
    [block, txData] = await Promise.all([
      getBlock(blockNum),
      getBlockTransactions(blockNum, 20),
    ]);
  } catch {
    notFound();
  }

  const gasUsed = parseInt(block.gas_used);
  const gasLimit = parseInt(block.gas_limit);
  const gasPercent = gasLimit > 0 ? ((gasUsed / gasLimit) * 100).toFixed(1) : "0";

  const details = [
    { label: "Block Height", value: block.height.toLocaleString(), icon: <Box className="w-4 h-4" /> },
    { label: "Timestamp", value: `${timeAgo(block.timestamp)} (${new Date(block.timestamp).toLocaleString()})`, icon: <Clock className="w-4 h-4" /> },
    { label: "Transactions", value: block.transaction_count.toLocaleString(), icon: <Layers className="w-4 h-4" /> },
    { label: "Miner", value: block.miner?.name || shortenHash(block.miner?.hash || ""), icon: <Pickaxe className="w-4 h-4" /> },
    { label: "Gas Used", value: `${gasUsed.toLocaleString()} (${gasPercent}%)`, icon: <Fuel className="w-4 h-4" /> },
    { label: "Gas Limit", value: gasLimit.toLocaleString(), icon: <Fuel className="w-4 h-4" /> },
    { label: "Base Fee", value: `${block.base_fee_per_gas || "N/A"} Gwei`, icon: <Flame className="w-4 h-4" /> },
    { label: "Burnt Fees", value: block.burnt_fees ? `${formatValue(block.burnt_fees)} QIE` : "N/A", icon: <Flame className="w-4 h-4" /> },
    { label: "Block Reward", value: block.rewards?.[0]?.reward ? `${formatValue(block.rewards[0].reward)} QIE` : "N/A", icon: <Box className="w-4 h-4" /> },
    { label: "Size", value: `${parseInt(block.size).toLocaleString()} bytes`, icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020a18] text-white grid-bg">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00d4ff]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <header className="border-b border-[#0c2a4a] bg-[#020a18]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="QIE Lens" className="w-10 h-10 rounded-xl object-contain" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="cyan-gradient-text">QIE</span>{" "}
                <span className="text-white/80 font-light">Lens</span>
              </h1>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">Block Explorer</p>
            </div>
          </Link>
          <Link href="/" className="text-[#00d4ff] hover:text-[#5be5ff] text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
              <Box className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Block #{block.height.toLocaleString()}</h2>
              <p className="text-[#3a6b8a] text-sm">{timeAgo(block.timestamp)}</p>
            </div>
          </div>
        </div>

        {/* Block Details */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring mb-6">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">Block Details</h3>
          </div>
          <div className="divide-y divide-[#0c2a4a]/40">
            {details.map((item) => (
              <div key={item.label} className="px-6 py-4 flex items-start gap-4">
                <div className="text-[#3a6b8a] mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-white text-sm font-mono break-all">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hashes */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring mb-6">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">Hashes</h3>
          </div>
          <div className="divide-y divide-[#0c2a4a]/40">
            <div className="px-6 py-4">
              <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Block Hash</p>
              <p className="text-white text-sm font-mono break-all">{block.hash}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Parent Hash</p>
              <p className="text-white text-sm font-mono break-all">{block.parent_hash}</p>
            </div>
          </div>
        </div>

        {/* Gas Usage Bar */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-6 lens-ring mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#3a6b8a] text-xs uppercase tracking-wider">Gas Usage</span>
            <span className="text-white font-bold">{gasPercent}%</span>
          </div>
          <div className="w-full bg-[#0a1a30] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#0091b3] to-[#00d4ff] h-3 rounded-full transition-all"
              style={{ width: `${Math.min(parseFloat(gasPercent), 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[#2a5a7a] text-xs">{gasUsed.toLocaleString()} used</span>
            <span className="text-[#2a5a7a] text-xs">{gasLimit.toLocaleString()} limit</span>
          </div>
        </div>

        {/* Transactions in Block */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">
              Transactions ({block.transaction_count})
            </h3>
          </div>
          {txData.items.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#3a6b8a]">No transactions in this block</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[#2a5a7a] text-[10px] uppercase tracking-wider">
                    <th className="px-6 py-3 text-left font-medium">Tx Hash</th>
                    <th className="px-6 py-3 text-left font-medium">Method</th>
                    <th className="px-6 py-3 text-left font-medium">From</th>
                    <th className="px-6 py-3 text-left font-medium">To</th>
                    <th className="px-6 py-3 text-right font-medium">Value</th>
                    <th className="px-6 py-3 text-center font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {txData.items.map((tx) => (
                    <tr key={tx.hash} className="border-t border-[#0c2a4a]/40 hover:bg-[#0a1a30]/50 transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/tx/${tx.hash}`} className="text-[#00d4ff] hover:text-[#5be5ff] text-sm font-medium transition-colors">
                          {shortenHash(tx.hash)}
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <span className="bg-[#0a1a30] text-[#5a8aaa] px-2.5 py-1 rounded-lg text-xs font-mono border border-[#0c2a4a]">
                          {tx.method || "transfer"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-[#5a8aaa]">
                        {tx.from?.name || shortenHash(tx.from?.hash || "")}
                      </td>
                      <td className="px-6 py-3 text-sm text-[#5a8aaa]">
                        {tx.to?.name || shortenHash(tx.to?.hash || "")}
                      </td>
                      <td className="px-6 py-3 text-right text-sm text-white font-medium">
                        {formatValue(tx.value)} <span className="text-[#2a5a7a] text-xs">QIE</span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          tx.status === "ok" ? "bg-[#00d4ff]/10 text-[#5be5ff]" : "bg-red-500/10 text-red-400"
                        }`}>
                          {tx.status === "ok" ? "Success" : "Failed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
