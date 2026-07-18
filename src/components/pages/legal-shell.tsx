"use client";

import { isValidElement, type ReactNode } from "react";
import { m } from "framer-motion";

/**
 * Shared scaffolding for the legal pages (Privacy, Terms, Imprint): the eyebrow
 * hero + a structured section renderer. Keeps the three pages visually identical
 * and lets each one supply just its data.
 */

export type LegalBlock = ReactNode | { list: ReactNode[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };

export const legalLink =
  "text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors";

export function LegalShell({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <main>
      <section className="border-b border-border bg-card/40">
        <div className="container max-w-3xl py-14 md:py-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-5">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {eyebrow}
            </p>
            <h1 className="font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground">
              {title}
            </h1>
            {meta && <p className="mt-4 text-sm text-foreground/50">{meta}</p>}
          </m.div>
        </div>
      </section>

      <section className="container max-w-3xl py-14 md:py-20">{children}</section>
    </main>
  );
}

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <section key={i} className="space-y-4 scroll-mt-24">
          <h2 className="font-headline font-bold tracking-tight text-xl md:text-2xl text-foreground">
            {section.heading}
          </h2>
          <div className="space-y-4 text-foreground/75 leading-relaxed">
            {section.blocks.map((block, j) => {
              if (
                block !== null &&
                typeof block === "object" &&
                !isValidElement(block) &&
                "list" in block
              ) {
                return (
                  <ul key={j} className="list-disc ps-5 space-y-2 marker:text-primary/60">
                    {(block as { list: ReactNode[] }).list.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={j}>{block as ReactNode}</p>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
