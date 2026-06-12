
"use client";

import Link from "next/link";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";
import { usePathname } from "next/navigation";
import { localePath, stripLocalePrefix, type Locale } from "@/lib/i18n";
import { trackLanguageToggle } from "@/lib/google-analytics";
import { ChevronDown, Menu, Globe } from "lucide-react";
import { assets } from '@/lib/assets';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getTranslation } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { m } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative text-foreground/80 transition-all hover:text-primary group">
    {children}
    <span className="absolute -bottom-1 start-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
);

const Header = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const t = getTranslation(language);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // The language switch is navigation: same route, alternate locale URL.
  const otherLocale: Locale = language === "en" ? "ar" : "en";
  const basePath = stripLocalePrefix(pathname);
  const switchHref = localePath(otherLocale, basePath);
  const href = (path: string) => localePath(language, path);

  useEffect(() => {
    let ticking = false;

    // rAF-throttle: scroll fires far more often than we paint. Coalesce to one
    // read per frame and only setState when a value actually flips, so the
    // animated m.header does not re-render on every scroll event.
    const update = () => {
      ticking = false;
      const currentScrollY = window.scrollY;

      setScrolled((prev) => {
        const next = currentScrollY > 20;
        return prev === next ? prev : next;
      });

      const nextVisible = !(currentScrollY > lastScrollY.current && currentScrollY > 100);
      setVisible((prev) => (prev === nextVisible ? prev : nextVisible));

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t_ui = {
    en: {
      games: 'Games',
      services: 'Services',
      all_services: 'All Services',
      devlog: 'Devlog',
      about_us: 'About Us',
      careers: 'Careers',
      cta: 'Start a project',
      lang_toggle: 'العربية',
    },
    ar: {
      games: 'الألعاب',
      services: 'الخدمات',
      all_services: 'كل الخدمات',
      devlog: 'مدونة التطوير',
      about_us: 'من نحن',
      careers: 'وظائف',
      cta: 'ابدأ مشروعك',
      lang_toggle: 'English',
    }
  }[language];

  // Short localized labels, hardcoded on purpose: importing the service
  // content module here would ship every page's copy in the shared bundle.
  const serviceNav: { path: string; label: Record<Locale, string> }[] = [
    { path: '/services/game-development', label: { en: 'Game Development', ar: 'تطوير الألعاب' } },
    { path: '/services/mobile-game-development', label: { en: 'Mobile Games', ar: 'ألعاب الجوال' } },
    { path: '/services/unity-game-development', label: { en: 'Unity Development', ar: 'تطوير Unity' } },
    { path: '/services/unreal-engine-development', label: { en: 'Unreal & MetaHuman', ar: 'Unreal وMetaHuman' } },
    { path: '/services/multiplayer-game-development', label: { en: 'Multiplayer Games', ar: 'الألعاب الجماعية' } },
    { path: '/services/game-art-design', label: { en: '2D/3D Art & Animation', ar: 'فن وتحريك 2D/3D' } },
    { path: '/services/app-development', label: { en: 'App Development', ar: 'تطوير التطبيقات' } },
    { path: '/services/web-development', label: { en: 'Web Development', ar: 'تطوير المواقع' } },
  ];

  return (
    <m.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] py-2"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href={href("/")} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src={assets.logo}
              alt="Buried Games Studio Logo"
              width={40}
              height={40}
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="font-display text-lg tracking-wide hidden sm:inline-block text-foreground group-hover:text-primary transition-colors duration-300">
            Buried Games Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 transition-all hover:text-primary hover:text-glow data-[state=open]:text-primary">
              {t_ui.games}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-primary/20 animate-in fade-in-0 zoom-in-95">
              {t.games.map((game) => (
                <DropdownMenuItem key={game.id} asChild className="focus:bg-primary/10 focus:text-primary cursor-pointer">
                  <Link href={href(`/games/${game.slug}`)}>{game.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/80 transition-all hover:text-primary hover:text-glow data-[state=open]:text-primary">
              {t_ui.services}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-primary/20 animate-in fade-in-0 zoom-in-95">
              <DropdownMenuItem asChild className="focus:bg-primary/10 focus:text-primary cursor-pointer font-medium">
                <Link href={href("/services")}>{t_ui.all_services}</Link>
              </DropdownMenuItem>
              {serviceNav.map(({ path, label }) => (
                <DropdownMenuItem key={path} asChild className="focus:bg-primary/10 focus:text-primary cursor-pointer">
                  <Link href={href(path)}>{label[language]}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href={href("/devlog")}>{t_ui.devlog}</NavLink>
          <NavLink href={href("/about-us")}>{t_ui.about_us}</NavLink>
          <NavLink href={href("/careers")}>{t_ui.careers}</NavLink>
        </nav>

        {/* Language Switch and Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden md:flex items-center gap-2 text-foreground/80 hover:text-accent hover:bg-accent/10 transition-all",
              language === 'en' ? 'font-arabic' : 'font-body'
            )}
          >
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              aria-label="Switch language"
              onClick={() => trackLanguageToggle(otherLocale)}
            >
              <Globe className="h-4 w-4" />
              {t_ui.lang_toggle}
            </Link>
          </Button>

          {/* Single conversion point in the chrome — contacts everywhere else
              were removed (floating rail, duplicated footer column). */}
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5"
          >
            <Link href={href("/contact-us")}>{t_ui.cta}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'right' : 'left'} className="w-[300px] border-primary/20 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href={href("/")} className="mb-8 flex items-center gap-2 group">
                <Image src={assets.logo} alt="Buried Games Studio Logo" width={40} height={40} className="group-hover:scale-110 transition-transform" />
                <span className="font-headline text-lg tracking-wide group-hover:text-primary transition-colors">
                  Buried Games Studio
                </span>
              </Link>
              <div className="flex flex-col space-y-6">
                <div className="space-y-3">
                  <p className="px-2 font-bold text-primary">{t_ui.games}</p>
                  <div className="ps-4 space-y-2 border-s-2 border-primary/20 ms-2">
                    {t.games.map((game) => (
                      <SheetClose asChild key={game.id}>
                        <Link href={href(`/games/${game.slug}`)} className="block py-1 text-muted-foreground hover:text-foreground transition-colors">{game.title}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="px-2 font-bold text-primary">{t_ui.services}</p>
                  <div className="ps-4 space-y-2 border-s-2 border-primary/20 ms-2">
                    <SheetClose asChild>
                      <Link href={href("/services")} className="block py-1 text-muted-foreground hover:text-foreground transition-colors">{t_ui.all_services}</Link>
                    </SheetClose>
                    {serviceNav.map(({ path, label }) => (
                      <SheetClose asChild key={path}>
                        <Link href={href(path)} className="block py-1 text-muted-foreground hover:text-foreground transition-colors">{label[language]}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <SheetClose asChild>
                    <Link href={href("/devlog")} className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.devlog}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={href("/about-us")} className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.about_us}</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={href("/careers")} className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.careers}</Link>
                  </SheetClose>
                </div>

                <div className="pt-6 border-t border-border/40">
                  <SheetClose asChild>
                    <Link
                      href={switchHref}
                      hrefLang={otherLocale}
                      onClick={() => trackLanguageToggle(otherLocale)}
                      className={cn(
                        "flex items-center gap-2 px-2 text-lg font-medium hover:text-accent transition-colors w-full text-start",
                        language === 'en' ? 'font-arabic' : 'font-body'
                      )}
                    >
                      <Globe className="h-5 w-5" />
                      {t_ui.lang_toggle}
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </m.header>
  );
};

export default Header;
