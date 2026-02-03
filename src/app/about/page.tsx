'use client';

import Image from "next/image";
import Navigation from "@/components/Navigation";
import { personalInfo } from "@/data/personal";
import { services } from "@/data/services";
import { 
  PageTransition,
  PageTitle,
  FadeIn,
  ServiceCard,
  HoverEffect
} from "@/components/animations";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <PageTransition>
        <Container maxWidth="md" sx={{ pt: { xs: 14, md: 16 }, pb: 8 }}>
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
              OM MEG
            </Typography>
          </PageTitle>
          
          <Grid container spacing={8} alignItems="center" sx={{ mb: 8 }}>
            {/* Text Content */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FadeIn delay={0.2} direction="left" distance={50}>
                <Stack spacing={3}>
                  <FadeIn delay={0.3} direction="up">
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.125rem',
                        color: 'text.secondary',
                        fontWeight: 300,
                        lineHeight: 1.75,
                      }}
                    >
                      {personalInfo.description}
                    </Typography>
                  </FadeIn>
                  
                  <FadeIn delay={0.4}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 300, color: 'text.primary', mb: 2 }}
                      >
                        Tjenester som tilbys
                      </Typography>
                      <Stack spacing={2}>
                        {services.map((service, index) => (
                          <ServiceCard key={service.id} delay={0.5 + (index * 0.05)}>
                            <Box
                              sx={{
                                bgcolor: 'background.paper',
                                p: 2,
                                borderRadius: 1,
                                boxShadow: 1,
                              }}
                            >
                              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="h6" component="span">{service.icon}</Typography>
                                <Typography sx={{ fontWeight: 300, color: 'text.primary' }}>
                                  {service.name}
                                </Typography>
                              </Stack>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {service.description}
                              </Typography>
                            </Box>
                          </ServiceCard>
                        ))}
                      </Stack>
                    </Box>
                  </FadeIn>
                </Stack>
              </FadeIn>
            </Grid>

            {/* Image */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FadeIn delay={0.3} direction="right" distance={50}>
                <HoverEffect scale={1.02} y={-5}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 384,
                      bgcolor: 'primary.dark',
                      borderRadius: 0.5,
                      overflow: 'hidden',
                      boxShadow: 3,
                      position: 'relative',
                    }}
                  >
                    <Image
                      src="/me/profilepic.jpg"
                      alt="Omer Digital - Profile Picture"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </Box>
                </HoverEffect>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </PageTransition>
    </Box>
  );
}
