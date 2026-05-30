import {
  getStats,
  getTransactions,
  getBlocks,
  buildChartData,
} from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import StatCard from "@/components/StatCard";
import NetworkChart from "@/components/NetworkChart";
import TransactionTable from "@/components/TransactionTable";
import BlockTable from "@/components/BlockTable";
import GasPriceCard from "@/components/GasPriceCard";
import Link from "next/link";
import {
  Activity,
  Blocks,
  ArrowRightLeft,
  Wallet,
  DollarSign,
  Coins,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  let stats, txData, blockData;
  try {
    [stats, txData, blockData] = await Promise.all([
      getStats(),
      getTransactions(10),
      getBlocks(10),
    ]);
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#020a18] text-white grid-bg flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠</span>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Failed to load data</h2>
          <p className="text-sm text-[#5a8aaa] mb-4">
            {error instanceof Error ? error.message : 'Could not connect to the QIE network. Please try again.'}
          </p>
          <a
            href="/"
            className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition-colors"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }

  const chartData = buildChartData(stats);

  return (
    <div className="min-h-screen bg-[#020a18] text-white grid-bg">
      {/* Ambient lens glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00d4ff]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[300px] bg-[#0091b3]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-[#0c2a4a] bg-[#020a18]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="QIE Lens"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span className="cyan-gradient-text">QIE</span>{" "}
                <span className="text-white/80 font-light">Lens</span>
              </h1>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest font-medium">
                Blockchain Explorer & Analytics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/tokens" className="text-[#3a6b8a] hover:text-[#00d4ff] text-xs font-medium transition-colors flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                Tokens
              </Link>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-[#061024] border border-[#0c2a4a] rounded-xl px-3 py-2">
              <div className="w-2 h-2 bg-[#00d4ff] rounded-full pulse-dot" />
              <span className="text-[#3a6b8a] text-xs font-medium">Testnet</span>
            </div>
            {stats.coin_price && (
              <div className="text-right bg-[#061024] border border-[#0c2a4a] rounded-xl px-3 py-2">
                <div className="text-sm font-semibold text-white">
                  ${parseFloat(stats.coin_price).toFixed(4)}
                </div>
                <div
                  className={`text-xs font-medium ${
                    stats.coin_price_change_percentage >= 0
                      ? "text-[#5be5ff]"
                      : "text-red-400"
                  }`}
                >
                  {stats.coin_price_change_percentage >= 0 ? "+" : ""}
                  {stats.coin_price_change_percentage.toFixed(2)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Search Bar */}
        <div className="flex justify-center fade-in">
          <SearchBar />
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
          <StatCard
            title="Total Blocks"
            value={formatNumber(stats.total_blocks)}
            icon={<Blocks className="w-4 h-4" />}
          />
          <StatCard
            title="Total Transactions"
            value={formatNumber(stats.total_transactions)}
            subtitle={`${formatNumber(stats.transactions_today)} today`}
            icon={<ArrowRightLeft className="w-4 h-4" />}
          />
          <StatCard
            title="Total Addresses"
            value={formatNumber(stats.total_addresses)}
            icon={<Wallet className="w-4 h-4" />}
          />
          <StatCard
            title="Market Cap"
            value={`$${formatNumber(stats.market_cap)}`}
            icon={<DollarSign className="w-4 h-4" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="lg:col-span-2">
            <NetworkChart
              data={chartData.networkOverview}
              title="Network Overview"
            />
          </div>
          <GasPriceCard gasPrices={stats.gas_prices} />
        </div>

        {/* Network Stats Bar */}
        <div className="bg-[#061024] border border-[#0c2a4a] rounded-2xl p-6 lens-ring fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest mb-2 font-medium">
                Block Time
              </p>
              <p className="text-white font-bold text-lg">
                {(stats.average_block_time / 1000).toFixed(1)}
                <span className="text-[#2a5a7a] text-xs font-normal ml-1">sec</span>
              </p>
            </div>
            <div>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest mb-2 font-medium">
                Gas Used Today
              </p>
              <p className="text-white font-bold text-lg">
                {formatNumber(stats.gas_used_today)}
              </p>
            </div>
            <div>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest mb-2 font-medium">
                Network Utilization
              </p>
              <p className="text-white font-bold text-lg">
                {stats.network_utilization_percentage}
                <span className="text-[#2a5a7a] text-xs font-normal ml-1">%</span>
              </p>
            </div>
            <div>
              <p className="text-[#2a5a7a] text-[10px] uppercase tracking-widest mb-2 font-medium">
                Avg Gas Price
              </p>
              <p className="text-white font-bold text-lg">
                {stats.gas_prices.average}
                <span className="text-[#2a5a7a] text-xs font-normal ml-1">Gwei</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 fade-in" style={{ animationDelay: "0.3s" }}>
          <BlockTable blocks={blockData.items} />
          <TransactionTable transactions={txData.items} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0c2a4a] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#00d4ff] to-[#0091b3] rounded-lg flex items-center justify-center">
              <Activity className="w-3 h-3 text-white" />
            </div>
            <p className="text-[#1a3a5a] text-sm">
              QIE Lens — Built for QIE Hackathon 2026
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://testnet.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a5a7a] hover:text-[#5a8aaa] text-sm transition-colors"
            >
              Explorer
            </a>
            <a
              href="https://docs.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a5a7a] hover:text-[#5a8aaa] text-sm transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/ulsreall/qie-lens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2a5a7a] hover:text-[#5a8aaa] text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
