import MarketInsightView from '@/components/market/MarketInsightView';

export const metadata = {
  title: 'Market Intelligence | BISA',
  description:
    'Pantau tren harga komoditas biomassa Indonesia — indikator pasar, grafik, dan pergerakan harga harian.',
};

export default function MarketPage() {
  return <MarketInsightView />;
}
