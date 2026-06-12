"use client";

import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Skip animation on mobile — the opacity fade delays LCP on touch devices.
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      {/* Opacity-only: no transform/layout work, so the transition stays cheap
          and never offsets content during paint. Kept short (<= 0.3s). */}
      <m.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
