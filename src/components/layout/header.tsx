
"use client";

import Link from "next/link";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";
import { ChevronDown, Menu, Globe } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';
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
import { useEffect, useState } from "react";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t_ui = {
    en: {
      games: 'Games',
      services: 'Services',
      devlog: 'Devlog',
      about_us: 'About Us',
      lang_toggle: 'العربية',
    },
    ar: {
      games: 'الألعاب',
      services: 'الخدمات',
      devlog: 'مدونة التطوير',
      about_us: 'من نحن',
      lang_toggle: 'English',
    }
  }[language];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src={logoImage}
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

              <Link href="/services" className="text-foreground/80 transition-all hover:text-primary hover:text-glow">
                {t_ui.services}
              </Link>
              <Link href="/devlog" className="text-foreground/80 transition-all hover:text-primary hover:text-glow">
                {t_ui.devlog}
              </Link>
              <Link href="/about-us" className="text-foreground/80 transition-all hover:text-primary hover:text-glow">
                {t_ui.about_us}
              </Link>
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
                    <Image src={logoImage} alt="Buried Games Studio Logo" width={40} height={40} className="group-hover:scale-110 transition-transform" />
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
    </header>
  );
};

export default Header;
