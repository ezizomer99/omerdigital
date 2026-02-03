'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  sx?: SxProps<Theme>;
}

export default function StaggerContainer({ 
  children, 
  initialDelay = 0,
  sx
}: Omit<StaggerContainerProps, 'staggerDelay'>) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: initialDelay }}
    >
      {children}
    </Box>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  delay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  sx?: SxProps<Theme>;
}

export function StaggerItem({ 
  children, 
  index, 
  delay = 0, 
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30,
  sx
}: StaggerItemProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <Box
      component={motion.div}
      sx={sx}
      initial={getInitialPosition()}
      animate={getAnimatePosition()}
      transition={{ duration: 0.5, delay: delay + (index * staggerDelay) }}
    >
      {children}
    </Box>
  );
}
