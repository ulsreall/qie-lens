import { getTransaction } from "@/lib/api";
import { shortenHash, timeAgo, formatValue } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRightLeft,
  Clock,
  Fuel,
  Hash,
  CheckCircle2,
  XCircle,
  Box,
} from "lucide-react";

function formatFee(fee: { value: string }) {
  if (!fee?.value) return "N/A";
  const val = parseFloat(fee.value) / 1e18;
  if (val === 0) return "0";
  if (val < 0.000001) return "<0.000001";
  return val.toFixed(8);
}

export default async function TxPage({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const { hash } = await params;

  if (!hash || !hash.startsWith("0x")) notFound();

  let tx;
  try {
    tx = await getTransaction(hash);
  } catch {
    notFound();
  }

  const isSuccess = tx.status === "ok";

  const details = [
    { label: "Transaction Hash", value: tx.hash, icon: <Hash className="w-4 h-4" />, mono: true, full: true },
    { label: "Status", value: isSuccess ? "Success" : "Failed", icon: isSuccess ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />, badge: true, success: isSuccess },
    { label: "Block", value: tx.block.toLocaleString(), icon: <Box className="w-4 h-4" />, link: `/block/${tx.block}` },
    { label: "Timestamp", value: `${timeAgo(tx.timestamp)} (${new Date(tx.timestamp).toLocaleString()})`, icon: <Clock className="w-4 h-4" /> },
    { label: "Method", value: tx.decoded_input?.method_call || tx.method || "transfer", icon: <ArrowRightLeft className="w-4 h-4" />, mono: true },
    { label: "From", value: tx.from?.hash, icon: <ArrowRightLeft className="w-4 h-4" />, mono: true, full: true, name: tx.from?.name },
    { label: "To", value: tx.to?.hash, icon: <ArrowRightLeft className="w-4 h-4" />, mono: true, full: true, name: tx.to?.name },
    { label: "Value", value: `${formatValue(tx.value)} QIE`, icon: <ArrowRightLeft className="w-4 h-4" /> },
    { label: "Transaction Fee", value: `${formatFee(tx.fee)} QIE`, icon: <Fuel className="w-4 h-4" /> },
    { label: "Gas Price", value: `${tx.gas_price || "N/A"} Gwei`, icon: <Fuel className="w-4 h-4" /> },
    { label: "Gas Used", value: parseInt(tx.gas_used || "0").toLocaleString(), icon: <Fuel className="w-4 h-4" /> },
    { label: "Gas Limit", value: parseInt(tx.gas_limit || "0").toLocaleString(), icon: <Fuel className="w-4 h-4" /> },
    { label: "Nonce", value: tx.nonce?.toString() || "N/A", icon: <Hash className="w-4 h-4" /> },
    { label: "Type", value: tx.type?.toString() || "N/A", icon: <Hash className="w-4 h-4" /> },
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
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">Transaction Explorer</p>
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
              isSuccess ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
            }`}>
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <p className="text-[#3a6b8a] text-sm font-mono">{shortenHash(tx.hash)}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring mb-6">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <h3 className="text-white text-sm font-semibold">Overview</h3>
          </div>
          <div className="divide-y divide-[#0c2a4a]/40">
            {details.map((item) => (
              <div key={item.label} className="px-6 py-4 flex items-start gap-4">
                <div className="text-[#3a6b8a] mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#3a6b8a] text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  {item.badge ? (
                    <span className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.success ? "bg-[#00d4ff]/10 text-[#5be5ff]" : "bg-red-500/10 text-red-400"
                    }`}>
                      {item.value}
                    </span>
                  ) : item.link ? (
                    <Link href={item.link} className="text-[#00d4ff] hover:text-[#5be5ff] text-sm font-mono transition-colors">
                      {item.value}
                    </Link>
                  ) : (
                    <div>
                      {item.name && <span className="text-[#5a8aaa] text-xs mr-2">{item.name}</span>}
                      <p className={`text-white text-sm ${item.mono ? "font-mono" : ""} ${item.full ? "break-all" : ""}`}>
                        {item.value}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Data */}
        {tx.input && tx.input !== "0x" && (
          <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden lens-ring">
            <div className="px-6 py-4 border-b border-[#0c2a4a]">
              <h3 className="text-white text-sm font-semibold">Input Data</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-[#5a8aaa] text-xs font-mono break-all bg-[#0a1a30] rounded-lg p-4 border border-[#0c2a4a]">
                {tx.input}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
