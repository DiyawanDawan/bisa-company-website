export type IndikatorType = 'Produksi' | 'Luas Panen' | 'Produktivitas' | 'Supply Demand';

export type ProvinceSupply = {
  name: string;
  shortName: string;
  production: number;
  level: 'high' | 'medium' | 'low' | 'very-low';
};

export type YearlyStat = {
  year: number;
  production: number;
  harvestArea: number;
  supply: number;
  demand: number;
};

export type ChartLegendItem = {
  color: string;
  label: string;
  shape: 'bar' | 'line';
};

export type ProvinceContribution = {
  name: string;
  value: number;
  color: string;
};

export type ProvinceTableRow = {
  province: string;
  y2021: number;
  y2022: number;
  y2023: number;
  y2024: number;
  y2025: number;
  growth: number;
};

export const filterOptions = {
  subsektor: ['Hortikultura', 'Padi', 'Palawija', 'Perkebunan', 'Biomassa'],
  komoditas: ['Cabai', 'Kentang', 'Tomat', 'Padi', 'Jagung', 'Sekam', 'Tongkol', 'Tempurung Kelapa'],
  indikator: ['Produksi', 'Luas Panen', 'Produktivitas', 'Supply Demand'] as IndikatorType[],
  tahunAwal: ['2021', '2022', '2023', '2024'],
  tahunAkhir: ['2023', '2024', '2025', '2026'],
};

export const indikatorMeta: Record<
  IndikatorType,
  {
    chartTitle: string;
    pieTitle: string;
    mapLegendTitle: string;
    unit: string;
    legend: ChartLegendItem[];
  }
> = {
  Produksi: {
    chartTitle: 'Tren Produksi Hortikultura',
    pieTitle: 'Kontribusi Produksi per Provinsi',
    mapLegendTitle: 'Legenda Produksi (ton)',
    unit: 'ribu ton',
    legend: [{ color: '#166534', label: 'Produksi', shape: 'bar' }],
  },
  'Luas Panen': {
    chartTitle: 'Tren Luas Panen Hortikultura',
    pieTitle: 'Kontribusi Luas Panen per Provinsi',
    mapLegendTitle: 'Legenda Luas Panen (ha)',
    unit: 'ribu ha',
    legend: [{ color: '#ea580c', label: 'Luas Panen', shape: 'line' }],
  },
  Produktivitas: {
    chartTitle: 'Tren Produktivitas Hortikultura',
    pieTitle: 'Kontribusi Produktivitas per Provinsi',
    mapLegendTitle: 'Legenda Produktivitas (ton/ha)',
    unit: 'ton/ha',
    legend: [{ color: '#2563eb', label: 'Produktivitas', shape: 'bar' }],
  },
  'Supply Demand': {
    chartTitle: 'Perbandingan Supply vs Demand',
    pieTitle: 'Gap Supply–Demand per Provinsi',
    mapLegendTitle: 'Legenda Supply (ton)',
    unit: 'ribu ton',
    legend: [
      { color: '#166534', label: 'Supply', shape: 'bar' },
      { color: '#ea580c', label: 'Demand', shape: 'bar' },
    ],
  },
};

export const mapLegend = [
  { label: '> 2.000.000', color: '#15803d' },
  { label: '1.000.000 - 2.000.000', color: '#84cc16' },
  { label: '500.000 - 1.000.000', color: '#facc15' },
  { label: '100.000 - 500.000', color: '#fb923c' },
  { label: '< 100.000', color: '#ef4444' },
];

