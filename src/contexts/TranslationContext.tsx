"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TranslationContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const TranslationContext = React.createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [locale, setLocale] = React.useState('es'); // Default to Spanish

  // Import translation files dynamically
  const getTranslations = () => {
    try {
      if (locale === 'es') {
        return require('@/data/translations/es.json');
      } else {
        return require('@/data/translations/en.json');
      }
    } catch (error) {
      console.error('Translation file not found:', error);
      return {};
    }
  };

  const t = (key: string, options?: { returnObjects?: boolean }) => {
    const translations = getTranslations();
    const keys = key.split('.');
    let translation: any = translations;

    keys.forEach((k) => {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
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
  const context = React.useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};