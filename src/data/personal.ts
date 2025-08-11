export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "ØmerDigital",
  title: "Digital Konsulent & Webutvikler",
  description: "Digital konsulent med lidenskap for å skape meningsfulle digitale opplevelser som driver forretningsvekst og brukerengasjement. Med ekspertise innen moderne webteknologier og strategisk digital transformasjon, hjelper jeg bedrifter å navigere det digitale landskapet og oppnå sine mål gjennom innovative løsninger og gjennomtenkt design.",
  email: "oemerdigital@gmail.com",
  phone: "+4748207684",
  location: "Kristiansand, Norge | Tilgjengelig for prosjekter over hele verden",
  social: {
    linkedin: "https://no.linkedin.com/in/ezizomer99",
    github: "https://github.com/ezizomer99",
    website: "https://omerdigital.com"
  }
};

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  text: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    position: "CEO",
    text: "Omer leverte en eksepsjonell webapplikasjon som overgikk våre forventninger. Hans tekniske ekspertise og oppmerksomhet på detaljer gjorde hele prosessen smidig.",
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Growth Solutions",
    position: "CTO",
    text: "Den digitale strategikonsultasjonen fra Omer var uvurderlig. Vi så en 40% økning i brukerengasjement etter å ha implementert hans anbefalinger.",
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    position: "Markedsdirektør",
    text: "Profesjonell, responsiv og leverer kvalitetsarbeid til rett tid. Omer er vår foretrukne utvikler for alle webprosjekter.",
    image: "/images/testimonial3.jpg"
  }
];
