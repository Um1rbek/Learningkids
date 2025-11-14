'use client';

import React, { useState, useEffect } from 'react';
import HomePage from '@/pages/home';
import LessonPage from '@/pages/lesson';
import ProfilePage from '@/pages/profile';
import CompletionPage from '@/pages/completion';
import { LanguageProvider } from '@/shared/i18n/translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [progress, setProgress] = useState({
    points: 0,
    badges: [],
    completedLessons: [],
  });
  const [lessonScore, setLessonScore] = useState(0);

  // localStorage dan yuklash (faqat brauzerda)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('kidsLearnProgress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Progress parse error:', e);
      }
    }
  }, []);

  // localStorage ga saqlash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kidsLearnProgress', JSON.stringify(progress));
  }, [progress]);

  const handleLessonComplete = (score) => {
    setLessonScore(score);
    const newPoints = progress.points + score;
    const newBadges = [...progress.badges];

    if (score >= 80 && !newBadges.includes('star')) newBadges.push('star');
    if (score >= 60 && !newBadges.includes('heart')) newBadges.push('heart');
    if (score === 100 && !newBadges.includes('trophy')) newBadges.push('trophy');

    setProgress({
      points: newPoints,
      badges: newBadges,
      completedLessons: [...progress.completedLessons, 'math-1'],
    });

    setCurrentPage('completion');
  };

  const navigateTo = (page) => setCurrentPage(page);

  return (
    <LanguageProvider>
      {/* Home */}
      {currentPage === 'home' && (
        <HomePage
          onStart={() => navigateTo('lesson')}
          onProfile={() => navigateTo('profile')}
        />
      )}

      {/* Lesson */}
      {currentPage === 'lesson' && (
        <LessonPage
          onComplete={handleLessonComplete}
          onBack={() => navigateTo('home')}
        />
      )}

      {/* Profile — progress prop YO'Q! */}
      {currentPage === 'profile' && (
        <ProfilePage
          onBack={() => navigateTo('home')}
          onPlayAgain={() => navigateTo('lesson')}
        />
      )}

      {/* Completion */}
      {currentPage === 'completion' && (
        <CompletionPage
          score={lessonScore}
          onProfile={() => navigateTo('profile')}
          onPlayAgain={() => navigateTo('lesson')}
        />
      )}
    </LanguageProvider>
  );
}