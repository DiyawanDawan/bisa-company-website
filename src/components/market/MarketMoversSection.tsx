import MarketPercentBadge from '@/components/market/MarketPercentBadge';
import MarketSectionHeader from '@/components/market/MarketSectionHeader';
import {
  CATEGORY_LABELS,
  gainers,
  losers,
  percentChange,
  trendColorFromType,
} from '@/lib/marketTrendMetrics';
import type { MarketTrendItem } from '@/lib/marketApi';

function MoverRow({
  trend,
  onSelect,
}: {
  trend: MarketTrendItem;
  onSelect?: (t: MarketTrendItem) => void;
}) {
  const change = percentChange(trend);
  const color = trendColorFromType(trend.trendType);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(trend)}
      className="flex w-full items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-left last:border-b-0 hover:bg-slate-50"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        style={{ color, backgroundColor: `${color}18` }}
      >
        {trend.label.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-elevarm-black">{trend.label}</p>
        <p className="truncate text-xs text-slate-500">
          {CATEGORY_LABELS[trend.category] ?? trend.category}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs font-bold text-elevarm-black">{trend.currentValue}</p>
        <MarketPercentBadge percent={change} compact />
      </div>
    </button>
  );
}

export default function MarketMoversSection({
  trends,
  onSelect,
  onSeeAll,
}: {
  trends: MarketTrendItem[];
  onSelect?: (t: MarketTrendItem) => void;
  onSeeAll?: () => void;
}) {
  const up = gainers(trends);
  const down = losers(trends);
  if (up.length === 0 && down.length === 0) return null;

  const Section = ({ title, items }: { title: string; items: MarketTrendItem[] }) =>
    items.length === 0 ? null : (
      <div>
        <MarketSectionHeader title={title} onSeeAll={onSeeAll} />
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {items.map((t) => (
            <MoverRow key={t.id} trend={t} onSelect={onSelect} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="space-y-3.5">
      <Section title="Harga naik" items={up} />
      <Section title="Harga turun" items={down} />
    </div>
  );
}
