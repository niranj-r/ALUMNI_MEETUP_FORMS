import React, { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Calendar,
  Building2,
  Phone,
  Mail,
  Briefcase,
  Users,
  Utensils,
  Award,
  Sparkles,
  Check,
  Hand,
  X,
} from "lucide-react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // change path if needed

export default function AlumniRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    courseStudied: "",
    yearOfPassout: "",
    designation: "",
    email: "",
    whatsappNumber: "",
    highestDegree: "",
    higherStudies: "",
    institutionName: "",
    entrepreneurDetails: "",
    socialProjects: "",
    accompanyCount: "0",
    foodPreference: "",
    contributions: [] as string[],
    consent: false
  });


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [attendingEvent, setAttendingEvent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleContributionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formData.contributions.includes(value)) {
      setFormData(prev => ({ ...prev, contributions: prev.contributions.filter(item => item !== value) }));
    } else {
      setFormData(prev => ({ ...prev, contributions: [...prev.contributions, value] }));
    }
  };


  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.courseStudied) {
      newErrors.courseStudied = "Please select a course";
    }

    if (!formData.yearOfPassout) {
      newErrors.yearOfPassout = "Pass out batch is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation or current role is required";
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.higherStudies) {
      newErrors.higherStudies = "Please select an option";
    }

    if (formData.higherStudies === "yes" && !formData.institutionName.trim()) {
      newErrors.institutionName = "Institution name is required";
    }

    // ✅ Event logic
    if (attendingEvent) {
      if (!formData.accompanyCount) {
        newErrors.accompanyCount = 'Number of persons accompanying is required';
      }

      if (!formData.foodPreference) {
        newErrors.foodPreference = 'Please select food preference';
      }
    }
    if (!formData.consent) {
      newErrors.consent = 'You must consent to continue';
    }

    setErrors(newErrors);
    return newErrors; // ✅ THIS IS THE CRITICAL FIX
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("✅ Submit button clicked");
    console.log("📨 Form Data:", formData);

    const validationErrors = validate();   // ✅ store returned object
    console.log("🔎 Validation errors:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {   // ✅ proper check
      console.log("❌ Validation failed");
      return;
    }

    try {
      console.log("⏳ Sending to Firestore...");

      const docRef = await addDoc(
        collection(db, "alumniMeetupRegistrations"),
        {
          ...formData,
          accompanyCount: Number(formData.accompanyCount),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );

      console.log("✅ Data stored successfully!");
      console.log("📄 Document ID:", docRef.id);

      // ✅ Reset form
      setFormData({
        name: "",
        courseStudied: "",
        yearOfPassout: "",
        designation: "",
        email: "",
        whatsappNumber: "",
        highestDegree: "",
        higherStudies: "",
        institutionName: "",
        entrepreneurDetails: "",
        socialProjects: "",
        accompanyCount: "0",
        foodPreference: "",
        contributions: [] as string[],
        consent: false
      });

      setShowModal(true);
    } catch (error) {
      console.error("🔥 Firestore Error:", error);
      alert("Failed to submit. Please try again.");
    }
  };


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2006 + 1 }, (_, i) => 2006 + i).reverse();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full pt-8"
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
                <h1 className="text-[var(--white)] m-0">
                  Alumni Meetup Registration
                </h1>
              </div>
              <p className="text-[var(--white)] opacity-90 m-0 max-w-2xl">
                Join us for an unforgettable reunion! Register now to reconnect
                with your batchmates, share experiences, and celebrate our
                collective journey.
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
                  <label
                    htmlFor="name"
                    className="block text-[var(--accent)] mb-2 flex items-center gap-2"
                  >
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
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.name
                      ? "border-red-500"
                      : "border-[var(--secondary)]"
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Year of Passout */}
                <div className="relative">
                  <label
                    htmlFor="yearOfPassout"
                    className="block text-[var(--accent)] mb-2 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Year of Passout *
                  </label>
                  <select
                    id="yearOfPassout"
                    name="yearOfPassout"
                    value={formData.yearOfPassout}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.yearOfPassout
                      ? "border-red-500"
                      : "border-[var(--secondary)]"
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {errors.yearOfPassout && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.yearOfPassout}
                    </span>
                  )}
                </div>

                {/* Course Studied */}
                <div className="relative">
                  <label
                    htmlFor="courseStudied"
                    className="block text-[var(--accent)] mb-2 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    Course Studied *
                  </label>
                  <select
                    id="courseStudied"
                    name="courseStudied"
                    value={formData.courseStudied}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.courseStudied
                      ? "border-red-500"
                      : "border-[var(--secondary)]"
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                  >
                    <option value="">Select course</option>
                    <option value="cse">
                      B.Tech Computer Science & Engineering
                    </option>
                    <option value="ct">
                      B.Tech Information Technology
                    </option>
                    <option value="mcse">
                      M.Tech Computer Science & Engineering
                    </option>
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {errors.courseStudied && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.courseStudied}
                    </span>
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
                  <label
                    htmlFor="whatsappNumber"
                    className="block text-[var(--accent)] mb-2 flex items-center gap-2"
                  >
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
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.whatsappNumber
                      ? "border-red-500"
                      : "border-[var(--secondary)]"
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                  />
                  {errors.whatsappNumber && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.whatsappNumber}
                    </span>
                  )}
                </div>

                {/* Email ID */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-[var(--accent)] mb-2 flex items-center gap-2"
                  >
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
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.email
                      ? "border-red-500"
                      : "border-[var(--secondary)]"
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.email}
                    </span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Designation or Current Role */}
                <div className="relative">
                  <label htmlFor="designation" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Designation or Current Role *
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer, Manager, etc."
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.designation ? 'border-red-500' : 'border-[var(--secondary)]'
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                  />
                  {errors.designation && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.designation}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Higher Studies */}
                <div className="relative">
                  <label htmlFor="higherStudies" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Higher Studies Pursuing or Completed? *
                  </label>
                  <select
                    id="higherStudies"
                    name="higherStudies"
                    value={formData.higherStudies}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.higherStudies ? 'border-red-500' : 'border-[var(--secondary)]'
                      } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md appearance-none cursor-pointer`}
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <div className="absolute right-4 top-[42px] pointer-events-none">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.higherStudies && (
                    <span className="text-red-500 text-sm mt-1 block">{errors.higherStudies}</span>
                  )}
                </div>

                {/* Institution Name - conditionally shown */}
                {formData.higherStudies === 'yes' && (
                  <div className="relative">
                    <label htmlFor="institutionName" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Institution Name or University Name *
                    </label>
                    <input
                      type="text"
                      id="institutionName"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      placeholder="Enter institution or university name"
                      className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.institutionName ? 'border-red-500' : 'border-[var(--secondary)]'
                        } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                    />
                    {errors.institutionName && (
                      <span className="text-red-500 text-sm mt-1 block">{errors.institutionName}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Entrepreneur Details */}
              <div className="relative mb-6">
                <label htmlFor="entrepreneurDetails" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Are you an entrepreneur? If yes, give details.
                </label>
                <textarea
                  id="entrepreneurDetails"
                  name="entrepreneurDetails"
                  value={formData.entrepreneurDetails}
                  onChange={handleChange}
                  placeholder="Share details about your entrepreneurial journey..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md resize-none"
                />
              </div>

              {/* Social Projects */}
              <div className="relative mb-6">
                <label htmlFor="socialProjects" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Have you been part of any socially relevant projects? If so kindly provide details.
                </label>
                <textarea
                  id="socialProjects"
                  name="socialProjects"
                  value={formData.socialProjects}
                  onChange={handleChange}
                  placeholder="Share details about your social impact work..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 border-[var(--secondary)] rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md resize-none"
                />
              </div>

              {/* Willing to Contribute */}
              <div className="relative">
                <label className="block text-[var(--accent)] mb-3 flex items-center gap-2">
                  <Hand className="w-4 h-4" />
                  Willing to contribute as (tick all applicable):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { value: 'guest-lecture', label: 'Guest Lecture' },
                    { value: 'industry-mentor', label: 'Industry Mentor' },
                    { value: 'internship-support', label: 'Internship Support' },
                    { value: 'placement-assistance', label: 'Placement Assistance' },
                    { value: 'project-guidance', label: 'Project Guidance' }
                  ].map((contribution) => (
                    <label
                      key={contribution.value}
                      className={`flex items-center gap-3 p-4 bg-[var(--dominant-bg)] border-2 rounded-xl transition-all duration-300 cursor-pointer group ${formData.contributions.includes(contribution.value)
                          ? 'border-[var(--accent)] bg-gradient-to-r from-[var(--accent)]/10 to-transparent'
                          : 'border-[var(--secondary)] hover:border-[var(--accent)]'
                        }`}
                    >
                      <input
                        type="checkbox"
                        value={contribution.value}
                        checked={formData.contributions.includes(contribution.value)}
                        onChange={handleContributionsChange}
                        className="sr-only"
                      />
                      <div className={`relative w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${formData.contributions.includes(contribution.value)
                          ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] border-[var(--accent)] scale-110'
                          : 'bg-white border-[var(--secondary)] group-hover:border-[var(--accent)]'
                        }`}>
                        {formData.contributions.includes(contribution.value) && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                      <span className={`flex-1 transition-colors duration-300 ${formData.contributions.includes(contribution.value)
                          ? 'text-[var(--accent-dark)]'
                          : 'text-[var(--accent)] group-hover:text-[var(--accent-dark)]'
                        }`}>
                        {contribution.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Event Details Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6 border-b-2 border-[var(--secondary)] pb-2">
                <h3 className="text-[var(--accent)] m-0">
                  Event Details
                </h3>

                {/* Toggle Button */}
                <div className="flex items-center gap-3">
                  <span className={`text-sm transition-colors duration-300 ${attendingEvent ? 'text-[var(--accent)]' : 'text-[var(--neutral-mid)]'}`}>
                    {attendingEvent ? 'Attending Event' : 'Not Attending'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAttendingEvent(!attendingEvent)}
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${attendingEvent ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]' : 'bg-[var(--secondary)]'
                      }`}
                  >
                    <motion.div
                      animate={{ x: attendingEvent ? 32 : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              </div>

              {/* Conditionally render event fields */}
              {attendingEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Anyone Accompany */}
                    <div className="relative">
                      <label htmlFor="accompanyCount" className="block text-[var(--accent)] mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Anyone Accompanying? (Count) *
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
                        className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.accompanyCount ? 'border-red-500' : 'border-[var(--secondary)]'
                          } rounded-xl focus:outline-none focus:border-[var(--accent)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md`}
                      />
                      {errors.accompanyCount && (
                        <span className="text-red-500 text-sm mt-1 block">{errors.accompanyCount}</span>
                      )}
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
                        className={`w-full px-4 py-3 bg-[var(--dominant-bg)] border-2 ${errors.foodPreference ? 'border-red-500' : 'border-[var(--secondary)]'
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
              )}
            </motion.div>

            {/* Consent Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div className={`relative w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${formData.consent
                    ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] border-[var(--accent)]'
                    : 'bg-white border-[var(--secondary)] group-hover:border-[var(--accent)]'
                  }`}>
                  {formData.consent && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <span className="text-[var(--accent)] text-sm group-hover:text-[var(--accent-dark)] transition-colors duration-300">
                  I consent to the use of my information for academic, accreditation, and alumni engagement purposes. *
                </span>
              </label>
              {errors.consent && (
                <span className="text-red-500 text-sm mt-2 block">{errors.consent}</span>
              )}
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

          {/* Bottom border animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)] origin-left"
          ></motion.div>
        </div>
      </motion.div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(255,255,255,0)] bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative bg-[var(--white)] backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-[var(--secondary)] w-full max-w-md"
          >
            {/* Header section with gradient background */}
            <div className="relative bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] px-8 py-10 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4"
                >
                  <Check className="w-10 h-10 text-[var(--accent)]" strokeWidth={3} />
                </motion.div>
                <h2 className="text-[var(--white)] m-0">
                  {attendingEvent ? 'Registration Successful!' : 'Thank You!'}
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content section - conditional based on attendingEvent */}
            <div className="px-8 py-10 text-center">
              {attendingEvent ? (
                <>
                  <p className="text-[var(--accent)] mb-2">
                    Thank you for registering!
                  </p>
                  <p className="text-[var(--neutral-mid)] mb-8">
                    See you on <strong className="text-[var(--accent)]">28th December</strong>
                  </p>

                  {/* WhatsApp Group Link */}
                  <a
                    href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-12 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 inline-block"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Click to join WhatsApp group
                    </span>
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </>
              ) : (
                <>
                  <p className="text-[var(--accent)] mb-2">
                    Thank you for sharing your details!
                  </p>
                  <p className="text-[var(--neutral-mid)] mb-8">
                    We appreciate you taking the time to update your information. We'll keep you posted on future events and opportunities.
                  </p>

                  {/* Stay Connected Button */}
                  <a
                    href="https://your-website.com/stay-connected"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-12 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 inline-block"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Stay Connected
                    </span>
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </>
              )}
            </div>

            {/* Decorative bottom accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-2 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)] origin-left"
            ></motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}