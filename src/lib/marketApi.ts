export type MarketHistoryPoint = { x: string; y: number };

export type MarketTrendItem = {
  id: string;
  label: string;
  currentValue: string;
  trendType: 'UP' | 'DOWN' | 'STABLE' | string;
  category: string;
  updatedAt?: string;
  historyData?: MarketHistoryPoint[] | null;
};

export type MarketCategoryFilter = '' | 'CARBON' | 'BIOMASSA' | 'LOGISTICS';

type ApiMeta = { success: boolean; status: number; message: string };
type ListResponse<T> = { meta: ApiMeta; data: T };

const API_BASE = '/api/backend';

async function marketFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Market API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchMarketTrends(
  category?: MarketCategoryFilter,
): Promise<MarketTrendItem[]> {
  const qs = category ? `?category=${category}` : '';
  const res = await marketFetch<ListResponse<MarketTrendItem[]>>(`/market/trends${qs}`);
  return res.data ?? [];
}
