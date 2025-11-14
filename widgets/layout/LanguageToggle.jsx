'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/shared/i18n/translations';

const LanguageToggle = () => {
  const { lang, setLang } = useTranslation();

  const toggle = () => {
    setLang(lang === 'en' ? 'uz' : 'en');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="bg-white px-4 py-2 rounded-full shadow-lg text-lg font-medium flex items-center gap-2"
      aria-label="Toggle language"
    >
      {lang === 'en' ? (
        <>
          O'zbek
        </>
      ) : (
        <>
          English
        </>
      )}
    </motion.button>
  );
};

export default LanguageToggle;