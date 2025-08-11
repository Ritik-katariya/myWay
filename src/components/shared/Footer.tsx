"use client";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/yourusername', color: 'hover:text-gray-300' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/yourusername', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yourusername', color: 'hover:text-blue-300' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/yourusername', color: 'hover:text-pink-400' }
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Consulting',
    'API Development',
    'DevOps'
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Name
              </h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Full Stack Developer & Creative Designer crafting digital experiences that make a difference.
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors">
                <MapPin size={16} className="text-purple-400" />
                <span>123 Tech Street, Silicon Valley, CA 94105</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors">
                <Phone size={16} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors">
                <Mail size={16} className="text-green-400" />
                <span>hello@yourname.com</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <nav className="space-y-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm cursor-pointer hover:translate-x-1 transform"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
          
          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-gray-400 text-sm">Get updates on my latest projects</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-r-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-gray-400 text-sm mb-3">Follow me</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700 hover:scale-110 transform`}
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800"></div>
        
        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {currentYear} Your Name. Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>in California</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
        
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 transform z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;