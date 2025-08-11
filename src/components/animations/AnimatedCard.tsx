'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  delay = 0,
  hoverEffect = true
}: CardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hoverEffect ? { scale: 1.02, y: -3 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function ServiceCard({ 
  children, 
  className = '',
  delay = 0 
}: Omit<CardProps, 'hoverEffect'>) {
  return (
    <motion.div
      className={`bg-white p-4 rounded-sm shadow-sm ${className}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectCard({ 
  children, 
  className = '',
  delay = 0 
}: Omit<CardProps, 'hoverEffect'>) {
  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8 }}
    >
      {children}
    </motion.div>
  );
}
