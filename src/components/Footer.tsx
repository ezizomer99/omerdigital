'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LinkedInIcon, GitHubIcon } from './SocialIcons';
import { personalInfo } from '@/data/personal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        bgcolor: '#1f2937',
        color: 'white',
        py: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Brand/Logo Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src="/me/logo.png"
                    alt="Ømer Digital Logo"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 300, letterSpacing: '0.1em' }}
                >
                  ØMER DIGITAL
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Digital Konsulent & Webutvikler
              </Typography>
            </Box>
          </Grid>

          {/* Copyright Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{ textAlign: 'center' }}
            >
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                © {currentYear} ØmerDigital. Alle rettigheter forbeholdt.
              </Typography>
            </Box>
          </Grid>

          {/* Social Icons Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                {personalInfo.social.linkedin && (
                  <IconButton
                    component={motion.a}
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ color: 'grey.400', '&:hover': { color: '#0077B5' } }}
                  >
                    <LinkedInIcon size={20} />
                  </IconButton>
                )}
                {personalInfo.social.github && (
                  <IconButton
                    component={motion.a}
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                  >
                    <GitHubIcon size={20} />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Grid>
        </Grid>
        
        {/* Bottom Border */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          sx={{ mt: 4, pt: 3 }}
        >
          <Divider sx={{ borderColor: 'grey.700', mb: 3 }} />
          <Typography
            variant="caption"
            sx={{ color: 'grey.500', textAlign: 'center', display: 'block' }}
          >
            Kristiansand, Norge | Tilgjengelig for prosjekter over hele verden
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
