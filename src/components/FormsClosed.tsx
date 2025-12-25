import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

export default function FormsClosed() {
  const eventDetails = [
    {
      icon: Calendar,
      title: 'Date',
      info: '27th December 2025'
    },
    {
      icon: Clock,
      title: 'Time',
      info: '3:00 PM - 7:00 PM'
    },
    {
      icon: MapPin,
      title: 'Venue',
      info: 'MBCET College Campus'
    },
    {
      icon: Phone,
      title: 'Contact',
info: `Ms. S Asha 94477 41066 | 
Mr. V S Shibu 99613 30770`

    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[100dvh] flex items-center justify-center p-4"
    >
      <div className="relative w-full">

        {/* ================= Registration Closed Banner ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] rounded-3xl p-10 mb-10 shadow-2xl overflow-hidden"
        >
          {/* Glow blobs */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          {/* ================= Header Image ================= */}
          <div className="relative z-10 px-8 py-8 pt-8 pb-2">
            <div className="w-full aspect-[4/1] rounded-xl overflow-hidden bg-white/15 backdrop-blur-sm p-2 shadow-lg">
              <img
                src="/header.png"
                alt="Alumni Meetup"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* ================= Text Content ================= */}
          <div className="relative z-10 text-center p-8 ">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--white)] mb-4"
            >
              Registration Closed
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[var(--white)] opacity-90 text-lg"
            >
              Thank you for your interest! Registration for the alumni meetup
              has been closed.
              <br />
              For further inquiries, contact us.
            </motion.p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
          />
        </motion.div>

        {/* ================= Event Details ================= */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[var(--accent)] mt-6 mb-6 text-center"
        >
          Event Details
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
          className="relative bg-gradient-to-br from-[var(--white)] to-[var(--dominant-bg)] rounded-2xl p-8 shadow-lg border-2 border-[var(--secondary)] mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {eventDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className={`
                  flex items-center gap-4 p-6
                  ${index % 2 === 0 ? 'md:border-r-2' : ''}
                  ${index < 2 ? 'md:border-b-2' : ''}
                  border-[var(--secondary)]
                `}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-[var(--white)] shadow-lg">
                  <detail.icon className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-[var(--neutral-mid)] text-sm mb-1">
                    {detail.title}
                  </p>
                  <p className="text-[var(--accent)]">
                    {detail.info}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center text-[var(--neutral-mid)]"
        >
          For any inquiries, please contact us at the number provided above.
        </motion.p>
      </div>
    </motion.div>
  );
}
