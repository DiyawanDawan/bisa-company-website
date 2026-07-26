/** Shared BISA visual assets — app UI, banners, produk biomassa/biochar */
export const bisaBrand = {
  name: 'BISA',
  fullName: 'Biochar Indonesia Sirkular Agriculture',
  tagline: 'Platform ekonomi sirkular biomassa pertanian Indonesia',
  email: 'hello@bisa.id',
  location: 'Lombok Tengah, Nusa Tenggara Barat, Indonesia',
  playStoreUrl: 'https://drive.google.com/uc?export=download&id=1Qzdbr6QMGaMnb6hg9OVvIw9VHgJL6V-M',
  adminDemoUrl: 'https://office.bisaagri.com/signin?redirect=%2F',
  social: {
    instagram: 'https://instagram.com/bisa.id',
    facebook: 'https://facebook.com/bisa.id',
    linkedin: 'https://linkedin.com/company/bisa-id',
    youtube: 'https://youtube.com/@bisa.id',
    tiktok: 'https://tiktok.com/@bisa.',
  },
} as const;

export const bisaSocialLinks = [
  { name: 'Instagram', href: bisaBrand.social.instagram, label: 'Instagram BISA' },
  { name: 'Facebook', href: bisaBrand.social.facebook, label: 'Facebook BISA' },
  { name: 'LinkedIn', href: bisaBrand.social.linkedin, label: 'LinkedIn BISA' },
  { name: 'YouTube', href: bisaBrand.social.youtube, label: 'YouTube BISA' },
  { name: 'TikTok', href: bisaBrand.social.tiktok, label: 'TikTok BISA' },
] as const;

export const bisaAssets = {
  logo: '/assets/img/logo/bisa-logo.png',
  logoLight: '/assets/img/logo/bisa-logo-light.png',

  banner: {
    marketplace: '/assets/img/bisa/banner-marketplace.png',
    biochar: '/assets/img/bisa/banner-biochar.png',
    organic: '/assets/img/bisa/banner-biochar.png',
  },

  app: {
    marketplace: '/assets/img/bisa/app-marketplace.jpg',
    negotiate: '/assets/img/bisa/app-negotiate.jpg',
    impact: '/assets/img/bisa/app-impact.jpg',
    payment: '/assets/img/bisa/app-payment.jpg',
  },

  /** Screenshot aplikasi (mockup perangkat) — public/images */
  screenshots: {
    main: '/images/Samsung-Galaxy-S20-localhost.webp',
    marketplace: '/images/Samsung-Galaxy-S20-localhost_market.webp',
    forum: '/images/Samsung-Galaxy-S20-localhost.webp',
    marketplacePng: '/images/Samsung-Galaxy-S20-localhost.png',
  },

  product: {
    biomass: '/images/hero_supply.png',
    biochar: '/images/hero_inputs.png',
    organic: '/images/hero_cultivation.png',
    appMockup: '/assets/img/bisa/app-marketplace.jpg',
  },
} as const;
