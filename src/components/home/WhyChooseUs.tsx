import { motion } from 'framer-motion';
import { Gem, Palette, Truck, RotateCcw } from 'lucide-react';

const features = [
  { icon: Gem, title: 'Premium Fabric', desc: '220 GSM pure cotton for unmatched comfort' },
  { icon: Palette, title: 'Unique Design', desc: 'Hand-curated art from global artists' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide delivery within 3-5 days' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day hassle-free return policy' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3">Why Us</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black">Why Choose Art In</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base mb-1 sm:mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
