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

  // localStorage dan yuklash
  useEffect(() => {
    const saved = localStorage.getItem('kidsLearnProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem('kidsLearnProgress', JSON.stringify(progress));
  }, [progress]);

  const handleLessonComplete = (score) => {
    setLessonScore(score);
    const newPoints = progress.points + score;
    const newBadges = [...progress.badges];

    // Nishonlarni qo'shish
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
      {currentPage === 'home' && (
        <HomePage
          onStart={() => navigateTo('lesson')}
          onProfile={() => navigateTo('profile')}
        />
      )}
      {currentPage === 'lesson' && (
        <LessonPage
          onComplete={handleLessonComplete}
          onBack={() => navigateTo('home')}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage
          progress={progress}
          onBack={() => navigateTo('home')}
          onPlayAgain={() => navigateTo('lesson')}
        />
      )}
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