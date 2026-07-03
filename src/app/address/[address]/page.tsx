import { getAddress, getAddressTransactions } from "@/lib/api";
import { shortenHash, timeAgo, formatValue } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Wallet,
  ArrowLeft,
  Clock,
  Layers,
  Copy,
  ExternalLink,
  FileText,
  Code2,
  BadgeCheck,
} from "lucide-react";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  if (!address || !address.startsWith("0x") || address.length !== 42) notFound();

  let addrInfo, txData;
  try {
    [addrInfo, txData] = await Promise.all([
      getAddress(address),
      getAddressTransactions(address, 20),
    ]);
  } catch {
    notFound();
  }

  const balance = addrInfo.coin_balance
    ? (parseFloat(addrInfo.coin_balance) / 1e18).toFixed(6)
    : "0";

  const isContract = addrInfo.is_contract;

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
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">Address Explorer</p>
            </div>
          </Link>
          <Link href="/" className="text-[#00d4ff] hover:text-[#5be5ff] text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isContract
                ? "bg-purple-500/10 border border-purple-500/20"
                : "bg-[#00d4ff]/10 border border-[#00d4ff]/20"
            }`}>
              {isContract ? (
                <Code2 className="w-5 h-5 text-purple-400" />
              ) : (
                <Wallet className="w-5 h-5 text-[#00d4ff]" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {isContract ? "Contract" : "Address"}
              </h2>
              <p className="text-[#3a6b8a] text-sm font-mono break-all">{address}</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring mb-6">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">Overview</h3>
          </div>
          <div className="divide-y divide-[#0c2a4a]/40">
            {/* Address */}
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="text-[#3a6b8a] mt-0.5"><Wallet className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Address</p>
                <p className="text-white text-sm font-mono break-all">{address}</p>
              </div>
            </div>

            {/* Balance */}
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="text-[#3a6b8a] mt-0.5"><Layers className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Balance</p>
                <p className="text-white text-sm font-mono">{balance} QIE</p>
              </div>
            </div>

            {/* Type */}
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="text-[#3a6b8a] mt-0.5">
                {isContract ? <Code2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Type</p>
                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                  isContract
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "bg-[#00d4ff]/10 text-[#5be5ff] border border-[#00d4ff]/20"
                }`}>
                  {isContract ? "Contract" : "EOA (Wallet)"}
                  {addrInfo.is_verified && <BadgeCheck className="w-3 h-3" />}
                </span>
              </div>
            </div>

            {/* ENS / Name */}
            {(addrInfo.ens_domain_name || addrInfo.name) && (
              <div className="px-6 py-4 flex items-start gap-4">
                <div className="text-[#3a6b8a] mt-0.5"><BadgeCheck className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Name</p>
                  <p className="text-white text-sm">{addrInfo.ens_domain_name || addrInfo.name}</p>
                </div>
              </div>
            )}

            {/* Implementation (for proxies) */}
            {addrInfo.implementation_name && (
              <div className="px-6 py-4 flex items-start gap-4">
                <div className="text-[#3a6b8a] mt-0.5"><Code2 className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Implementation</p>
                  <p className="text-white text-sm">{addrInfo.implementation_name}</p>
                </div>
              </div>
            )}

            {/* Creator */}
            {addrInfo.creator_address_hash && (
              <div className="px-6 py-4 flex items-start gap-4">
                <div className="text-[#3a6b8a] mt-0.5"><FileText className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Creator</p>
                  <Link href={`/address/${addrInfo.creator_address_hash}`} className="text-[#00d4ff] hover:text-[#5be5ff] text-sm font-mono transition-colors">
                    {shortenHash(addrInfo.creator_address_hash)}
                  </Link>
                </div>
              </div>
            )}

            {/* Exchange Rate */}
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="text-[#3a6b8a] mt-0.5"><Clock className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">QIE Price</p>
                <p className="text-white text-sm">${parseFloat(addrInfo.exchange_rate || "0").toFixed(6)}</p>
              </div>
            </div>

            {/* Has Tokens */}
            <div className="px-6 py-4 flex items-start gap-4">
              <div className="text-[#3a6b8a] mt-0.5"><Layers className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">Tokens</p>
                <p className="text-white text-sm">{addrInfo.has_tokens ? "Yes" : "None"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">
              Transactions ({txData.items.length})
            </h3>
          </div>
          {txData.items.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#3a6b8a]">No transactions found</div>
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
          )}
        </div>
      </main>
    </div>
  );
}
