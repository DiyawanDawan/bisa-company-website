import type { ApexOptions } from 'apexcharts';

const GIS_CHART_HEIGHT = 320;

export function buildGisLineChartOptions(
  title: string,
  categories: string[],
  unit: string,
  colors?: string[],
  options?: { height?: number; showTitle?: boolean },
): ApexOptions {
  const height = options?.height ?? GIS_CHART_HEIGHT;
  const showTitle = options?.showTitle ?? true;

  return {
    series: [],
    chart: {
      height,
      type: 'line',
      zoom: { enabled: false },
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: colors ?? ['#166534'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2.5 },
    title: showTitle
      ? {
          text: title,
          align: 'left',
          style: { fontSize: '13px', fontWeight: 600, color: '#334155' },
        }
      : { text: undefined },
    grid: {
      row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
      borderColor: '#e2e8f0',
    },
    markers: {
      size: 4,
      strokeWidth: 0,
      hover: { size: 6 },
    },
    xaxis: {
      categories,
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toFixed(1),
        style: { colors: '#64748b', fontSize: '11px' },
      },
      title: {
        text: unit,
        style: { fontSize: '11px', fontWeight: 500, color: '#64748b' },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      markers: { size: 4 },
    },
    tooltip: {
      y: { formatter: (val: number) => `${val.toFixed(2)} ${unit}` },
    },
  };
}

export function buildGisPieChartOptions(title: string, labels: string[], colors: string[]): ApexOptions {
  return {
    series: [],
    chart: {
      height: GIS_CHART_HEIGHT,
      type: 'pie',
      fontFamily: 'inherit',
    },
    colors,
    labels,
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: { fontSize: '11px', fontWeight: 600 },
    },
    title: {
      text: title,
      align: 'left',
      style: { fontSize: '13px', fontWeight: 600, color: '#334155' },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
    },
    stroke: { width: 1, colors: ['#fff'] },
    tooltip: {
      y: { formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };
}

export { GIS_CHART_HEIGHT };
