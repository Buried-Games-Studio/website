
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/content';
import {
  Mail,
  MapPin,
  Globe
} from 'lucide-react';
import logoImage from '@/components/images/buriedgames_logo.png';
import { cn } from '@/lib/utils';
import { socialLinks } from './social-links';

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);
  const currentYear = new Date().getFullYear();

  const t_ui = {
    en: {
      studio_name: 'Buried Games Studio',
      rights: `© ${currentYear} Buried Games Studio. All rights reserved.`,
      games: 'Games',
      sitemap: 'Site Map',
      about_us: 'About Us',
      services: 'Services',
      devlog: 'Devlog',
      careers: 'Careers',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      additional_links: 'Additional links',
      contact: 'Contact Us',
      faq: 'FAQs',
      language_toggle: 'العربية',
      based_in: 'Proudly developed in the Arab World',
    },
    ar: {
      studio_name: 'استوديو بريد جيمز',
      rights: `© ${currentYear} استوديو بريد جيمز. كل الحقوق محفوظة.`,
      games: 'الألعاب',
      sitemap: 'خريطة الموقع',
      about_us: 'من نحن',
      services: 'الخدمات',
      devlog: 'مدونة التطوير',
      careers: 'وظائف',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      additional_links: 'روابط إضافية',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      language_toggle: 'English',
      based_in: 'تم التطوير بكل فخر في الوطن العربي',
    },
  }[language];

  return (
    <footer className="relative border-t border-primary/20 bg-background text-foreground overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-start space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={logoImage}
                alt="Buried Games Studio Logo"
                width={180}
                height={180}
                className="relative object-contain h-auto w-full max-w-[180px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <h1 className="text-2xl tracking-widest font-headline text-primary" style={{ letterSpacing: '0.1em' }}>{t_ui.studio_name}</h1>
              <p className="text-sm text-muted-foreground mt-2">{t_ui.rights}</p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-4 text-foreground/90 border-b border-primary/20 pb-2 inline-block">{t_ui.games}</h2>
              <ul className="space-y-3">
                {t.games.map(game => (
                  <li key={game.id}>
                    <Link href={`/#${game.id}`} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">
                      {game.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4 text-foreground/90 border-b border-primary/20 pb-2 inline-block">{t_ui.sitemap}</h2>
              <ul className="space-y-3">
                <li><Link href="/about-us" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.about_us}</Link></li>
                <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.services}</Link></li>
                <li><Link href="/devlog" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.devlog}</Link></li>
                <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.careers}</Link></li>
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.privacy}</Link></li>
                <li><Link href="/terms-of-use" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.terms}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4 text-foreground/90 border-b border-primary/20 pb-2 inline-block">{t_ui.additional_links}</h2>
              <ul className="space-y-3">
                <li><Link href="/contact-us" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.contact}</Link></li>
                <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">{t_ui.faq}</Link></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="space-y-4">
              <h2 className="font-bold text-lg mb-4 text-foreground/90 border-b border-primary/20 pb-2 inline-block">{t_ui.contact}</h2>
              <p className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </span>
                support@buriedgames.com
              </p>
              <a href="https://wa.me/96555528686" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <span className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt="WhatsApp" width={16} height={16} className="w-4 h-4" />
                </span>
                +965 55528686
              </a>
              <p className="flex items-center gap-3 text-sm text-muted-foreground group">
                <span className="p-2 rounded-full bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </span>
                {t_ui.based_in}
              </p>
            </div>

            <div className="pt-4">
              <button onClick={toggleLanguage} className={cn(
                "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors border border-border/50 rounded-full px-4 py-2 hover:border-accent/50 hover:bg-accent/5",
                language === 'en' ? 'font-arabic' : 'font-body'
              )}>
                <Globe className="w-4 h-4" />
                {t_ui.language_toggle}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {socialLinks.map(social => {
              const Icon = social.icon as React.ElementType;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon === 'whatsapp' ? (
                    <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt={social.label} width={24} height={24} className="w-5 h-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
