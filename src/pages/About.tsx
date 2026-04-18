import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Flame, Truck, Package, Shield } from 'lucide-react';

import founderImg from '@/assets/founder.jpeg';
import artinTemplate from '@/assets/artin-template.jpeg';

export default function About() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6">About Art In</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Born from the belief that fashion should be fearless, Art In transforms everyday wear into wearable galleries. We're not just a brand — we're a movement.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3 text-center">The Visionary</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-12">Meet the Founder</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={founderImg}
                  alt="Asifur Rahman Tuhin — Founder & CEO of Art In"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-2xl font-black text-foreground">Asifur Rahman Tuhin</p>
                  <p className="text-accent text-sm font-medium tracking-widest uppercase">Founder & CEO</p>
                </div>
              </div>
            </motion.div>

            {/* Founder Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl font-black mb-3">Born to Be Different</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With an unrelenting passion for art and fashion, Asifur Rahman Tuhin founded Art In with a singular vision — to create a brand where creativity knows no boundaries. What started as a dream in Dhaka has grown into a movement that celebrates individuality and bold self-expression.
                </p>
              </div>

              {/* Contact Details styled as elegant card */}
              <div className="border border-border/50 rounded-xl p-6 bg-card/50 backdrop-blur-sm space-y-4">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">Get in Touch</p>
                
                <a href="tel:01600052600" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-sm">01600052600</span>
                </a>

                <a href="mailto:artinclo83@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group">
                  <span className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-sm">artinclo83@gmail.com</span>
                </a>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-sm">DarusSalam, Mirpur, Dhaka - 1216</span>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                  <a href="https://facebook.com/ArtIn" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors">
                    <Facebook className="w-4 h-4 text-accent" />
                  </a>
                  <a href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors">
                    <Instagram className="w-4 h-4 text-accent" />
                  </a>
                </div>
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
