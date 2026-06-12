"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

export type Language = Locale;

interface LanguageContextType {
  language: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Read-only locale access for client islands. The locale is owned by the URL
 * (/ = en, /ar/* = ar) and seeded by the [locale] layout — switching language
 * is navigation to the alternate URL (see the header), never client state.
 */
export const LanguageProvider = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => {
  return (
    <LanguageContext.Provider value={{ language: locale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
