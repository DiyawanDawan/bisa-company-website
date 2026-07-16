'use client';

import { useMemo } from 'react';
import type { ApexOptions } from 'apexcharts';
import GisReactApexChart from '@/components/charts/GisReactApexChart';
import { buildGisLineChartOptions } from '@/lib/gisApexChartOptions';
import {
  indikatorMeta,
  productivity,
  type IndikatorType,
  type YearlyStat,
} from '@/data/gisDashboardContent';

type SeriesItem = { name: string; data: number[] };

function buildSeries(indikator: IndikatorType, data: YearlyStat[]): SeriesItem[] {
  switch (indikator) {
    case 'Produksi':
      return [{ name: 'Produksi', data: data.map((row) => row.production) }];
    case 'Luas Panen':
      return [{ name: 'Luas Panen', data: data.map((row) => row.harvestArea) }];
    case 'Produktivitas':
      return [{ name: 'Produktivitas', data: data.map((row) => productivity(row)) }];
    case 'Supply Demand':
      return [
        { name: 'Supply', data: data.map((row) => row.supply) },
        { name: 'Demand', data: data.map((row) => row.demand) },
      ];
    default:
      return [{ name: 'Produksi', data: data.map((row) => row.production) }];
  }
}

function seriesColors(indikator: IndikatorType): string[] {
  switch (indikator) {
    case 'Luas Panen':
      return ['#ea580c'];
    case 'Produktivitas':
      return ['#2563eb'];
    case 'Supply Demand':
      return ['#166534', '#ea580c'];
    default:
      return ['#166534'];
  }
}

export default function GisIndicatorLineChart({
  indikator,
  data,
  compact = false,
  height = compact ? 260 : 320,
}: {
  indikator: IndikatorType;
  data: YearlyStat[];
  compact?: boolean;
  height?: number;
}) {
  const meta = indikatorMeta[indikator];
  const categories = data.map((row) => String(row.year));
  const series = useMemo(() => buildSeries(indikator, data), [indikator, data]);
  const colors = seriesColors(indikator);

  const options: ApexOptions = useMemo(
    () =>
      buildGisLineChartOptions(meta.chartTitle, categories, meta.unit, colors, {
        height,
        showTitle: !compact,
      }),
    [meta.chartTitle, meta.unit, categories, colors, height, compact],
  );

  if (data.length === 0) {
    return <p className="py-12 text-center text-sm text-slate-500">Tidak ada data untuk rentang tahun ini.</p>;
  }

  return (
    <div className="w-full">
      {!compact && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="inline-flex items-center rounded-full bg-elevarm-cobalt/10 px-2.5 py-1 text-[11px] font-bold text-elevarm-cobalt">
            Indikator: {indikator}
          </span>
          <span className="text-[11px] text-slate-500">Satuan: {meta.unit}</span>
        </div>
      )}
      {compact && (
        <p className="mb-2 text-[11px] text-slate-500 px-1">Satuan: {meta.unit}</p>
      )}
      <div className="max-w-full overflow-x-auto">
        <GisReactApexChart options={options} series={series} type="line" height={height} />
      </div>
    </div>
  );
}
