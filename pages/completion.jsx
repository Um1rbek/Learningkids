'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/translations';
import GlowingText from '@/shared/ui/GlowingText';
import badges from '@/features/quiz/badges';

const CompletionPage = ({ score, onProfile, onPlayAgain }) => {
  const { t } = useTranslation();

  // Yangi nishon (agar ball 80+ bo'lsa)
  const newBadge = score >= 80 ? badges.find(b => b.id === 'star') : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 flex items-center justify-center p-6 md:p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full"
      >
        {/* Kubok animatsiyasi */}
        <motion.div
          animate={{ rotate: [0, -12, 12, -12, 12, 0] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="mb-8"
        >
          <Trophy className="w-32 h-32 md:w-40 md:h-40 mx-auto text-yellow-500" />
        </motion.div>

        {/* Tabrik matni */}
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <GlowingText>{t('greatJob')}</GlowingText>
        </h2>

        <p className="text-3xl md:text-4xl mb-10 text-purple-600">
          {t('points')}: <span className="font-bold text-yellow-500">{score}</span>
        </p>

        {/* Yangi nishon ko'rsatish */}
        <AnimatePresence>
          {newBadge && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-10"
            >
              <p className="text-xl md:text-2xl mb-4 text-green-600 font-bold">
                {t('earned,earnedBadge')}
              </p>
              <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-6 inline-block shadow-xl">
                <newBadge.icon className={`w-16 h-16 ${newBadge.color}`} />
                <p className="text-xl font-bold text-white mt-2">{newBadge.name}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tugmalar */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onProfile}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            {t('profile')}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            {t('playAgain')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionPage;