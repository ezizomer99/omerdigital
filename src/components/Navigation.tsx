'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';
import { personalInfo } from '@/data/personal';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkSx = {
    color: 'text.primary',
    fontWeight: 400,
    letterSpacing: '0.08em',
    fontSize: '0.8rem',
    textDecoration: 'none',
    position: 'relative',
    py: 0.5,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0%',
      height: '2px',
      bgcolor: 'primary.main',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    },
  };

  const socialIconSx = {
    color: 'text.secondary',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: 'primary.dark',
      transform: 'translateY(-2px)',
    },
  };

  return (
    <Box
      component={motion.nav}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: scrolled ? 2 : 3,
        px: { xs: 2, md: 6 },
        bgcolor: scrolled ? 'rgba(249, 248, 246, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid' : 'none',
        borderColor: 'rgba(201, 181, 156, 0.2)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo with Image */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(201, 181, 156, 0.3)',
            }}
          >
            <Image
              src="/me/logo.png"
              alt="Ømer Digital Logo"
              width={42}
              height={42}
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: 'text.primary',
              fontSize: '1rem',
              display: { xs: 'none', md: 'block' },
              '&:hover': { color: 'primary.dark' },
              transition: 'color 0.2s ease',
            }}
          >
            ØMER DIGITAL
          </Typography>
        </Link>
      </Box>
      
      {/* Navigation Menu - Desktop */}
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Stack 
            direction="row" 
            spacing={1}
            sx={{
              bgcolor: 'rgba(239, 233, 227, 0.6)',
              borderRadius: '50px',
              px: 2,
              py: 1,
              backdropFilter: 'blur(5px)',
            }}
          >
            {[
              { href: '/', label: 'HJEM' },
              { href: '/work', label: 'ARBEID' },
              { href: '/about', label: 'OM MEG' },
              { href: '/contact', label: 'KONTAKT' },
            ].map((item, index) => (
              <Box
                key={item.href}
                component={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: '25px',
                  '&:hover': {
                    bgcolor: 'rgba(201, 181, 156, 0.3)',
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                  <Typography sx={navLinkSx}>{item.label}</Typography>
                </Link>
              </Box>
            ))}
          </Stack>
        </Box>
        
        {/* Social Icons - Desktop */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          sx={{ display: { xs: 'none', lg: 'flex' }, ml: 2 }}
        >
          <Stack direction="row" spacing={0.5}>
            {personalInfo.social.linkedin && (
              <IconButton
                component={motion.a}
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                sx={{ ...socialIconSx, '&:hover': { color: '#0077B5' } }}
                size="small"
              >
                <LinkedInIcon size={18} />
              </IconButton>
            )}
            {personalInfo.social.github && (
              <IconButton
                component={motion.a}
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                sx={{ ...socialIconSx, '&:hover': { color: '#333' } }}
                size="small"
              >
                <GitHubIcon size={18} />
              </IconButton>
            )}
          </Stack>
        </Box>
      </Stack>

      {/* Mobile Menu Button */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <IconButton
          component={motion.button}
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          sx={{ color: 'text.primary' }}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </motion.div>
        </IconButton>
      </Box>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'fixed',
              inset: 0,
              bgcolor: 'background.default',
              zIndex: 50,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {/* Mobile Menu Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 3,
                px: 2,
              }}
            >
              <Link href="/" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <Image
                    src="/me/logo.png"
                    alt="Ømer Digital Logo"
                    width={36}
                    height={36}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 300, letterSpacing: '0.1em', color: 'text.primary' }}
                >
                  ØMER DIGITAL
                </Typography>
              </Link>
              <IconButton
                component={motion.button}
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.9 }}
                sx={{ color: 'text.primary' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Mobile Menu Items */}
            <Stack
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              spacing={4}
              alignItems="center"
              sx={{ mt: 8 }}
            >
              {[
                { href: '/', label: 'HJEM', delay: 0.2 },
                { href: '/work', label: 'ARBEID', delay: 0.3 },
                { href: '/about', label: 'OM MEG', delay: 0.4 },
                { href: '/contact', label: 'KONTAKT', delay: 0.5 },
              ].map((item) => (
                <Box
                  key={item.href}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: item.delay }}
                >
                  <Link href={item.href} onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        letterSpacing: '0.1em',
                        color: 'text.primary',
                        '&:hover': { color: 'text.secondary' },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </Box>
              ))}

              {/* Mobile Social Icons */}
              <Stack
                component={motion.div}
                direction="row"
                spacing={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                sx={{ mt: 6 }}
              >
                {personalInfo.social.linkedin && (
                  <IconButton
                    component={motion.a}
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ color: 'text.secondary', '&:hover': { color: '#0077B5' } }}
                  >
                    <LinkedInIcon size={28} />
                  </IconButton>
                )}
                {personalInfo.social.github && (
                  <IconButton
                    component={motion.a}
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ color: 'text.secondary', '&:hover': { color: '#333' } }}
                  >
                    <GitHubIcon size={28} />
                  </IconButton>
                )}
              </Stack>
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
