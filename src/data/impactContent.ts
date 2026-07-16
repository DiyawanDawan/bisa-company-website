import { bisaAssets } from './bisaAssets';

export type CounterConfig = {
  end: number;
  rangeEnd?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export type PilotTargetIcon =
  | 'biomass'
  | 'transaction'
  | 'carbon'
  | 'jobs'
  | 'b2b'
  | 'farmers';

export type PilotTarget = {
  label: string;
  detail: string;
  counter: CounterConfig;
  icon: PilotTargetIcon;
};

export const impactHeroCopy = {
  eyebrow: 'Dampak BISA',
  badge: 'Pilot Lombok Tengah · Tahun 1',
  title: 'Dampak Terukur untuk Petani dan Iklim',
  intro:
    'Lombok Tengah setiap tahun membuang 84.906 ton sekam padi ke api — padahal limbah itu bisa dijual. BISA mengalihkan aliran limbah ke tiga nilai ekonomi: pendapatan tambahan petani, pupuk organik saat penyaluran pupuk bersubsidi kurang dari 10%, dan hasil panen premium bebas kimia. Dampak iklim dan sosialnya kami ukur langsung dari transaksi platform, verifikasi lapangan, dan metodologi karbon BRIN–BI.',
  pilotHeading: 'Target Terukur — Pilot Tahun 1 (Lombok Tengah)',
  pilotSubtext:
    'Indikator keberhasilan pilot diukur dari data escrow, sampling biochar, dan pendampingan PPL — selaras program CSA-Biochar Bank Indonesia 2026.',
};

export const impactHeroVisual = {
  image: bisaAssets.banner.marketplace,
  imageAlt: 'Banner BISA — marketplace limbah biomassa dan biochar',
  caption: 'Survei awal · 16 petani Lombok Tengah & Timur',
  surveyStats: [
    { label: 'Tertarik jual limbah', counter: { end: 94, suffix: '%' } },
    { label: 'Tertarik beli biochar', counter: { end: 87, suffix: '%' } },
    { label: 'Pasarkan panen organik', counter: { end: 87, suffix: '%' } },
  ],
};

export const pilotYearOneTargets: PilotTarget[] = [
  {
    label: 'Limbah biomassa terkelola',
    detail:
      'Sekam, tongkol jagung, dan tempurung kelapa — setara ~12% dari potensi 84.906 ton sekam/tahun di Lombok Tengah yang selama ini dibakar.',
    counter: { end: 10000, suffix: ' ton' },
    icon: 'biomass',
  },
  {
    label: 'Nilai transaksi biochar',
    detail:
      'Target 3.000 ton biochar terjual (asumsi Rp3.500/kg sesuai preferensi harga mayoritas petani dalam survei awal).',
    counter: { end: 10.5, prefix: 'Rp', suffix: ' M', decimals: 1 },
    icon: 'transaction',
  },
  {
    label: 'CO₂ terserap',
    detail:
      'Perhitungan LCA BRIN 2023: 6,8 ton CO₂ per ton biochar — kontribusi langsung pada mitigasi perubahan iklim.',
    counter: { end: 20400, suffix: ' ton' },
    icon: 'carbon',
  },
  {
    label: 'Lapangan kerja baru',
    detail:
      'Produsen biochar, teknisi IoT, dan logistik distribusi di ekosistem ekonomi sirkular lokal.',
    counter: { end: 100 },
    icon: 'jobs',
  },
  {
    label: 'Transaksi B2B selesai',
    detail:
      'Jual-beli limbah, biochar, dan hasil panen organik tercatat otomatis melalui sistem escrow.',
    counter: { end: 1000, rangeEnd: 2000 },
    icon: 'b2b',
  },
  {
    label: 'Petani binaan aktif',
    detail:
      'Terdaftar, bertransaksi, dan teredukasi produksi biochar grade A/B — didampingi penyuluh pertanian (PPL).',
    counter: { end: 10, rangeEnd: 20 },
    icon: 'farmers',
  },
];

export const impactStats = [
  {
    category: 'Kelola Limbah Biomassa',
    desc: 'Target pilot Tahun 1: 10.000 ton limbah terkelola di Lombok Tengah — dari potensi 84.906 ton sekam/tahun yang selama ini dibakar.',
    image: bisaAssets.product.biomass,
  },
  {
    category: 'Produksi Biochar',
    desc: 'Target 3.000 ton biochar senilai Rp10,5 miliar per tahun — pupuk organik alternatif saat penyaluran pupuk bersubsidi kurang dari 10%.',
    image: bisaAssets.product.biochar,
  },
  {
    category: 'Serap Karbon',
    desc: 'Target 20.400 ton CO₂ terserap (6,8 ton/ton biochar, BRIN 2023) — berkontribusi pada mitigasi perubahan iklim dan target NZE 2060.',
    image: bisaAssets.app.impact,
  },
  {
    category: 'Lapangan Kerja Lokal',
    desc: 'Target 100 lapangan kerja baru di sektor produksi, teknisi, dan logistik ekonomi sirkular biomassa.',
    image: bisaAssets.app.payment,
  },
  {
    category: 'Petani Binaan',
    desc: '10–20 petani binaan Lombok Tengah teredukasi produksi biochar — 94% responden survei tertarik platform digital untuk jual limbah.',
    image: bisaAssets.app.marketplace,
  },
];

export const impactPillars = [
  {
    title: 'Ketahanan Pangan',
    desc: 'Mengubah limbah biomassa menjadi pupuk organik, mengurangi ketergantungan impor pupuk kimia dan meningkatkan produktivitas lahan.',
    image: bisaAssets.product.biochar,
  },
  {
    title: 'Ekonomi Sirkular',
    desc: 'Limbah yang dibakar sia-sia menjadi sumber pendapatan tambahan petani — siklus tertutup limbah → biochar → panen premium.',
    image: bisaAssets.product.biomass,
  },
  {
    title: 'Inklusi Petani',
    desc: 'Petani kecil di desa terhubung langsung ke industri biochar dan pasar premium organik — didampingi penyuluh pertanian (PPL).',
    image: bisaAssets.app.marketplace,
  },
  {
    title: 'Mitigasi Iklim',
    desc: 'Penurunan emisi GRK 80,93% per hektar (BI-UNDIP) dan serapan CO₂ terukur mendukung pelaporan iklim nasional.',
    image: bisaAssets.app.impact,
  },
  {
    title: 'Edukasi & Adopsi',
    desc: 'Forum, asisten virtual, dan pendampingan PPL membantu petani produksi biochar grade A/B mandiri — target pengetahuan naik 70%.',
    image: bisaAssets.app.negotiate,
  },
];

export const farmerTestimonials = [
  {
    quote:
      'Sekam padi biasanya saya bakar di lahan. Lewat BISA, limbah ini bisa dijual ke pengepul — pendapatan tambahan yang sebelumnya tidak ada sama sekali.',
    author: 'Pak Mansur',
    region: 'Lombok Tengah',
    image: bisaAssets.app.marketplace,
    imageFit: 'contain' as const,
  },
  {
    quote:
      'Pupuk bersubsidi sulit didapat, hanya sekitar 10% kebutuhan. Biochar dari marketplace BISA jauh lebih murah dan tanah saya mulai membaik dari pH 5,8.',
    author: 'Bu Siti',
    region: 'Lombok Tengah',
    image: bisaAssets.product.biochar,
    imageFit: 'cover' as const,
  },
  {
    quote:
      'Saya sudah coba buat biochar sendiri tapi kualitasnya tidak konsisten. Prediksi AI BISA membantu tahu grade A atau B sebelum dijual — tidak perlu uji lab.',
    author: 'Pak Hadi',
    region: 'Lombok Timur',
    image: bisaAssets.app.impact,
    imageFit: 'contain' as const,
  },
  {
    quote:
      'Fitur peta GIS membantu saya menemukan pembeli biochar terdekat. Transportasi lebih murah dan transaksi lewat escrow terasa aman.',
    author: 'Pak Lalu',
    region: 'Lombok Tengah',
    image: bisaAssets.banner.marketplace,
    imageFit: 'cover' as const,
  },
  {
    quote:
      'Hasil cabai organik saya yang dipupuk biochar bisa dijual dengan harga premium. Hotel di kawasan Mandalika butuh pasokan bebas residu kimia.',
    author: 'Bu Nur',
    region: 'Lombok Tengah',
    image: bisaAssets.product.organic,
    imageFit: 'cover' as const,
  },
  {
    quote:
      'Forum edukasi dan asisten virtual BISA menjawab pertanyaan produksi biochar kapan saja — tidak perlu menunggu penyuluh turun ke desa.',
    author: 'Pak Zainal',
    region: 'Lombok Tengah',
    image: bisaAssets.app.negotiate,
    imageFit: 'contain' as const,
  },
  {
    quote:
      'Pendampingan PPL saat onboarding membuat saya yang sudah lanjut usia tetap bisa pakai aplikasi. Antarmukanya sederhana, seperti WhatsApp.',
    author: 'Pak Taufik',
    region: 'Lombok Tengah',
    image: bisaAssets.app.payment,
    imageFit: 'contain' as const,
  },
  {
    quote:
      'Industri biochar butuh pasokan terstandar. BISA mempertemukan kami dengan petani produsen — transaksi B2B jadi lebih transparan.',
    author: 'Tim WasteX',
    region: 'Mitra Industri',
    image: bisaAssets.product.biomass,
    imageFit: 'cover' as const,
  },
];
