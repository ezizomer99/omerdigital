'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DeviceShowcase } from "@/components/DeviceFrames";
import { useProject, useProjectImages } from "@/hooks/useProjects";
import { 
  PageTransition,
  PageTitle,
  FadeIn,
  HoverEffect,
  AnimatedLink
} from "@/components/animations";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
                (() => {
                  // Find desktop image (not mobile or tablet)
                  const desktopImages = images.filter(img => 
                    !img.alt_text?.toLowerCase().includes('mobile') && 
                    !img.alt_text?.toLowerCase().includes('phone') &&
                    !img.alt_text?.toLowerCase().includes('tablet') &&
                    !img.image_url.toLowerCase().includes('mobile') &&
                    !img.image_url.toLowerCase().includes('tablet')
                  );
                  
                  // Find tablet image
                  const tabletImages = images.filter(img => 
                    img.alt_text?.toLowerCase().includes('tablet') ||
                    img.image_url.toLowerCase().includes('tablet')
                  );
                  
                  // Find mobile image
                  const mobileImages = images.filter(img => 
                    img.alt_text?.toLowerCase().includes('mobile') ||
                    img.alt_text?.toLowerCase().includes('phone') ||
                    img.image_url.toLowerCase().includes('mobile')
                  );

                  const desktopImg = desktopImages[0] || images[0];
                  const tabletImg = tabletImages[0] || images[0];
                  const mobileImg = mobileImages[0] || images[0];

                  return (
                    <DeviceShowcase
                      desktopImage={
                        <Image 
                          src={desktopImg.image_url} 
                          alt={desktopImg.alt_text || `${project.title} desktop view`}
                          width={1200}
                          height={800}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      }
                      tabletImage={
                        <Image 
                          src={tabletImg.image_url} 
                          alt={tabletImg.alt_text || `${project.title} tablet view`}
                          width={800}
                          height={1100}
                          unoptimized
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      }
                      mobileImage={
                        <Image 
                          src={mobileImg.image_url} 
                          alt={mobileImg.alt_text || `${project.title} mobile view`}
                          width={600}
                          height={1200}
                          unoptimized
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      }
                    />
                  );
                })()
              ) : (
                <DeviceShowcase
                  desktopImage={
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        Desktop
                      </Typography>
                    </Box>
                  }
                  tabletImage={
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        Tablet
                      </Typography>
                    </Box>
                  }
                  mobileImage={
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        Mobil
                      </Typography>
                    </Box>
                  }
                />
              )}
            </Box>
          </FadeIn>

          {/* Project Details Section */}
          <FadeIn delay={0.9}>
                <Typography variant="h5" sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}>
                  Beskrivelse
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.75, mb: 2 }}>
                  En moderne og brukervennlig nettside for Farsund Grappling Club, en brasiliansk jiu-jitsu klubb i Farsund.
                  Nettsiden gir klubben en profesjonell tilstedeværelse på nett hvor besøkende enkelt kan finne informasjon om treninger, se hvem instruktørene er, og lese om medlemskap og priser.
                  Klubbens ledere kan selv oppdatere innholdet på nettsiden – som treningstider, nyheter og instruktørprofiler – uten teknisk kunnskap. Alt administreres gjennom et enkelt innloggingspanel.
                  Nettsiden er designet for å fungere like godt på mobil som på PC, med raske lastetider og et rent, moderne utseende som reflekterer klubbens identitet.
                </Typography>
          </FadeIn>
        </Container>
      </PageTransition>
    </Box>
  );
}
