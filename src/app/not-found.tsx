import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020a18] text-white grid-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-[#00d4ff]" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-[#3a6b8a] text-lg mb-6">Block or transaction not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/20 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
