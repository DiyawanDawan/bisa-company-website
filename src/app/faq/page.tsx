'use client';

import { useState } from 'react';
import { bisaBrand } from '@/data/bisaAssets';
import PageBackLink from '@/components/PageBackLink';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

const faqs = [
  {
    q: 'Apa itu BISA dan siapa yang bisa menggunakannya?',
    a: 'BISA (Biomassa Indonesia Sustainable Agriculture) adalah platform mobile B2B ekonomi sirkular yang menghubungkan petani, pengepul, dan industri biochar. Pengguna mendaftar dengan peran penjual atau pembeli, lalu dapat menjual limbah biomassa, membeli/menjual biochar, atau memasarkan hasil panen organik — semua dalam satu aplikasi.',
  },
  {
    q: 'Bagaimana cara petani bergabung di pilot Lombok Tengah?',
    a: 'Pilot dimulai dengan 10–20 petani binaan di Lombok Tengah, didampingi penyuluh pertanian (PPL) Dinas Pertanian. Petani perlu KTP, akses smartphone Android, dan bersedia mengikuti edukasi produksi biochar. Hubungi tim BISA atau PPL setempat untuk pendaftaran.',
  },
  {
    q: 'Apa keamanan transaksi di marketplace BISA?',
    a: 'BISA menggunakan sistem escrow terintegrasi payment gateway berizin OJK (Xendit). Uang pembeli ditahan di rekening virtual hingga barang diterima dan dikonfirmasi, baru diteruskan ke penjual — melindungi kedua belah pihak dari penipuan.',
  },
  {
    q: 'Bagaimana AI memprediksi grade biochar tanpa uji lab?',
    a: 'Model AI (XGBoost/Random Forest) menganalisis jenis biomassa, suhu, dan waktu pembakaran berdasarkan dataset lokal BI, BRIN, IPB, dan data pilot. Sistem memprediksi grade A atau B serta merekomendasikan dosis pemupukan — target akurasi MAPE di bawah 10%.',
  },
  {
    q: 'Apa fitur IoT Pro dan apakah wajib?',
    a: 'Fitur Pro (Rp50.000/bulan) memantau suhu tungku real-time via sensor IoT (MAX6675 + ESP32). Fitur dasar marketplace, forum, dan prediksi AI gratis. Petani tanpa sensor bisa upload foto termometer — AI membaca suhu otomatis sebagai alternatif.',
  },
  {
    q: 'Bagaimana mitra industri atau pemerintah bisa berkolaborasi?',
    a: `BISA terbuka untuk kemitraan dengan industri biochar (WasteX, SAWA), hotel KEK Mandalika, BULOG, Bank Indonesia (CSA-Biochar), dan Dinas Pertanian provinsi/kabupaten. Hubungi ${bisaBrand.email} untuk diskusi anchor buyer, pilot wilayah, atau integrasi data GIS.`,
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white min-h-screen pt-header pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <PageBackLink />

        <ScrollReveal className="space-y-3">
          <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">FAQ</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight">
            Pertanyaan Umum tentang BISA
          </h1>
          <p className="text-elevarm-grey text-sm sm:text-base">
            Jawaban singkat seputar platform, pilot, transaksi, AI, dan kemitraan BISA
          </p>
        </ScrollReveal>

        <StaggerReveal className="space-y-4" stagger={0.08}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <StaggerItem key={faq.q} className="border border-elevarm-neutral-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-elevarm-neutral/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-elevarm-black">{faq.q}</span>
                  <span className="text-elevarm-cobalt text-xl shrink-0">{isOpen ? '\u2212' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-elevarm-grey leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        <ScrollReveal variant="scaleIn" className="bg-elevarm-neutral rounded-xl p-6 sm:p-8 text-center space-y-3">
          <h2 className="text-lg font-bold text-elevarm-black">Masih Ada Pertanyaan?</h2>
          <p className="text-sm text-elevarm-grey">
            Hubungi tim BISA di{' '}
            <a href={`mailto:${bisaBrand.email}`} className="text-elevarm-cobalt font-semibold hover:underline">
              {bisaBrand.email}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
