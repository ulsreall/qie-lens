import { getTokens } from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Coins, Users } from "lucide-react";

function formatSupply(supply: string, decimals: string) {
  const val = parseFloat(supply) / Math.pow(10, parseInt(decimals));
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val.toFixed(2);
}

export default async function TokensPage() {
  let tokens;
  try {
    tokens = await getTokens(20);
  } catch {
    tokens = { items: [] };
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
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">Token Explorer</p>
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
              <Coins className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Top Tokens</h2>
              <p className="text-[#3a6b8a] text-sm">Tokens on QIE Network</p>
            </div>
          </div>
        </div>

        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#2a5a7a] text-[10px] uppercase tracking-wider border-b border-[#0c2a4a]">
                  <th className="px-6 py-4 text-left font-medium">#</th>
                  <th className="px-6 py-4 text-left font-medium">Token</th>
                  <th className="px-6 py-4 text-left font-medium">Symbol</th>
                  <th className="px-6 py-4 text-left font-medium">Type</th>
                  <th className="px-6 py-4 text-right font-medium">Holders</th>
                  <th className="px-6 py-4 text-right font-medium">Total Supply</th>
                  <th className="px-6 py-4 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {tokens.items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#3a6b8a]">
                      No tokens found
                    </td>
                  </tr>
                ) : (
                  tokens.items.map((token, i) => (
                    <tr
                      key={token.address}
                      className="border-t border-[#0c2a4a]/40 hover:bg-[#0a1a30]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-[#3a6b8a]">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {token.icon_url && token.icon_url.startsWith("https://") ? (
                            <img src={token.icon_url} alt={token.name} className="w-8 h-8 rounded-full bg-[#0a1a30]" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center">
                              <Coins className="w-4 h-4 text-[#00d4ff]" />
                            </div>
                          )}
                          <div>
                            <p className="text-white text-sm font-medium">{token.name}</p>
                            <p className="text-[#3a6b8a] text-xs font-mono">{token.address.slice(0, 10)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-[#0a1a30] text-[#5a8aaa] px-2.5 py-1 rounded-lg text-xs font-mono border border-[#0c2a4a]">
                          {token.symbol}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#5a8aaa] text-xs uppercase">{token.type}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Users className="w-3 h-3 text-[#3a6b8a]" />
                          <span className="text-white text-sm">{formatNumber(token.holders)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-white">
                        {formatSupply(token.total_supply, token.decimals)} {token.symbol}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-white">
                        {token.exchange_rate ? `$${parseFloat(token.exchange_rate).toFixed(4)}` : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
