import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black">Contact Us</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 sm:space-y-8">
            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base">Phone</h3>
                <a href="tel:01600052600" className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors">01600052600</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base">Email</h3>
                <a href="mailto:artinclo83@gmail.com" className="text-muted-foreground text-xs sm:text-sm hover:text-foreground transition-colors">artinclo83@gmail.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base">Location</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">DarusSalam, Mirpur, Dhaka - 1216</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=61580907942625" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="w-full px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-5 sm:py-6 rounded-full text-sm sm:text-base">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
