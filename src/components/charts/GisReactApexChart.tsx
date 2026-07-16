'use client';

import dynamic from 'next/dynamic';
import type { Props as ApexChartProps } from 'react-apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function GisReactApexChart(props: ApexChartProps) {
  return <ReactApexChart {...props} />;
}
