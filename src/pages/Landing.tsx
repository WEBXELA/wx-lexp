"use client"
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Search, Shield, Bot, Zap, Globe, Users, BarChart3, ArrowRight, CheckCircle, Target, Rocket, Award, MessageSquare, Star, TrendingUp, ArrowRightIcon, ChevronsRightIcon, BadgeCheck } from 'lucide-react';
import GradientText from '../components/GradientText';
import Aurora from '../components/Aurora';
import RotatingText from '../components/Rotating';
import Waves from '../components/waves';
// import CountUp from '../components/Countup';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};

const testimonials = [
  {
    name: 'Sarah Sophiason',
    role: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    quote: "This platform has revolutionized our lead generation process. We have seen a 300% increase in qualified leads.",
  },
  {
    name: 'Michael Chen',
    role: 'Sales Manager',
    company: 'GrowthX',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
    quote: 'The AI-powered search capabilities have saved us countless hours in lead research and qualification.',
  },
  {
    name: 'Emma Davis',
    role: 'CEO',
    company: 'Innovate Inc',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
    quote: 'Outstanding platform that has helped us scale our outreach efforts while maintaining quality.',
  },
  {
    name: 'John Doe',
    role: 'Founder',
    company: 'Startup Co.',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'The precision targeting features have been a game-changer for our marketing campaigns..',
  },
  {
    name: 'Sophia Lee',
    role: 'Product Manager',
    company: 'NextGen Solutions',
    image: 'https://plus.unsplash.com/premium_photo-1669882305273-674eff6567af?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'The analytics tools provided us with actionable insights that improved our ROI significantly..',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ currentIndex, setCurrentIndex ] = useState(0);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight flex flex-col justify-center items-center"
              >
                <div className="text-primary-700 font-bold mb-4">
                  Elevate
                </div>
                Your <br />
                <span className="text-primary-700"> Lead Generation</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed"
              >
                Revolutionize your business with our {' '} <span className='text-primary-700 font-bold'>AI-powered</span> lead generation platform that's easy to use, delivers ROI, and transforms customer happiness into your competitive edge.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/signup');
                  }}
                  className="px-8 py-3 bg-primary-600 text-white rounded-xl font-medium shadow-sm hover:bg-primary-700 border border-primary-600 hover:border-primary-700 transition-all duration-200"
                >
                  Get Started
                </motion.button>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium rounded-xl text-primary-700 border-2 border-primary-200 bg-white hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm"
                >
                  Learn More
                </button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {[
                  { label: 'Active Users', value: '10,000+' },
                  { label: 'Leads Generated', value: '1M+' },
                  { label: 'Success Rate', value: '95%' }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.02 }}
                    className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-primary-700">
                      {stat.value}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Lead Generation
            </h2>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto">
              Everything you need to find and connect with your ideal prospects
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Bot,
                title: 'Advanced AI Search',
                description: 'Leverage cutting-edge AI algorithms to find the most relevant leads based on your specific criteria.',
                points: [
                  'AI-Powered Search',
                  'Advanced Filtering',
                  'Improve results with AI',
                ]
              },
              {
                icon: Globe,
                title: 'Multi-Platform Integration',
                description: 'Seamlessly search and aggregate leads across LinkedIn, Twitter, Facebook, and Instagram.',
                points: [
                  'Leads from multiple platforms',
                  'Centralized lead data',
                  'Outreach across channels',
                ]
              },
              {
                icon: Rocket,
                title: 'Automated Lead Enrichment',
                description: 'Automatically enrich lead profiles with detailed information from multiple data sources.',
                points: [
                  'Complete lead profiles in seconds',
                  'Access to verified data',
                  'Save time and effort',
                ]
              },
              {
                icon: Target,
                title: 'Precision Targeting',
                description: 'Use advanced filters to target leads by industry, company size, location, and more.',
                points: [
                  'Customizable targeting',
                  'Target specific demographics',
                  'Maximize conversion rates',
                ]
              },
              {
                icon: TrendingUp,
                title: 'Performance Analytics',
                description: 'Track and analyze your lead generation performance with detailed insights and reports.',
                points: [
                  'Real-time performance tracking',
                  'Identify high-performing channels',
                  'Generate reports for stakeholders',
                ]
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade security and compliance with international data protection regulations.',
                points: [
                  'GDPR and CCPA compliant',
                  'Data encryption and secure storage',
                  'Regular security audits and updates',
                ]
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <feature.icon className="h-12 w-12 text-primary-600 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <motion.ul
                    variants={scaleIn}
                    className='text-gray-600 mt-4 space-y-2'
                  >
                    {feature.points.map((point, i) => (
                      <motion.li
                        key={i}
                        variants={stagger}
                        className='flex gap-3'
                      >
                        <BadgeCheck className='text-green-600'/>{point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Simple steps to transform your lead generation process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Search,
                title: 'Define Your Criteria',
                description: 'Set up your target audience parameters using our intuitive interface to find the perfect leads.',
              },
              {
                icon: Zap,
                title: 'AI-Powered Search',
                description: 'Let our AI lead algorithms find and qualify the best leads that match your specific criteria.',
              },
              {
                icon: Users,
                title: 'Enrich Lead Profiles',
                description: 'Automatically enrich lead profiles with detailed and verified information from multiple data sources.',
              },
              {
                icon: BarChart3,
                title: 'Analyze and Optimize',
                description: 'Track your lead generation performance with real-time analytics and actionable insights.',
              },
              {
                icon: MessageSquare,
                title: 'Engage Your Leads',
                description: 'Use our integrated communication tools to connect with leads and build meaningful relationships.',
              },
              {
                icon: Award,
                title: 'Optimize and Scale',
                description: 'Continuously optimize your strategy and scale your outreach efforts for maximum ROI.',
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 border-b-8 border-b-transparent group relative"
              >
                <div className="hidden md:block absolute bottom-0 left-0 right-0 h-2 -mb-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-primary-600 rounded-full flex items-center justify-center mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-primary-50 via-secondary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-600 bg-clip-text text-transparent mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-primary-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust our platform
            </p>
          </div>

          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gradient-to-r from-primary-500 via-secondary-500 to-yellow-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-yellow-200 text-sm">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
                <p className="text-white italic mt-4">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="mt-4 flex justify-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Lead Generation?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using our platform to drive growth and success
          </p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/signup');
              }}
              className="px-8 py-3 bg-white text-primary-600 rounded-xl font-medium shadow-lg hover:shadow-primary-200/50 border border-primary-100 hover:border-primary-200 transition-all duration-200"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
              className="px-8 py-3 bg-transparent text-white border-2 border-white/80 hover:border-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 shadow-lg hover:shadow-white/20"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}