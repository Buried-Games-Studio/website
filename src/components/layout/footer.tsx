"use client";
import { Youtube } from 'lucide-react';
import Link from 'next/link';
import LogoIcon from '../icons/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <LogoIcon className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Buried Games HQ. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <div className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                    <Youtube className="h-5 w-5" />
                </div>
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
