
"use client";

import Link from "next/link";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";
import { ChevronDown, Menu } from "lucide-react";
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

  useEffect(() => {
    setIsMounted(true);
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo and Brand Name */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src={logoImage} alt="Buried Games Studio Logo" width={40} height={40} />
          <span className="font-headline text-lg tracking-wide sm:inline-block">
            Buried Games Studio
          </span>
        </Link>
        
        {isMounted && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-4 text-sm md:flex lg:gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-accent data-[state=open]:text-accent">
                  {t_ui.games}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {t.games.map((game) => (
                    <DropdownMenuItem key={game.id} asChild>
                      <Link href={`/#${game.id}`}>{game.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/services"
                className="text-foreground/60 transition-colors hover:text-accent"
              >
                {t_ui.services}
              </Link>
               <Link
                href="/about-us"
                className="text-foreground/60 transition-colors hover:text-accent"
              >
                {t_ui.about_us}
              </Link>
              <Link
                href="/devlog"
                className="text-foreground/60 transition-colors hover:text-accent"
              >
                {t_ui.devlog}
              </Link>
            </nav>

            {/* Language Toggle and Mobile Menu Trigger */}
            <div className="ml-auto flex items-center gap-2">
                <button
                    onClick={toggleLanguage} 
                    aria-label="Toggle language"
                    className={cn(
                        "text-sm text-foreground/60 transition-colors hover:text-accent",
                        language === 'en' ? 'font-arabic' : 'font-body'
                    )}
                >
                    {t_ui.lang_toggle}
                </button>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <SheetHeader>
                          <SheetTitle className="sr-only">Menu</SheetTitle>
                        </SheetHeader>
                        <Link href="/" className="mb-8 flex items-center space-x-2">
                            <Image src={logoImage} alt="Buried Games Studio Logo" width={40} height={40} />
                            <span className="font-headline text-lg tracking-wide">
                                Buried Games Studio
                            </span>
                        </Link>
                        <div className="flex flex-col space-y-3">
                            <h4 className="px-2 font-medium">{t_ui.games}</h4>
                            <div className="pl-6">
                            {t.games.map((game) => (
                                <SheetClose asChild key={game.id}>
                                    <Link href={`/#${game.id}`} className="block py-1 text-muted-foreground">{game.title}</Link>
                                </SheetClose>
                            ))}
                            </div>
                            <SheetClose asChild>
                              <Link href="/services" className="px-2 font-medium">{t_ui.services}</Link>
                            </SheetClose>
                             <SheetClose asChild>
                              <Link href="/about-us" className="px-2 font-medium">{t_ui.about_us}</Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link href="/devlog" className="px-2 font-medium">{t_ui.devlog}</Link>
                            </SheetClose>
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
