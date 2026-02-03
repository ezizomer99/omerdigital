'use client';

import { personalInfo } from "@/data/personal";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedInIcon, GitHubIcon } from '@/components/SocialIcons';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message);
        setIsSuccess(true);
        const form = e.target as HTMLFormElement;
        form.reset();
        
        setTimeout(() => {
          setSubmitMessage('');
        }, 5000);
      } else {
        setSubmitMessage(result.error || 'Noe gikk galt. Prøv igjen.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Noe gikk galt. Prøv igjen senere.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIconSx = {
    color: 'text.secondary',
    '&:hover': { color: 'primary.main' },
    transition: 'color 0.2s ease',
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box
        component={motion.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        sx={{ pt: { xs: 14, md: 16 }, pb: 8 }}
      >
        <Container maxWidth="md">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'text.primary',
                mb: 4,
                textAlign: 'center',
              }}
            >
              TA KONTAKT
            </Typography>
          </Box>
          
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            sx={{ textAlign: 'center', mb: 8 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Klar til å starte ditt neste prosjekt? La oss diskutere hvordan jeg kan hjelpe deg med å realisere ideene dine.
            </Typography>
          </Box>

          <Grid container spacing={8}>
            {/* Contact Form */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    >
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Fullt Navn"
                        placeholder="Skriv inn ditt fulle navn"
                        required
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper' }}
                      />
                    </Box>
                    
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.25 }}
                    >
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="E-postadresse"
                        placeholder="Skriv inn din e-postadresse"
                        type="email"
                        required
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper' }}
                      />
                    </Box>
                    
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        id="project"
                        name="project-type"
                        label="Prosjekttype"
                        select
                        defaultValue=""
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper' }}
                      >
                        <MenuItem value="">Velg en tjeneste</MenuItem>
                        <MenuItem value="web-development">Webutvikling</MenuItem>
                        <MenuItem value="digital-strategy">Digital Strategi</MenuItem>
                        <MenuItem value="consulting">Konsultasjon</MenuItem>
                        <MenuItem value="other">Annet</MenuItem>
                      </TextField>
                    </Box>
                    
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.35 }}
                    >
                      <TextField
                        fullWidth
                        id="message"
                        name="message"
                        label="Melding"
                        placeholder="Fortell meg om prosjektet ditt..."
                        multiline
                        rows={5}
                        required
                        variant="outlined"
                        sx={{ bgcolor: 'background.paper' }}
                      />
                    </Box>
                    
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.4 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          bgcolor: 'primary.dark',
                          color: 'white',
                          py: 1.5,
                          fontSize: '0.875rem',
                          letterSpacing: '0.05em',
                          '&:hover': { bgcolor: 'primary.main' },
                        }}
                      >
                        {isSubmitting ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={16} color="inherit" />
                            <span>SENDER...</span>
                          </Stack>
                        ) : (
                          'SEND MELDING'
                        )}
                      </Button>
                    </Box>

                    {submitMessage && (
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Alert
                          severity={isSuccess ? 'success' : 'error'}
                          icon={isSuccess ? <CheckCircleIcon /> : <ErrorIcon />}
                        >
                          {submitMessage}
                          {isSuccess && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Du vil også motta en bekreftelse på e-post.
                            </Typography>
                          )}
                        </Alert>
                      </Box>
                    )}
                  </Stack>
                </form>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                <Stack spacing={4}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                      Ta kontakt
                    </Typography>
                    <Stack spacing={1}>
                      <Typography
                        component="a"
                        href={`mailto:${personalInfo.email}`}
                        sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' }, textDecoration: 'none' }}
                      >
                        {personalInfo.email}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        {personalInfo.location}
                      </Typography>
                    </Stack>
                  </Box>
                  
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.25 }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                      Responstid
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Jeg svarer vanligvis på alle henvendelser innen 24 timer. 
                      For hastende prosjekter, vennligst nevn det i meldingen din.
                    </Typography>
                  </Box>
                  
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                      Sosiale medier
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {personalInfo.social.linkedin && (
                        <IconButton
                          component={motion.a}
                          href={personalInfo.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          sx={{ ...socialIconSx, '&:hover': { color: '#0077B5' } }}
                        >
                          <LinkedInIcon size={24} />
                        </IconButton>
                      )}
                      {personalInfo.social.github && (
                        <IconButton
                          component={motion.a}
                          href={personalInfo.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          sx={{ ...socialIconSx, '&:hover': { color: '#333' } }}
                        >
                          <GitHubIcon size={24} />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
