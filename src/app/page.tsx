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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">QIE Lens</h1>
              <p className="text-gray-500 text-xs">
                QIE Blockchain Explorer & Analytics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400 text-sm">Testnet</span>
            </div>
            {stats.coin_price && (
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  ${parseFloat(stats.coin_price).toFixed(4)}
                </div>
                <div
                  className={`text-xs ${
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Blocks"
            value={formatNumber(stats.total_blocks)}
            icon={<Blocks className="w-5 h-5" />}
          />
          <StatCard
            title="Total Transactions"
            value={formatNumber(stats.total_transactions)}
            subtitle={`${formatNumber(stats.transactions_today)} today`}
            icon={<ArrowRightLeft className="w-5 h-5" />}
          />
          <StatCard
            title="Total Addresses"
            value={formatNumber(stats.total_addresses)}
            icon={<Wallet className="w-5 h-5" />}
          />
          <StatCard
            title="Market Cap"
            value={`$${formatNumber(stats.market_cap)}`}
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <NetworkChart
              data={chartData.networkOverview}
              title="Network Overview"
            />
          </div>
          <GasPriceCard gasPrices={stats.gas_prices} />
        </div>

        {/* Network Stats Bar */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-500 text-xs uppercase mb-1">
                Block Time
              </p>
              <p className="text-white font-bold">
                {(stats.average_block_time / 1000).toFixed(1)}s
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase mb-1">
                Gas Used Today
              </p>
              <p className="text-white font-bold">
                {formatNumber(stats.gas_used_today)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase mb-1">
                Network Utilization
              </p>
              <p className="text-white font-bold">
                {stats.network_utilization_percentage}%
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase mb-1">
                Avg Gas Price
              </p>
              <p className="text-white font-bold">
                {stats.gas_prices.average} Gwei
              </p>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BlockTable blocks={blockData.items} />
          <TransactionTable transactions={txData.items} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            QIE Lens — Built for QIE Hackathon 2026
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://testnet.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 text-sm"
            >
              Explorer
            </a>
            <a
              href="https://docs.qie.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 text-sm"
            >
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
