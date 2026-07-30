'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DEFAULT_LOCALE, LOCALES, getT } from './dictionary';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'dp_locale';

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && LOCALES.includes(stored)) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((loc) => {
    if (!LOCALES.includes(loc)) return;
    setLocaleState(loc);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, loc);
    if (typeof document !== 'undefined') document.documentElement.lang = loc;
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  const t = getT(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
