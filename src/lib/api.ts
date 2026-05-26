const BASE_URL = "https://testnet.qie.digital/api/v2";

export interface NetworkStats {
  average_block_time: number;
  coin_image: string;
  coin_price: string;
  coin_price_change_percentage: number;
  gas_prices: { slow: number; average: number; fast: number };
  gas_used_today: string;
  market_cap: string;
  network_utilization_percentage: number;
  total_addresses: string;
  total_blocks: string;
  total_transactions: string;
  transactions_today: string;
  tvl: string | null;
}

export interface Transaction {
  hash: string;
  block: number;
  timestamp: string;
  from: { hash: string; name?: string };
  to: { hash: string; name?: string };
  value: string;
  method: string;
  status: string;
  gas_used: string;
  gas_price: string;
  fee: { value: string };
}

export interface Block {
  height: number;
  hash: string;
  timestamp: string;
  tx_count: number;
  gas_used: string;
  gas_limit: string;
  miner: { hash: string; name?: string };
  size: string;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  type: string;
  holders: string;
  exchange_rate: string | null;
  icon_url: string | null;
  total_supply: string;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getStats(): Promise<NetworkStats> {
  return fetchAPI<NetworkStats>("/stats");
}

export async function getTransactions(
  limit = 10
): Promise<{ items: Transaction[] }> {
  return fetchAPI(`/transactions?limit=${limit}`);
}

export async function getBlocks(limit = 10): Promise<{ items: Block[] }> {
  return fetchAPI(`/blocks?limit=${limit}`);
}

export async function getTokens(
  limit = 10
): Promise<{ items: Token[] }> {
  return fetchAPI(`/tokens?limit=${limit}`);
}

// Chart data: derive from stats
export function buildChartData(stats: NetworkStats) {
  const price = parseFloat(stats.coin_price);
  const priceChange = stats.coin_price_change_percentage;
  const priceBefore = price / (1 + priceChange / 100);

  return {
    networkOverview: [
      { label: "Total Blocks", value: parseInt(stats.total_blocks) },
      { label: "Total Txs", value: parseInt(stats.total_transactions) },
      { label: "Addresses", value: parseInt(stats.total_addresses) },
      { label: "Txs Today", value: parseInt(stats.transactions_today) },
    ],
    priceData: [
      { label: "Previous", value: priceBefore },
      { label: "Current", value: price },
    ],
    gasData: [
      { label: "Slow", value: stats.gas_prices.slow },
      { label: "Average", value: stats.gas_prices.average },
      { label: "Fast", value: stats.gas_prices.fast },
    ],
  };
}
