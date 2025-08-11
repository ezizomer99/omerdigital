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
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative flex items-center justify-center min-h-[80vh] px-8 md:px-16">
        {/* Left Image - Hidden on mobile */}
        <FadeIn 
          delay={0.1}
          direction="left"
          distance={100}
          className="hidden lg:block absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 w-72 h-96 md:w-80 md:h-[500px]"
        >
          <HoverEffect scale={1.02} y={-5}>
            <div className="w-full h-full bg-gray-900 rounded-sm overflow-hidden shadow-lg">
              {/* Placeholder for left image - replace src with your actual image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <FadeIn delay={0.6} className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm opacity-50">Portfolio Image</span>
                </FadeIn>
              </div>
            </div>
          </HoverEffect>
        </FadeIn>

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

        {/* Right Image - Hidden on mobile */}
        <FadeIn 
          delay={0.2}
          direction="right"
          distance={100}
          className="hidden lg:block absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2 w-72 h-96 md:w-80 md:h-[500px]"
        >
          <HoverEffect scale={1.02} y={-5}>
            <div className="w-full h-full bg-gray-900 rounded-sm overflow-hidden shadow-lg">
              {/* Placeholder for right image - replace src with your actual image */}
              <div className="w-full h-full bg-gradient-to-bl from-gray-700 to-gray-900 flex items-center justify-center relative">
                <FadeIn delay={0.8} className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm opacity-50">Creative Work</span>
                </FadeIn>
              </div>
            </div>
          </HoverEffect>
        </FadeIn>
      </main>

      {/* Bottom Section with CTA */}
      <FadeIn delay={0.8} className="text-center pb-16 px-8">
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
    </div>
  );
}
