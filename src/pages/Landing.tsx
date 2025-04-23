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
    <div className="bg-gradient-to-b from-blue-50 via-purple-100 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <Waves
          lineColor="#9333ee"
          backgroundColor="none"        
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36} 
        />
        {/* <Aurora
          colorStops={["#9333ea", "#7c63ff", "#9333ea"]}
          amplitude={0.5}
          blend={0.5}
          time={1}
          speed={2000}
        /> */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-200 dark:from-purple-900 dark:to-gray-800"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-center"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white tracking-tight flex flex-col justify-center items-center"
              >
                <RotatingText
                  texts={['SuperCharge', 'Elevate', 'Accelerate', 'Transform']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-2xl w-fit"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                /> Your <br />
                <span className="text-purple-600 dark:text-purple-400"> Lead Generation</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Revolutionize your business with our <span className='text-purple-500 font-bold'>AI-powered</span> lead generation platform that's easy to use, delivers ROI, and transforms customer happiness into your competitive edge.
              </motion.p>
              {/* <motion.p
                variants={fadeInUp}
                className='mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed'
              >
                Trusted by over <span className='font-bold text-purple-600 dark:text-gray-400'>10,000+ businesses</span> worldwide to drive growth and success.
              </motion.p> */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 sm:mt-12 space-x-6"
              >
                <button
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full shadow-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:bg-purple-600 hover:via-pink-600 hover:to-yellow-600 transition-all hover:shadow-lg  transform hover:-translate-y-1"
                >
                  Start Free Trial
                  <ChevronsRightIcon className="ml-2 w-6 h-6" />
                </button>
                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl text-gray-700 border border-purple-500 bg-white hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all shadow-lg transform hover:-translate-y-1"
                >
                  Learn More
                </button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div
                variants={fadeInUp}
                className="mt-20 grid grid-cols-3 gap-8"
              >
                {[
                  { label: 'Active Users', value: '10,000+' },
                  { label: 'Leads Generated', value: '1M+' },
                  { label: 'Success Rate', value: '95%' }
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-xl shadow-lg"
                  >
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-yellow-200 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Dashboard Preview"
                  className="w-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent"></div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <GradientText
              colors={['#9333EA', "#4079ff", '#ED184F', "#4079ff", '#ED184F', '#9333EA']}
              animationSpeed={8}
              showBorder={false}
            >
              <h2 className="text-4xl font-bold mb-2">
                Powerful Features for Modern Lead Generation
              </h2>
            </GradientText>
            
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to supercharge your lead generation process and drive business growth
            </p>
          </motion.div>

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
                whileHover={{ y: -20 }}
                className="relative p-8 bg-gradient-to-br from-white to-gray-50 dark:bg-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900 dark:to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <feature.icon className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  <motion.ul
                    variants={scaleIn}
                    className='text-gray-600 dark:text-gray-300 mt-4 space-y-2'
                  >
                    {/* <ul > */}
                      {feature.points.map((point, i) => (
                        <motion.li
                          key={i}
                          variants={stagger}
                          className='flex gap-3'
                        >
                          <BadgeCheck className='text-green-600'/>{point}
                        </motion.li>
                      ))}
                    {/* </ul> */}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <GradientText
              colors={['#9333EA', "#4079ff", '#ED184F', "#4079ff", '#ED184F', '#9333EA']}
              animationSpeed={8}
              showBorder={false}
            >
              <h2 className="text-4xl font-bold mb-4">
                How It Works
              </h2>
            </GradientText>
            
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get started in minutes with our simple and intuitive process designed t maximize your results.
            </p>
          </motion.div>

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
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 border-b-8 border-b-transparent group relative"
              >
                <div className="hidden md:block absolute bottom-0 left-0 right-0 h-2 -mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-b-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-96 w-4/5 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-purple-200"
                      >
                        <ChevronsRightIcon className="w-8 h-8 text-purple-300 absolute -top-3.5 left-72 transform " />
                      </motion.div>
                    </div>
                  )} */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    {/* <div className='absolute -bottom-6 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-b-full ' /> */}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 dark:bg-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <GradientText
              colors={['#9333EA', "#4079ff", '#ED184F', "#4079ff", '#ED184F', '#9333EA']}
              animationSpeed={8}
              showBorder={false}
            >
              <h2 className="text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
            </GradientText>
            
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied customers who have transformed their lead generation process
            </p>
          </motion.div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah sophiason',
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
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -20 }}
                className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group" 
              >
                <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900 dark:to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'/>
                <div className="relative flex flex-col items-start space-y-6 mb-6">
                  <div className='flex '>
                    <div>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="">
                    <p className=" text-gray-600 dark:text-gray-300 z-50 italic">{testimonial.quote}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current z-10" />
                  ))}
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900 dark:to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'/>
                <div className="relative flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 z-50 italic">{testimonial.quote}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current z-50" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div> */}

          {/* Carousel */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='relative overflow-hidden'
          >
            <motion.div
              transition={{ 
                repeat: Infinity,
                duration: 20,
              }}
              animate={{ x: [0, -300, -600, -900, 0] }}
              drag="x"
              dragConstraints={{ left: -800, right: 0 }}
              whileTap={{ cursor: "grabbing" }}
              className="flex space-x-8"
            >
              {.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -20 }}
                  className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group" 
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900 dark:to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'/>
                  <div className="relative flex flex-col items-start space-y-6 mb-6">
                    <div className='flex '>
                      <div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="">
                      <p className=" text-gray-600 dark:text-gray-300 z-50 italic">{testimonial.quote}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current z-10" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div> */}

          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 dark:from-gray-800 dark:to-gray-900  p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
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
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Lead Generation?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses already using our platform to drive growth and success
          </p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="inline-flex px-8 py-4 text-lg font-medium rounded-full bg-white text-purple-600 hover:bg-purple-50 transition-all shadow-lg transform hover:-translate-y-1"
            >
              Start Free Trial
              <ChevronsRightIcon className="ml-2 mt-1 w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-8 py-4 text-lg font-medium rounded-2xl border-2 border-white text-white hover:bg-white/10 transition-all transform hover:-translate-y-1"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}