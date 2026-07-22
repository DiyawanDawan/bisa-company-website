'use client';

import Link from 'next/link';
import MarketOverviewKpis from '@/components/market/MarketOverviewKpis';
import MarketPercentBadge from '@/components/market/MarketPercentBadge';
import MarketSparkline from '@/components/market/MarketSparkline';
import { fetchMarketTrends, type MarketTrendItem } from '@/lib/marketApi';
import { featuredTrend, percentChange } from '@/lib/marketTrendMetrics';
import { useEffect, useState } from 'react';

export default function MarketHomeTeaser() {
  const [trends, setTrends] = useState<MarketTrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMarketTrends()
      .then((data) => {
        if (!cancelled) setTrends(data.slice(0, 6));
      })
      .catch(() => {
        if (!cancelled) setTrends([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = featuredTrend(trends);

  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-elevarm-cobalt">
              Markets / Biomassa
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-elevarm-black sm:text-3xl">
              Market Intelligence
            </h2>
            <p className="mt-2 max-w-xl text-sm text-elevarm-grey">
              Pantau tren harga komoditas biomassa secara real-time — tampilan ala TradingView &
              CoinMarketCap.
            </p>
          </div>
          <Link
            href="/market"
            className="inline-flex items-center rounded-full bg-elevarm-cobalt px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a4823]"
          >
            Lihat pasar lengkap →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : trends.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Data pasar akan tampil saat backend BISA aktif.{' '}
            <Link href="/market" className="font-semibold text-elevarm-cobalt hover:underline">
              Buka halaman Market
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <MarketOverviewKpis trends={trends} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {trends.slice(0, 3).map((trend) => (
                <Link
                  key={trend.id}
                  href="/market"
                  className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-elevarm-cobalt/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-500">{trend.label}</p>
                      <p className="truncate text-base font-extrabold text-elevarm-black">
                        {trend.currentValue}
                      </p>
                    </div>
                    <MarketPercentBadge percent={percentChange(trend)} compact />
                  </div>
                  {trend.historyData && trend.historyData.length > 1 && (
                    <div className="mt-2">
                      <MarketSparkline trend={trend} width={120} height={32} />
                    </div>
                  )}
                </Link>
              ))}
            </div>
            {featured && (
              <p className="text-center text-xs text-slate-500">
                Top mover:{' '}
                <span className="font-bold text-elevarm-cobalt">{featured.label}</span>{' '}
                {featured.currentValue}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
