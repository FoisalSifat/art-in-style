import { motion } from 'framer-motion';
import lifestyle1 from '@/assets/lifestyle-1.jpg';
import lifestyle2 from '@/assets/lifestyle-2.jpg';

export default function About() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6">About Art In</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Born from the belief that fashion should be fearless, Art In transforms everyday wear into wearable galleries. We're not just a brand — we're a movement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
          <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={lifestyle1} alt="Art In" className="rounded-lg w-full aspect-[4/5] object-cover" />
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-black mb-4">Where Art Meets Street</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Every Art In piece is a collaboration between emerging artists and our design team. We source premium 220 GSM cotton and use advanced printing techniques to ensure every design pops with vivid detail.</p>
            <p className="text-muted-foreground leading-relaxed">Our mission is simple: make art accessible, wearable, and unapologetically bold. From the streets of Dhaka to cities worldwide, Art In is for the creative, the confident, and the unconventional.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
            <h2 className="font-display text-3xl font-black mb-4">Sustainability Matters</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We're committed to ethical production. Our supply chain is transparent, our materials are responsibly sourced, and we're working towards carbon-neutral shipping by 2027.</p>
            <p className="text-muted-foreground leading-relaxed">Every purchase supports independent artists and contributes to our art scholarship program for young creatives.</p>
          </motion.div>
          <motion.img initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={lifestyle2} alt="Art In Team" className="rounded-lg w-full aspect-[4/5] object-cover order-1 md:order-2" />
        </div>
      </div>
    </section>
  );
}
