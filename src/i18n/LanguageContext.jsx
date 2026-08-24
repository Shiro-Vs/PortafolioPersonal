import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { es } from './dictionaries/es';
import { en } from './dictionaries/en';

const DICTIONARIES = { es, en };
const STORAGE_KEY = 'lang';

const LanguageContext = createContext(null);

function getFromPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'es';
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => {
    const dict = DICTIONARIES[lang];
    const t = (key) => getFromPath(dict, key) ?? key;
    return { lang, setLang, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
