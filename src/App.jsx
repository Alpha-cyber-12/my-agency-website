import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  Sparkles,
  Megaphone,
  ChartBar,
  Search,
  Code,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Quote,
  DollarSign,
  ChevronDown,
  Info,
} from 'lucide-react';

// Agency Data Configuration
const agencyData = {
  name: 'Digital Forge',
  tagline: 'Crafting Your Digital Legacy',
  description:
    'Launch a premium site that loads fast, ranks well, and converts — crafted by specialists in performance, UX, and storytelling.',
  services: [
    {
      id: 1,
      icon: <Search className="w-12 h-12 text-blue-400" />,
      title: 'Strategic SEO',
      description:
        'Boost your visibility and rank higher with expert SEO and compelling content strategies.',
    },
    {
      id: 2,
      icon: <Megaphone className="w-12 h-12 text-purple-400" />,
      title: 'Social Media Management',
      description:
        'Engage your community and grow your brand with bespoke content and proactive management.',
    },
    {
      id: 3,
      icon: <ChartBar className="w-12 h-12 text-green-400" />,
      title: 'Advanced Analytics',
      description:
        'Unlock insights to understand behavior and optimize campaigns for measurable ROI.',
    },
    {
      id: 4,
      icon: <Code className="w-12 h-12 text-red-400" />,
      title: 'Bespoke Web Development',
      description:
        'Fast, responsive, and secure websites that tell your story and convert.',
    },
  ],
  about: {
    title: 'Our Story & Philosophy',
    text: "Founded in 2018, Digital Forge was born from a simple belief: every brand has a powerful story waiting to be told. We're partners in your journey — a fusion of creative minds and analytical experts — forging beautiful, effective digital presence.",
    motto: 'Innovation is our fuel, results are our legacy.',
  },
  portfolio: [
    {
      id: 1,
      title: 'E-Commerce Platform Rebrand',
      description:
        'A complete brand refresh and digital strategy for a global e-commerce client, resulting in a 250% increase in online sales.',
      imageUrl: 'https://placehold.co/800x600/1e293b/d1d5db?text=Project+1',
      industry: 'E-Commerce',
      metrics: '+250% Sales, <1.8s LCP, 30% More Traffic'
    },
    {
      id: 2,
      title: 'SaaS Marketing Campaign',
      description:
        'A targeted multi-channel campaign for a B2B SaaS company that delivered a 40% growth in qualified leads and boosted brand awareness.',
      imageUrl: 'https://placehold.co/800x600/1e293b/d1d5db?text=Project+2',
      industry: 'SaaS',
      metrics: '+40% MQLs, <2.0s LCP, 2x Lead-to-Sale Conversion'
    },
    {
      id: 3,
      title: 'Mobile App Launch Strategy',
      description:
        'Developed and executed a successful launch strategy for a new wellness app, gaining over 100K downloads in the first month.',
      imageUrl: 'https://placehold.co/800x600/1e293b/d1d5db?text=Project+3',
      industry: 'Fintech',
      metrics: '100K Downloads, 95% User Retention, <0.1 CLS'
    },
  ],
  pricing: [
    {
      id: 1,
      name: 'Starter',
      price: '$999',
      features: ['Basic SEO Audit', '1 Strategy Session', 'Monthly Reporting'],
    },
    {
      id: 2,
      name: 'Professional',
      price: '$2,999',
      features: [
        'Advanced SEO Strategy',
        'Social Media (1 Platform)',
        'Content Creation (5 posts/mo)',
        'Quarterly Review',
      ],
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Full-stack Digital Marketing',
        'Dedicated Account Manager',
        'Custom Analytics Dashboards',
        'Priority Support',
      ],
    },
  ],
  testimonials: [
    {
      id: 1,
      quote:
        'Digital Forge completely transformed our online presence. Their data-driven approach led to a 300% increase in leads within the first quarter.',
      name: 'Alex Johnson',
      company: 'Innovate Corp',
      industry: 'Fintech'
    },
    {
      id: 2,
      quote:
        'They understood our vision and executed a social strategy that doubled our engagement in two months.',
      name: 'Sarah Peterson',
      company: 'Growth Hub',
      industry: 'SaaS'
    },
    {
      id: 3,
      quote:
        'Professional and creative. Web development was flawless and communication was top-notch.',
      name: 'Michael Lee',
      company: 'Web Solutions',
      industry: 'E-Commerce'
    },
  ],
  faq: [
    {
      id: 1,
      question: 'What services do you specialize in?',
      answer:
        'SEO, content strategy, social media management, analytics, and custom web development — integrated to drive growth.',
    },
    {
      id: 2,
      question: 'How do you measure success?',
      answer:
        'We measure through KPIs like traffic, leads, conversion rates, and ROI, with transparent monthly reports.',
    },
    {
      id: 3,
      question: 'Can you work with a limited budget?',
      answer:
        'Yes, we offer flexible packages and create a strategic plan aligned with your resources.',
    },
  ],
  contact: {
    email: 'contact@digitalforge.com',
    phone: '+1 (555) 123-4567',
    address: '123 Digital Drive, Suite 400, Tech City, ST 12345',
  },
};

