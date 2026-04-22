import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useSiteContent } from '@/hooks/useSiteContent';
import { HERO_DEFAULT } from '@/lib/siteContentDefaults';

export default function Hero() {
  const { content } = useSiteContent('hero', HERO_DEFAULT);
  const slides = content.slides?.length ? content.slides : HERO_DEFAULT.slides;
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Preload all slide images
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [slides]);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Reset index if slides shrank
  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  const slide = slides[current] ?? slides[0];

  return (
    <section className="relative min-h-[92svh] sm:min-h-[88vh] md:min-h-[90vh] lg:min-h-screen max-h-[1080px] flex items-end sm:items-center justify-center overflow-hidden pt-14 sm:pt-20 pb-28 sm:pb-0">
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
            src={slide.src}
            alt={slide.alt}
            loading="eager"
            decoding="async"
            // @ts-expect-error fetchpriority is valid HTML
            fetchpriority="high"
            className={`w-full h-full object-cover transition-[filter] duration-700 ${slide.imageClass ?? 'object-center'} ${
              isLight ? 'brightness-[0.78] contrast-[1.05] saturate-[1.05]' : 'brightness-[0.72] contrast-[1.05]'
            }`}
          />
          {isLight ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/55 to-background/10 sm:from-background/80 sm:via-background/35 sm:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent sm:from-background/50 sm:via-transparent sm:to-background/10" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent sm:from-background sm:via-background/75 sm:to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent sm:from-background/80 sm:via-background/10 sm:to-background/40" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-sm mb-2 sm:mb-4"
          >
            {content.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tight"
          >
            {content.headlineLine1}
            <br />
            {content.headlineLine2} <span className="text-gradient">{content.headlineHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/70 text-sm sm:text-lg md:text-xl mt-3 sm:mt-6 max-w-md leading-relaxed"
          >
            {content.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-row flex-wrap gap-2 sm:gap-4 mt-5 sm:mt-8"
          >
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-xs sm:text-base px-4 sm:px-8 py-4 sm:py-6 rounded-full">
              <Link to={content.primaryCtaHref}>
                {content.primaryCtaLabel} <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-display font-bold text-xs sm:text-base px-4 sm:px-8 py-4 sm:py-6 rounded-full border-foreground/30 hover:bg-foreground/10">
              <Link to={content.secondaryCtaHref}>{content.secondaryCtaLabel}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-accent' : 'w-4 bg-foreground/30'
              }`}
            />
          ))}
        </div>
      )}

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
