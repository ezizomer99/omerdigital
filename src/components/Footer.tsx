'use client';

import { motion } from 'framer-motion';
import { LinkedInIcon, GitHubIcon, WebsiteIcon } from './SocialIcons';
import { personalInfo } from '@/data/personal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand/Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-light tracking-wider mb-2">ØMER DIGITAL</h3>
            <p className="text-gray-400 text-sm">
              Digital Konsulent & Webutvikler
            </p>
          </motion.div>

          {/* Copyright Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} ØmerDigital. Alle rettigheter forbeholdt.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Laget med ❤️ i Norge
            </p>
          </motion.div>

          {/* Social Icons Section */}
          <motion.div 
            className="flex justify-center md:justify-end gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {personalInfo.social.linkedin && (
              <motion.a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedInIcon size={20} />
              </motion.a>
            )}
            {personalInfo.social.github && (
              <motion.a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <GitHubIcon size={20} />
              </motion.a>
            )}
            {personalInfo.social.website && (
              <motion.a
                href={personalInfo.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <WebsiteIcon size={20} />
              </motion.a>
            )}
          </motion.div>
        </div>
        
        {/* Bottom Border */}
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-6 text-center"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-500 text-xs">
            Kristiansand, Norge | Tilgjengelig for prosjekter over hele verden
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
