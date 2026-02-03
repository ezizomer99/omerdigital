'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface AnimatedInputProps {
  type?: string;
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

const MotionTextField = motion.create(TextField);

export default function AnimatedInput({ 
  type = 'text',
  id,
  name,
  required = false,
  placeholder,
  label,
  value,
  onChange,
  sx
}: AnimatedInputProps) {
  return (
    <MotionTextField
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'white',
          '& fieldset': { borderColor: 'grey.200' },
          '&:hover fieldset': { borderColor: 'grey.400' },
          '&.Mui-focused fieldset': { borderColor: 'grey.500' },
        },
        ...sx,
      }}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function AnimatedTextarea({ 
  id,
  name,
  required = false,
  placeholder,
  label,
  rows = 5,
  value,
  onChange,
  sx
}: {
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  sx?: SxProps<Theme>;
}) {
  return (
    <MotionTextField
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      label={label}
      multiline
      rows={rows}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'white',
          '& fieldset': { borderColor: 'grey.200' },
          '&:hover fieldset': { borderColor: 'grey.400' },
          '&.Mui-focused fieldset': { borderColor: 'grey.500' },
        },
        ...sx,
      }}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    />
  );
}

export function AnimatedSelect({ 
  id,
  name,
  label,
  children,
  value,
  onChange,
  sx
}: {
  id?: string;
  name?: string;
  label?: string;
  children: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  sx?: SxProps<Theme>;
}) {
  return (
    <MotionTextField
      id={id}
      name={name}
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: 'white',
          '& fieldset': { borderColor: 'grey.200' },
          '&:hover fieldset': { borderColor: 'grey.400' },
          '&.Mui-focused fieldset': { borderColor: 'grey.500' },
        },
        ...sx,
      }}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionTextField>
  );
}
