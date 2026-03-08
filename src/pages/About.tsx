import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Flame, Truck, Package, Shield } from 'lucide-react';

import artinTemplate from '@/assets/artin-template.jpeg';
import brandLifestyle from '@/assets/brand-lifestyle.jpeg';

export default function About() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Who We Are</p>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6">About Art In</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Where art meets the street. Art In is more than apparel — it's a canvas for self-expression, built on bold design and uncompromising quality.
          </p>
        </motion.div>

        {/* Brand Lifestyle Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3 text-center">The Brand</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-12">Art You Can Wear</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Brand Lifestyle Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={brandLifestyle}
                  alt="Art In — Premium Streetwear Collection"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </motion.div>

            {/* Brand Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl font-black mb-3">Creativity Without Limits</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every Art In piece tells a story — from iconic landmarks to bold graphic art, our designs are inspired by culture, travel, and fearless creativity. Crafted on premium 220 GSM cotton, each tee is a wearable masterpiece.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-black mb-3">Made for the Bold</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We don't follow trends — we set them. Art In is for those who dare to stand out, who see fashion as a form of self-expression. From the streets of Dhaka to everywhere beyond, our mission is to make art accessible through fashion.
                </p>
              </div>

              <div className="border-l-2 border-accent/50 pl-4">
                <p className="text-foreground italic font-medium">
                  "Wear your imagination. That's the Art In way."
                </p>
                <p className="text-accent text-sm mt-1 font-medium tracking-widest uppercase">— Art In</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* What We Offer — inspired by the template image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3 text-center">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-12">Why Art In?</h2>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Template Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={artinTemplate}
                alt="Art In Collection — Premium Streetwear"
                className="w-full object-cover rounded-2xl"
              />
            </motion.div>

            {/* USP Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              {[
                { icon: Shield, title: 'Best Quality Guaranteed', desc: 'Every piece is crafted with premium 220 GSM cotton and printed using industry-leading techniques for vivid, long-lasting designs.' },
                { icon: Package, title: 'Cash on Delivery', desc: 'COD available all over Bangladesh. Pay when your order arrives at your doorstep — no hassle, no risk.' },
                { icon: Truck, title: 'Fast Home Delivery', desc: 'Swift and reliable delivery across Bangladesh. Your favourite streetwear, straight to your door.' },
                { icon: Flame, title: 'Premium Streetwear', desc: 'Bold designs that make a statement. From graphic tees to statement hoodies — wear your art.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex gap-4 items-start p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-accent" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}