// JSON-LD for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": agencyData.name,
      "url": "https://digitalforge.com",
      "logo": "https://digitalforge.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": agencyData.contact.phone,
        "contactType": "customer service"
      }
    },
    {
      "@type": "WebSite",
      "name": "Digital Forge",
      "url": "https://digitalforge.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://digitalforge.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": agencyData.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  ]
};

// Components
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = `faq-${question.replace(/\s+/g, '-').toLowerCase()}`;
  const contentRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="border-b border-gray-700 py-4">
      <h3 className="text-lg font-semibold">
        <button
          className="flex justify-between items-center w-full text-left p-2 -m-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span>{question}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={id}
        ref={contentRef}
        className="mt-2 transition-all duration-300 overflow-hidden"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-400 pl-6 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const MetricChip = ({ metric, color }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${color} absolute top-4 right-4 animate-fade-in-up`}
    >
      {metric}
    </span>
  );
};

const TrustBadges = () => (
  <div className="flex flex-wrap justify-center gap-4 mt-6">
    <div className="flex items-center space-x-2 text-green-300">
      <DollarSign className="w-4 h-4" />
      <span className="text-xs">14-day guarantee</span>
    </div>
    <div className="flex items-center space-x-2 text-green-300">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 00-2 0v2a1 1 0 002 0V9zm5-1a1 1 0 00-2 0v2a1 1 0 002 0V8z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-xs">Secure Payments</span>
    </div>
    <div className="flex items-center space-x-2 text-green-300">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm6 6a1 1 0 00-2 0v4a1 1 0 002 0v-4z"></path>
      </svg>
      <span className="text-xs">No Lock-in</span>
    </div>
  </div>
);

const MobileMenu = ({ isNavOpen, setIsNavOpen, navRef }) => {
  const firstFocusableElement = useRef(null);
  const lastFocusableElement = useRef(null);

  useEffect(() => {
    if (isNavOpen) {
      const focusableElements = navRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableElement.current = focusableElements[0];
      lastFocusableElement.current = focusableElements[focusableElements.length - 1];
      firstFocusableElement.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement.current) {
              e.preventDefault();
              lastFocusableElement.current.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement.current) {
              e.preventDefault();
              firstFocusableElement.current.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          setIsNavOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isNavOpen, setIsNavOpen, navRef]);

  return (
    <div
      ref={navRef}
      className={`md:hidden absolute top-full left-0 w-full bg-[#14161A] bg-opacity-90 backdrop-blur-md transition-all duration-300 ease-in-out transform ${
        isNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      id="mobile-menu"
    >
      <ul className="flex flex-col items-center py-4 space-y-4" role="menu" aria-label="Mobile">
        {['services', 'portfolio', 'pricing', 'faq', 'contact'].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className="block text-gray-300 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md p-2 -m-2"
              onClick={() => setIsNavOpen(false)}
              role="menuitem"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setIsNavOpen(false)}
            role="menuitem"
          >
            Get a Quote
          </a>
        </li>
      </ul>
    </div>
  );
};

