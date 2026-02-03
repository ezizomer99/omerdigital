'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface CardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  delay?: number;
  hoverEffect?: boolean;
}

const MotionPaper = motion.create(Paper);

export default function AnimatedCard({ 
  children, 
  sx,
  delay = 0,
  hoverEffect = true
}: CardProps) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hoverEffect ? { scale: 1.02, y: -3 } : undefined}
    >
      {children}
    </Box>
  );
}

export function ServiceCard({ 
  children, 
  sx,
  delay = 0 
}: Omit<CardProps, 'hoverEffect'>) {
  return (
    <MotionPaper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 0.5,
        ...sx,
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {children}
    </MotionPaper>
  );
}

export function ProjectCard({ 
  children, 
  sx,
  delay = 0 
}: Omit<CardProps, 'hoverEffect'>) {
  return (
    <Box
      component={motion.div}
      sx={{
        cursor: 'pointer',
        ...sx,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8 }}
    >
      {children}
    </Box>
  );
}
