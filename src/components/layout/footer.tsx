
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { getTranslation } from '@/lib/content';
import {
  Mail,
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
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      additional_links: 'Additional links',
      contact: 'Contact Us',
      faq: 'FAQs',
      language_toggle: 'العربية',
      based_in: 'Game development based in Kuwait 🇰🇼',
    },
    ar: {
      studio_name: 'استوديو بريد جيمز',
      rights: `© ${currentYear} استوديو بريد جيمز. كل الحقوق محفوظة.`,
      games: 'الألعاب',
      sitemap: 'خريطة الموقع',
      about_us: 'من نحن',
      services: 'الخدمات',
      devlog: 'مدونة التطوير',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      additional_links: 'روابط إضافية',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
      language_toggle: 'English',
      based_in: 'تطوير ألعاب مقره في الكويت 🇰🇼',
    },
  }[language];

  return (
    <footer className="border-t border-border/40 bg-card text-card-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-start">
             <Image 
                src={logoImage}
                alt="Buried Games Studio Logo"
                width={200}
                height={200}
                className="object-contain mb-4 h-auto w-full max-w-[200px]"
             />
            <h1 className="text-lg tracking-wide font-headline" style={{ letterSpacing: '0.1em' }}>{t_ui.studio_name}</h1>
            <p className="text-sm text-muted-foreground mt-2">{t_ui.rights}</p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="font-semibold mb-3">{t_ui.games}</h2>
              <ul className="space-y-2">
                {t.games.map(game => (
                  <li key={game.id}><Link href={`/#${game.id}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">{game.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-3">{t_ui.sitemap}</h2>
              <ul className="space-y-2">
                <li><Link href="/about-us" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t_ui.about_us}</Link></li>
                <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t_ui.privacy}</Link></li>
                <li><Link href="/terms-of-use" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t_ui.terms}</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-3">{t_ui.additional_links}</h2>
              <ul className="space-y-2">
                <li><Link href="/contact-us" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t_ui.contact}</Link></li>
                <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">{t_ui.faq}</Link></li>
                <li>
                  <button onClick={toggleLanguage} className={cn(
                    "text-sm text-muted-foreground hover:text-accent transition-colors",
                    language === 'en' ? 'font-arabic' : 'font-body'
                  )}>
                    {t_ui.language_toggle}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
             <div className="space-y-2">
                 <p className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-accent" />
                    support@buriedgames.com
                </p>
                <a href="https://wa.me/96555528686" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
                    <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt="WhatsApp" width={16} height={16} />
                    +965 55528686
                </a>
             </div>
             <p className="text-sm text-muted-foreground">{t_ui.based_in}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex justify-center items-center gap-4">
            {socialLinks.map(social => {
                const Icon = social.icon as React.ElementType;
                return (
                    <a 
                        key={social.href}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-muted-foreground hover:text-accent transition-colors"
                    >
                       {social.icon === 'whatsapp' ? (
                         <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt={social.label} width={24} height={24} />
                       ) : (
                         <Icon className="h-6 w-6" />
                       )}
                    </a>
                )
            })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