const Header = ({ isNavOpen, setIsNavOpen }) => {
  const mobileNavRef = useRef(null);
  return (
    <header className="sticky top-0 z-50 bg-[#14161A] bg-opacity-70 backdrop-blur-md p-4" role="banner">
      <nav className="flex items-center justify-between max-w-7xl mx-auto font-poppins" aria-label="Primary">
        <a
          href="#hero"
          className="flex items-center space-x-2 text-xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md p-2 -m-2"
        >
          <Sparkles className="w-8 h-8 text-blue-400" />
          <span className="text-white">{agencyData.name}</span>
        </a>

        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
          <li><a href="#portfolio" className="text-gray-300 hover:text-blue-400 transition-colors">Case Studies</a></li>
          <li><a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a></li>
          <li><a href="#faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a></li>
          <li>
            <a
              href="#contact"
              className="group relative overflow-hidden px-5 py-2 rounded-full font-semibold text-white bg-blue-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50"
            >
              <span className="absolute inset-0 bg-blue-500 transition-transform duration-200 group-hover:scale-125"></span>
              <span className="relative z-10">Get a Quote</span>
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-gray-300 rounded-md p-2 -m-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Toggle menu"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((v) => !v)}
        >
          {isNavOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      <MobileMenu isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} navRef={mobileNavRef} />
    </header>
  );
};

const Hero = ({ segment, testimonial, isLottieSupported }) => (
  <section id="hero" className="relative flex flex-col items-center justify-center min-h-[70vh] text-center p-8 font-poppins">
    <h1
      className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter animate-fade-in-down bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      fetchpriority="high"
    >
      High-impact, lightning-fast sites
    </h1>

    <p className="mt-5 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
      {segment === 'fintech'
        ? 'Ship a compliant, blazing-fast fintech site with credibility by design.'
        : segment === 'saas'
        ? 'Launch a SaaS site that tells a clear story, ranks fast, and converts.'
        : 'Ship a high-converting website that tells your story and drives measurable growth.'}
    </p>

    <div className="mt-8">
      <a
        href="#contact"
        className="group relative inline-flex items-center overflow-hidden px-8 py-3 rounded-full font-bold text-lg text-white bg-blue-600 shadow-xl transition-all duration-200 hover:shadow-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span className="absolute inset-0 w-full h-full bg-blue-500 transition-transform duration-200 group-hover:scale-125"></span>
        <span className="relative z-10 flex items-center space-x-2">
          <span>Get Your Free Strategy Session</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </a>
      <div className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
        <p className="text-sm uppercase tracking-wide">
          <span className="font-bold text-white">400+</span> projects shipped &bull; <span className="font-bold text-white">2.0s LCP</span> average &bull; <span className="font-bold text-white">+50%</span> avg. conversion lift
        </p>
      </div>
    </div>

    <div className="mt-12 text-center max-w-xl mx-auto border border-gray-700/50 rounded-2xl p-6 bg-[#14161A]">
      <Quote className="w-8 h-8 text-purple-400 mx-auto mb-3" aria-hidden="true" />
      <p className="text-lg italic text-gray-300">"{testimonial.quote}"</p>
      <p className="mt-4 font-bold text-white">- {testimonial.name}</p>
      <p className="text-gray-400">{testimonial.company}</p>
    </div>
  </section>
);

