'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DesktopFrame, MobileFrame } from "@/components/DeviceFrames";
import { useProject, useProjectImages, type ProjectImage } from "@/hooks/useProjects";
import { 
  PageTransition,
  PageTitle,
  FadeIn,
  HoverEffect,
  AnimatedLink
} from "@/components/animations";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const projectId = parseInt(resolvedParams.id);
  const { project, loading, error } = useProject(projectId);
  const { images } = useProjectImages(projectId);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', pt: { xs: 14, md: 16 } }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress />
            <Typography sx={{ color: 'text.secondary' }}>Laster prosjekt...</Typography>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (error || !project) {
    notFound();
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PageTransition>
        <Container maxWidth="md" sx={{ pt: { xs: 14, md: 16 }, pb: 8 }}>
          {/* Back Button */}
          <FadeIn delay={0.1}>
            <Link href="/work" style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                }}
              >
                Tilbake til arbeid
              </Button>
            </Link>
          </FadeIn>

          {/* Project Header */}
          <Box sx={{ mb: 6 }}>
            <FadeIn delay={0.2}>
              <Chip
                label={project.category}
                sx={{
                  bgcolor: 'grey.100',
                  color: 'text.secondary',
                  mb: 2,
                }}
              />
            </FadeIn>
            
            <PageTitle delay={0.3}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                {project.title}
              </Typography>
            </PageTitle>
            
            <FadeIn delay={0.4}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  color: 'text.secondary',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  mb: 4,
                }}
              >
                {project.description}
              </Typography>
            </FadeIn>

            {/* Tech Stack */}
            <FadeIn delay={0.5}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', letterSpacing: '0.1em', mb: 1.5, display: 'block' }}
                >
                  Teknologier
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.tech.map((tech, index) => (
                    <FadeIn key={index} delay={0.6 + (index * 0.05)}>
                      <HoverEffect scale={1.05}>
                        <Chip
                          label={tech}
                          sx={{
                            bgcolor: 'background.paper',
                            color: 'text.primary',
                            boxShadow: 1,
                          }}
                        />
                      </HoverEffect>
                    </FadeIn>
                  ))}
                </Stack>
              </Box>
            </FadeIn>

            {/* External Link */}
            {project.project_url && (
              <FadeIn delay={0.7}>
                <AnimatedLink href={project.project_url} external={true}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'primary.dark',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      '&:hover': { bgcolor: 'primary.main' },
                    }}
                  >
                    BESØK NETTSIDE →
                  </Button>
                </AnimatedLink>
              </FadeIn>
            )}
          </Box>

          {/* Project Images with Device Frames */}
          <FadeIn delay={0.8}>
            <Box sx={{ mb: 6 }}>
              {images.length > 0 ? (
                <Stack spacing={6}>
                  {images.map((image, index) => {
                    const isMobile = image.alt_text?.toLowerCase().includes('mobile') || 
                                     image.image_url.toLowerCase().includes('mobile') ||
                                     image.alt_text?.toLowerCase().includes('phone');

                    return (
                      <FadeIn key={image.id} delay={0.9 + (index * 0.1)}>
                        <Box sx={{ width: '100%' }}>
                          {isMobile ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <MobileFrame>
                                <Image 
                                  src={image.image_url} 
                                  alt={image.alt_text || `${project.title} mobile screenshot`}
                                  width={400}
                                  height={800}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                />
                              </MobileFrame>
                            </Box>
                          ) : (
                            <DesktopFrame>
                              <Image 
                                src={image.image_url} 
                                alt={image.alt_text || `${project.title} desktop screenshot`}
                                width={1200}
                                height={800}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                              />
                            </DesktopFrame>
                          )}
                          
                          {image.alt_text && (
                            <Typography
                              variant="body2"
                              sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}
                            >
                              {image.alt_text}
                            </Typography>
                          )}
                        </Box>
                      </FadeIn>
                    );
                  })}
                </Stack>
              ) : (
                <DesktopFrame>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" sx={{ color: 'grey.400', mb: 1 }}>
                        Prosjektbilde
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        Skjermbilder vil bli lagt til her
                      </Typography>
                    </Box>
                  </Box>
                </DesktopFrame>
              )}
            </Box>
          </FadeIn>

          {/* Project Details Section */}
          <FadeIn delay={0.9}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                  Utfordringer
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                  {project.long_description || 
                   `Dette prosjektet krevde en balanse mellom moderne design og funksjonalitet. 
                    Hovedutfordringen var å skape en løsning som både er visuelt tiltalende og 
                    teknisk robust.`}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                  Løsning
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 2 }}>
                  Ved å bruke moderne webutvikling teknologier og fokus på brukeropplevelse, 
                  leverte vi en komplett løsning som møter alle krav til ytelse og design.
                </Typography>
                {project.github_url && (
                  <AnimatedLink href={project.github_url} external={true}>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      sx={{
                        color: 'text.primary',
                        borderColor: 'grey.300',
                        '&:hover': { borderColor: 'grey.400', bgcolor: 'transparent' },
                      }}
                    >
                      Se kildekode
                    </Button>
                  </AnimatedLink>
                )}
              </Grid>
            </Grid>
          </FadeIn>
        </Container>
      </PageTransition>
    </Box>
  );
}
