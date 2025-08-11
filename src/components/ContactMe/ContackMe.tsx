"use client"
import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
        ...prev,
        [name]: value
    }));
};

interface HandleSubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {}

const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise<void>(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
};

  const socialLinks = [
    { name: 'GitHub', icon: Github, color: 'bg-gray-800 hover:bg-gray-700', url: '#' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600 hover:bg-blue-700', url: '#' },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500 hover:bg-sky-600', url: '#' },
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600', url: '#' }
  ];

  const contactInfo = [
    { 
      icon: Mail, 
      label: 'Email Me', 
      value: 'eklakalam420@gmail.com',
      action: 'mailto:eklakalam420@gmail.com'
    },
    { 
      icon: Phone, 
      label: 'WhatsApp', 
      value: '+91 XXXXXXXXXX',
      action: 'https://wa.me/91XXXXXXXXXX'
    },
    { 
      icon: MapPin, 
      label: 'Location', 
      value: 'Chapra, Bihar, India',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse opacity-25"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping opacity-30"></div>
      </div>
      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Whether you have a project in mind or just want to chat tech,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              I'd love to hear from you!
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Section - Find Me Online & Direct Contact */}
          <div className="space-y-10 order-2 lg:order-1">
            {/* Find Me Online */}
            <div className="animate-slide-in-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <Send className="text-white" size={24} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Find Me Online</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`${social.color} rounded-2xl p-6 lg:p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group animate-bounce-in`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <IconComponent className="text-white mb-4 group-hover:scale-125 transition-transform duration-300" size={36} />
                        <span className="text-white font-semibold text-lg lg:text-xl">{social.name}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact */}
            <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Direct Contact</h2>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.action}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300 group block animate-fade-in-up"
                      style={{ animationDelay: `${(index + 4) * 0.2}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-800 rounded-full p-3 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                            <IconComponent className="text-blue-400 group-hover:text-white transition-colors duration-300" size={20} />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm lg:text-base">{contact.label}</p>
                            <p className="text-white font-semibold text-sm lg:text-base">{contact.value}</p>
                          </div>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" size={20} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-gray-900/30 backdrop-blur-xl rounded-3xl p-6 lg:p-10 border border-gray-800 shadow-2xl order-1 lg:order-2 animate-slide-in-right">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">Get In Touch</h2>
              </div>
              <p className="text-gray-400 text-sm lg:text-base">Ready to start your project? Send me a message!</p>
            </div>

            <div className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="name" className="block text-sm lg:text-base font-medium text-gray-300 mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="animate-fade-in-up" style={ { animationDelay: '0.6s' }}>
                <label htmlFor="message" className="block text-sm lg:text-base font-medium text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none hover:border-gray-600"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 lg:py-5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 animate-fade-in-up"
                style={{ animationDelay: '0.7s' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm lg:text-base">Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span className="text-sm lg:text-base">Send Message</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <p className="text-gray-400 text-sm lg:text-base">
                I'll get back to you within 24 hours! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;

// Custom CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes bounce-in {
    0% { opacity: 0; transform: scale(0.3); }
    50% { opacity: 1; transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
`;
document.head.appendChild(style);