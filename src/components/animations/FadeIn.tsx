'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  sx?: SxProps<Theme>;
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.4, 
  direction = 'up',
  distance = 20,
  sx
}: FadeInProps) {
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
      case 'none':
        return { opacity: 0 };
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
      case 'none':
        return { opacity: 1 };
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
      transition={{ duration, delay }}
    >
      {children}
    </Box>
  );
}
