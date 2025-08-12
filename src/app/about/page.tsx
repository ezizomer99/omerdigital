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

export default function About() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navigation />
      
      <PageTransition className="px-8 md:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <PageTitle 
            className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-8 text-center"
            delay={0.1}
          >
            OM MEG
          </PageTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Text Content */}
            <FadeIn 
              delay={0.2}
              direction="left"
              distance={50}
              className="space-y-6"
            >
              <FadeIn delay={0.3} direction="up" className="text-lg text-gray-600 font-light leading-relaxed">
                <p>{personalInfo.description}</p>
              </FadeIn>
              
              <FadeIn delay={0.4} className="space-y-4">
                <h3 className="text-xl font-light text-gray-800">Tjenester som tilbys</h3>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <ServiceCard key={service.id} delay={0.5 + (index * 0.05)}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{service.icon}</span>
                        <h4 className="font-light text-gray-800">{service.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </ServiceCard>
                  ))}
                </div>
              </FadeIn>
            </FadeIn>

            {/* Image */}
            <FadeIn 
              delay={0.3}
              direction="right"
              distance={50}
              className="w-full"
            >
              <HoverEffect scale={1.02} y={-5} className="w-full h-96 bg-gray-900 rounded-sm overflow-hidden shadow-lg">
                <div className="w-full h-full relative">
                  <Image
                    src="/me/profilepic.jpg"
                    alt="Omer Digital - Profile Picture"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </HoverEffect>
            </FadeIn>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
