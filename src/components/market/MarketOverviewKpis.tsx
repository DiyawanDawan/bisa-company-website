import MarketSparkline from '@/components/market/MarketSparkline';
import {
  averageChange,
  featuredTrend,
  formatPercent,
  topMoverLabel,
  trendColorFromChange,
} from '@/lib/marketTrendMetrics';
import type { MarketTrendItem } from '@/lib/marketApi';

function KpiCard({
  label,
  value,
  sub,
  color,
  wide,
  sparklineTrend,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
  wide?: boolean;
  sparklineTrend?: MarketTrendItem | null;
}) {
  return (
    <div
      className={`shrink-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm ${
        wide ? 'w-[150px]' : 'w-[118px]'
      }`}
    >
      <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="mt-1 flex items-end justify-between gap-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold" style={{ color }}>
            {value}
          </p>
          <p className="truncate text-[10px] text-slate-400">{sub}</p>
        </div>
        {sparklineTrend && sparklineTrend.historyData && sparklineTrend.historyData.length > 1 && (
          <MarketSparkline trend={sparklineTrend} width={44} height={24} />
        )}
      </div>
    </div>
  );
}

export default function MarketOverviewKpis({ trends }: { trends: MarketTrendItem[] }) {
  const up = trends.filter((t) => t.trendType === 'UP').length;
  const down = trends.filter((t) => t.trendType === 'DOWN').length;
  const avg = averageChange(trends);
  const top = featuredTrend(trends);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <KpiCard label="Naik" value={String(up)} sub="Komoditas naik" color="#135122" />
      <KpiCard label="Turun" value={String(down)} sub="Komoditas turun" color="#dc2626" />
      <KpiCard
        label="Rata-rata"
        value={formatPercent(avg)}
        sub="Perubahan rata-rata"
        color={trendColorFromChange(avg)}
        sparklineTrend={top}
      />
      <KpiCard
        label="Top mover"
        value={topMoverLabel(trends)}
        sub={top?.currentValue ?? '—'}
        color="#135122"
        wide
        sparklineTrend={top}
      />
    </div>
  );
}