export const provinceMapData: ProvinceSupply[] = [
  { name: 'Jawa Barat', shortName: 'Jabar', production: 2450000, level: 'high' },
  { name: 'Jawa Tengah', shortName: 'Jateng', production: 1980000, level: 'medium' },
  { name: 'Jawa Timur', shortName: 'Jatim', production: 3120000, level: 'high' },
  { name: 'DI Yogyakarta', shortName: 'DIY', production: 420000, level: 'low' },
  { name: 'Banten', shortName: 'Banten', production: 680000, level: 'low' },
  { name: 'Lampung', shortName: 'Lampung', production: 890000, level: 'medium' },
  { name: 'Sumatera Selatan', shortName: 'Sumsel', production: 1120000, level: 'medium' },
  { name: 'Sulawesi Selatan', shortName: 'Sulsel', production: 1560000, level: 'medium' },
  { name: 'Kalimantan Selatan', shortName: 'Kalsel', production: 380000, level: 'low' },
  { name: 'Bali', shortName: 'Bali', production: 290000, level: 'very-low' },
  { name: 'Nusa Tenggara Barat', shortName: 'NTB', production: 510000, level: 'low' },
  { name: 'Nusa Tenggara Timur', shortName: 'NTT', production: 240000, level: 'very-low' },
];

export const levelColors: Record<ProvinceSupply['level'], string> = {
  high: '#15803d',
  medium: '#84cc16',
  low: '#facc15',
  'very-low': '#fb923c',
};

export const yearlyStats: YearlyStat[] = [
  { year: 2021, production: 54.2, harvestArea: 10.1, supply: 48.5, demand: 52.0 },
  { year: 2022, production: 55.8, harvestArea: 10.3, supply: 50.1, demand: 53.4 },
  { year: 2023, production: 56.4, harvestArea: 10.2, supply: 51.2, demand: 54.8 },
  { year: 2024, production: 57.1, harvestArea: 10.4, supply: 52.6, demand: 55.9 },
  { year: 2025, production: 58.3, harvestArea: 10.6, supply: 54.0, demand: 57.2 },
];

export function productivity(stat: YearlyStat): number {
  return stat.production / stat.harvestArea;
}

export function filterYearlyStats(stats: YearlyStat[], tahunAwal: string, tahunAkhir: string): YearlyStat[] {
  const start = Number(tahunAwal);
  const end = Number(tahunAkhir);
  return stats.filter((row) => row.year >= start && row.year <= end);
}

export const pieContributions: ProvinceContribution[] = [
  { name: 'Jawa Timur', value: 18.4, color: '#6366f1' },
  { name: 'Jawa Barat', value: 15.2, color: '#22c55e' },
  { name: 'Jawa Tengah', value: 12.8, color: '#f59e0b' },
  { name: 'Sulawesi Selatan', value: 9.6, color: '#ef4444' },
  { name: 'Sumatera Selatan', value: 7.3, color: '#06b6d4' },
  { name: 'Lainnya', value: 36.7, color: '#94a3b8' },
];

export const provinceTableData: ProvinceTableRow[] = [
  { province: 'Jawa Timur', y2021: 11200000, y2022: 11450000, y2023: 11620000, y2024: 11800000, y2025: 12100000, growth: 2.54 },
  { province: 'Jawa Barat', y2021: 9200000, y2022: 9400000, y2023: 9550000, y2024: 9700000, y2025: 9950000, growth: 2.58 },
  { province: 'Jawa Tengah', y2021: 7800000, y2022: 7950000, y2023: 8100000, y2024: 8200000, y2025: 8350000, growth: 1.83 },
  { province: 'Sulawesi Selatan', y2021: 6100000, y2022: 6250000, y2023: 6400000, y2024: 6520000, y2025: 6680000, growth: 2.45 },
  { province: 'Sumatera Selatan', y2021: 4800000, y2022: 4900000, y2023: 5000000, y2024: 5050000, y2025: 5120000, growth: 1.39 },
  { province: 'Lampung', y2021: 3900000, y2022: 4000000, y2023: 4050000, y2024: 4100000, y2025: 4180000, growth: 1.95 },
  { province: 'Banten', y2021: 2800000, y2022: 2750000, y2023: 2700000, y2024: 2650000, y2025: 2580000, growth: -2.64 },
  { province: 'Bali', y2021: 1200000, y2022: 1180000, y2023: 1150000, y2024: 1120000, y2025: 1090000, growth: -2.68 },
];

export function formatTon(value: number): string {
  return value.toLocaleString('id-ID');
}
