import { motion } from 'framer-motion';
import lifestyle1 from '@/assets/lifestyle-1.jpg';
import lifestyle2 from '@/assets/lifestyle-2.jpg';

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
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-6">
              Art Is Not What You See,<br />
              <span className="text-gradient">But What You Wear.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Born from the collision of street culture and fine art, Art In transforms everyday wear into wearable galleries. Every thread tells a story, every design challenges the norm.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe fashion should be fearless. Our premium 220 GSM cotton meets hand-curated artwork from emerging artists worldwide, creating pieces that are as comfortable as they are bold.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img src={lifestyle1} alt="Art In Lifestyle" className="rounded-lg w-full aspect-[3/4] object-cover" loading="lazy" />
            </div>
            <div className="space-y-4 pt-8">
              <img src={lifestyle2} alt="Art In Lifestyle" className="rounded-lg w-full aspect-[3/4] object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
