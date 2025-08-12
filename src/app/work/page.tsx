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

export default function Work() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-gray-600">Laster prosjekter...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-red-600">Feil ved lasting av prosjekter: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Navigation />
      
      <PageTransition className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <PageTitle 
            className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-8 text-center"
            delay={0.1}
          >
            MITT ARBEID
          </PageTitle>
          
          <PageDescription 
            className="text-center mb-16"
            delay={0.2}
          >
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              En oversikt over mine nylige prosjekter og digitale løsninger.
            </p>
          </PageDescription>

          {/* Project Grid */}
          <FadeIn delay={0.3} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/work/${project.id}`} className="block">
                <ProjectCard delay={0.4 + (index * 0.05)}>
                  <HoverEffect scale={1.02} className="w-full h-64 bg-gray-200 rounded-sm overflow-hidden shadow-lg mb-4 group-hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                      {/* Show project image if available, otherwise placeholder */}
                      {project.image_url || (project.id === 1) ? (
                        <Image 
                          src={project.image_url || 'Missing Image'} 
                          alt={project.title}
                          width={400}
                          height={256}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">
                          Prosjektbilde
                        </div>
                      )}
                      {/* Category badge - small and positioned */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-600">
                        {project.category}
                      </div>
                    </div>
                  </HoverEffect>
                  <FadeIn delay={0.5 + (index * 0.05)} className="text-lg font-light text-gray-800 mb-2">
                    <h3>{project.title}</h3>
                  </FadeIn>
                  <FadeIn delay={0.55 + (index * 0.05)} className="text-sm text-gray-600 mb-3">
                    <p>{project.description}</p>
                  </FadeIn>
                  <FadeIn delay={0.6 + (index * 0.05)} className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <FadeIn 
                        key={techIndex}
                        delay={0.65 + (index * 0.05) + (techIndex * 0.01)}
                      >
                        <HoverEffect scale={1.05} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tech}
                        </HoverEffect>
                      </FadeIn>
                    ))}
                  </FadeIn>
                </ProjectCard>
              </Link>
            ))}
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
