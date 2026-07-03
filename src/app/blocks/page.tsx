import { getBlocks } from "@/lib/api";
import { shortenHash, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Box, ArrowLeft } from "lucide-react";

export default async function BlocksPage() {
  let blockData;
  try {
    blockData = await getBlocks(50);
  } catch {
    return (
      <div className="min-h-screen bg-[#020a18] text-white grid-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#3a6b8a] text-sm">Failed to load blocks</p>
          <Link href="/" className="text-[#00d4ff] hover:text-[#5be5ff] text-sm mt-2 inline-block">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

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
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">All Blocks</p>
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
          <h2 className="text-xl font-bold">Latest Blocks</h2>
          <p className="text-[#3a6b8a] text-sm">{blockData.items.length} blocks</p>
        </div>

        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#2a5a7a] text-[10px] uppercase tracking-wider border-b border-[#0c2a4a]">
                  <th className="px-6 py-3 text-left font-medium">Block</th>
                  <th className="px-6 py-3 text-left font-medium">Age</th>
                  <th className="px-6 py-3 text-center font-medium">Txs</th>
                  <th className="px-6 py-3 text-left font-medium">Miner</th>
                  <th className="px-6 py-3 text-right font-medium">Gas Used</th>
                </tr>
              </thead>
              <tbody>
                {blockData.items.map((block) => {
                  const gasUsed = parseInt(block.gas_used);
                  const gasLimit = parseInt(block.gas_limit);
                  const gasPercent = gasLimit > 0 ? ((gasUsed / gasLimit) * 100).toFixed(1) : "0";

                  return (
                    <tr key={block.height} className="border-t border-[#0c2a4a]/40 hover:bg-[#0a1a30]/50 transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/block/${block.height}`} className="text-[#00d4ff] hover:text-[#5be5ff] flex items-center gap-2 text-sm font-medium transition-colors">
                          <Box className="w-3.5 h-3.5" />
                          {block.height}
                        </Link>
                      </td>
                      <td className="px-6 py-3 text-sm text-[#3a6b8a]">{timeAgo(block.timestamp)}</td>
                      <td className="px-6 py-3 text-center">
                        <span className="bg-[#00d4ff]/10 text-[#00d4ff] px-2.5 py-1 rounded-lg text-xs font-medium">
                          {block.transaction_count}
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
      </main>
    </div>
  );
}
