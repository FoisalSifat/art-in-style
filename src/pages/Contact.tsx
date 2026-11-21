import { motion } from 'framer-motion';
import { ArrowUpRight, Banknote, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import lifestyleImage from '@/assets/lifestyle-1.jpg';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim().slice(0, 100);
    const email = form.email.trim().slice(0, 255);
    const message = form.message.trim().slice(0, 1000);
    if (!name || !email || !message) return;
    const text = `Hello, I'm ${name} (${email}).\n\n${message}`;
    const phone = '8801835099504';
    const encoded = encodeURIComponent(text);
    // Use whatsapp:// scheme on all devices — opens the installed WhatsApp app directly
    // and bypasses api.whatsapp.com / web.whatsapp.com which can be blocked in some regions.
    const appUrl = `whatsapp://send?phone=${phone}&text=${encoded}`;
    const webFallback = `https://wa.me/${phone}?text=${encoded}`;
    window.location.href = appUrl;
    // If the app isn't installed, fall back to wa.me after a short delay.
    setTimeout(() => {
      window.open(webFallback, '_blank', 'noopener,noreferrer');
    }, 1200);
    toast.success('Opening WhatsApp...');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="pt-20 sm:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-[1fr_0.88fr] gap-8 md:gap-12 items-center mb-12 sm:mb-16"
        >
          <div className="py-2">
            <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4">Get In Touch · Art In</p>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black leading-[0.98]">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="font-display text-lg sm:text-xl font-semibold mt-5">Art You Can Actually Wear.</p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-3 max-w-xl">
              Questions about a piece, your order, or delivery? Reach out—we’d love to help.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold">
              <a href="https://wa.me/8801835099504" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} /> Chat on WhatsApp <ArrowUpRight size={16} />
              </a>
            </Button>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border">
            <img
              src={lifestyleImage}
              alt="Art In streetwear in the city"
              className="w-full aspect-[16/10] md:aspect-[4/3] object-cover object-[center_35%]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/35 to-transparent px-4 pb-4 pt-12 sm:px-6 sm:pb-5">
              <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase">Art In · Streetwear</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="space-y-7">
            <div>
              <p className="text-accent text-xs font-medium tracking-[0.22em] uppercase mb-2">We’re here to help</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">Reach us directly</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a href="tel:01600052600" className="group min-w-0 border border-border rounded-lg p-4 transition-colors hover:bg-card">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border mb-4 text-accent"><Phone size={16} /></span>
                <span className="block font-display text-sm font-bold">Call us</span>
                <span className="mt-1 block text-xs text-muted-foreground whitespace-nowrap group-hover:text-foreground">01600052600</span>
              </a>
              <a href="mailto:artinclo83@gmail.com" className="group min-w-0 border border-border rounded-lg p-4 transition-colors hover:bg-card">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border mb-4 text-accent"><Mail size={16} /></span>
                <span className="block font-display text-sm font-bold">Email us</span>
                <span className="mt-1 block text-xs text-muted-foreground break-words group-hover:text-foreground">artinclo83@gmail.com</span>
              </a>
              <div className="sm:col-span-2 flex items-start gap-3 border border-border rounded-lg p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent"><MapPin size={16} /></span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold">Find us</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground break-words">DarusSalam, Mirpur, Dhaka - 1216</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 pt-5 text-center">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">Follow Us</p>
              <div className="flex justify-center gap-3">
                <a aria-label="Art In on Facebook" href="https://www.facebook.com/profile.php?id=61580907942625" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Facebook size={16} />
                </a>
                <a aria-label="Art In on Instagram" href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="border border-border rounded-lg bg-card p-5 sm:p-7 lg:p-8"
          >
            <p className="text-accent text-xs font-medium tracking-[0.22em] uppercase mb-2">Send a note</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">What can we help with?</h2>
            <p className="text-muted-foreground text-sm mt-2 mb-6">Your message will open in WhatsApp so we can continue the conversation.</p>
            <div className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Your name</span>
                <input type="text" placeholder="Enter your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Email address</span>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Message</span>
                <textarea placeholder="Tell us what you need help with..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-y" />
              </label>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-5">
                Send Message <ArrowUpRight size={16} />
              </Button>
            </div>
          </motion.form>
        </div>

        <div className="max-w-6xl mx-auto mt-12 sm:mt-16 border-y border-border/60 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          <div className="flex items-center gap-3 px-4 py-4 sm:justify-center sm:py-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent"><span className="font-display text-xs font-bold">220</span></span>
            <div><p className="font-display text-sm font-bold">220 GSM cotton</p><p className="text-xs text-muted-foreground">Premium cotton quality</p></div>
          </div>
          <div className="flex items-center gap-3 px-4 py-4 sm:justify-center sm:py-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent"><Banknote size={16} /></span>
            <div><p className="font-display text-sm font-bold">Cash on delivery</p><p className="text-xs text-muted-foreground">Available across Bangladesh</p></div>
          </div>
          <div className="flex items-center gap-3 px-4 py-4 sm:justify-center sm:py-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent"><Truck size={16} /></span>
            <div><p className="font-display text-sm font-bold">Fast home delivery</p><p className="text-xs text-muted-foreground">Straight to your door</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
