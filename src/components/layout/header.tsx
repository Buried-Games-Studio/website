"use client";

import Link from "next/link";
import Image from 'next/image';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslation } from "@/lib/content";
import { cn } from "@/lib/utils";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);

  const navLinks = {
    en: [
      { href: "/#games", label: "Games" },
      { href: "/release-notes", label: "Release Notes" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#contact", label: "Contact" },
    ],
    ar: [
      { href: "/#games", label: "الألعاب" },
      { href: "/release-notes", label: "ملاحظات الإصدار" },
      { href: "/#faq", label: "الأسئلة الشائعة" },
      { href: "/#contact", label: "اتصل بنا" },
    ],
  };
  
  const langToggleText = language === 'en' ? 'العربية' : 'English';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src={logoImage} alt="Buried Games Studio Logo" width={40} height={40} />
          <span className="hidden sm:inline-block font-headline text-lg tracking-wide">
            Buried Games Studio
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6 flex-1">
          {navLinks[language].map((link) => {
            if (link.label === "Games" || link.label === "الألعاب") {
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none data-[state=open]:text-foreground/80">
                    {link.label}
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
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="ghost"
            onClick={toggleLanguage} 
            aria-label="Toggle language"
            className={cn(language === 'en' ? 'font-arabic' : 'font-body')}
          >
            {langToggleText}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
