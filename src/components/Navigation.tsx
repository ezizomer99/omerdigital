'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';
import { personalInfo } from '@/data/personal';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getNavLinkSx = (isActive: boolean) => ({
    color: isActive ? 'primary.dark' : 'text.primary',
    fontWeight: isActive ? 500 : 400,
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
      width: isActive ? '100%' : '0%',
      height: '2px',
      bgcolor: 'primary.main',
      transition: 'width 0.3s ease',
    },
    '&:hover::after': {
      width: '100%',
    },
  });

  const socialIconSx = {
    color: 'text.secondary',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: 'primary.dark',
      transform: 'translateY(-2px)',
    },
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Box
      component="nav"
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
      <Box>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: '0 4px 12px rgba(201, 181, 156, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/me/logo.png"
              alt="Ømer Digital Logo"
              width={52}
              height={52}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
        <Box>
          <Stack 
            direction="row" 
            spacing={1}
            sx={{
              bgcolor: 'rgba(239, 233, 227, 0.85)',
              borderRadius: '50px',
              px: 2,
              py: 1,
              backdropFilter: 'blur(5px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            {[
              { href: '/', label: 'HJEM' },
              { href: '/work', label: 'ARBEID' },
              { href: '/about', label: 'OM MEG' },
              { href: '/contact', label: 'KONTAKT' },
            ].map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Box
                  key={item.href}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '25px',
                    bgcolor: isActive ? 'rgba(201, 181, 156, 0.3)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(201, 181, 156, 0.3)',
                    },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <Link href={item.href} style={{ textDecoration: 'none' }}>
                    <Typography sx={getNavLinkSx(isActive)}>{item.label}</Typography>
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </Box>
        
        {/* Social Icons - Desktop */}
        <Box
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
        sx={{ display: { xs: isMobileMenuOpen ? 'none' : 'block', sm: 'none' }, zIndex: 1002, position: 'relative' }}
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
              zIndex: 1001,
              display: { xs: 'block', sm: 'none' },
              overflow: 'hidden',
              touchAction: 'none',
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
              transition={{ duration: 0.2, delay: 0.05 }}
              spacing={4}
              alignItems="center"
              sx={{ mt: 8 }}
            >
              {[
                { href: '/', label: 'HJEM', delay: 0.1 },
                { href: '/work', label: 'ARBEID', delay: 0.15 },
                { href: '/about', label: 'OM MEG', delay: 0.2 },
                { href: '/contact', label: 'KONTAKT', delay: 0.25 },
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                <Box
                  key={item.href}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: item.delay }}
                >
                  <Link href={item.href} onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: isActive ? 500 : 300,
                        letterSpacing: '0.1em',
                        color: isActive ? 'primary.dark' : 'text.primary',
                        '&:hover': { color: 'text.secondary' },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </Box>
              );})}

              {/* Mobile Social Icons */}
              <Stack
                component={motion.div}
                direction="row"
                spacing={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
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
