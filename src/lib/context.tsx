import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from './i18n';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('nafas-lang');
    return (stored as Language) || 'en';
  });
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('nafas-theme');
    return stored ? stored === 'dark' : false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('nafas-auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('nafas-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('nafas-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('nafas-auth', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  const setLang = (l: Language) => setLangState(l);
  const toggleTheme = () => setIsDark((d) => !d);

  return (
    <AppContext.Provider value={{ lang, setLang, isDark, toggleTheme, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
