'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { bisaAssets } from '@/data/bisaAssets';

const slides = [
  {
    title: 'Limbah Jadi Nilai',
    description:
      'Jual sekam, tongkol, dan tempurung kelapa lewat smartphone — limbah tidak lagi dibakar sia-sia.',
    bgImage: bisaAssets.banner.marketplace,
    position: 'center',
  },
  {
    title: 'Biochar untuk Tanah',
    description:
      'Pupuk organik alternatif saat krisis pupuk. AI prediksi grade A/B, IoT pantau suhu tungku.',
    bgImage: bisaAssets.banner.biochar,
    position: 'center',
  },
  {
    title: 'Panen Organik Premium',
    description:
      'Hasil tani organik bersertifikat BISA Organic — harga premium, pasar hotel Mandalika.',
    bgImage: bisaAssets.banner.organic,
    position: 'center',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleScrollDown = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[560px] max-h-[900px] w-full bg-[#135122] overflow-hidden">
      {/* Scroll Down Rotated Button (Left) */}
      <div className="absolute z-10 flex w-[60vh] origin-left rotate-90 items-center justify-center 2xs:w-[80vh] md:w-[100vh] left-0 top-1/2 -translate-y-1/2">
        <button
          onClick={handleScrollDown}
          className="group flex w-max items-center justify-center gap-3 rounded-t-md bg-elevarm-black/20 p-3 pb-2 backdrop-blur-lg border-t border-x border-white/10"
        >
          <div className="text-xs font-semibold text-white group-hover:text-elevarm-light-green md:text-sm tracking-widest transition-colors duration-200">
            SCROLL DOWN
          </div>
          <svg width="20" height="16" viewBox="0 0 20 16" className="h-3 w-4 fill-none stroke-white group-hover:stroke-elevarm-light-green md:h-[3.5] md:w-5 transition-colors duration-200">
            <path d="M1.16675 7.00002H12.8334M12.8334 7.00002L7.00008 1.16669M12.8334 7.00002L7.00008 12.8334" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      {/* Carousel */}
      <div className="relative h-screen min-h-[600px] w-full overflow-hidden" id="home-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[current].bgImage})`,
              backgroundPosition: slides[current].position,
            }}
          >
            {/* Gradasi hijau halus — hanya setengah bawah, atas tetap jernih */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, #135122 0%, rgb(19 81 34 / 0.78) 30%, rgb(19 81 34 / 0.28) 52%, transparent 72%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Text Content — centered */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-10 pointer-events-none">
          <div className="w-full max-w-xl sm:max-w-2xl text-center pointer-events-auto">
            <h1 className="sr-only">
              BISA — Platform Ekonomi Sirkular Biomassa Pertanian Indonesia
            </h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 sm:gap-4"
              >
                <h2 className="font-poppins-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-display tracking-tight drop-shadow-md">
                  {slides[current].title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-lg mx-auto font-medium drop-shadow-sm">
                  {slides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Buttons — below text */}
            <div className="flex justify-center gap-4 mt-8 sm:mt-10">
              <button
                onClick={prevSlide}
                className="rounded-full bg-white/30 px-2.5 py-3 hover:bg-white/60 transition-colors duration-200"
                aria-label="Previous slide"
              >
                <svg className="stroke-white" width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M20.3334 9H1.66675M1.66675 9L8.66675 16M1.66675 9L8.66675 2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="rounded-full bg-white/30 px-2.5 py-3 hover:bg-white/60 transition-colors duration-200"
                aria-label="Next slide"
              >
                <svg className="stroke-white" width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M1.66675 9H20.3334M20.3334 9L13.3334 2M20.3334 9L13.3334 16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dots indicators */}
        <div className="absolute bottom-12 left-0 flex w-full justify-center md:bottom-24 z-20">
          <div className="flex h-6 w-min justify-center gap-3 rounded-full bg-white/10 p-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-colors duration-300 ${
                  index === current ? 'bg-white' : 'bg-[#135122]/40 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
