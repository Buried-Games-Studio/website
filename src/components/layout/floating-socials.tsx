
"use client";

import Image from "next/image";
import { socialLinks } from "./social-links";

const FloatingSocials = () => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-4 items-center bg-card/50 backdrop-blur-sm p-2 rounded-lg border border-border/40">
        {socialLinks.map((social) => {
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
              {social.icon === "whatsapp" ? (
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/220/220236.png"
                  alt={social.label}
                  width={24}
                  height={24}
                />
              ) : (
                <Icon className="h-6 w-6" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingSocials;
