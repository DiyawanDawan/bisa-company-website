'use client';

import { useMemo } from 'react';
import type { ApexOptions } from 'apexcharts';
import GisReactApexChart from '@/components/charts/GisReactApexChart';
import { buildGisPieChartOptions } from '@/lib/gisApexChartOptions';
import { indikatorMeta, pieContributions, type IndikatorType } from '@/data/gisDashboardContent';

export default function GisContributionPieChart({ indikator }: { indikator: IndikatorType }) {
  const meta = indikatorMeta[indikator];
  const labels = pieContributions.map((item) => item.name);
  const series = pieContributions.map((item) => item.value);
  const colors = pieContributions.map((item) => item.color);

  const options: ApexOptions = useMemo(
    () => buildGisPieChartOptions(meta.pieTitle, labels, colors),
    [meta.pieTitle, labels, colors],
  );

  return (
    <div className="max-w-full overflow-x-auto">
      <GisReactApexChart options={options} series={series} type="pie" height={320} />
    </div>
  );
}
