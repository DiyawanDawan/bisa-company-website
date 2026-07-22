'use client';

import MarketCmcTable from '@/components/market/MarketCmcTable';
import MarketFeaturedChart from '@/components/market/MarketFeaturedChart';
import MarketIndexCarousel from '@/components/market/MarketIndexCarousel';
import MarketMoversSection from '@/components/market/MarketMoversSection';
import MarketOverviewKpis from '@/components/market/MarketOverviewKpis';
import MarketPercentBadge from '@/components/market/MarketPercentBadge';
import MarketSectionHeader from '@/components/market/MarketSectionHeader';
import GisReactApexChart from '@/components/charts/GisReactApexChart';
import PageBackLink from '@/components/PageBackLink';
import AppDownloadSection from '@/components/AppDownloadSection';
import {
  featuredTrend,
  formatChartValue,
  normalizeHistory,
  percentChange,
  trendColorFromChange,
} from '@/lib/marketTrendMetrics';
import {
  fetchMarketTrends,
  type MarketCategoryFilter,
  type MarketTrendItem,
} from '@/lib/marketApi';
import type { ApexOptions } from 'apexcharts';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const CATEGORY_OPTIONS: { id: MarketCategoryFilter; label: string }[] = [
  { id: '', label: 'Semua' },
  { id: 'CARBON', label: 'Karbon' },
  { id: 'BIOMASSA', label: 'Biomassa' },
  { id: 'LOGISTICS', label: 'Logistik' },
];

export default function MarketInsightView() {
  const [items, setItems] = useState<MarketTrendItem[]>([]);
  const [category, setCategory] = useState<MarketCategoryFilter>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMarketTrends(category || undefined);
      setItems(data);
      setSelectedId((prev) =>
        prev && data.some((t) => t.id === prev) ? prev : data[0]?.id ?? null,
      );
    } catch {
      setError('Gagal memuat tren pasar. Pastikan backend BISA aktif.');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  const selected = useMemo(
    () => items.find((t) => t.id === selectedId) ?? items[0] ?? null,
    [items, selectedId],
  );

  const featured = useMemo(() => featuredTrend(items), [items]);

  const selectedChart = useMemo(() => {
    if (!selected) return { categories: [] as string[], values: [] as number[] };
    const h = normalizeHistory(selected.historyData);
    return { categories: h.map((p) => p.x), values: h.map((p) => p.y) };
  }, [selected]);

  const detailOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'area', height: 260, toolbar: { show: false }, fontFamily: 'inherit' },
      colors: selected ? [trendColorFromChange(percentChange(selected))] : ['#135122'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2.5 },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.3, opacityTo: 0.05 } },
      grid: { borderColor: '#e2e8f0' },
      xaxis: {
        categories: selectedChart.categories,
        labels: { style: { colors: '#64748b', fontSize: '10px' } },
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: (v: number) => formatChartValue(v),
          style: { colors: '#64748b', fontSize: '10px' },
        },
      },
    }),
    [selected, selectedChart.categories],
  );

  const scrollToList = () => listRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 pt-header pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageBackLink />
        <div className="mt-6 space-y-3.5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-elevarm-cobalt">
              Markets / Biomassa
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-elevarm-black sm:text-3xl">
              Market Intelligence
            </h1>
            <p className="mt-1 text-sm text-elevarm-grey">
              Dashboard harga komoditas biomassa — gaya TradingView & CoinMarketCap.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.id || 'all'}
                type="button"
                onClick={() => setCategory(opt.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  category === opt.id
                    ? 'bg-elevarm-cobalt text-white'
                    : 'bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50"
            >
              Segarkan
            </button>
          </div>

          {error && !loading && items.length === 0 && (
            <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
              Tidak ada data untuk filter ini.
            </p>
          ) : (
            <>
              <MarketOverviewKpis trends={items} />
              {featured && (
                <MarketFeaturedChart trend={featured} onSelect={(t) => setSelectedId(t.id)} />
              )}
              <div>
                <MarketSectionHeader title="Komoditas utama" onSeeAll={scrollToList} />
                <MarketIndexCarousel trends={items} onSelect={(t) => setSelectedId(t.id)} />
              </div>
              <MarketMoversSection
                trends={items}
                onSelect={(t) => setSelectedId(t.id)}
                onSeeAll={scrollToList}
              />
              <div ref={listRef}>
                <MarketSectionHeader title="Harga pasar hari ini" />
                <MarketCmcTable trends={items} onSelect={(t) => setSelectedId(t.id)} />
              </div>
              {selected && selectedChart.values.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase text-slate-400">Detail</p>
                      <h2 className="text-sm font-extrabold text-elevarm-black">{selected.label}</h2>
                    </div>
                    <MarketPercentBadge percent={percentChange(selected)} />
                  </div>
                  <GisReactApexChart
                    type="area"
                    height={260}
                    options={detailOptions}
                    series={[{ name: selected.label, data: selectedChart.values }]}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-12">
          <AppDownloadSection />
        </div>
      </div>
    </div>
  );
}
