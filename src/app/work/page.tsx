'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { useProjects } from "@/hooks/useProjects";
import { 
  PageTransition,
  PageTitle,
  PageDescription,
  ProjectCard,
  FadeIn,
  HoverEffect
} from "@/components/animations";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Work() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navigation />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', pt: { xs: 14, md: 16 } }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress />
            <Typography sx={{ color: 'text.secondary' }}>Laster prosjekter...</Typography>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navigation />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', pt: { xs: 14, md: 16 } }}>
          <Typography sx={{ color: 'error.main' }}>Feil ved lasting av prosjekter: {error}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <PageTransition>
        <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 16 }, pb: 8 }}>
          <PageTitle delay={0.1}>
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
              MITT ARBEID
            </Typography>
          </PageTitle>
          
          <PageDescription delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'text.secondary',
                fontWeight: 300,
                lineHeight: 1.75,
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
                mb: 8,
              }}
            >
              En oversikt over mine nylige prosjekter og digitale løsninger.
            </Typography>
          </PageDescription>

          {/* Project Grid */}
          <FadeIn delay={0.3}>
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                  <Link href={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
                    <ProjectCard delay={0.4 + (index * 0.05)}>
                      <HoverEffect scale={1.02}>
                        <Box
                          sx={{
                            width: '100%',
                            height: 256,
                            bgcolor: 'grey.200',
                            borderRadius: 0.5,
                            overflow: 'hidden',
                            boxShadow: 2,
                            mb: 2,
                            position: 'relative',
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 4 },
                            transition: 'box-shadow 0.2s ease',
                          }}
                        >
                          {/* Project Image */}
                          {project.image_url ? (
                            <Image 
                              src={project.image_url} 
                              alt={project.title}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
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
                              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                Prosjektbilde
                              </Typography>
                            </Box>
                          )}
                          {/* Category badge */}
                          <Chip
                            label={project.category}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              bgcolor: 'rgba(255,255,255,0.9)',
                              backdropFilter: 'blur(4px)',
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>
                      </HoverEffect>
                      
                      <FadeIn delay={0.5 + (index * 0.05)}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 300, color: 'text.primary', mb: 1 }}
                        >
                          {project.title}
                        </Typography>
                      </FadeIn>
                      
                      <FadeIn delay={0.55 + (index * 0.05)}>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', mb: 2 }}
                        >
                          {project.description}
                        </Typography>
                      </FadeIn>
                      
                      <FadeIn delay={0.6 + (index * 0.05)}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {project.tech.map((tech, techIndex) => (
                            <FadeIn key={techIndex} delay={0.65 + (index * 0.05) + (techIndex * 0.01)}>
                              <HoverEffect scale={1.05}>
                                <Chip
                                  label={tech}
                                  size="small"
                                  sx={{
                                    bgcolor: 'grey.100',
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                  }}
                                />
                              </HoverEffect>
                            </FadeIn>
                          ))}
                        </Stack>
                      </FadeIn>
                    </ProjectCard>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </FadeIn>
        </Container>
      </PageTransition>
    </Box>
  );
}
