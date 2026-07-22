type Props = {
  title: string;
  onSeeAll?: () => void;
};

export default function MarketSectionHeader({ title, onSeeAll }: Props) {
  return (
    <div
      className={onSeeAll ? 'mb-1.5 flex cursor-pointer items-center justify-between' : 'mb-1.5'}
      onClick={onSeeAll}
      onKeyDown={onSeeAll ? (e) => e.key === 'Enter' && onSeeAll() : undefined}
      role={onSeeAll ? 'button' : undefined}
      tabIndex={onSeeAll ? 0 : undefined}
    >
      <h2 className="text-sm font-extrabold text-elevarm-black">
        {title}
        {onSeeAll ? ' ›' : ''}
      </h2>
      {onSeeAll && (
        <span className="text-xs font-semibold text-elevarm-cobalt">Lihat semua</span>
      )}
    </div>
  );
}
