import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Search,
  ChevronDown,
  Lock,
  LogOut,
  Menu,
  Check,
  X,
  AlertCircle,
  Clock
} from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import ProfileList from '../components/ProfileList';
import { searchProfiles } from '../api/searchProfiles';
import { searchInstagramProfiles } from '../api/searchInstagramProfiles';
import { searchFacebookProfiles } from '../api/searchFacebookProfiles';
import { searchTwitterProfiles } from '../api/searchTwitterProfiles';
import { exportToExcel } from '../utils/exportToExcel';
import { SearchFiltersState, Profile, SearchResponse } from '../types';
import { supabase } from '../lib/supabase';
import { useSearchLimit } from '../hooks/useSearchLimit';

const platformIcons = {
  // linkedin: Linkedin,
  // instagram: Instagram,
  // facebook: Facebook,
  // twitter: Twitter,
};

const platformNames = {
  // linkedin: 'LinkedIn',
  // instagram: 'Instagram',
  // facebook: 'Facebook',
  // twitter: 'Twitter',
};

const INITIAL_VISIBLE_PROFILES = 5;

export default function Dashboard() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { 
    remainingSearches, 
    incrementSearchCount, 
    hasSubscription,
    lastReset,
    timeUntilReset,
    isLoading: isLoadingLimits 
  } = useSearchLimit();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersState>({
    jobTitle: '',
    location: '',
    industry: '',
    companySize: '',
    company: '',
    experience: '',
    education: '',
    skills: '',
    languages: '',
    seniority: '',
    page: 1,
    platform: 'linkedin'
  });

  const { data: searchResponse, isLoading, refetch } = useQuery<SearchResponse>(
    ['profiles', filters],
    () => {
      switch (filters.platform) {
        case 'instagram':
          return searchInstagramProfiles(filters);
        case 'facebook':
          return searchFacebookProfiles(filters);
        case 'twitter':
          return searchTwitterProfiles(filters);
        default:
          return searchProfiles(filters);
      }
    },
    {
      enabled: false,
      keepPreviousData: true
    }
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleFilterChange = (key: keyof SearchFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    if (!filters.jobTitle && !filters.company && !filters.skills) {
      alert('Please enter at least one search criteria (Job Title, Company, or Skills)');
      return;
    }

    if (remainingSearches === 0 && !hasSubscription) {
      const message = timeUntilReset
        ? `Your search limit has been reached. You can search again in ${timeUntilReset}.`
        : 'Your search limit has been reached. You can search again after 24 hours.';
        
      setShowUpgradeModal(true);
      alert(message + '\nFor unlimited searches, upgrade to our membership.');
      return;
    }
    
    const canSearch = await incrementSearchCount();
    if (!canSearch) {
      setShowUpgradeModal(true);
      return;
    }

    setFilters(prev => ({ ...prev, page: 1 }));
    setHasSearched(true);
    refetch();
  };

  const handleShowMore = () => {
    setShowUpgradeModal(true);
  };

  const handleExport = async () => {
    setShowUpgradeModal(true);
  };

  const displayedProfiles = searchResponse?.items?.slice(0, INITIAL_VISIBLE_PROFILES) || [];
  const hasMoreProfiles = searchResponse?.items && searchResponse.items.length > INITIAL_VISIBLE_PROFILES;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="glass-effect fixed w-full z-50 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Search className="w-8 h-8 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-900">LEXP</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header> */}
      <header className="glass-effect fixed w-full z-50 border-b border-gray-200/80 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-evenly gap-28 sm:justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-purple-500 to-red-800 bg-clip-text text-transparent">
                LEXP
              </h1>
            </div>
            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 p-4">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Search Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Find Profiles</h2>
            {!hasSubscription && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {remainingSearches} of 10 searches remaining
                  {timeUntilReset && remainingSearches === 0 && (
                    <span className="text-gray-400">
                      {' '}(Resets in {timeUntilReset})
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            {Object.entries(platformNames).map(([key, name]) => {
              const Icon = platformIcons[key as keyof typeof platformIcons];
              return (
                <button
                  key={key}
                  onClick={() => handleFilterChange('platform', key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    filters.platform === key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-b-2 border-purple-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Searching for profiles...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResponse?.items && searchResponse.items.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4">
              <p className="text-sm sm:text-base text-gray-600">
                Found {searchResponse.totalResults} profiles
              </p>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white text-sm sm:text-base rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <span>
                  {isExporting ? 'Fetching data...' : 'Export to Excel'}
                </span>
              </motion.button>
            </div>

            <ProfileList
              profiles={displayedProfiles}
              platform={filters.platform}
            />

            {/* Show More Button */}
            {hasMoreProfiles && (
              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShowMore}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <ChevronDown className="w-5 h-5" />
                  <span>Show More Profiles</span>
                </motion.button>
              </div>
            )}
          </>
        )}

        {/* No Results State */}
        {hasSearched && (!searchResponse?.items || searchResponse.items.length === 0) && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 px-4 sm:px-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No profiles found</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or using different keywords to find more results.
            </p>
          </motion.div>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 px-4 sm:px-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Enter your search criteria above to find relevant profiles across different platforms.
            </p>
          </motion.div>
        )}

        {/* Upgrade Modal */}
        <AnimatePresence>
          {showUpgradeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowUpgradeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Modal Content */}
                <div className="p-8 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Lock className="w-8 h-8 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Unlock Premium Features
                    </h3>
                    <p className="text-sm sm:txt-base text-gray-600 max-w-md mx-auto">
                      Upgrade to our premium plan to access unlimited exports, advanced filters, and exclusive features.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    {[
                      'Unlimited exports',
                      'Advanced search filters',
                      'Bulk export capabilities',
                      'Priority support',
                      'API access',
                      'Team collaboration',
                      'Custom exports',
                      'Analytics dashboard'
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6 sm:mb-8">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Contact us for pricing</p>
                    <p className="text-sm sm:text-base text-gray-600">Get a customized plan that fits your needs</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowUpgradeModal(false);
                        navigate('/contact');
                      }}
                      className="px-6 sm:px-8 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-200 gradient-bg"
                    >
                      Contact Sales
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowUpgradeModal(false)}
                      className="px-6 sm:px-8 py-3 rounded-xl text-gray-700 font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      Maybe Later
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}