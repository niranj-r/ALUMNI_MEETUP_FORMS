import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function EventInfo() {
  const eventDetails = [
    {
      icon: Calendar,
      title: 'Date',
      info: 'December 28, 2025'
    },
    {
      icon: Clock,
      title: 'Time',
      info: '10:00 AM - 6:00 PM'
    },
    {
      icon: MapPin,
      title: 'Venue',
      info: 'MBCET Campus Auditorium'
    },
    {
      icon: Users,
      title: 'Expected',
      info: '500+ Alumni'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {eventDetails.map((detail, index) => (
        <motion.div
          key={detail.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
          className="group relative bg-gradient-to-br from-[var(--white)] to-[var(--dominant-bg)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[var(--secondary)] hover:border-[var(--accent)] overflow-hidden"
        >
          {/* Animated background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          
          <div className="relative z-10 text-center">
            {/* Icon container with pulse animation */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <detail.icon className="w-8 h-8" />
            </div>
            
            {/* Title */}
            <p className="text-[var(--neutral-mid)] text-sm mb-2 m-0">{detail.title}</p>
            
            {/* Info */}
            <p className="text-[var(--accent)] m-0">{detail.info}</p>
          </div>

          {/* Decorative corner element */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
        </motion.div>
      ))}
    </div>
  );
}
