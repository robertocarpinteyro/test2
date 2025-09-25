"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface TranslationContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

// Create context with default value to prevent SSR issues
const TranslationContext = createContext<TranslationContextType>({
  locale: 'es',
  setLocale: () => {},
  t: (key: string) => key,
});

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [locale, setLocale] = useState('es'); // Default to Spanish
  const [translations, setTranslations] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting to prevent SSR hydration issues
  useEffect(() => {
    setMounted(true);
    loadTranslations();
  }, []);

  useEffect(() => {
    if (mounted) {
      loadTranslations();
    }
  }, [locale, mounted]);

  // Import translation files dynamically
  const loadTranslations = async () => {
    try {
      if (typeof window !== 'undefined') {
        const translationModule = locale === 'es'
          ? await import('@/data/translations/es.json')
          : await import('@/data/translations/en.json');
        setTranslations(translationModule.default || translationModule);
      }
    } catch (error) {
      console.error('Translation file not found:', error);
      setTranslations({});
    }
  };

  const t = (key: string, options?: { returnObjects?: boolean }) => {
    // Return key during SSR or before translations are loaded
    if (!mounted || !translations || Object.keys(translations).length === 0) {
      return key;
    }

    const keys = key.split('.');
    let translation: any = translations;

    keys.forEach((k) => {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        if (mounted) {
          console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        }
        translation = null;
      }
    });

    if (options?.returnObjects && translation && typeof translation === 'object') {
      return translation;
    }

    return translation || key; // Return the key itself if no translation found
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  return context;
};