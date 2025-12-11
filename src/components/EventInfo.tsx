import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

export default function EventInfo() {
  const eventDetails = [
    {
      icon: Calendar,
      title: 'Date',
      info: 'December 27, 2025'
    },
    {
      icon: MapPin,
      title: 'Venue',
      info: 'MBCET Campus'
    },
    {
      icon: Phone,
      title: 'Further Inquiries',
      info: (
        <>
          Niranj R
          <br />
          9567655760
          <br />
          Sradhya Renish
          <br />
          9207755908
        </>
      )
    }
  ];

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="group relative bg-gradient-to-br from-[var(--white)] to-[var(--dominant-bg)] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[var(--secondary)] hover:border-[var(--accent)] overflow-hidden"
      >
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        
        <div className="relative z-10 space-y-6">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 pb-6 border-b-2 border-[var(--secondary)] last:border-b-0 last:pb-0"
            >
              {/* Icon container */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] flex-shrink-0 shadow-lg">
                <detail.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                {/* Title */}
                <p className="text-[var(--neutral-mid)] text-sm mb-1 m-0">{detail.title}</p>
                {/* Info */}
                <p className="text-[var(--accent)] m-0">{detail.info}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
      </motion.div>
    </div>
  );
}