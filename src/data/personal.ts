export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "ØmerDigital",
  title: "Digital Konsulent & Webutvikler",
  description:
    "Som webutvikler liker jeg å realisere ideer til bedrifter. Ellers jobber jeg til vanlig som utvikler/konsulent hos et konsulentselskap, noe som gir meg god erfaring med både tekniske løsninger og forretningsbehov. Jeg hjelper bedrifter med å bygge nettsider og webapplikasjoner som faktisk fungerer og gir verdi. Fra første møte til ferdig produkt sørger jeg for at prosjektet blir levert i tide og holder høy kvalitet.",
  email: "oemerdigital@gmail.com",
  location:
    "Kristiansand, Norge | Tilgjengelig for prosjekter over hele verden",
  social: {
    linkedin: "https://no.linkedin.com/in/ezizomer99",
    github: "https://github.com/ezizomer99",
  },
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
    image: "/images/testimonial1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Growth Solutions",
    position: "CTO",
    text: "Den digitale strategikonsultasjonen fra Omer var uvurderlig. Vi så en 40% økning i brukerengasjement etter å ha implementert hans anbefalinger.",
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    position: "Markedsdirektør",
    text: "Profesjonell, responsiv og leverer kvalitetsarbeid til rett tid. Omer er vår foretrukne utvikler for alle webprosjekter.",
    image: "/images/testimonial3.jpg",
  },
];
