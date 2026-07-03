"use client";

import { ArrowLeft, Wallet } from "lucide-react";
import Link from "next/link";

export default function AddressError() {
  return (
    <div className="min-h-screen bg-[#020a18] text-white grid-bg flex items-center justify-center">
      <div className="text-center px-4">
        <Wallet className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Address Not Found</h2>
        <p className="text-[#3a6b8a] text-sm mb-6">Could not load address data. Please check the address and try again.</p>
        <Link href="/" className="text-[#00d4ff] hover:text-[#5be5ff] text-sm flex items-center gap-1 transition-colors mx-auto w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
