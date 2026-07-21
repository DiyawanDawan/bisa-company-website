import { bisaAssets } from './bisaAssets';

export type ServiceContent = {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  intro: string[];
  bulletsLabel: string;
  bullets: string[];
  image?: string;
  images?: string[];
};

export const servicesContent: ServiceContent[] = [
  {
    id: 'marketplace',
    title: 'Marketplace Tiga Layer',
    tagline: 'Limbah → biochar → panen organik',
    shortDesc:
      'Satu aplikasi mobile B2B untuk jual-beli limbah biomassa, biochar, dan hasil panen organik bersertifikat — menutup siklus ekonomi sirkular dari desa ke industri.',
    intro: [
      'Di Lombok Tengah saja, 84.906 ton sekam padi dan puluhan ribu ton limbah kelapa serta tongkol jagung dibakar setiap tahun. Potensi ekonomi hilang karena belum ada saluran terintegrasi.',
      'Negosiasi harga, pesanan langsung, dan matchmaking pembeli terdekat membuat transaksi B2B petani-industri-hotel berjalan dalam satu ekosistem.',
    ],
    bulletsLabel: 'Nilai tiap lapisan marketplace:',
    bullets: [
      'Limbah biomassa — keuntungan 100% dari sekam, tongkol, dan tempurung kelapa',
      'Biochar grade A/B — pupuk organik alternatif, hasil panen naik hingga 6%',
      'Panen organik bersertifikat BISA Organic — akses pasar premium',
    ],
    image: bisaAssets.product.biomass,
    images: [
      bisaAssets.product.biomass,
      bisaAssets.app.marketplace,
      bisaAssets.product.organic,
    ],
  },
  {
    id: 'ai-iot',
    title: 'AI Prediksi & IoT Pro',
    tagline: 'Grade biochar tanpa uji lab',
    shortDesc:
      'Model AI memprediksi grade biochar (A/B) dari jenis biomassa, suhu, dan waktu pembakaran. Fitur Pro memantau suhu tungku real-time — atau cukup foto termometer.',
    intro: [
      'Kualitas biochar tidak konsisten menjadi hambatan adopsi petani. BISA menggunakan model open source (XGBoost/Random Forest) dengan dataset lokal dari BI, BRIN, IPB, dan data pilot Lombok Tengah.',
      'Petani memasukkan jenis biomassa, suhu, dan lama pembakaran — sistem memprediksi grade biochar serta merekomendasikan dosis pemupukan. Tanpa biaya uji lab mahal.',
      'Fitur Pro IoT: sensor MAX6675 + ESP32 memantau suhu tungku 400–450°C (pirolisis standar BRIN). Bagi petani tanpa sensor, upload foto termometer dan AI membaca suhunya otomatis sebagai fallback.',
    ],
    bulletsLabel: 'Kemampuan AI & IoT BISA:',
    bullets: [
      'Prediksi grade biochar A/B dengan akurasi target MAPE <10%',
      'Rekomendasi dosis pemupukan berbasis data biomassa lokal',
      'Monitoring suhu tungku real-time (Pro) atau via foto termometer',
    ],
    image: bisaAssets.product.biochar,
    images: [
      bisaAssets.app.impact,
      bisaAssets.product.biochar,
      bisaAssets.banner.biochar,
    ],
  },
  {
    id: 'gis',
    title: 'GIS Supply–Demand',
    tagline: 'Peta matchmaking terdekat',
    shortDesc:
      'Peta interaktif memetakan sebaran limbah biomassa dan lokasi pembeli-penjual — mengurangi biaya transportasi dan mempercepat transaksi antarwilayah.',
    intro: [
      'Petani sering tidak tahu siapa pembeli limbah atau biochar terdekat. Industri biochar seperti WasteX dan SAWA butuh pasokan bahan baku terstandar dari wilayah yang terpencil.',
      'Dashboard GIS BISA menampilkan supply limbah per provinsi, permintaan biochar, dan lokasi petani aktif. Matchmaking berdasarkan jarak terdekat mempertemukan penjual dan pembeli secara efisien.',
      'Data agregat GIS juga mendukung perencanaan kebijakan Dinas Pertanian dan program CSA-Biochar Bank Indonesia 2026.',
    ],
    bulletsLabel: 'Manfaat GIS BISA:',
    bullets: [
      'Peta sebaran limbah biomassa dan titik koleksi',
      'Matchmaking supply-demand berdasarkan jarak terdekat',
      'Dashboard data real-time untuk perencanaan kebijakan daerah',
    ],
    image: bisaAssets.app.marketplace,
    images: [
      bisaAssets.app.marketplace,
      bisaAssets.product.biomass,
      bisaAssets.banner.marketplace,
    ],
  },
  {
    id: 'escrow-education',
    title: 'Escrow & Forum Edukasi',
    tagline: 'Transaksi aman, belajar mandiri',
    shortDesc:
      'Uang pembeli ditahan sistem hingga barang diterima. Forum terkurati dan asisten virtual LLM+RAG membantu petani produksi biochar grade A/B mandiri.',
    intro: [
      'Kepercayaan adalah fondasi transaksi B2B petani-industri. BISA escrow terintegrasi payment gateway berizin OJK (Xendit): dana ditahan di rekening virtual sampai pembeli konfirmasi barang diterima, baru diteruskan ke penjual.',
      'Forum diskusi dipandu penyuluh pertanian (PPL) dan petani berpengalaman — bukan AI sepenuhnya, sehingga tetap relevan dengan konteks lokal Lombok Tengah.',
      'Asisten virtual berbasis LLM + RAG menjawab pertanyaan teknis seputar biochar, pupuk, dan produksi biomassa 24/7 dari knowledge base BI, BRIN, IPB, dan jurnal ilmiah.',
    ],
    bulletsLabel: 'Fitur kepercayaan & edukasi:',
    bullets: [
      'Escrow transaksi B2B — aman untuk penjual dan pembeli',
      'Forum edukasi terkurati dengan pendampingan PPL',
      'Asisten virtual AI untuk panduan produksi biochar',
    ],
    image: bisaAssets.app.payment,
    images: [
      bisaAssets.app.payment,
      bisaAssets.app.negotiate,
      bisaAssets.product.biochar,
    ],
  },
];
