'use client';

import { motion } from 'framer-motion';

const FloatingShapes = () => {
  // 6 ta tasodifiy shakl yaratamiz
  const shapes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    color: i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-yellow-400',
    size: Math.random() * 40 + 40, // 40-80px
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 15 + i * 3, // 15-30 sekund
    delay: Math.random() * 5,
  }));

  return (
    <>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full opacity-20 ${shape.color}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            top: shape.top,
          }}
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};

export default FloatingShapes;