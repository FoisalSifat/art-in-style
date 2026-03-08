import { motion } from 'framer-motion';

export default function Marquee() {
  const text = 'ART IN • WEAR THE ART • PREMIUM STREETWEAR • LIMITED DROPS • ';
  return (
    <div className="py-4 border-y border-border overflow-hidden">
      <motion.div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-muted-foreground/30 mx-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