const Outcomes = () => (
  <section className="py-16 px-8">
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
      <div className="bg-[#14161A] border border-gray-700/50 rounded-xl p-6 leading-relaxed">
        <h3 className="font-bold text-white mb-2 leading-tight">Faster pages, higher rankings</h3>
        <p className="text-gray-300">Hit Core Web Vitals at p75 to unlock better SEO and conversions.</p>
      </div>
      <div className="bg-[#14161A] border border-gray-700/50 rounded-xl p-6 leading-relaxed">
        <h3 className="font-bold text-white mb-2 leading-tight">Story-first UX</h3>
        <p className="text-gray-300">Guide visitors from pain → solution → proof → action with clarity.</p>
      </div>
      <div className="bg-[#14161A] border border-gray-700/50 rounded-xl p-6 leading-relaxed">
        <h3 className="font-bold text-white mb-2 leading-tight">Proof that converts</h3>
        <p className="text-gray-300">Results, guarantees, and frictionless CTAs near decision points.</p>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-20 px-8">
    <div className="max-w-7xl mx-auto font-poppins">
      <h2 className="text-4xl font-bold text-center mb-16 leading-tight">How we get you there</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {agencyData.services.map((service) => (
          <div
            key={service.id}
            className="group bg-[#14161A] backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 text-center transition-all duration-200 hover:shadow-2xl hover:bg-white/10 hover:border-white/30"
          >
            <div className="flex justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 leading-tight">{service.title}</h3>
            <p className="text-gray-300 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudies = ({ orderedPortfolio }) => (
  <section id="portfolio" className="py-20 px-8">
    <div className="max-w-7xl mx-auto font-poppins">
      <h2 className="text-4xl font-bold text-center mb-4 leading-tight">Proof it works</h2>
      <p className="text-center text-gray-300 mb-12 leading-relaxed">Problem → Approach → Measured Result</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderedPortfolio.map((project) => (
          <article key={project.id} className="relative bg-[#14161A] border border-gray-700/50 rounded-2xl overflow-hidden">
            <MetricChip
              metric={project.metrics}
              color="text-green-300 border-green-500/40 bg-green-500/20"
            />
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-56 object-cover"
              loading="lazy"
              style={{ aspectRatio: '16 / 9' }}
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
              <ul className="text-gray-300 text-sm space-y-2 leading-relaxed">
                <li className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-gray-400">Industry:</span>
                  <span className="text-gray-300">{project.industry}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-gray-400">Problem:</span>
                  <span className="text-gray-300">Low conversions and slow load.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-gray-400">Approach:</span>
                  <span className="text-gray-300">Performance-first rebuild, focused narrative, CRO testing.</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="inline-block mt-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                Get Similar Results
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-20 px-8">
    <div className="max-w-7xl mx-auto text-center font-poppins">
      <h2 className="text-4xl font-bold mb-4 leading-tight">Pick your plan</h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed">
        Choose the plan that fits your business needs. All packages are customizable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {agencyData.pricing.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-[#14161A] backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 transition-all duration-200 hover:shadow-2xl hover:bg-white/10 hover:border-white/30"
          >
            {plan.name === 'Professional' && (
              <div className="absolute top-0 right-0 -mt-4 -mr-4 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 transform rotate-3">
                Most Popular
              </div>
            )}
            <div className="flex justify-center mb-4 text-blue-400">
              <DollarSign className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2 leading-tight">{plan.name}</h3>
            <p className="text-5xl font-extrabold text-blue-400 mb-6">{plan.price}</p>
            <ul className="text-gray-300 space-y-2 text-left leading-relaxed">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 block relative overflow-hidden px-5 py-3 rounded-full font-bold text-white bg-purple-600 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span className="relative z-10">{plan.price === 'Custom' ? 'Contact for Quote' : 'Choose Plan'}</span>
            </a>
            <TrustBadges />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="py-20 px-8">
    <div className="max-w-7xl mx-auto text-center font-poppins">
      <h2 className="text-4xl font-bold mb-16 leading-tight">Answers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agencyData.testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[#14161A] backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 transition-all duration-200 hover:shadow-2xl hover:bg-white/10 hover:border-white/30 flex flex-col justify-between leading-relaxed"
          >
            <div className="text-left">
              <Quote className="w-10 h-10 text-purple-400 mb-4" aria-hidden="true" />
              <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-white">- {testimonial.name}</p>
              <p className="text-gray-400">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = ({ formData, handleInputChange, handleFormSubmit, formStatus, validationErrors, wordCount }) => (
  <section id="contact" className="py-20 px-8">
    <div className="max-w-4xl mx-auto text-center font-poppins">
      <h2 className="text-4xl font-bold mb-4 leading-tight">Let’s start.</h2>
      <p className="text-xl text-gray-300 mb-8 leading-relaxed">
        Let’s connect and start shaping your brand’s future. Fill out the form below to get a custom quote.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="space-y-4 leading-relaxed">
          <div className="flex items-center space-x-4">
            <Mail className="text-blue-400 flex-shrink-0 w-6 h-6" aria-hidden="true" />
            <a href={`mailto:${agencyData.contact.email}`} className="text-gray-300 hover:underline">
              {agencyData.contact.email}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-purple-400 flex-shrink-0 w-6 h-6" aria-hidden="true" />
            <a
              href={`tel:${agencyData.contact.phone.replace(/[^+\d]/g, '')}`}
              className="text-gray-300 hover:underline"
            >
              {agencyData.contact.phone}
            </a>
          </div>
          <div className="flex items-start space-x-4">
            <MapPin className="text-green-400 flex-shrink-0 w-6 h-6" aria-hidden="true" />
            <address className="text-gray-300 not-italic">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agencyData.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {agencyData.contact.address}
              </a>
            </address>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4" aria-label="Contact form" noValidate>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className={`w-full px-4 py-3 rounded-xl bg-gray-800 text-white border ${validationErrors.name ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              autoComplete="name"
              autoCapitalize="words"
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-400 text-left">
                {validationErrors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className={`w-full px-4 py-3 rounded-xl bg-gray-800 text-white border ${validationErrors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
              autoComplete="email"
              inputMode="email"
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-400 text-left">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message (max 50 words)"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <p className={`mt-1 text-right text-sm ${wordCount > 50 ? 'text-red-400' : 'text-gray-400'}`}>
              {wordCount} / 50 words
            </p>
          </div>
          <button
            type="submit"
            className="w-full relative inline-flex items-center justify-center overflow-hidden px-8 py-4 rounded-full font-bold text-white bg-purple-600 shadow-lg transition-all duration-200 hover:bg-purple-500 hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={formStatus === 'success' || !!validationErrors.name || !!validationErrors.email || wordCount > 50}
          >
            <span className="relative z-10">Send Message</span>
          </button>
          {formStatus === 'success' && (
            <div className="mt-4 p-4 rounded-xl bg-green-500/20 text-green-300 text-center" role="alert">
              Your message has been sent successfully!
            </div>
          )}
          {formStatus === 'error' && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/20 text-red-300 text-center" role="alert">
              There was an error sending your message. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 px-4 text-center text-gray-500 font-poppins leading-relaxed" role="contentinfo">
    <p>© {new Date().getFullYear()} {agencyData.name}. All rights reserved.</p>
    <a href="#privacy" className="text-gray-400 hover:underline text-sm mt-1 inline-block">Privacy Notice</a>
  </footer>
);

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [validationErrors, setValidationErrors] = useState({});
  const [wordCount, setWordCount] = useState(0);

  // Personalization via ?segment=
  const [segment, setSegment] = useState(localStorage.getItem('segment') || null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const seg = params.get('segment');
    if (seg) {
      setSegment(seg.toLowerCase());
      localStorage.setItem('segment', seg.toLowerCase());
    }
  }, []);

  const orderedPortfolio = useMemo(() => {
    if (!segment) return agencyData.portfolio;
    return [...agencyData.portfolio].sort((a, b) =>
      a.industry.toLowerCase().includes(segment) ? -1 : b.industry.toLowerCase().includes(segment) ? 1 : 0
    );
  }, [segment]);

  const segmentedTestimonial = useMemo(() => {
    if (!segment) return agencyData.testimonials[0];
    const match = agencyData.testimonials.find(t => t.industry.toLowerCase() === segment);
    return match || agencyData.testimonials[0];
  }, [segment]);

  // Validation function
  const validateForm = (data) => {
    const errors = {};
    if (!/^[a-zA-Z\s]*$/.test(data.name)) {
      errors.name = 'Name can only contain letters and spaces.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    const words = data.message.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length > 50) {
      errors.message = 'Message cannot exceed 50 words.';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));

    // Real-time validation for name and email
    const updatedData = { ...formData, [name]: value };
    const errors = validateForm(updatedData);
    setValidationErrors(prev => ({ ...prev, [name]: errors[name] }));

    // Word count for message
    if (name === 'message') {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');
    try {
      await new Promise((r) => setTimeout(r, 800));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setWordCount(0);
    } catch (err) {
      setFormStatus('error');
    }
  };

  // Scrollspy & Sticky CTA Logic
  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'pricing', 'faq', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id === 'contact' || entry.target.id === 'hero') {
              setShowStickyCta(false);
            } else {
              setShowStickyCta(true);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const scrollPosition = window.scrollY;
      const heroHeight = hero?.offsetHeight || 0;
      if (scrollPosition > heroHeight / 2 && activeSection !== 'contact') {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activeSection]);


  // Logic for Esc key to close mobile nav
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavOpen, setIsNavOpen]);

  const resetSegment = () => {
    setSegment(null);
    localStorage.removeItem('segment');
    window.location.search = '';
  };

  return (
    <div className="relative font-inter text-white min-h-screen overflow-x-hidden scroll-smooth bg-[#121212]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap'); 
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .leading-tight { line-height: 1.25; }
        .leading-relaxed { line-height: 1.625; }
        .bg-gradient-to-r.from-blue-400.to-purple-600 { background: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to)); }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        :focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }
      `}</style>

      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-white text-black px-3 py-2 rounded z-[100]"
      >
        Skip to content
      </a>

      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

      {/* Sticky Mobile CTA */}
      <div className="md:hidden">
        <div className={`fixed bottom-4 inset-x-4 z-40 transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
          aria-live="polite">
          <a
            href="#contact"
            className="block rounded-full bg-blue-600 text-white text-center py-3 font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-colors"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
          >
            Get Your Free Strategy Session
          </a>
        </div>
      </div>
      
      {/* Scrollspy Nav for Desktop (not implemented in this version)
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <ul className="space-y-2">
          {['hero', 'services', 'portfolio', 'pricing', 'faq', 'contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} className={`block w-2 h-2 rounded-full transition-all ${activeSection === id ? 'bg-blue-400 w-3 h-3' : 'bg-gray-600 hover:bg-gray-400'}`}>
                <span className="sr-only">Go to {id}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      */}

      <main id="main">
        {segment && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700/50 text-white flex items-center space-x-1">
              <span>You're viewing: <span className="capitalize">{segment}</span></span>
              <button onClick={resetSegment} className="text-blue-400 ml-1 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full" aria-label="Reset personalization segment">
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
        <Hero segment={segment} testimonial={segmentedTestimonial} />

        {/* Trust Logos */}
        <section className="py-6 px-6" aria-label="Our trusted clients">
          <div className="max-w-6xl mx-auto opacity-80">
            <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-4">Trusted by teams at</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center">
              <img src="https://placehold.co/100x40/4b5563/ffffff?text=Logo+1" alt="Client logo 1" className="h-6 w-auto" loading="lazy" />
              <img src="https://placehold.co/100x40/4b5563/ffffff?text=Logo+2" alt="Client logo 2" className="h-6 w-auto" loading="lazy" />
              <img src="https://placehold.co/100x40/4b5563/ffffff?text=Logo+3" alt="Client logo 3" className="h-6 w-auto" loading="lazy" />
              <img src="https://placehold.co/100x40/4b5563/ffffff?text=Logo+4" alt="Client logo 4" className="h-6 w-auto" loading="lazy" />
            </div>
          </div>
        </section>

        <Outcomes />
        <Services />
        <CaseStudies orderedPortfolio={orderedPortfolio} />
        <Pricing />

        {/* FAQ - Heading is now part of the narrative spine */}
        <section id="faq" className="py-20 px-8">
          <div className="max-w-4xl mx-auto font-poppins">
            <h2 className="text-4xl font-bold text-center mb-16 leading-tight">Answers to your questions</h2>
            <div className="space-y-4">
              {agencyData.faq.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10">
            <h3 className="text-3xl font-extrabold leading-tight">Ready to outperform your competitors?</h3>
            <p className="mt-2 text-white/90 leading-relaxed">Book a free 20-minute strategy session. No obligation.</p>
            <a
              href="#contact"
              className="mt-6 inline-block px-8 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Get Your Free Strategy Session
            </a>
          </div>
        </section>

        <Testimonials />
        <Contact formData={formData} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} formStatus={formStatus} validationErrors={validationErrors} wordCount={wordCount} />
      </main>

      {/* Persistent Help button for mobile/desktop */}
      <a
        href="#faq"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg z-40 lg:hidden"
        aria-label="Go to FAQ and Contact sections"
        accessKey="h"
      >
        <Info size={24} />
      </a>
      
      <Footer />
    </div>
  );
};
export default App;
