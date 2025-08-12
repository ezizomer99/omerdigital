'use client';

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

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Top Right Image Placeholder */}
      <div className="absolute top-8 right-8 md:top-16 md:right-16 z-0">
        <div className="w-32 h-48 md:w-48 md:h-72 lg:w-80 lg:h-[30rem] bg-gray-600 rounded-lg shadow-lg opacity-40 transform rotate-6">
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs md:text-sm">
            Image Placeholder
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>
      
      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[60vh] md:min-h-[70vh] px-8 md:px-16 z-10">
        {/* Center Content */}
        <FadeIn 
          delay={0}
          duration={0.5}
          className="text-center z-10 w-full max-w-2xl mx-auto"
        >
          <FadeIn 
            delay={0.1}
            duration={0.4}
            className="text-3xl md:text-4xl lg:text-6xl font-light tracking-wider text-gray-800 mb-8"
          >
            <h1>{personalInfo.name.toUpperCase()}</h1>
          </FadeIn>
          
          <FadeIn delay={0.2} duration={0.4} className="space-y-6 max-w-md mx-auto">
            <FadeIn delay={0.3} className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              <p>{personalInfo.title}</p>
            </FadeIn>
            
            <FadeIn delay={0.4} className="space-y-3">
              <p className="text-sm text-gray-500 uppercase tracking-wide">Tjenester</p>
              <StaggerContainer className="flex flex-wrap justify-center gap-3 text-sm" initialDelay={0.5}>
                {services.map((service, index) => (
                  <StaggerItem key={service.id} index={index} staggerDelay={0.05}>
                    <HoverEffect 
                      scale={1.05} 
                      y={-2} 
                      className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 cursor-pointer"
                    >
                      {service.name}
                    </HoverEffect>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </FadeIn>
        </FadeIn>
      </main>

      {/* Bottom Section with CTA */}
      <FadeIn delay={0.8} className="text-center pb-8 md:pb-16 px-8 relative z-10">
        <FadeIn delay={0.9} className="inline-flex items-center gap-4">
          <div className="w-8 h-px bg-gray-400"></div>
          <FadeIn delay={1.0} className="text-sm text-gray-500 uppercase tracking-wide">
            <p>Klar til å jobbe sammen?</p>
          </FadeIn>
          <div className="w-8 h-px bg-gray-400"></div>
        </FadeIn>
        <FadeIn delay={1.1} className="mt-6">
          <AnimatedLink href="/contact" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
            TA KONTAKT
          </AnimatedLink>
        </FadeIn>
      </FadeIn>

      {/* Bottom Left Image Placeholder */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-0">
        <div className="w-40 h-60 md:w-56 md:h-84 lg:w-96 lg:h-[32rem] bg-gray-700 rounded-lg shadow-lg opacity-35 transform -rotate-6">
          <div className="w-full h-full flex items-center justify-center text-gray-200 text-xs md:text-sm">
            Image Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
