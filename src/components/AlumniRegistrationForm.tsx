import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, Building2, Phone, Mail, Briefcase, MapPin, Users, Utensils, Award, Sparkles } from 'lucide-react';

export default function AlumniRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    yearOfPassout: '',
    department: '',
    whatsappNumber: '',
    email: '',
    currentOrganization: '',
    currentPosition: '',
    jobLocation: '',
    accompanyCount: '0',
    foodPreference: '',
    areaOfExpert: ''
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.yearOfPassout) {
      newErrors.yearOfPassout = 'Year of passout is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.foodPreference) {
      newErrors.foodPreference = 'Please select food preference';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registration submitted:', formData);
      alert('Registration successful! See you at the alumni meetup!');
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-6xl mx-auto p-8"
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
            <div className="mb-4">
              <h1 className="text-[var(--white)] m-0">Alumni Meetup Registration</h1>
            </div>
            <p className="text-[var(--white)] opacity-90 m-0 max-w-2xl">
              Join us for an unforgettable reunion! Register now to reconnect with your batchmates, 
              share experiences, and celebrate our collective journey.
            </p>
          </motion.div>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="px-8 py-10">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-[var(--accent)] mb-6 border-b-2 border-[var(--secondary)] pb-2">
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Name */}
              <div className="relative">
                <label htmlFor="name" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.name ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>
                )}
              </div>

              {/* Year of Passout */}
              <div className="relative">
                <label htmlFor="yearOfPassout" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year of Passout *
                </label>
                <select
                  id="yearOfPassout"
                  name="yearOfPassout"
                  value={formData.yearOfPassout}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.yearOfPassout ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                >
                  <option value="">Select year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-[42px] pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.yearOfPassout && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.yearOfPassout}</span>
                )}
              </div>

              {/* Department */}
              <div className="relative">
                <label htmlFor="department" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.department ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                >
                  <option value="">Select department</option>
                  <option value="cse">Computer Science & Engineering</option>
                  <option value="ece">Electronics & Communication</option>
                  <option value="eee">Electrical & Electronics</option>
                  <option value="me">Mechanical Engineering</option>
                  <option value="ce">Civil Engineering</option>
                  <option value="it">Information Technology</option>
                </select>
                <div className="absolute right-4 top-[42px] pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.department && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.department}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-[var(--accent)] mb-6 border-b-2 border-[var(--secondary)] pb-2">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp Number */}
              <div className="relative">
                <label htmlFor="whatsappNumber" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.whatsappNumber ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                />
                {errors.whatsappNumber && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.whatsappNumber}</span>
                )}
              </div>

              {/* Email ID */}
              <div className="relative">
                <label htmlFor="email" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.email ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Professional Information Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-[var(--accent)] mb-6 border-b-2 border-[var(--secondary)] pb-2">
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Current Organization */}
              <div className="relative">
                <label htmlFor="currentOrganization" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Current Organization
                </label>
                <input
                  type="text"
                  id="currentOrganization"
                  name="currentOrganization"
                  value={formData.currentOrganization}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
                />
              </div>

              {/* Current Position */}
              <div className="relative">
                <label htmlFor="currentPosition" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Current Position
                </label>
                <input
                  type="text"
                  id="currentPosition"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  placeholder="Job title"
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
                />
              </div>

              {/* Job Location */}
              <div className="relative">
                <label htmlFor="jobLocation" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Job Location
                </label>
                <input
                  type="text"
                  id="jobLocation"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
                />
              </div>
            </div>

            {/* Area of Expert */}
            <div className="relative">
              <label htmlFor="areaOfExpert" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Area of Expertise
              </label>
              <textarea
                id="areaOfExpert"
                name="areaOfExpert"
                value={formData.areaOfExpert}
                onChange={handleChange}
                placeholder="Share your areas of expertise and specialization..."
                rows={3}
                className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md resize-none"
              />
            </div>
          </motion.div>

          {/* Event Details Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-[var(--accent)] mb-6 border-b-2 border-[var(--secondary)] pb-2">
              Event Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Anyone Accompany */}
              <div className="relative">
                <label htmlFor="accompanyCount" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Anyone Accompanying? (Count)
                </label>
                <input
                  type="number"
                  id="accompanyCount"
                  name="accompanyCount"
                  value={formData.accompanyCount}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  placeholder="0"
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md"
                />
                <p className="text-xs text-[var(--neutral-mid)] mt-1">Enter 0 if coming alone</p>
              </div>

              {/* Food Preference */}
              <div className="relative">
                <label htmlFor="foodPreference" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Food Preference *
                </label>
                <select
                  id="foodPreference"
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${
                    errors.foodPreference ? 'border-red-500' : 'border-[var(--secondary)]'
                  } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                >
                  <option value="">Select preference</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
                <div className="absolute right-4 top-[42px] pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.foodPreference && (
                  <span className="text-red-500 text-sm mt-1 block">{errors.foodPreference}</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              className="group relative px-12 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center">
                Submit
              </span>
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </form>

        {/* Decorative bottom accent */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)] origin-left"
        ></motion.div>
      </div>
    </motion.div>
  );
}