'use client';

import GisReactApexChart from '@/components/charts/GisReactApexChart';
import MarketPercentBadge from '@/components/market/MarketPercentBadge';
import {
  formatChartValue,
  normalizeHistory,
  percentChange,
  sliceHistory,
  trendColorFromChange,
  type MarketChartRange,
} from '@/lib/marketTrendMetrics';
import type { MarketTrendItem } from '@/lib/marketApi';
import type { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';

const RANGE_OPTIONS: { id: MarketChartRange; label: string }[] = [
  { id: '1m', label: '1B' },
  { id: '3m', label: '3B' },
  { id: 'all', label: 'Semua' },
];

export default function MarketFeaturedChart({
  trend,
  onSelect,
}: {
  trend: MarketTrendItem;
  onSelect?: (t: MarketTrendItem) => void;
}) {
  const [range, setRange] = useState<MarketChartRange>('3m');
  const change = percentChange(trend);
  const color = trendColorFromChange(change);

  const chart = useMemo(() => {
    const sliced = sliceHistory(normalizeHistory(trend.historyData), range);
    return {
      categories: sliced.map((p) => p.x),
      values: sliced.map((p) => p.y),
    };
  }, [trend, range]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        height: 220,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
      },
      colors: [color],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: { opacityFrom: 0.3, opacityTo: 0.04 },
      },
      grid: {
        borderColor: '#e2e8f0',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
      },
      xaxis: {
        categories: chart.categories,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        opposite: true,
        labels: {
          formatter: (v: number) => formatChartValue(v),
          style: { colors: '#94a3b8', fontSize: '10px' },
        },
      },
      tooltip: { y: { formatter: (v: number) => formatChartValue(v) } },
    }),
    [chart.categories, color],
  );

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      onClick={() => onSelect?.(trend)}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="border-b border-slate-100 px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Markets / Biomassa
        </p>
        <div className="mt-1 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-extrabold text-elevarm-black">{trend.label}</h3>
            <p className="text-xl font-black text-elevarm-cobalt">{trend.currentValue}</p>
          </div>
          <MarketPercentBadge percent={change} />
        </div>
      </div>
      {chart.values.length > 0 ? (
        <GisReactApexChart
          type="area"
          height={220}
          options={options}
          series={[{ name: trend.label, data: chart.values }]}
        />
      ) : (
        <p className="py-12 text-center text-sm text-slate-500">Belum ada riwayat harga.</p>
      )}
      <div className="flex gap-1 border-t border-slate-100 px-3 py-2">
        {RANGE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setRange(opt.id);
            }}
            className={`border-b-2 px-3 py-1 text-xs font-semibold transition ${
              range === opt.id
                ? 'border-elevarm-black text-elevarm-black'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
