import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Globe, Clock } from 'lucide-react';
import GradientText from '../components/GradientText';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            <GradientText
              colors={['#9333EA', "#4079ff", '#ED184F', "#4079ff", '#9333EA']}
              animationSpeed={8}
              showBorder={false}
            >
              <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
                Let's Connect
              </h1>
            </GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Have questions about our enterprise solutions? Our team is here to help you transform your lead generation process.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@webxela.com</p>
                    <p className="text-gray-600 dark:text-gray-300">sales@webxela.com</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 9724823602</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri 9am-6pm IST</p>
                  </div>
                </motion.div>

                {/* <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">123 Innovation Drive</p>
                    <p className="text-gray-600">Bengaluru, India 94105</p>
                  </div>
                </motion.div> */}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Saturday - Sunday: Closed</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-4 ">
                  {[
                    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                    { icon: Globe, href: 'https://webxela.com', label: 'Website' }
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-900 hover:text-purple-600" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Sophia Williams"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="sophia@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-purple-500/20"
              >
                <Send className="w-5 h-5" />
                <span className="font-medium">Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}