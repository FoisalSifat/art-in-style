import { motion } from 'framer-motion';
import brandLifestyle from '@/assets/brand-lifestyle.jpeg';

export default function BrandStory() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">The Brand</p>
            <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-6">
              Art You Can<br />
              <span className="text-gradient">Actually Wear.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Art In brings bold, culture-driven designs to premium streetwear. Every piece is crafted on 220 GSM cotton with vivid, long-lasting prints — because your style should make a statement.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From graphic art to iconic landmarks, our collections are inspired by creativity without boundaries. Wear your imagination — that's the Art In way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={brandLifestyle}
                alt="Art In — Premium Streetwear with Pikachu display"
                className="w-full aspect-[3/4] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
