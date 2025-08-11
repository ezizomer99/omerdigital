'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary'
}: AnimatedButtonProps) {
  const baseClasses = variant === 'primary' 
    ? 'bg-gray-900 text-white hover:bg-gray-800' 
    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-sm tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${baseClasses} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedLink({ 
  children, 
  href, 
  className = '',
  external = false 
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.a
      href={href}
      className={`transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...linkProps}
    >
      {children}
    </motion.a>
  );
}
