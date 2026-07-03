"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function detectType(q: string): string | null {
    const trimmed = q.trim();
    // Transaction hash: 0x + 64 hex chars
    if (/^0x[0-9a-fA-F]{64}$/.test(trimmed)) return "tx";
    // Address: 0x + 40 hex chars
    if (/^0x[0-9a-fA-F]{40}$/.test(trimmed)) return "address";
    // Block number: pure digits
    if (/^\d+$/.test(trimmed)) return "block";
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const type = detectType(query);
    const trimmed = query.trim();

    if (type === "tx") {
      router.push(`/tx/${trimmed}`);
    } else if (type === "block") {
      router.push(`/block/${trimmed}`);
    } else if (type === "address") {
      router.push(`/address/${trimmed}`);
    } else {
      setError("Enter a block number, tx hash (0x...64), or address (0x...40)");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a6b8a]" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setError(""); }}
          placeholder="Search by block number, tx hash, or address..."
          className="w-full bg-[#061024] border border-[#0c2a4a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#2a5a7a] focus:outline-none focus:border-[#00d4ff]/40 focus:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all"
        />
      </div>
      {error && (
        <p className="absolute top-full left-0 mt-1 text-xs text-red-400">{error}</p>
      )}
    </form>
  );
}
