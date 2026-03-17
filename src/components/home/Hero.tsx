import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImg1 from '@/assets/hero-main.jpg';
import heroImg2 from '@/assets/hero-2.jpg';

const slides = [
  { src: heroImg1, alt: 'Art In Fashion - Collection 1', imageClass: 'object-[center_12%]' },
  { src: heroImg2, alt: 'Art In Fashion - Collection 2', imageClass: 'object-[center_10%]' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 24 }}
          exit={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className={`w-full h-full object-cover ${slides[current].imageClass}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40" />
          <div className="absolute inset-0 bg-background/15" />
        </motion.div>
      </AnimatePresence>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4"
          >
            Premium Artistic Streetwear
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight"
          >
            Wear
            <br />
            The <span className="text-gradient">Art.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-md leading-relaxed"
          >
            Where bold artistry meets premium comfort. Each piece is a canvas, every drop is a statement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
          >
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full">
              <Link to="/shop">
                Shop Now <ArrowRight size={18} className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full border-foreground/20 hover:bg-foreground/10">
              <Link to="/shop">Explore Collection</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-accent' : 'w-4 bg-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-foreground/30 flex justify-center pt-1"
        >
          <div className="w-1 h-2 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
