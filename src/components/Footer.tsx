import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 font-inter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            {/* Logo Section */}
            <div onClick={() => handleNavigation('/')} className="cursor-pointer">
              <div className="flex items-center space-x-3">
                <img src="https://raw.githubusercontent.com/WEBXELA/brand-images/e84c6074fba81c45b6ee4f0e57ac798890e6c352/logo/webxela-logo.svg" alt="Webxela Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                <div>
                  <h3 className="text-xl font-bold text-white">LEXP</h3>
                  <p className="text-sm text-gray-300">Professional Lead Generation Tool</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
              Transform your lead generation process with our powerful tools and insights.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-base text-white hover:text-primary-200 transition-colors border-b border-transparent hover:border-primary-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="text-base text-white hover:text-primary-200 transition-colors border-b border-transparent hover:border-primary-200"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-base text-white hover:text-primary-200 transition-colors border-b border-transparent hover:border-primary-200"
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:lexp@webxela.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  lexp@webxela.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Phone className="w-5 h-5" />
                <a href="tel:+919724823602" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +91 9724823602
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-white text-sm font-normal">
            © 2025 Webxela. All rights reserved. &nbsp;|&nbsp; Designed by <a href="https://umitra.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-200">Uimitra</a> &nbsp;|&nbsp; copyright <a href="https://webxela.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-200">webxela.com</a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}