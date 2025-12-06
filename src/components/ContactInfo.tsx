import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  const contactItems = [
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Department of Computer Science & Engineering',
        'MBCET Campus, Thiruvananthapuram',
        'Kerala, India - 695015'
      ]
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        'Main Office: +91 471 123 4567',
        'HOD Office: +91 471 123 4568',
        'Admissions: +91 471 123 4569'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'General: cse@mbcet.ac.in',
        'HOD: hod.cse@mbcet.ac.in',
        'Admissions: admissions.cse@mbcet.ac.in'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {contactItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-[var(--white)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[var(--secondary)] hover:border-[var(--accent)] overflow-hidden"
        >
          {/* Animated background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            {/* Icon container with animation */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] mb-4 group-hover:scale-110 transition-transform duration-300">
              <item.icon className="w-7 h-7" />
            </div>
            
            {/* Title */}
            <h3 className="text-[var(--accent)] mb-3 m-0">{item.title}</h3>
            
            {/* Details */}
            <div className="space-y-1">
              {item.details.map((detail, idx) => (
                <p key={idx} className="text-[var(--neutral-mid)] text-sm m-0 leading-relaxed">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Decorative corner element */}
          <div className="absolute -bottom-6 -right-6 w-20 h-20 border-4 border-[var(--secondary)] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
}
