import { Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddressLoading() {
  return (
    <div className="min-h-screen bg-[#020a18] text-white grid-bg">
      <header className="border-b border-[#0c2a4a] bg-[#020a18]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#061024] animate-pulse" />
            <div>
              <div className="h-5 w-24 bg-[#061024] rounded animate-pulse mb-1" />
              <div className="h-3 w-32 bg-[#061024] rounded animate-pulse" />
            </div>
          </div>
          <Link href="/" className="text-[#00d4ff] hover:text-[#5be5ff] text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#061024] animate-pulse" />
            <div>
              <div className="h-6 w-32 bg-[#061024] rounded animate-pulse mb-1" />
              <div className="h-4 w-48 bg-[#061024] rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#0c2a4a]">
            <div className="h-4 w-20 bg-[#0a1a30] rounded animate-pulse" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-start gap-4 border-b border-[#0c2a4a]/40 last:border-0">
              <div className="w-4 h-4 bg-[#0a1a30] rounded animate-pulse mt-0.5" />
              <div className="flex-1">
                <div className="h-3 w-16 bg-[#0a1a30] rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-[#0a1a30] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
