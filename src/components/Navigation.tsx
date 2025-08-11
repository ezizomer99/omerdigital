'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedInIcon, GitHubIcon, WebsiteIcon } from './SocialIcons';
import { personalInfo } from '@/data/personal';
import { useState } from 'react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <motion.nav 
      className="w-full flex justify-between items-center py-8 px-8 md:px-16"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo/Name */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/" className="text-xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors">
          OMER DIGITAL
        </Link>
      </motion.div>
      
      {/* Navigation Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <motion.div 
          className="flex gap-8 text-sm font-light tracking-wide"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              HJEM
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/work" className="text-gray-700 hover:text-gray-900 transition-colors">
              ARBEID
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              OM MEG
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              KONTAKT
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Social Icons - Desktop only */}
        <motion.div 
          className="hidden lg:flex items-center gap-3 ml-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {personalInfo.social.linkedin && (
            <motion.a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedInIcon size={18} />
            </motion.a>
          )}
          {personalInfo.social.github && (
            <motion.a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitHubIcon size={18} />
            </motion.a>
          )}
          {personalInfo.social.website && (
            <motion.a
              href={personalInfo.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <WebsiteIcon size={18} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <motion.div 
        className="sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.button 
          onClick={toggleMobileMenu}
          className="text-gray-700 hover:text-gray-900 transition-colors p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-amber-50 z-50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center py-8 px-8">
              <Link 
                href="/" 
                className="text-xl font-light tracking-wider text-gray-800"
                onClick={closeMobileMenu}
              >
                OMER DIGITAL
              </Link>
              <motion.button 
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gray-900 transition-colors p-2"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Mobile Menu Items */}
            <motion.div 
              className="flex flex-col items-center justify-center space-y-8 mt-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link 
                  href="/" 
                  className="text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  HJEM
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link 
                  href="/work" 
                  className="text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  ARBEID
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link 
                  href="/about" 
                  className="text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  OM MEG
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Link 
                  href="/contact" 
                  className="text-2xl font-light tracking-wider text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  KONTAKT
                </Link>
              </motion.div>

              {/* Mobile Social Icons */}
              <motion.div 
                className="flex items-center gap-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                {personalInfo.social.linkedin && (
                  <motion.a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LinkedInIcon size={28} />
                  </motion.a>
                )}
                {personalInfo.social.github && (
                  <motion.a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <GitHubIcon size={28} />
                  </motion.a>
                )}
                {personalInfo.social.website && (
                  <motion.a
                    href={personalInfo.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <WebsiteIcon size={28} />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
