import { getTransactions } from "@/lib/api";
import { shortenHash, timeAgo, formatValue } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";

export default async function TransactionsPage() {
  let txData;
  try {
    txData = await getTransactions(50);
  } catch {
    return (
      <div className="min-h-screen bg-[#020a18] text-white grid-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#3a6b8a] text-sm">Failed to load transactions</p>
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
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">All Transactions</p>
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
          <h2 className="text-xl font-bold">Latest Transactions</h2>
          <p className="text-[#3a6b8a] text-sm">{txData.items.length} transactions</p>
        </div>

        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#2a5a7a] text-[10px] uppercase tracking-wider border-b border-[#0c2a4a]">
                  <th className="px-6 py-3 text-left font-medium">Tx Hash</th>
                  <th className="px-6 py-3 text-left font-medium">Method</th>
                  <th className="px-6 py-3 text-left font-medium">Block</th>
                  <th className="px-6 py-3 text-left font-medium">Age</th>
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
                      <Link href={`/tx/${tx.hash}`} className="text-[#00d4ff] hover:text-[#5be5ff] flex items-center gap-1.5 text-sm font-medium transition-colors">
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        {shortenHash(tx.hash)}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <span className="bg-[#0a1a30] text-[#5a8aaa] px-2.5 py-1 rounded-lg text-xs font-mono border border-[#0c2a4a]">
                        {tx.method || "transfer"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/block/${tx.block_number || tx.block}`} className="text-[#00d4ff] hover:text-[#5be5ff] text-sm transition-colors">
                        {tx.block_number || tx.block}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-[#3a6b8a]">
                      {timeAgo(tx.timestamp)}
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/address/${tx.from?.hash}`} className="text-[#5a8aaa] hover:text-[#00d4ff] text-sm transition-colors">
                        {tx.from?.name || shortenHash(tx.from?.hash || "")}
                      </Link>
                    </td>
                    <td className="px-6 py-3">
                      <Link href={`/address/${tx.to?.hash}`} className="text-[#5a8aaa] hover:text-[#00d4ff] text-sm transition-colors">
                        {tx.to?.name || shortenHash(tx.to?.hash || "")}
                      </Link>
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
        </div>
      </main>
    </div>
  );
}
