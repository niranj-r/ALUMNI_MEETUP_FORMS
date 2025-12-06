import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // Handle form submission
      alert('Message sent successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-4xl mx-auto p-8"
    >
      {/* Decorative geometric elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10 pointer-events-none">
        <div className="absolute inset-0 border-4 border-[var(--accent)] rotate-45"></div>
        <div className="absolute inset-4 border-4 border-[var(--accent)] rotate-45"></div>
      </div>
      
      <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-10 pointer-events-none">
        <div className="absolute inset-0 rounded-full border-4 border-[var(--secondary)]"></div>
        <div className="absolute inset-8 rounded-full border-4 border-[var(--secondary)]"></div>
      </div>

      {/* Main form container with glassmorphism effect */}
      <div className="relative bg-[var(--white)] backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-[var(--secondary)]">
        {/* Header section with gradient background */}
        <div className="relative bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] px-8 py-12 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-[var(--white)]" />
              <h1 className="text-[var(--white)] m-0">Contact Us</h1>
            </div>
            <p className="text-[var(--white)] opacity-90 m-0 max-w-2xl">
              Get in touch with us for admissions, inquiries, or any questions about our programs. 
              We're here to help you on your academic journey.
            </p>
          </motion.div>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="px-8 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            {/* Full Name */}
            <div className="relative">
              <label htmlFor="fullName" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.fullName ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1 block">{errors.fullName}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="relative">
              <label htmlFor="email" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.email ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <label htmlFor="phone" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
                />
              </div>
            </div>

            {/* Inquiry Category */}
            <div className="relative">
              <label htmlFor="category" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Inquiry Category *
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.category ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                >
                  <option value="">Select a category</option>
                  <option value="admissions">Admissions</option>
                  <option value="programs">Programs</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.category && (
                <span className="text-red-500 text-sm mt-1 block">{errors.category}</span>
              )}
            </div>
          </motion.div>

          {/* Subject */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <label htmlFor="subject" className="block text-[var(--accent)] mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject of your inquiry"
              className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <label htmlFor="message" className="block text-[var(--accent)] mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide details about your inquiry..."
              rows={6}
              className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                errors.message ? 'border-red-500' : 'border-[var(--secondary)]'
              } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md resize-none`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1 block">{errors.message}</span>
            )}
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              className="group relative w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </span>
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </form>

        {/* Decorative bottom accent */}
        <div className="h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)]"></div>
      </div>
    </motion.div>
  );
}
