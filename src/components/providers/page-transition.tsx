"use client";

import { m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // initial={false}: the first mount (and the SSR HTML) renders fully
    // visible. Wrapping the page in initial opacity-0 shipped invisible HTML
    // that only painted after hydration — destroying LCP on every cold load
    // (and registering NO_LCP on desktop Lighthouse). Only client-side route
    // changes animate.
    <AnimatePresence mode="wait" initial={false}>
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
