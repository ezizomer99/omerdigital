'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedInputProps {
  type?: string;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function AnimatedInput({ 
  type = 'text',
  id,
  name,
  required = false,
  placeholder,
  value,
  onChange,
  className = ''
}: AnimatedInputProps) {
  return (
    <motion.input
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-500 text-gray-800 ${className}`}
      whileFocus={{ scale: 1.02, borderColor: "#374151" }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function AnimatedTextarea({ 
  id,
  name,
  required = false,
  placeholder,
  rows = 5,
  value,
  onChange,
  className = ''
}: {
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}) {
  return (
    <motion.textarea
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-500 text-gray-800 ${className}`}
      whileFocus={{ scale: 1.02, borderColor: "#374151" }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function AnimatedSelect({ 
  id,
  name,
  children,
  value,
  onChange,
  className = ''
}: {
  id?: string;
  name?: string;
  children: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) {
  return (
    <motion.select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors text-gray-700 ${className}`}
      whileFocus={{ scale: 1.02, borderColor: "#374151" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.select>
  );
}
