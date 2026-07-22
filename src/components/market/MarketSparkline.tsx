import {
  normalizeHistory,
  percentChange,
  trendColorFromChange,
} from '@/lib/marketTrendMetrics';
import type { MarketTrendItem } from '@/lib/marketApi';

type Props = {
  trend: MarketTrendItem;
  width?: number;
  height?: number;
  className?: string;
};

export default function MarketSparkline({
  trend,
  width = 56,
  height = 28,
  className = '',
}: Props) {
  const points = normalizeHistory(trend.historyData);
  if (points.length < 2) {
    return <svg width={width} height={height} className={className} aria-hidden />;
  }

  const values = points.map((p) => p.y);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const color = trendColorFromChange(percentChange(trend));

  const coords = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const area = `M0,${height} L${coords.join(' L')} L${width},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path d={area} fill={color} fillOpacity={0.12} />
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
