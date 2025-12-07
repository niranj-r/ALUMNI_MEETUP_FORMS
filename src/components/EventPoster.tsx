import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function EventPoster() {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="group relative bg-gradient-to-br from-[var(--white)] to-[var(--dominant-bg)] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[var(--secondary)] hover:border-[var(--accent)] overflow-hidden"
      >
        {/* Animated background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* Poster image container */}
          <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-[var(--dominant-bg)] shadow-inner">
            <ImageWithFallback
              src="/poster.png"
              alt="Alumni Meetup 2025 Event Poster"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Event description */}
          <p className="mt-6 text-[var(--neutral-dark)] leading-relaxed text-justify">
            An evening of memories, meaningful conversations, and renewed connections with your batchmates, this alumni meetup is a chance to relive cherished moments, share your journey, and celebrate the bonds that time can never fade. Join us for a warm, engaging gathering filled with stories, laughter, and lasting connections.
          </p>
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[var(--accent)] opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
      </motion.div>
    </div>
  );
}