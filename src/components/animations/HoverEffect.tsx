'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverEffectProps {
  children: ReactNode;
  scale?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export default function HoverEffect({ 
  children, 
  scale = 1.05, 
  y = -5, 
  duration = 0.3,
  className = '' 
}: HoverEffectProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale, y }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ 
  children, 
  y = -8, 
  duration = 0.3,
  className = '' 
}: Omit<HoverEffectProps, 'scale'>) {
  return (
    <motion.div
      className={className}
      whileHover={{ y }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({ 
  children, 
  scale = 1.05, 
  duration = 0.3,
  className = '' 
}: Omit<HoverEffectProps, 'y'>) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}
