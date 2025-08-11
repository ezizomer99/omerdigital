'use client';

import Navigation from "@/components/Navigation";
import { personalInfo } from "@/data/personal";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedInIcon, GitHubIcon, TwitterIcon, WebsiteIcon } from '@/components/SocialIcons';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message);
        // Clear form after successful submission
        const form = e.target as HTMLFormElement;
        form.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitMessage('');
        }, 5000);
      } else {
        setSubmitMessage(result.error || 'Noe gikk galt. Prøv igjen.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Noe gikk galt. Prøv igjen senere.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-amber-50">
      <Navigation />
      
      <motion.main 
        className="px-8 md:px-16 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-8 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            TA KONTAKT
          </motion.h1>
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Klar til å starte ditt neste prosjekt? La oss diskutere hvordan jeg kan hjelpe deg med å realisere ideene dine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <label htmlFor="name" className="block text-sm text-gray-700 mb-2">Fullt Navn</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-500 text-gray-800"
                    placeholder="Skriv inn ditt fulle navn"
                    whileFocus={{ scale: 1.02, borderColor: "#374151" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">E-postadresse</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-500 text-gray-800"
                    placeholder="Skriv inn din e-postadresse"
                    whileFocus={{ scale: 1.02, borderColor: "#374151" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                >
                  <label htmlFor="project" className="block text-sm text-gray-700 mb-2">Prosjekttype</label>
                  <motion.select
                    id="project"
                    name="project-type"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors text-gray-700"
                    whileFocus={{ scale: 1.02, borderColor: "#374151" }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="" className="text-gray-500">Velg en tjeneste</option>
                    <option value="web-development">Webutvikling</option>
                    <option value="digital-strategy">Digital Strategi</option>
                    <option value="consulting">Konsultasjon</option>
                    <option value="other">Annet</option>
                  </motion.select>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                >
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">Melding</label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-500 text-gray-800"
                    placeholder="Fortell meg om prosjektet ditt..."
                    whileFocus={{ scale: 1.02, borderColor: "#374151" }}
                    transition={{ duration: 0.2 }}
                  ></motion.textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDER...
                    </>
                  ) : (
                    'SEND MELDING'
                  )}
                </motion.button>

                {submitMessage && (
                  <motion.div 
                    className={`p-4 rounded-sm border text-center ${
                      submitMessage.includes('sendt') || submitMessage.includes('Melding sendt') 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                    } transition-all duration-300`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {submitMessage.includes('sendt') || submitMessage.includes('Melding sendt') ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className="font-medium">{submitMessage}</span>
                    </motion.div>
                    {submitMessage.includes('sendt') || submitMessage.includes('Melding sendt') && (
                      <motion.p 
                        className="text-sm mt-2 text-green-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        Du vil også motta en bekreftelse på e-post.
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h3 className="text-xl font-light text-gray-800 mb-4">Ta kontakt</h3>
                <div className="space-y-3 text-gray-600">
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    <motion.a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-600 hover:text-gray-800 transition-colors hover:underline"
                      whileHover={{ scale: 1.02 }}
                    >
                      {personalInfo.email}
                    </motion.a>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    <motion.a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-gray-600 hover:text-gray-800 transition-colors hover:underline"
                      whileHover={{ scale: 1.02 }}
                    >
                      {personalInfo.phone}
                    </motion.a>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    {personalInfo.location}
                  </motion.p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <h3 className="text-xl font-light text-gray-800 mb-4">Responstid</h3>
                <p className="text-gray-600">
                  Jeg svarer vanligvis på alle henvendelser innen 24 timer. 
                  For hastende prosjekter, vennligst nevn det i meldingen din.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <h3 className="text-xl font-light text-gray-800 mb-4">Sosiale medier</h3>
                <div className="flex gap-4">
                  {personalInfo.social.linkedin && (
                    <motion.a 
                      href={personalInfo.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.7 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LinkedInIcon size={20} />
                      <span>LinkedIn</span>
                    </motion.a>
                  )}
                  {personalInfo.social.github && (
                    <motion.a 
                      href={personalInfo.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.8 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GitHubIcon size={20} />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                  {personalInfo.social.website && (
                    <motion.a 
                      href={personalInfo.social.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.9 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <WebsiteIcon size={20} />
                      <span>Website</span>
                    </motion.a>
                  )}
                  {personalInfo.social.twitter && (
                    <motion.a 
                      href={personalInfo.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 2.0 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TwitterIcon size={20} />
                      <span>Twitter</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
