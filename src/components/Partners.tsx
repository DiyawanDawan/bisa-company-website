import Image from 'next/image';
import { bisaBrand } from '@/data/bisaAssets';
import { ScrollReveal } from '@/components/ScrollReveal';

const partnerLogos = [
  'logo-kemenkop-ukm.webp',
  'logo-ipb.webp',
  'logo-itb.webp',
  'logo-unpad.webp',
  'logo-amartha.webp',
  'logo-bjb.webp',
  'logo-baznas.webp',
  'logo-kitabisa.webp',
  'logo-rumah-zakat.webp',
  'logo-rumah-yatim.webp',
  'logo-dompet-kilat.webp',
  'logo-alami.webp',
  'logo-refi.webp',
  'logo-rabo.webp',
  'logo-endeavor.webp',
  'logo-500.webp',
  'logo-scala.webp',
  'logo-gen.webp',
  'logo-insignia.webp',
  'logo-aca.webp',
  'logo-kantor-staff-presiden.webp',
  'logo-tokyo-8.webp',
];

function PartnerLogo({ logo }: { logo: string }) {
  return (
    <div className="flex h-20 sm:h-24 w-36 sm:w-40 shrink-0 items-center justify-center rounded-lg bg-white px-3 py-2 hover:shadow-sm transition-all duration-200">
      <Image
        src={`/images/partners/${logo}`}
        alt="Partner logo"
        width={120}
        height={48}
        className="h-10 sm:h-12 w-auto max-w-full object-contain"
      />
    </div>
  );
}

export default function Partners() {
  const doubled = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-10 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        <ScrollReveal className="max-w-[810px] flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-elevarm-black font-display tracking-tight leading-tight">
            Mitra Ekosistem BISA
          </h2>
          <p className="text-elevarm-grey text-base leading-relaxed">
            BISA berkolaborasi dengan Bank Indonesia (CSA-Biochar 2026), Dinas Pertanian Lombok Tengah, industri biochar, BULOG, hotel KEK Mandalika, dan institusi riset untuk pilot dan ekspansi ekonomi sirkular biomassa.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeIn" delay={0.15} className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="overflow-hidden">
            <div className="flex w-max gap-3 sm:gap-4 animate-marquee-right-slow py-1">
              {doubled.map((logo, idx) => (
                <PartnerLogo key={`${logo}-${idx}`} logo={logo} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2} className="flex justify-center pt-2">
          <a
            href={`mailto:${bisaBrand.email}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-elevarm-black text-elevarm-black text-sm font-semibold rounded-full hover:bg-elevarm-black hover:text-white transition-colors duration-200"
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4">
              <path d="M1.66666 3.83331L8.47076 8.59618C9.02173 8.98187 9.29722 9.17471 9.59688 9.2494C9.86157 9.31538 10.1384 9.31538 10.4031 9.2494C10.7028 9.17471 10.9782 8.98187 11.5292 8.59618L18.3333 3.83331M5.66666 14.6666H14.3333C15.7335 14.6666 16.4335 14.6666 16.9683 14.3942C17.4387 14.1545 17.8212 13.772 18.0608 13.3016C18.3333 12.7668 18.3333 12.0668 18.3333 10.6666V5.33331C18.3333 3.93318 18.3333 3.23312 18.0608 2.69834C17.8212 2.22793 17.4387 1.84548 16.9683 1.6058C16.4335 1.33331 15.7335 1.33331 14.3333 1.33331H5.66666C4.26653 1.33331 3.56646 1.33331 3.03168 1.6058C2.56128 1.84548 2.17882 2.22793 1.93914 2.69834C1.66666 3.23312 1.66666 3.93318 1.66666 5.33331V10.6666C1.66666 12.0668 1.66666 12.7668 1.93914 13.3016C2.17882 13.772 2.56128 14.1545 3.03168 14.3942C3.56646 14.6666 4.26653 14.6666 5.66666 14.6666Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Get In Touch
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
