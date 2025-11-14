'use client';

import { motion } from 'framer-motion';

const GlowingText = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          '0 0 20px rgba(255,215,0,0.8)',
          '0 0 40px rgba(255,215,0,0.6)',
          '0 0 20px rgba(255,215,0,0.8)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
};

export default GlowingText;