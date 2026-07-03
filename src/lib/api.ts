const BASE_URL = "https://mainnet.qie.digital/api/v2";

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
  block_number: number;
  timestamp: string;
  from: { hash: string; name?: string };
  to: { hash: string; name?: string };
  value: string;
  method: string;
  status: string;
  gas_used: string;
  gas_price: string;
  gas_limit: string;
  fee: { value: string };
  nonce: number;
  type: number;
  confirmations: number;
  input: string;
  decoded_input?: { method_call: string; method_id: string; parameters: unknown[] };
}

export interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transaction_count: number;
  gas_used: string;
  gas_limit: string;
  miner: { hash: string; name?: string };
  size: string;
  parent_hash: string;
  difficulty: string;
  total_difficulty: string;
  base_fee_per_gas: string;
  burnt_fees: string;
  rewards: { reward: string; type: string }[];
  transaction_fees: string;
  nonce: string;
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
  circulating_market_cap: string | null;
  decimals: string;
}

async function fetchAPI<T>(endpoint: string, revalidate = 30): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(10000),
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

export async function getTransaction(hash: string): Promise<Transaction> {
  return fetchAPI(`/transactions/${hash}`);
}

export async function getBlocks(limit = 10): Promise<{ items: Block[] }> {
  return fetchAPI(`/blocks?limit=${limit}`);
}

export async function getBlock(height: number): Promise<Block> {
  return fetchAPI(`/blocks/${height}`);
}

export async function getBlockTransactions(
  height: number,
  limit = 20
): Promise<{ items: Transaction[] }> {
  return fetchAPI(`/blocks/${height}/transactions?limit=${limit}`);
}

export async function getTokens(
  limit = 20
): Promise<{ items: Token[] }> {
  return fetchAPI(`/tokens?limit=${limit}`);
}

// Chart data: derive from stats
export function buildChartData(stats: NetworkStats) {
  return {
    networkOverview: [
      { label: "Total Blocks", value: parseInt(stats.total_blocks) },
      { label: "Total Txs", value: parseInt(stats.total_transactions) },
      { label: "Addresses", value: parseInt(stats.total_addresses) },
      { label: "Txs Today", value: parseInt(stats.transactions_today) },
    ],
  };
}

export interface AddressInfo {
  hash: string;
  name: string | null;
  is_contract: boolean;
  is_verified: boolean;
  coin_balance: string | null;
  exchange_rate: string;
  implementation_name: string | null;
  token: { name: string; symbol: string; type: string; decimals: string } | null;
  has_tokens: boolean;
  has_validated_blocks: boolean;
  creation_transaction_hash: string | null;
  creator_address_hash: string | null;
  ens_domain_name: string | null;
}

export async function getAddress(address: string): Promise<AddressInfo> {
  return fetchAPI(`/addresses/${address}`);
}

export async function getAddressTransactions(
  address: string,
  limit = 20
): Promise<{ items: Transaction[] }> {
  return fetchAPI(`/addresses/${address}/transactions?limit=${limit}`);
}

export async function getAddressTokenTransfers(
  address: string,
  limit = 20
): Promise<{ items: Transaction[] }> {
  return fetchAPI(`/addresses/${address}/token-transfers?limit=${limit}`);
}
