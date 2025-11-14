'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/translations';
import GlowingText from '@/shared/ui/GlowingText';
import FloatingShapes from '@/shared/ui/FloatingShapes';
import LanguageToggle from '@/widgets/layout/LanguageToggle';

const HomePage = ({ onStart, onProfile }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 relative overflow-hidden">
      {/* Animatsiyali fon shakllari */}
      <FloatingShapes />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-8">
        {/* Logotip va salom */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
            <GlowingText>Kids Learn</GlowingText>
          </h1>
          <motion.p
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl md:text-2xl lg:text-3xl text-white font-medium"
          >
            {t('welcome')}
          </motion.p>
        </motion.div>

        {/* Tugmalar */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl flex items-center justify-center gap-3 hover:shadow-pink-300 transition-all"
            aria-label={t('start')}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              Gamepad
            </motion.div>
            {t('start')}
            <ArrowRight className="w-7 h-7" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onProfile}
            className="bg-white text-pink-600 px-10 py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl flex items-center justify-center gap-3 hover:shadow-yellow-300 transition-all"
            aria-label={t('profile')}
          >
            <User className="w-7 h-7" />
            {t('profile')}
          </motion.button>
        </div>

        {/* Til almashtirgich */}
        <div className="absolute top-6 right-6">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
};

export default HomePage;