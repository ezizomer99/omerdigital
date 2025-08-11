'use client';

import Navigation from "@/components/Navigation";
import { personalInfo } from "@/data/personal";
import { skills, services } from "@/data/services";
import { 
  PageTransition,
  PageTitle,
  FadeIn,
  ServiceCard,
  HoverEffect
} from "@/components/animations";

export default function About() {
  const skillCategories = [...new Set(skills.map(skill => skill.category))];

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
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <FadeIn delay={0.6} className="text-white text-sm opacity-50">
                    Profile Image
                  </FadeIn>
                </div>
              </HoverEffect>
            </FadeIn>
          </div>

          {/* Skills Section */}
          <FadeIn delay={0.7} direction="up" distance={50} className="space-y-8">
            <FadeIn delay={0.8} direction="up" className="text-2xl font-light text-gray-800 text-center">
              <h3>Tekniske Ferdigheter</h3>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <FadeIn
                  key={category}
                  delay={0.9 + (categoryIndex * 0.05)}
                  direction="up"
                  distance={30}
                >
                  <HoverEffect scale={1.02} y={-3} className="bg-white p-6 rounded-sm shadow-sm">
                    <h4 className="text-lg font-light text-gray-800 mb-4">{category}</h4>
                    <div className="space-y-3">
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill, skillIndex) => (
                          <FadeIn
                            key={skill.name}
                            delay={1.0 + (categoryIndex * 0.05) + (skillIndex * 0.02)}
                            direction="left"
                            distance={20}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm text-gray-700">{skill.name}</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, index) => (
                                <FadeIn
                                  key={index}
                                  delay={1.1 + (categoryIndex * 0.05) + (skillIndex * 0.02) + (index * 0.01)}
                                  className={`w-2 h-2 rounded-full ${
                                    index < skill.level ? 'bg-gray-800' : 'bg-gray-300'
                                  }`}
                                >
                                  <div></div>
                                </FadeIn>
                              ))}
                            </div>
                          </FadeIn>
                        ))}
                    </div>
                  </HoverEffect>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    </div>
  );
}
