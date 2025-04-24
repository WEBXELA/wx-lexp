"use client"
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Users, MessageSquare, Moon, Sun, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import GradientText from './GradientText';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isDashboard = location.pathname === '/dashboard';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isAuthPage) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400" />
            <div className='flex flex-col'>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-red-800 bg-clip-text text-transparent">
                LEXP
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Professional Lead Generation Tool
              </p>
            </div>
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-125 transition duration-300"
            >
              Home
            </Link>
            <Link 
              to="/pricing"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-125 transition duration-300"
            >
              Pricing
            </Link>
            <Link 
              to="/contact"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-125 transition duration-300 flex items-center space-x-1"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </Link>

            

            {/* Dashboard or Sign Out Button */}
            {!isDashboard ? (
              <Link
                to="/dashboard"
                className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 dark:bg-purple-500 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-200 dark:shadow-purple-800"
              >
                Sign Out
              </Link>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300'
            >
              {theme === 'light' ? (
                <Moon className='w-6 h-6 text-purple-800' />
              ) : (
                <Sun className='w-6 h-6 text-yellow-400' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden my-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!isDashboard ? (
              <Link
                to="/dashboard"
                className="block px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-6 py-2.5 text-sm font-medium text-white bg-purple-600 dark:bg-purple-500 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-200 dark:shadow-purple-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Out
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.header>
  );
}