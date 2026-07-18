
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { usePathname } from 'next/navigation';
import { localePath, stripLocalePrefix, type Locale } from '@/lib/i18n';
import { getTranslation } from '@/lib/content';
import { Mail, Globe } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp';
import { assets } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { legalEntity } from '@/lib/legal-entity';
import { socialLinks } from './social-links';
import { trackSocialClick, trackWhatsAppClick, trackLanguageToggle } from '@/lib/google-analytics';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

// showDesignWorks comes from the server layout: the gate lives in the
// design-works content module, and importing it here would ship every work's
// copy in the shared client bundle.
const Footer = ({ showDesignWorks }: { showDesignWorks: boolean }) => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const t = getTranslation(language);
  const currentYear = new Date().getFullYear();

  // The language switch is navigation: same route, alternate locale URL.
  const otherLocale: Locale = language === "en" ? "ar" : "en";
  const basePath = stripLocalePrefix(pathname);
  const switchHref = localePath(otherLocale, basePath);
  const href = (path: string) => localePath(language, path);

  const t_ui = {
    en: {
      studio_name: 'Buried Games Studio',
      rights: `© ${currentYear} Buried Games Studio. All rights reserved.`,
      games: 'Games',
      studio: 'Studio',
      about_us: 'About Us',
      services: 'Services',
      devlog: 'Devlog',
      case_studies: 'Case Studies',
      design_works: 'Design Works',
      careers: 'Careers',
      privacy: 'Privacy',
      terms: 'Terms',
      imprint: 'Legal Notice',
      regions: 'Regions',
      contact: 'Contact Us',
      faq: 'FAQs',
      how_it_works: 'How It Works',
      releases: 'Releases',
      press: 'Press Kit',
      language_toggle: 'العربية',
      based_in: 'Proudly developed in the Arab World',
      gcc_tagline: 'Serving clients across Kuwait & the GCC',
    },
    ar: {
      studio_name: 'استوديو بريد جيمز',
      rights: `© ${currentYear} استوديو بريد جيمز. كل الحقوق محفوظة.`,
      games: 'الألعاب',
      studio: 'الاستوديو',
      about_us: 'من نحن',
      services: 'الخدمات',
      devlog: 'مدونة التطوير',
      case_studies: 'دراسات الحالة',
      design_works: 'أعمال التصميم',
      careers: 'وظائف',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      imprint: 'بيان قانوني',
      regions: 'المناطق',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      how_it_works: 'كيف نعمل',
      releases: 'الإصدارات',
      press: 'الملف الصحفي',
      language_toggle: 'English',
      based_in: 'تم التطوير بكل فخر في الوطن العربي',
      gcc_tagline: 'نخدم العملاء في الكويت والخليج',
    },
  }[language];

  // Short localized labels, hardcoded on purpose: importing the full content
  // modules here would ship every page's copy in the shared client bundle.
  const serviceLinks: { path: string; label: Record<Locale, string> }[] = [
    { path: '/services/game-development', label: { en: 'Game Development', ar: 'تطوير الألعاب' } },
    { path: '/services/mobile-game-development', label: { en: 'Mobile Games', ar: 'ألعاب الجوال' } },
    { path: '/services/unity-game-development', label: { en: 'Unity Development', ar: 'تطوير Unity' } },
    { path: '/services/unreal-engine-development', label: { en: 'Unreal & MetaHuman', ar: 'Unreal وMetaHuman' } },
    { path: '/services/multiplayer-game-development', label: { en: 'Multiplayer Games', ar: 'الألعاب الجماعية' } },
    { path: '/services/game-art-design', label: { en: '2D/3D Art & Animation', ar: 'فن وتحريك 2D/3D' } },
    { path: '/services/app-development', label: { en: 'App Development', ar: 'تطوير التطبيقات' } },
    { path: '/services/web-development', label: { en: 'Web Development', ar: 'تطوير المواقع' } },
  ];

  const regionLinks: { path: string; label: Record<Locale, string> }[] = [
    { path: '/game-development-kuwait', label: { en: 'Kuwait', ar: 'الكويت' } },
    { path: '/game-development-saudi-arabia', label: { en: 'Saudi Arabia', ar: 'السعودية' } },
    { path: '/game-development-uae', label: { en: 'UAE', ar: 'الإمارات' } },
    { path: '/game-development-qatar', label: { en: 'Qatar', ar: 'قطر' } },
    { path: '/game-development-bahrain', label: { en: 'Bahrain', ar: 'البحرين' } },
    { path: '/game-development-oman', label: { en: 'Oman', ar: 'عُمان' } },
  ];

  const columnHeading = "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 mb-3";

  return (
    <footer className="relative border-t border-border bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-14">
        {/* Brand + contact: the single contact surface of the site footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between pb-10 border-b border-border">
          <div className="flex items-start gap-4">
            <Image
              src={assets.logo}
              alt="Buried Games Studio Logo"
              width={48}
              height={48}
              className="object-contain mt-0.5"
            />
            <div>
              <p className="font-display text-lg tracking-[0.08em] text-foreground">{t_ui.studio_name}</p>
              <p className="text-sm text-muted-foreground mt-1">{t_ui.gcc_tagline}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="mailto:support@buriedgames.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                support@buriedgames.com
              </a>
              <a
                href="https://wa.me/96555528686"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer')}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                +965 5552 8686
              </a>
            </div>
            <div className="flex items-center gap-1">
              {socialLinks.map(social => {
                const Icon = social.icon as React.ElementType;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                    onClick={() => trackSocialClick(social.label, 'footer')}
                  >
                    {social.icon === 'whatsapp' ? (
                      <WhatsAppIcon className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10">
          <div>
            <p className={columnHeading}>{t_ui.games}</p>
            {t.games.map(game => (
              <FooterLink key={game.id} href={href(`/games/${game.slug}`)}>{game.title}</FooterLink>
            ))}
          </div>
          <div>
            <p className={columnHeading}>{t_ui.services}</p>
            {serviceLinks.map(({ path, label }) => (
              <FooterLink key={path} href={href(path)}>{label[language]}</FooterLink>
            ))}
          </div>
          <div>
            <p className={columnHeading}>{t_ui.regions}</p>
            {regionLinks.map(({ path, label }) => (
              <FooterLink key={path} href={href(path)}>{label[language]}</FooterLink>
            ))}
          </div>
          <div>
            <p className={columnHeading}>{t_ui.studio}</p>
            <FooterLink href={href("/about-us")}>{t_ui.about_us}</FooterLink>
            <FooterLink href={href("/how-it-works")}>{t_ui.how_it_works}</FooterLink>
            <FooterLink href={href("/case-studies")}>{t_ui.case_studies}</FooterLink>
            {showDesignWorks && (
              <FooterLink href={href("/design-works")}>{t_ui.design_works}</FooterLink>
            )}
            <FooterLink href={href("/devlog")}>{t_ui.devlog}</FooterLink>
            <FooterLink href={href("/releases")}>{t_ui.releases}</FooterLink>
            <FooterLink href={href("/press")}>{t_ui.press}</FooterLink>
            <FooterLink href={href("/careers")}>{t_ui.careers}</FooterLink>
            <FooterLink href={href("/faq")}>{t_ui.faq}</FooterLink>
            <FooterLink href={href("/contact-us")}>{t_ui.contact}</FooterLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-border text-sm text-muted-foreground">
          <p>{t_ui.rights}</p>
          <p className="text-foreground/40">{t_ui.based_in}</p>
          <div className="flex items-center gap-5">
            <Link href={href("/privacy-policy")} className="hover:text-foreground transition-colors">{t_ui.privacy}</Link>
            <Link href={href("/terms-of-use")} className="hover:text-foreground transition-colors">{t_ui.terms}</Link>
            {legalEntity.registered && (
              <Link href={href("/imprint")} className="hover:text-foreground transition-colors">{t_ui.imprint}</Link>
            )}
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              aria-label="Switch language"
              onClick={() => trackLanguageToggle(otherLocale)}
              className={cn(
                "inline-flex items-center gap-1.5 hover:text-foreground transition-colors",
                language === 'en' ? 'font-arabic' : 'font-body'
              )}
            >
              <Globe className="w-4 h-4" />
              {t_ui.language_toggle}
            </Link>
          </div>
        </div>

        {/* Legal-entity fine print — dormant until the OÜ is on the register
            (legalEntity.registered), so nothing about the Estonian entity shows
            publicly before incorporation. The GCC market framing above is
            untouched. */}
        {legalEntity.registered && (
          <p className="pt-5 text-xs text-foreground/35">
            {legalEntity.legalName}
            {legalEntity.registryCode ? ` · Reg. no. ${legalEntity.registryCode}` : ''}
            {legalEntity.vatId ? ` · VAT ${legalEntity.vatId}` : ''}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
