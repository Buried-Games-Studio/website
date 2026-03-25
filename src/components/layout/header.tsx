
"use client";

import Link from "next/link";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";
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
import { motion } from "framer-motion";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="relative text-foreground/80 transition-all hover:text-primary group">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
);

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled (for background style)
      setScrolled(currentScrollY > 20);

      // Determine visibility (smart hide/show)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false); // Scrolling down & past threshold -> Hide
      } else {
        setVisible(true); // Scrolling up -> Show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t_ui = {
    en: {
      games: 'Games',
      services: 'Services',
      devlog: 'Devlog',
      about_us: 'About Us',
      careers: 'Careers',
      lang_toggle: 'العربية',
    },
    ar: {
      games: 'الألعاب',
      services: 'الخدمات',
      devlog: 'مدونة التطوير',
      about_us: 'من نحن',
      careers: 'وظائف',
      lang_toggle: 'English',
    }
  }[language];

  return (
    <motion.header
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
        <Link href="/" className="flex items-center space-x-3 group">
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
          <span className="font-headline text-lg tracking-wide hidden sm:inline-block text-foreground group-hover:text-primary transition-colors duration-300">
            Buried Games Studio
          </span>
        </Link>

        {isMounted && (
          <>
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
                      <Link href={`/games/${game.slug}`}>{game.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink href="/services">{t_ui.services}</NavLink>
              <NavLink href="/devlog">{t_ui.devlog}</NavLink>
              <NavLink href="/about-us">{t_ui.about_us}</NavLink>
              <NavLink href="/careers">{t_ui.careers}</NavLink>
            </nav>

            {/* Language Toggle and Mobile Menu Trigger */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className={cn(
                  "hidden md:flex items-center gap-2 text-foreground/80 hover:text-accent hover:bg-accent/10 transition-all",
                  language === 'en' ? 'font-arabic' : 'font-body'
                )}
              >
                <Globe className="h-4 w-4" />
                {t_ui.lang_toggle}
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
                  <Link href="/" className="mb-8 flex items-center space-x-2 group">
                    <Image src={assets.logo} alt="Buried Games Studio Logo" width={40} height={40} className="group-hover:scale-110 transition-transform" />
                    <span className="font-headline text-lg tracking-wide group-hover:text-primary transition-colors">
                      Buried Games Studio
                    </span>
                  </Link>
                  <div className="flex flex-col space-y-6">
                    <div className="space-y-3">
                      <h4 className="px-2 font-bold text-primary">{t_ui.games}</h4>
                      <div className="ps-4 space-y-2 border-s-2 border-primary/20 ms-2">
                        {t.games.map((game) => (
                          <SheetClose asChild key={game.id}>
                            <Link href={`/games/${game.slug}`} className="block py-1 text-muted-foreground hover:text-foreground transition-colors">{game.title}</Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <SheetClose asChild>
                        <Link href="/services" className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.services}</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/devlog" className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.devlog}</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/about-us" className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.about_us}</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/careers" className="block px-2 text-lg font-medium hover:text-primary transition-colors">{t_ui.careers}</Link>
                      </SheetClose>
                    </div>

                    <div className="pt-6 border-t border-border/40">
                      <button
                        onClick={toggleLanguage}
                        className={cn(
                          "flex items-center gap-2 px-2 text-lg font-medium hover:text-accent transition-colors w-full text-start",
                          language === 'en' ? 'font-arabic' : 'font-body'
                        )}
                      >
                        <Globe className="h-5 w-5" />
                        {t_ui.lang_toggle}
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
