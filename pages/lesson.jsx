'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Star, Check, X } from 'lucide-react';
import { useTranslation } from '@/shared/i18n/translations';
import GlowingText from '@/shared/ui/GlowingText';
import mathQuestions from '@/features/quiz/questions';

const LessonPage = ({ onComplete, onBack }) => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const question = mathQuestions[currentQuestion];

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelectedAnswer(index);
    setShowResult(true);

    if (index === question.correct) {
      setScore(score + 20);
    }

    setTimeout(() => {
      if (currentQuestion < mathQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnimateKey(animateKey + 1);
      } else {
        onComplete(score + (index === question.correct ? 20 : 0));
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-green-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Yuqori panel */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-white p-3 rounded-full shadow-lg"
            aria-label={t('home')}
          >
            <Home className="w-6 h-6" />
          </motion.button>

          <div className="bg-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-lg font-bold">
              {t('question')} {currentQuestion + 1} {t('of')} {mathQuestions.length}
            </span>
          </div>

          <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-bold">{score}</span>
          </div>
        </div>

        {/* Savol kartasi */}
        <motion.div
          key={animateKey}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12 text-purple-600"
          >
            <GlowingText>{question.question}</GlowingText>
          </motion.h2>

          {/* Javob tugmalari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`p-6 md:p-8 rounded-2xl text-2xl md:text-3xl font-bold transition-all ${
                  showResult
                    ? index === question.correct
                      ? 'bg-green-400 text-white shadow-lg'
                      : index === selectedAnswer
                      ? 'bg-red-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                    : 'bg-gradient-to-r from-pink-300 to-yellow-300 text-white shadow-lg hover:shadow-xl'
                }`}
                aria-label={`Javob: ${option}`}
              >
                <AnimatePresence>
                  {showResult && index === question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-block mr-3"
                    >
                      <Check className="w-8 h-8 inline" />
                    </motion.div>
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-block mr-3"
                    >
                      <X className="w-8 h-8 inline" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {option}
              </motion.button>
            ))}
          </div>

          {/* Natija ko'rsatish */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center"
              >
                <p
                  className={`text-2xl font-bold ${
                    selectedAnswer === question.correct ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {selectedAnswer === question.correct ? t('correct') : t('wrong')}
                </p>
                {selectedAnswer !== question.correct && (
                  <p className="text-lg mt-2 text-purple-600">{question.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;