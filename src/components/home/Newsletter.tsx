import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome to the Art In family! Check your email for 10% off.');
      setEmail('');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3">Stay Connected</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3">Get 10% Off Your First Order</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">Join our community for exclusive drops, early access, and insider art.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-3 font-display font-bold text-sm sm:text-base">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
