import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-black">Contact Us</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0"><Mail size={20} /></div>
              <div>
                <h3 className="font-display font-bold">Email</h3>
                <p className="text-muted-foreground text-sm">hello@artin.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0"><Phone size={20} /></div>
              <div>
                <h3 className="font-display font-bold">Phone</h3>
                <p className="text-muted-foreground text-sm">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center flex-shrink-0"><MapPin size={20} /></div>
              <div>
                <h3 className="font-display font-bold">Location</h3>
                <p className="text-muted-foreground text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-6 rounded-full">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
