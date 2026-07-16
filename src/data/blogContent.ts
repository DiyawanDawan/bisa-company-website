import { bisaAssets } from './bisaAssets';

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  id: number;
  slug: string;
  categorySlug: string;
  title: string;
  category: 'Tips Tani' | 'Berita' | 'Cerita Petani';
  excerpt: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  sections: BlogSection[];
  featured?: boolean;
};

export const blogCategories = ['All Posts', 'Berita', 'Cerita Petani', 'Tips Tani'] as const;

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'tanaman-yang-cocok-ditanam-di-musim-kemarau',
    categorySlug: 'tips-tani',
    title: 'Tanaman yang Cocok Ditanam di Musim Kemarau',
    category: 'Tips Tani',
    excerpt:
      'Tanaman yang Cocok Ditanam di Musim Kemarau Peralihan menuju musim kemarau sering menjadi periode penting bagi petani untuk menyesuaikan jenis tanaman yang ditanam agar tetap produktif.',
    image: bisaAssets.app.marketplace,
    date: '26 Mei 2026',
    author: 'Kirana Mulya',
    tags: ['Musim Kemarau', 'Budidaya', 'Hortikultura'],
    featured: true,
    sections: [
      {
        paragraphs: [
          'Peralihan menuju musim kemarau sering menjadi periode penting dalam perencanaan budidaya. Curah hujan berkurang, suhu udara meningkat, dan ketersediaan air biasanya mulai lebih terbatas dibanding musim penghujan. Situasi ini membuat pemilihan komoditas menjadi langkah penting sebelum memulai masa tanam.',
          'Di sisi lain, musim kemarau juga bisa menjadi periode yang menguntungkan untuk beberapa jenis tanaman. Intensitas sinar matahari yang tinggi membantu proses pertumbuhan berlangsung lebih optimal, terutama pada tanaman yang menyukai kondisi hangat dan tidak terlalu lembap. Risiko penyakit akibat jamur juga cenderung lebih rendah dibanding saat musim hujan.',
          'Baik tanaman hortikultura maupun tanaman keras memiliki karakteristik yang berbeda dalam menghadapi kondisi cuaca kering. Karena itu, pemilihan jenis tanaman yang sesuai menjadi bagian penting untuk menjaga produktivitas lahan selama musim kemarau berlangsung.',
        ],
      },
      {
        heading: '1. Jagung',
        paragraphs: [
          'Jagung termasuk tanaman pangan yang cukup toleran terhadap kondisi kering dan sering menjadi pilihan saat memasuki musim kemarau. Tanaman ini dapat tumbuh baik di lingkungan dengan paparan sinar matahari tinggi, terutama pada fase awal pertumbuhan.',
          'Meski relatif tahan terhadap kekurangan air, kebutuhan air tetap perlu diperhatikan saat memasuki fase pembungaan dan pengisian biji karena tahap ini sangat memengaruhi hasil panen.',
        ],
      },
      {
        heading: '2. Ubi Jalar dan Singkong',
        paragraphs: [
          'Ubi jalar dan singkong termasuk tanaman keras yang dikenal tahan banting di lahan kering. Sistem perakarannya mampu beradaptasi dengan kondisi tanah yang minim air sehingga tetap dapat tumbuh di tengah cuaca panas.',
          'Selain relatif mudah dibudidayakan, kedua komoditas ini juga cukup stabil menghadapi perubahan cuaca ekstrem. Karena itu, ubi jalar dan singkong sering menjadi pilihan di wilayah dengan curah hujan rendah.',
        ],
      },
      {
        heading: '3. Kacang Tanah dan Kacang Hijau',
        paragraphs: [
          'Kacang tanah dan kacang hijau memiliki toleransi yang baik terhadap suhu panas. Kebutuhan airnya juga cenderung lebih rendah dibanding beberapa tanaman hortikultura lain.',
          'Selain itu, kelompok tanaman kacang-kacangan memiliki kemampuan mengikat nitrogen bebas di udara melalui bintil akar. Proses ini membantu menjaga kesuburan tanah secara alami dan sering dimanfaatkan dalam pola rotasi tanaman.',
        ],
      },
      {
        heading: '4. Tomat dan Terong',
        paragraphs: [
          'Tomat dan terong termasuk tanaman hortikultura yang cukup adaptif terhadap cuaca panas dan paparan sinar matahari penuh. Sistem akar yang dalam membantu tanaman mencari cadangan air di dalam tanah, terutama saat permukaan lahan mulai mengering.',
          'Menjelang musim kemarau, risiko penyakit akibat kelembapan tinggi juga cenderung menurun. Namun, pengelolaan irigasi tetap perlu dijaga agar pertumbuhan bunga dan buah berlangsung optimal.',
        ],
      },
      {
        heading: '5. Kacang Panjang',
        paragraphs: [
          'Kacang panjang menjadi salah satu tanaman hortikultura yang cukup sering dibudidayakan saat musim kemarau karena pertumbuhannya relatif cepat dan kebutuhan airnya tidak terlalu tinggi.',
          'Tanaman ini tetap membutuhkan penyiraman yang konsisten, terutama pada fase awal pertumbuhan dan pembentukan polong. Penggunaan ajir sejak awal tanam juga membantu tanaman tumbuh lebih baik dan memudahkan proses perawatan.',
        ],
      },
      {
        heading: '6. Semangka dan Melon',
        paragraphs: [
          'Semangka dan melon merupakan tanaman hortikultura yang umumnya tumbuh optimal di kondisi cuaca panas dengan intensitas hujan yang rendah. Lingkungan yang lebih kering membantu mengurangi risiko busuk buah dan serangan penyakit jamur.',
          'Meski begitu, pengelolaan air tetap perlu diperhatikan. Kelebihan maupun kekurangan air dapat memengaruhi ukuran buah, rasa, hingga kualitas panen secara keseluruhan.',
        ],
      },
      {
        paragraphs: [
          'Musim kemarau tidak selalu identik dengan penurunan produktivitas. Dengan pemilihan tanaman hortikultura maupun tanaman keras yang sesuai, periode ini justru dapat menjadi waktu tanam yang cukup ideal bagi berbagai komoditas.',
          'Selain mempertimbangkan kondisi cuaca, pemilihan tanaman juga sebaiknya disesuaikan dengan karakteristik lahan, ketersediaan air, dan kebutuhan pasar di masing-masing wilayah. Perencanaan yang tepat sejak awal membantu tanaman tumbuh lebih optimal hingga masa panen.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'hama-pertanian-yang-sering-menyerang-di-musim-kemarau',
    categorySlug: 'tips-tani',
    title: 'Hama Pertanian yang Sering Menyerang di Musim Kemarau',
    category: 'Tips Tani',
    excerpt:
      'Musim kemarau sering membawa dinamika yang berbeda di lahan pertanian. Curah hujan yang menurun membawa tantangan tersendiri bagi petani dalam menjaga kesehatan tanaman.',
    image: bisaAssets.app.impact,
    date: '10 Mei 2026',
    author: 'Kirana Mulya',
    tags: ['Hama', 'Musim Kemarau', 'Pertanian'],
    sections: [
      {
        paragraphs: [
          'Musim kemarau sering membawa dinamika yang berbeda di lahan pertanian. Curah hujan yang menurun membawa tantangan tersendiri bagi petani dalam menjaga kesehatan tanaman.',
          'Kondisi kering dan suhu tinggi membuat beberapa jenis hama lebih aktif, sementara tanaman menjadi lebih rentan karena stres air. Mengenali hama yang umum muncul di musim kemarau membantu petani mengambil langkah pencegahan lebih awal.',
        ],
      },
      {
        heading: '1. Ulat Grayak',
        paragraphs: [
          'Ulat grayak cenderung lebih agresif saat cuaca panas. Serangan dapat merusak daun muda dan tunas, sehingga pertumbuhan vegetatif terganggu. Pemantauan rutin dan penggunaan pestisida biologis dapat membantu menekan populasinya.',
        ],
      },
      {
        heading: '2. Kutu Daun dan Thrips',
        paragraphs: [
          'Kutu daun dan thrips sering menyerang tanaman hortikultura di musim kemarau. Gejalanya berupa daun mengkerut, berwarna pucat, atau muncul bercak perak. Sanitasi lahan dan pengendalian terpadu menjadi kunci pengelolaannya.',
        ],
      },
      {
        heading: '3. Penggerek Batang',
        paragraphs: [
          'Penggerek batang dapat menyerang jagung, cabai, dan tanaman lain saat kondisi lahan kering. Lubang pada batang dan daun yang layu menjadi tanda umum. Rotasi tanaman dan pemilihan varietas tahan hama sangat disarankan.',
        ],
      },
      {
        paragraphs: [
          'Pengendalian hama di musim kemarau membutuhkan pendekatan terpadu: pemantauan rutin, sanitasi lahan, dan penggunaan input yang tepat. Dengan strategi yang konsisten, petani dapat menjaga produktivitas lahan meski menghadapi cuaca ekstrem.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'upaya-bisa-dalam-membangun-pertanian-yang-lebih-ramah-lingkungan',
    categorySlug: 'berita',
    title: 'Upaya BISA dalam Membangun Pertanian yang Lebih Ramah Lingkungan',
    category: 'Berita',
    excerpt:
      'Pertanian hortikultura memegang peran penting dalam menjaga ketahanan pangan Indonesia. Di saat yang sama, praktik berkelanjutan menjadi kunci masa depan sektor ini.',
    image: bisaAssets.banner.marketplace,
    date: '03 Mei 2026',
    author: 'Kirana Mulya',
    tags: ['BISA', 'Sustainability', 'Pertanian Berkelanjutan'],
    sections: [
      {
        paragraphs: [
          'Pertanian hortikultura memegang peran penting dalam menjaga ketahanan pangan Indonesia. Di saat yang sama, praktik berkelanjutan menjadi kunci masa depan sektor ini.',
          'BISA berkomitmen membangun ekosistem pertanian yang lebih ramah lingkungan melalui pendampingan petani, inovasi input organik, dan kolaborasi dengan berbagai pemangku kepentingan.',
        ],
      },
      {
        heading: 'Pupuk Organik dan Kesuburan Tanah',
        paragraphs: [
          'Melalui marketplace biochar BISA, petani beralih ke pupuk organik yang memperbaiki struktur tanah dan mengurangi ketergantungan pada pupuk kimia. Hasilnya, lahan menjadi lebih subur dan produktif jangka panjang.',
        ],
      },
      {
        heading: 'Pendampingan dan Literasi Petani',
        paragraphs: [
          'Program pendampingan PPL dan literasi digital membantu petani mengadopsi praktik budidaya yang lebih efisien dan ramah lingkungan. Forum edukasi dan aplikasi BISA menjadi kanal utama penyebaran pengetahuan.',
        ],
      },
      {
        paragraphs: [
          'Upaya ini sejalan dengan visi BISA untuk menciptakan pertanian yang produktif sekaligus berkelanjutan — demi kesejahteraan petani dan kelestarian lingkungan.',
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'peran-petani-perempuan-dan-petani-muda-dalam-masa-depan-pertanian-indonesia',
    categorySlug: 'berita',
    title: 'Peran Petani Perempuan dan Petani Muda dalam Masa depan Pertanian Indonesia',
    category: 'Berita',
    excerpt:
      'Keberlanjutan sektor pertanian tidak semata ditentukan oleh produktivitas. Ada faktor lain yang sama pentingnya, yaitu inklusivitas generasi muda dan perempuan.',
    image: bisaAssets.app.marketplace,
    date: '28 Apr 2026',
    author: 'Kirana Mulya',
    tags: ['Petani Muda', 'Inklusivitas', 'Pertanian'],
    sections: [
      {
        paragraphs: [
          'Keberlanjutan sektor pertanian tidak semata ditentukan oleh produktivitas. Ada faktor lain yang sama pentingnya, yaitu inklusivitas generasi muda dan perempuan.',
          'Petani perempuan dan petani muda membawa perspektif baru dalam mengelola lahan, mengadopsi teknologi, dan membuka akses pasar yang lebih luas.',
        ],
      },
      {
        heading: 'Generasi Penerus Pertanian',
        paragraphs: [
          'Petani muda cenderung lebih terbuka terhadap inovasi agri-tech, smart farming, dan pemasaran digital. BISA mendukung mereka melalui program literasi, akses modal, dan jaringan off-taker.',
        ],
      },
      {
        heading: 'Peran Strategis Petani Perempuan',
        paragraphs: [
          'Petani perempuan sering menjadi penggerak utama dalam pengelolaan lahan keluarga dan pengolahan hasil panen. Pemberdayaan mereka melalui pelatihan dan akses sumber daya menjadi prioritas dalam ekosistem BISA.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'meningkatkan-literasi-petani-sebagai-pembekalan-untuk-tumbuh-mandiri',
    categorySlug: 'berita',
    title: 'Meningkatkan Literasi Petani sebagai Pembekalan untuk Tumbuh Mandiri',
    category: 'Berita',
    excerpt:
      'Literasi merupakan fondasi penting dalam membangun pertanian yang berdaya saing dan berkelanjutan. Bekal pengetahuan membantu petani mengambil keputusan yang lebih baik.',
    image: bisaAssets.app.impact,
    date: '20 Apr 2026',
    author: 'Kirana Mulya',
    tags: ['Literasi', 'Pendampingan', 'Petani'],
    sections: [
      {
        paragraphs: [
          'Literasi merupakan fondasi penting dalam membangun pertanian yang berdaya saing dan berkelanjutan. Bekal pengetahuan membantu petani mengambil keputusan yang lebih baik.',
          'BISA mengintegrasikan literasi petani ke dalam seluruh ekosistem — dari produksi biochar hingga akses pasar organik premium.',
        ],
      },
      {
        heading: 'Forum Edukasi & Pendampingan PPL',
        paragraphs: [
          'Melalui forum BISA, petani mendapatkan panduan produksi biochar, nutrisi tanaman, dan teknik budidaya organik. Pendampingan PPL membantu mengurangi risiko gagal panen.',
        ],
      },
      {
        heading: 'Digital Literacy melalui Aplikasi BISA',
        paragraphs: [
          'Aplikasi BISA memberikan akses informasi cuaca, harga pasar, dan rekomendasi agronomi secara digital. Petani dapat belajar dan beradaptasi kapan saja.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'kemajuan-sosial-dan-ekonomi-petani-membangun-fondasi-kesejahteraan-melalui-ekosistem-bisa',
    categorySlug: 'berita',
    title: 'Kemajuan Sosial dan Ekonomi Petani: Membangun Fondasi Kesejahteraan Melalui Ekosistem BISA',
    category: 'Berita',
    excerpt:
      'Kesejahteraan petani hortikultura tidak hanya ditentukan oleh hasil panen. Ada pula berbagai faktor sosial dan ekonomi yang memengaruhi kualitas hidup mereka.',
    image: bisaAssets.banner.marketplace,
    date: '05 Apr 2026',
    author: 'Kirana Mulya',
    tags: ['Kesejahteraan', 'Ekonomi Petani', 'BISA'],
    sections: [
      {
        paragraphs: [
          'Kesejahteraan petani hortikultura tidak hanya ditentukan oleh hasil panen. Ada pula berbagai faktor sosial dan ekonomi yang memengaruhi kualitas hidup mereka.',
          'Ekosistem BISA dirancang holistik — menghubungkan petani dengan input, pengetahuan, modal, dan pasar dalam satu rangkaian layanan terintegrasi.',
        ],
      },
      {
        heading: 'Akses Pasar dan Harga yang Adil',
        paragraphs: [
          'Melalui marketplace hasil panen organik BISA, petani mendapatkan akses pasar yang lebih stabil dengan harga transparan, sehingga pendapatan lebih terprediksi.',
        ],
      },
      {
        heading: 'Peningkatan Kapasitas Sosial',
        paragraphs: [
          'Program pelatihan, kelompok tani, dan jaringan komunitas memperkuat kapasitas sosial petani. Kolaborasi antarpetani mendorong pertumbuhan bersama.',
        ],
      },
    ],
  },
  {
    id: 7,
    slug: 'memperkuat-produktivitas-dengan-pendekatan-smart-farming',
    categorySlug: 'berita',
    title: 'Memperkuat Produktivitas dengan Pendekatan Smart Farming',
    category: 'Berita',
    excerpt:
      'Produktivitas pertanian Indonesia masih menghadapi tantangan struktural yang kompleks. Praktik budidaya modern dan data-driven menjadi solusi yang semakin relevan.',
    image: bisaAssets.app.marketplace,
    date: '13 Feb 2026',
    author: 'Kirana Mulya',
    tags: ['Smart Farming', 'Agri-Tech', 'Produktivitas'],
    sections: [
      {
        paragraphs: [
          'Produktivitas pertanian Indonesia masih menghadapi tantangan struktural yang kompleks. Praktik budidaya modern dan data-driven menjadi solusi yang semakin relevan.',
          'Smart farming menggabungkan teknologi sensor, data cuaca, dan rekomendasi agronomi untuk membantu petani mengambil keputusan lebih tepat.',
        ],
      },
      {
        heading: 'Data-Driven Decision Making',
        paragraphs: [
          'Petani dapat memantau kondisi lahan, prediksi cuaca, dan kebutuhan air berdasarkan data — bukan hanya pengalaman tradisional semata.',
        ],
      },
      {
        heading: 'Integrasi dengan Ekosistem BISA',
        paragraphs: [
          'BISA mengintegrasikan smart farming ke dalam aplikasi dan layanan pendampingan, sehingga teknologi dapat diakses petani hortikultura di berbagai wilayah.',
        ],
      },
    ],
  },
  {
    id: 8,
    slug: 'perjalanan-pertanian-berkelanjutan-dalam-sustainability-report-bisa-2025',
    categorySlug: 'berita',
    title: 'Perjalanan Pertanian Berkelanjutan dalam Sustainability Report BISA 2025',
    category: 'Berita',
    excerpt:
      'Pertanian Indonesia masih menghadapi berbagai tantangan serius. Produktivitas yang stagnan, degradasi lahan, dan perubahan iklim mendorong inovasi berkelanjutan.',
    image: bisaAssets.app.impact,
    date: '01 Feb 2026',
    author: 'Kirana Mulya',
    tags: ['Sustainability Report', '2025', 'BISA'],
    sections: [
      {
        paragraphs: [
          'Pertanian Indonesia masih menghadapi berbagai tantangan serius. Produktivitas yang stagnan, degradasi lahan, dan perubahan iklim mendorong inovasi berkelanjutan.',
          'Sustainability Report BISA 2025 merangkum upaya, dampak, dan komitmen perusahaan dalam membangun pertanian yang lebih berkelanjutan.',
        ],
      },
      {
        heading: 'Pilar Keberlanjutan',
        paragraphs: [
          'Laporan ini mencakup pilar lingkungan, sosial, dan ekonomi — dari penggunaan input organik, peningkatan kesejahteraan petani, hingga kolaborasi dengan mitra strategis.',
        ],
      },
      {
        paragraphs: [
          'BISA mengundang seluruh pemangku kepentingan untuk membaca laporan lengkap dan bergabung dalam perjalanan menuju pertanian yang lebih berkelanjutan.',
        ],
      },
    ],
  },
  {
    id: 9,
    slug: 'waspadai-ini-5-penyakit-yang-sering-menyerang-tanaman-jagung',
    categorySlug: 'tips-tani',
    title: 'Waspadai, Ini 5 Penyakit yang Sering Menyerang Tanaman Jagung',
    category: 'Tips Tani',
    excerpt:
      'Jagung menjadi salah satu tanaman pangan utama di Indonesia dan banyak dibudidayakan di berbagai daerah. Penyakit tanaman perlu diwaspadai sejak dini.',
    image: bisaAssets.banner.marketplace,
    date: '22 Jan 2026',
    author: 'Kirana Mulya',
    tags: ['Jagung', 'Penyakit Tanaman', 'Tips Tani'],
    sections: [
      {
        paragraphs: [
          'Jagung menjadi salah satu tanaman pangan utama di Indonesia dan banyak dibudidayakan di berbagai daerah dengan kondisi agroklimat yang beragam. Namun, produktivitasnya sering menurun karena serangan penyakit yang muncul sejak fase awal pertumbuhan hingga menjelang panen.',
        ],
      },
      {
        heading: '1. Bulai (downy mildew)',
        paragraphs: [
          'Penyakit bulai disebabkan oleh jamur Peronosclerospora yang menyerang daun muda ketika kondisi lingkungan lembap. Gejala awalnya terlihat dari daun yang menguning secara tidak merata, kemudian berubah putih pucat.',
          'Pencegahan bisa dilakukan melalui penggunaan benih sehat dan tahan bulai, perendaman benih dengan fungisida, serta rotasi tanaman dengan komoditas non-rumputan.',
        ],
      },
      {
        heading: '2. Busuk tongkol (ear rot)',
        paragraphs: [
          'Busuk tongkol pada jagung disebabkan oleh jamur Fusarium dan Aspergillus. Tongkol yang terinfeksi menunjukkan biji yang berubah warna menjadi putih kusam, merah muda, atau kehijauan.',
        ],
      },
      {
        heading: '3. Hawar daun (leaf blight)',
        paragraphs: [
          'Hawar daun biasanya disebabkan oleh jamur Helminthosporium turcicum atau Bipolaris maydis. Daun memperlihatkan bercak memanjang berwarna coklat atau keabu-abuan yang kemudian melebar.',
        ],
      },
      {
        heading: '4. Karat daun (rust)',
        paragraphs: [
          'Karat daun pada jagung disebabkan oleh jamur Puccinia sorghi. Penyakit ini mudah dikenali dari munculnya pustula kecil berwarna jingga atau kecoklatan pada permukaan daun.',
        ],
      },
      {
        heading: '5. Busuk batang (stem rot)',
        paragraphs: [
          'Busuk batang merupakan penyakit yang muncul akibat infeksi jamur seperti Fusarium atau Macrophomina. Penyakit ini menyebabkan jaringan batang menjadi coklat, rapuh, dan mudah patah.',
        ],
      },
      {
        paragraphs: [
          'Berbagai penyakit tersebut menunjukkan bahwa budidaya jagung membutuhkan strategi pengelolaan yang tepat mulai dari pemilihan benih hingga pascapanen. Dengan penerapan langkah-langkah pencegahan yang konsisten, tanaman jagung tetap dapat tumbuh optimal.',
        ],
      },
    ],
  },
  {
    id: 10,
    slug: 'cerita-sukses-petani-hortikultura-di-lombok-tengah',
    categorySlug: 'cerita-petani',
    title: 'Cerita Sukses Petani Hortikultura di Lombok Tengah',
    category: 'Cerita Petani',
    excerpt:
      'Kisah petani yang berhasil meningkatkan hasil panen cherry tomato berkat pendampingan agronomi dan akses pasar yang lebih baik melalui ekosistem BISA.',
    image: bisaAssets.app.impact,
    date: '15 Jan 2026',
    author: 'Kirana Mulya',
    tags: ['Cerita Petani', 'Lombok Tengah', 'Cherry Tomato'],
    sections: [
      {
        paragraphs: [
          'Kisah petani yang berhasil meningkatkan hasil panen cherry tomato berkat pendampingan agronomi dan akses pasar yang lebih baik melalui ekosistem BISA.',
          'Budi, petani hortikultura di Lombok Tengah, mulai menggunakan BISA dua tahun lalu. Sebelumnya, hasil panennya fluktuatif dan harga jual tidak stabil.',
        ],
      },
      {
        heading: 'Pendampingan Agronomi',
        paragraphs: [
          'Melalui forum edukasi BISA, Budi belajar mengelola hama, nutrisi tanaman, dan jadwal panen yang optimal. Produktivitas lahan meningkat hingga 30% dalam satu musim.',
        ],
      },
      {
        heading: 'Akses Pasar yang Lebih Baik',
        paragraphs: [
          'Melalui marketplace BISA, Budi terhubung langsung dengan pembeli premium. Harga lebih transparan dan pembayaran via escrow lebih cepat, sehingga kesejahteraan keluarganya meningkat.',
        ],
      },
    ],
  },
  {
    id: 11,
    slug: 'tips-mengelola-air-irigasi-efektif-di-musim-kemarau',
    categorySlug: 'tips-tani',
    title: 'Tips Mengelola Air Irigasi Efektif di Musim Kemarau',
    category: 'Tips Tani',
    excerpt:
      'Pengelolaan air irigasi yang efektif menjadi kunci keberhasilan budidaya di musim kemarau. Berikut praktik yang dapat diterapkan petani.',
    image: bisaAssets.app.marketplace,
    date: '08 Jan 2026',
    author: 'Kirana Mulya',
    tags: ['Irigasi', 'Musim Kemarau', 'Tips Tani'],
    sections: [
      {
        paragraphs: [
          'Pengelolaan air irigasi yang efektif menjadi kunci keberhasilan budidaya di musim kemarau. Berikut praktik yang dapat diterapkan petani.',
        ],
      },
      {
        heading: '1. Irigasi Tetes',
        paragraphs: [
          'Irigasi tetes menghemat air hingga 50% dibanding penyiraman manual. Air langsung disalurkan ke area perakaran tanaman sehingga lebih efisien.',
        ],
      },
      {
        heading: '2. Mulsa Organik',
        paragraphs: [
          'Mulsa organik membantu menjaga kelembapan tanah dan mengurangi evaporasi. Sisa organik juga memperbaiki struktur tanah seiring waktu.',
        ],
      },
      {
        heading: '3. Jadwal Penyiraman',
        paragraphs: [
          'Menyiram di pagi atau sore hari mengurangi kehilangan air akibat panas matahari. Sesuaikan frekuensi dengan fase pertumbuhan tanaman.',
        ],
      },
    ],
  },
  {
    id: 12,
    slug: 'kolaborasi-bisa-dengan-universitas-untuk-riset-agri-tech',
    categorySlug: 'berita',
    title: 'Kolaborasi BISA dengan Universitas untuk Riset Agri-Tech',
    category: 'Berita',
    excerpt:
      'BISA terus memperkuat kolaborasi dengan universitas terkemuka untuk mengembangkan solusi agri-tech yang aplikatif di lapangan.',
    image: bisaAssets.banner.marketplace,
    date: '02 Jan 2026',
    author: 'Kirana Mulya',
    tags: ['Riset', 'Agri-Tech', 'Kolaborasi'],
    sections: [
      {
        paragraphs: [
          'BISA terus memperkuat kolaborasi dengan universitas terkemuka untuk mengembangkan solusi agri-tech yang aplikatif di lapangan.',
          'Kemitraan dengan IPB, ITB, dan Unpad fokus pada riset pupuk organik, prediksi cuaca lokal, dan sistem rekomendasi agronomi berbasis data.',
        ],
      },
      {
        heading: 'Dampak di Lapangan',
        paragraphs: [
          'Hasil riset diterjemahkan ke dalam produk dan layanan yang dapat langsung digunakan petani — bukan sekadar wacana akademis.',
        ],
      },
    ],
  },
];

export const POSTS_PER_PAGE = 3;
export const TOTAL_PAGES = 4;
