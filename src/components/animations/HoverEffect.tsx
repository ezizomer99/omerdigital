'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface HoverEffectProps {
  children: ReactNode;
  scale?: number;
  y?: number;
  duration?: number;
  sx?: SxProps<Theme>;
}

export default function HoverEffect({ 
  children, 
  scale = 1.05, 
  y = -5, 
  duration = 0.3,
  sx
}: HoverEffectProps) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      whileHover={{ scale, y }}
      transition={{ duration }}
    >
      {children}
    </Box>
  );
}

export function HoverLift({ 
  children, 
  y = -8, 
  duration = 0.3,
  sx
}: Omit<HoverEffectProps, 'scale'>) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      whileHover={{ y }}
      transition={{ duration }}
    >
      {children}
    </Box>
  );
}

export function HoverScale({ 
  children, 
  scale = 1.05, 
  duration = 0.3,
  sx
}: Omit<HoverEffectProps, 'y'>) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      whileHover={{ scale }}
      transition={{ duration }}
    >
      {children}
    </Box>
  );
}
