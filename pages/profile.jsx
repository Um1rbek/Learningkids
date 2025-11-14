'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Trophy, Star } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/translations';
import GlowingText from '@/shared/ui/GlowingText';
import badges from '@/features/quiz/badges';

// Default progress (localStorage bo'sh bo'lsa)
const DEFAULT_PROGRESS = { points: 0, badges: [], completedLessons: [] };

const ProfilePage = ({ onBack, onPlayAgain }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  // localStorage dan yuklash (faqat brauzerda)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('kidsLearnProgress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        setProgress(DEFAULT_PROGRESS);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Orqaga tugmasi */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="bg-white p-3 rounded-full shadow-lg mb-8"
          aria-label={t('home')}
        >
          <Home className="w-6 h-6" />
        </motion.button>

        {/* Asosiy karta */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-purple-600">
            <GlowingText>{t('profile')}</GlowingText>
          </h2>

          {/* Ballar va nishonlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-8 text-center"
            >
              <Trophy className="w-16 h-16 mx-auto mb-4 text-white" />
              <p className="text-5xl font-bold text-white">{progress.points}</p>
              <p className="text-2xl text-white font-medium">{t('points')}</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl p-8 text-center"
            >
              <Star className="w-16 h-16 mx-auto mb-4 text-white" />
              <p className="text-5xl font-bold text-white">{progress.badges.length}</p>
              <p className="text-2xl text-white font-medium">{t('badges')}</p>
            </motion.div>
          </div>

          {/* Nishonlar ro'yxati */}
          <h3 className="text-3xl font-bold mb-6 text-center text-purple-600">
            {t('badges')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              const earned = progress.badges.includes(badge.id);

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 text-center transition-all ${
                    earned
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 shadow-xl'
                      : 'bg-gray-200'
                  }`}
                >
                  <Icon
                    className={`w-12 h-12 mx-auto mb-2 ${
                      earned ? badge.color : 'text-gray-400'
                    }`}
                  />
                  <p
                    className={`text-lg font-medium ${
                      earned ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {badge.name}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Yana o'ynash */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="mt-12 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 rounded-full text-2xl font-bold shadow-xl"
          >
            {t('playAgain')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;