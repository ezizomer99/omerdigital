'use client';

import Navigation from "@/components/Navigation";
import { projects } from "@/data/projects";
import { 
  PageTransition,
  PageTitle,
  PageDescription,
  ProjectCard,
  FadeIn,
  HoverEffect,
  AnimatedLink
} from "@/components/animations";

export default function Work() {
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
              <ProjectCard key={project.id} delay={0.4 + (index * 0.05)}>
                <HoverEffect scale={1.02} className="w-full h-64 bg-gray-900 rounded-sm overflow-hidden shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <FadeIn delay={0.6 + (index * 0.05)} className="text-white text-sm opacity-50">
                      {project.category}
                    </FadeIn>
                  </div>
                </HoverEffect>
                <FadeIn delay={0.5 + (index * 0.05)} className="text-lg font-light text-gray-800 mb-2">
                  <h3>{project.title}</h3>
                </FadeIn>
                <FadeIn delay={0.55 + (index * 0.05)} className="text-sm text-gray-600 mb-3">
                  <p>{project.description}</p>
                </FadeIn>
                <FadeIn delay={0.6 + (index * 0.05)} className="flex flex-wrap gap-2">
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
                {project.link && (
                  <FadeIn delay={0.7 + (index * 0.05)} className="mt-2">
                    <AnimatedLink 
                      href={project.link} 
                      external={true}
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors inline-block"
                    >
                      Se Prosjekt →
                    </AnimatedLink>
                  </FadeIn>
                )}
              </ProjectCard>
            ))}
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
