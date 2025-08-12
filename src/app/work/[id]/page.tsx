'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from "@/components/Navigation";
import { DesktopFrame, MobileFrame } from "@/components/DeviceFrames";
import { useProject } from "@/hooks/useProjects";
import { ProjectService } from "@/services/projectService";
import { type ProjectImage } from "@/lib/supabase";
import { 
  PageTransition,
  PageTitle,
  FadeIn,
  HoverEffect,
  AnimatedLink
} from "@/components/animations";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params);
  const { project, loading, error } = useProject(parseInt(resolvedParams.id));
  const [images, setImages] = useState<ProjectImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (project) {
        const projectImages = await ProjectService.getProjectImages(project.id);
        setImages(projectImages);
      }
    };

    fetchImages();
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-gray-600">Laster prosjekt...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Navigation />
      
      <PageTransition className="px-8 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <FadeIn delay={0.1} className="mb-8">
            <Link 
              href="/work" 
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tilbake til arbeid
            </Link>
          </FadeIn>

          {/* Project Header */}
          <div className="mb-12">
            <FadeIn delay={0.2} className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {project.category}
              </span>
            </FadeIn>
            
            <PageTitle 
              className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-6"
              delay={0.3}
            >
              {project.title}
            </PageTitle>
            
            <FadeIn delay={0.4} className="text-lg text-gray-600 font-light leading-relaxed mb-8">
              <p>{project.description}</p>
            </FadeIn>

            {/* Tech Stack */}
            <FadeIn delay={0.5} className="mb-8">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-3">Teknologier</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <FadeIn key={index} delay={0.6 + (index * 0.05)}>
                    <HoverEffect scale={1.05} className="bg-white text-gray-700 px-3 py-2 rounded shadow-sm text-sm">
                      {tech}
                    </HoverEffect>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            {/* External Link */}
            {project.project_url && (
              <FadeIn delay={0.7}>
                <AnimatedLink 
                  href={project.project_url} 
                  external={true}
                  className="inline-block bg-gray-900 text-white px-6 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors"
                >
                  BESØK NETTSIDE →
                </AnimatedLink>
              </FadeIn>
            )}
          </div>

          {/* Project Images with Device Frames */}
          <FadeIn delay={0.8} className="mb-12">
            {images.length > 0 ? (
              <div className="space-y-12">
                {images.map((image, index) => {
                  // Determine if this is a mobile image based on filename or alt text
                  const isMobile = image.alt_text?.toLowerCase().includes('mobile') || 
                                   image.image_url.toLowerCase().includes('mobile') ||
                                   image.alt_text?.toLowerCase().includes('phone');

                  return (
                    <FadeIn key={image.id} delay={0.9 + (index * 0.1)} className="w-full">
                      {isMobile ? (
                        <div className="flex justify-center">
                          <MobileFrame className="max-w-sm">
                            <Image 
                              src={image.image_url} 
                              alt={image.alt_text || `${project.title} mobile screenshot`}
                              width={400}
                              height={800}
                              className="w-full h-full object-cover object-top"
                            />
                          </MobileFrame>
                        </div>
                      ) : (
                        <DesktopFrame className="max-w-4xl mx-auto">
                          <Image 
                            src={image.image_url} 
                            alt={image.alt_text || `${project.title} desktop screenshot`}
                            width={1200}
                            height={800}
                            className="w-full h-full object-cover object-top"
                          />
                        </DesktopFrame>
                      )}
                      
                      {/* Image Caption */}
                      {image.alt_text && (
                        <p className="text-center text-sm text-gray-500 mt-4">
                          {image.alt_text}
                        </p>
                      )}
                    </FadeIn>
                  );
                })}
              </div>
            ) : (
              <div className="w-full">
                <DesktopFrame className="max-w-4xl mx-auto">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-lg mb-2">Prosjektbilde</div>
                      <div className="text-sm">Skjermbilder vil bli lagt til her</div>
                    </div>
                  </div>
                </DesktopFrame>
              </div>
            )}
          </FadeIn>

          {/* Project Details Section */}
          <FadeIn delay={0.9} className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-light text-gray-800 mb-4">Utfordringer</h3>
              <p className="text-gray-600 leading-relaxed">
                {project.long_description || 
                 `Dette prosjektet krevde en balanse mellom moderne design og funksjonalitet. 
                  Hovedutfordringen var å skape en løsning som både er visuelt tiltalende og 
                  teknisk robust.`}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light text-gray-800 mb-4">Løsning</h3>
              <p className="text-gray-600 leading-relaxed">
                Ved å bruke moderne webutvikling teknologier og fokus på brukeropplevelse, 
                leverte vi en komplett løsning som møter alle krav til ytelse og design.
              </p>
              {project.github_url && (
                <div className="mt-4">
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    Se kildekode
                  </a>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
