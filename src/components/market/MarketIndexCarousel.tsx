import MarketPercentBadge from '@/components/market/MarketPercentBadge';
import {
  CATEGORY_LABELS,
  percentChange,
  trendColorFromType,
} from '@/lib/marketTrendMetrics';
import type { MarketTrendItem } from '@/lib/marketApi';

export default function MarketIndexCarousel({
  trends,
  onSelect,
}: {
  trends: MarketTrendItem[];
  onSelect?: (t: MarketTrendItem) => void;
}) {
  if (trends.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {trends.map((trend) => {
        const change = percentChange(trend);
        const color = trendColorFromType(trend.trendType);
        return (
          <button
            key={trend.id}
            type="button"
            onClick={() => onSelect?.(trend)}
            className="w-[min(56vw,220px)] shrink-0 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-elevarm-cobalt/40"
          >
            <div className="flex items-start gap-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ color, backgroundColor: `${color}18` }}
              >
                {trend.label.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-500">{trend.label}</p>
                <p className="truncate text-sm font-extrabold text-elevarm-black">
                  {trend.currentValue}
                </p>
                <div className="mt-1">
                  <MarketPercentBadge percent={change} compact />
                </div>
                <p className="mt-1 truncate text-[10px] text-slate-400">
                  {CATEGORY_LABELS[trend.category] ?? trend.category}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
