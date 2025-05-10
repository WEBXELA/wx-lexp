import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';
import GradientText from '../components/GradientText';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out our platform',
    features: [
      '5 profiles per day',
      'Basic profile information',
      'Email support',
    ],
    limitations: [
      'CSV export',
      'No advanced filters',
      'No bulk exports',
      'Limited results per search',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'month',
    description: 'Best for professionals and small teams',
    features: [
      'Unlimited searches',
      'Advanced filters',
      'Bulk exports',
      'Priority support',
      'Team collaboration',
      'Custom exports',
      'Analytics dashboard',
    ],
    buttonText: 'Subscribe Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'Custom integration',
      'Dedicated support',
      'SLA guarantee',
      'Training sessions',
      'Custom features',
      'Advanced analytics',
      'White-label option',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handlePlanSelection = (plan: string) => {
    if (plan === 'Free') {
      navigate('/signup');
    } else if (plan === 'Enterprise') {
      window.location.href = 'mailto:sales@webxela.com';
    } else {
      // TODO: Implement payment flow
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-primary-600 mb-1 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-xl text-primary-600/80">
              Choose the perfect plan for your lead generation needs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 ${
                plan.popular
                  ? 'border-2 border-primary-500 relative'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-primary-600 px-4 py-1 text-sm font-semibold text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base font-medium text-gray-500 dark:text-gray-300">
                      /month
                    </span>
                  )}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelection(plan.name)}
                  className={`mt-8 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                  } transition-colors`}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-500 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation) => (
                    <li key={limitation} className="flex space-x-3">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span className="text-sm text-gray-500 dark:text-gray-300">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary-600 text-center mb-12">
            Frequently asked questions
          </h2>
          
          <div className="space-y-8 rounded-full">
            {[
              {
                question: 'What happens when I reach my search limit?',
                answer:
                  "Once you reach your daily search limit, you'll be prompted to upgrade to a paid plan to continue searching. Your limit resets every 24 hours.",
              },
              {
                question: 'Can I switch plans anytime?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                question: 'Do you offer refunds?',
                answer:
                  "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service.",
              },
              {
                question: 'What payment methods do you accept?',
                answer:
                  'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
              },
            ].map((faq) => (
              <div key={faq.question} className='rounded-full'>
                <Accordion 
                  key={faq.question} 
                  className="mb-4 border border-primary-200 rounded-lg dark:rounded-none shadow-sm dark:border-gray-700"
                  sx={{
                    backgroundColor: 'primary.500',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ChevronDown className="h-8 w-8 text-primary-500 dark:text-gray-900" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className='px-4 py-2 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg dark:rounded-none'
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                      },
                    }}
                  >
                    <Typography 
                      className='text-lg font-semibold text-gray-900 dark:text-black'
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    className='px-4 py-2 bg-primary-50 dark:bg-gray-800 rounded-lg dark:rounded-none'
                    sx={{
                      color: 'gray',
                      fontSize: '0.875rem',
                    }}
                  >
                      {faq.answer}
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}