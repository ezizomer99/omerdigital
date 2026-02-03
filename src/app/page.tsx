'use client';

import Image from "next/image";
import Navigation from "@/components/Navigation";
import { services } from "@/data/services";
import { personalInfo } from "@/data/personal";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  HoverEffect, 
  AnimatedLink 
} from "@/components/animations";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      {/* Top Right Image Placeholder */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 128, md: 192, lg: 320 },
            height: { xs: 192, md: 288, lg: 480 },
            bgcolor: 'grey.600',
            borderRadius: 2,
            boxShadow: 3,
            opacity: 0.4,
            transform: 'rotate(6deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'grey.300' }}>
            Image Placeholder
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: '60vh', md: '70vh' },
          px: { xs: 2, md: 4 },
          zIndex: 10,
        }}
      >
        {/* Center Content */}
        <FadeIn 
          delay={0}
          duration={0.5}
        >
          <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <FadeIn delay={0.1} duration={0.4}>
              <Box
                sx={{
                  width: { xs: 120, md: 160, lg: 200 },
                  height: { xs: 120, md: 160, lg: 200 },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 32px rgba(201, 181, 156, 0.4)',
                  mx: 'auto',
                  mb: 4,
                }}
              >
                <Image
                  src="/me/logo.png"
                  alt="Ømer Digital Logo"
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  priority
                />
              </Box>
            </FadeIn>
            
            <FadeIn delay={0.2} duration={0.4}>
              <Stack spacing={3} sx={{ maxWidth: 400, mx: 'auto' }}>
                <FadeIn delay={0.3}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      color: 'text.secondary',
                      fontWeight: 300,
                      lineHeight: 1.75,
                    }}
                  >
                    {personalInfo.title}
                  </Typography>
                </FadeIn>
                
                <FadeIn delay={0.4}>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'text.secondary', letterSpacing: '0.1em', mb: 1.5, display: 'block' }}
                    >
                      Tjenester
                    </Typography>
                    <StaggerContainer initialDelay={0.5}>
                      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
                        {services.map((service, index) => (
                          <StaggerItem key={service.id} index={index} staggerDelay={0.05}>
                            <HoverEffect scale={1.05} y={-2}>
                              <Chip
                                label={service.name}
                                sx={{
                                  bgcolor: 'background.paper',
                                  color: 'text.primary',
                                  fontWeight: 400,
                                  px: 1,
                                  cursor: 'pointer',
                                  boxShadow: 1,
                                  '&:hover': {
                                    bgcolor: 'background.paper',
                                  },
                                }}
                              />
                            </HoverEffect>
                          </StaggerItem>
                        ))}
                      </Stack>
                    </StaggerContainer>
                  </Box>
                </FadeIn>
              </Stack>
            </FadeIn>
          </Container>
        </FadeIn>
      </Box>

      {/* Bottom Section with CTA */}
      <FadeIn delay={0.8}>
        <Box sx={{ textAlign: 'center', pb: { xs: 4, md: 8 }, px: 2, position: 'relative', zIndex: 10 }}>
          <FadeIn delay={0.9}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              <Divider sx={{ width: 32, borderColor: 'grey.400' }} />
              <FadeIn delay={1.0}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', letterSpacing: '0.1em' }}
                >
                  Klar til å jobbe sammen?
                </Typography>
              </FadeIn>
              <Divider sx={{ width: 32, borderColor: 'grey.400' }} />
            </Stack>
          </FadeIn>
          <FadeIn delay={1.1}>
            <Box sx={{ mt: 3 }}>
              <AnimatedLink href="/contact">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: 'primary.dark',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  }}
                >
                  TA KONTAKT
                </Button>
              </AnimatedLink>
            </Box>
          </FadeIn>
        </Box>
      </FadeIn>

      {/* Bottom Left Image Placeholder */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          left: { xs: 16, md: 32 },
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: 160, md: 224, lg: 384 },
            height: { xs: 240, md: 336, lg: 512 },
            bgcolor: 'grey.700',
            borderRadius: 2,
            boxShadow: 3,
            opacity: 0.35,
            transform: 'rotate(-6deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'grey.200' }}>
            Image Placeholder
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
