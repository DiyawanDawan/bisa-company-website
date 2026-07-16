import { mapLegend, type IndikatorType } from '@/data/gisDashboardContent';

export default function GisMapLegend({
  compact = false,
  title = 'Legenda Supply (ton)',
}: {
  compact?: boolean;
  title?: string;
}) {
  return (
    <div
      className={`gis-legend-panel ${compact ? 'gis-legend-compact' : ''}`}
      aria-label={title}
    >
      <p className="gis-legend-title">{title}</p>
      <div className="gis-legend-items">
        {mapLegend.map((item) => (
          <span key={item.label} className="gis-legend-item">
            <span className="gis-legend-swatch" style={{ backgroundColor: item.color, borderColor: item.color }} />
            <span>{item.label}</span>
          </span>
        ))}
        <span className="gis-legend-item">
          <span className="gis-legend-swatch gis-legend-swatch-muted" />
          <span>Tanpa data</span>
        </span>
      </div>
    </div>
  );
}
