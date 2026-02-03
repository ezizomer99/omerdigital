'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  sx?: SxProps<Theme>;
  variant?: 'primary' | 'secondary';
}

const MotionButton = motion.create(Button);

export default function AnimatedButton({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  sx,
  variant = 'primary'
}: AnimatedButtonProps) {
  return (
    <MotionButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      sx={{
        px: 3,
        py: 1.5,
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        textTransform: 'none',
        ...(variant === 'primary' ? {
          bgcolor: 'grey.900',
          color: 'white',
          '&:hover': { bgcolor: 'grey.800' },
        } : {
          bgcolor: 'white',
          color: 'grey.900',
          borderColor: 'grey.300',
          '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.400' },
        }),
        '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
        ...sx,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionButton>
  );
}

const MotionLink = motion.create(Link);

export function AnimatedLink({ 
  children, 
  href, 
  sx,
  external = false 
}: {
  children: ReactNode;
  href: string;
  sx?: SxProps<Theme>;
  external?: boolean;
}) {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <MotionLink
      href={href}
      underline="none"
      sx={{ display: 'inline-block', ...sx }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...linkProps}
    >
      {children}
    </MotionLink>
  );
}
