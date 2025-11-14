'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Tarjimalar
const translations = {
  en: {
    welcome: "Welcome to Kids Learn!",
    start: "Start Learning",
    profile: "My Profile",
    home: "Home",
    points: "Points",
    badges: "Badges",
    lesson: "Math Adventure",
    question: "Question",
    of: "of",
    correct: "Correct!",
    wrong: "Try Again!",
    next: "Next",
    finish: "Finish",
    greatJob: "Great Job!",
    earnedBadge: "You earned a new badge!",
    playAgain: "Play Again",
    backToHome: "Back to Home",
  },
  uz: {
    welcome: "Kids Learn ga xush kelibsiz!",
    start: "O'rganishni boshlash",
    profile: "Mening profilim",
    home: "Bosh sahifa",
    points: "Ballar",
    badges: "Nishonlar",
    lesson: "Matematika sarguzashti",
    question: "Savol",
    of: "dan",
    correct: "To'g'ri!",
    wrong: "Yana urinib ko'ring!",
    next: "Keyingisi",
    finish: "Tugatish",
    greatJob: "Ajoyib ish!",
    earnedBadge: "Yangi nishon oldingiz!",
    playAgain: "Yana o'ynash",
    backToHome: "Bosh sahifaga",
  },
};

// Language Context
const LanguageContext = createContext({
  lang: 'en',
  t: (key) => key,
  setLang: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  // localStorage faqat brauzerda
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('kidsLearnLang');
    if (saved && ['en', 'uz'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  // Tilni saqlash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kidsLearnLang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook
export const useTranslation = () => {
  return useContext(LanguageContext);
};