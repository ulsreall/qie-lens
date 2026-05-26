import {
  getStats,
  getTransactions,
  getBlocks,
  buildChartData,
} from "@/lib/api";
import StatCard from "@/components/StatCard";
import NetworkChart from "@/components/NetworkChart";
import TransactionTable from "@/components/TransactionTable";
import BlockTable from "@/components/BlockTable";
import GasPriceCard from "@/components/GasPriceCard";
import {
  Activity,
  Blocks,
  ArrowRightLeft,
  Wallet,
  DollarSign,
  Zap,
} from "lucide-react";

function formatNumber(n: string | number) {
  const num = typeof n === "string" ? parseInt(n) : n;
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

export default async function Home() {
  const [stats, txData, blockData] = await Promise.all([
    getStats(),
    getTransactions(10),
    getBlocks(10),
  ]);

  const chartData = buildChartData(stats);

  return (
    <div className="min-h-screen bg-[#030712] text-white grid-bg">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-[#1e293b] bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">QIE Lens</h1>
              <p className="text-[#475569] text-xs">
                QIE Blockchain Explorer & Analytics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#0a0f1e] border border-[#1e293b] rounded-xl px-3 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
              <span className="text-[#64748b] text-xs font-medium">Testnet</span>
            </div>
            {stats.coin_price && (
              <div className="text-right bg-[#0a0f1e] border border-[#1e293b] rounded-xl px-3 py-2">
                <div className="text-sm font-semibold text-white">
                  ${parseFloat(stats.coin_price).toFixed(4)}
                </div>
                <div
                  className={`text-xs font-medium ${
                    stats.coin_price_change_percentage >= 0
                      ? "text-green-400"
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in">
          <StatCard
            title="Total Blocks"
            value={formatNumber(stats.total_blocks)}
            icon={<Blocks className="w-4 h-4" />}
            gradient="from-blue-500/10 to-blue-600/5"
          />
          <StatCard
            title="Total Transactions"
            value={formatNumber(stats.total_transactions)}
            subtitle={`${formatNumber(stats.transactions_today)} today`}
            icon={<ArrowRightLeft className="w-4 h-4" />}
            gradient="from-purple-500/10 to-purple-600/5"
          />
          <StatCard
            title="Total Addresses"
            value={formatNumber(stats.total_addresses)}
            icon={<Wallet className="w-4 h-4" />}
            gradient="from-cyan-500/10 to-cyan-600/5"
          />
          <StatCard
            title="Market Cap"
            value={`$${formatNumber(stats.market_cap)}`}
            icon={<DollarSign className="w-4 h-4" />}
            gradient="from-green-500/10 to-green-600/5"
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
        <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl p-6 fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-[#475569] text-[10px] uppercase tracking-wider mb-2 font-medium">
                Block Time
              </p>
              <p className="text-white font-bold text-lg">
                {(stats.average_block_time / 1000).toFixed(1)}
                <span className="text-[#475569] text-xs font-normal ml-1">sec</span>
              </p>
            </div>
            <div>
              <p className="text-[#475569] text-[10px] uppercase tracking-wider mb-2 font-medium">
                Gas Used Today
              </p>
              <p className="text-white font-bold text-lg">
                {formatNumber(stats.gas_used_today)}
              </p>
            </div>
            <div>
              <p className="text-[#475569] text-[10px] uppercase tracking-wider mb-2 font-medium">
                Network Utilization
              </p>
              <p className="text-white font-bold text-lg">
                {stats.network_utilization_percentage}
                <span className="text-[#475569] text-xs font-normal ml-1">%</span>
              </p>
            </div>
            <div>
              <p className="text-[#475569] text-[10px] uppercase tracking-wider mb-2 font-medium">
                Avg Gas Price
              </p>
              <p className="text-white font-bold text-lg">
                {stats.gas_prices.average}
                <span className="text-[#475569] text-xs font-normal ml-1">Gwei</span>
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
      <footer className="border-t border-[#1e293b] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-3 h-3 text-white" />
            </div>
            <p className="text-[#334155] text-sm">
              QIE Lens — Built for QIE Hackathon 2026
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://testnet.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#94a3b8] text-sm transition-colors"
            >
              Explorer
            </a>
            <a
              href="https://docs.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#94a3b8] text-sm transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/ulsreall/qie-lens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#475569] hover:text-[#94a3b8] text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
