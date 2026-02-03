'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface PageTransitionProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export default function PageTransition({ children, sx }: PageTransitionProps) {
  return (
    <Box
      component={motion.main}
      sx={sx}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </Box>
  );
}

export function PageTitle({ 
  children, 
  sx,
  delay = 0.1 
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
  delay?: number;
}) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </Box>
  );
}

export function PageDescription({ 
  children, 
  sx,
  delay = 0.2 
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
  delay?: number;
}) {
  return (
    <Box
      component={motion.div}
      sx={sx}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </Box>
  );
}
