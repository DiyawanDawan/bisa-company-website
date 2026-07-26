/** Shared BISA visual assets — app UI, banners, produk biomassa/biochar */
export const bisaBrand = {
  name: 'BISA',
  fullName: 'Biochar Indonesia Sirkular Agriculture',
  tagline: 'Sustainable Farming Practices for Indonesian Farmers',
  email: 'info@bisaagri.com',
  location: 'Lombok Tengah, Nusa Tenggara Barat, Indonesia',
  playStoreUrl: 'https://drive.google.com/uc?export=download&id=1Qzdbr6QMGaMnb6hg9OVvIw9VHgJL6V-M',
  adminDemoUrl: 'https://office.bisaagri.com/signin?redirect=%2F',
  social: {
    instagram: 'https://www.instagram.com/bisaagri/',
    youtube: 'https://www.youtube.com/@BisaAgri',
  },
} as const;

export const bisaSocialLinks = [
  { name: 'Instagram', href: bisaBrand.social.instagram, label: 'Instagram BISA' },
  { name: 'YouTube', href: bisaBrand.social.youtube, label: 'YouTube BISA' },
] as const;

export const bisaAssets = {
  logo: '/assets/img/logo/bisa-logo.png',
  logoLight: '/assets/img/logo/bisa-logo-light.png',

  banner: {
    marketplace: '/assets/img/bisa/banner-marketplace.png',
    biochar: '/assets/img/bisa/banner-biochar.png',
    organic: '/images/hasil_pananen.jpg',
    services: '/images/panag_laptop_disawah.jpg',
    blog: '/images/hero_inputs.png',
    forum: '/images/Dron_menyiaram_padi.jpg',
    impact: '/images/Petani_siram_tanaman.jpg',
  },

  app: {
    marketplace: '/assets/img/bisa/app-marketplace.jpg',
    negotiate: '/assets/img/bisa/app-negotiate.jpg',
    impact: '/assets/img/bisa/app-impact.jpg',
    payment: '/assets/img/bisa/app-payment.jpg',
  },

  /** Screenshot aplikasi (mockup perangkat) — public/images */
  screenshots: {
    main: '/images/AI-marketplacePng.webp',
    marketplace: '/images/Listing-produk-marketplace-b2b.webp',
    forum: '/images/Iot-dasboard.png',
    marketplacePng: '/images/Iot-dasboard.png',
  },

  product: {
    biomass: '/images/hero_supply.png',
    biochar: '/images/hero_inputs.png',
    organic: '/images/hasil_pananen.jpg',
    appMockup: '/assets/img/bisa/app-marketplace.jpg',
  },
} as const;
