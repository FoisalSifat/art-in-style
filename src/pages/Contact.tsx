import { motion } from 'framer-motion';
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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
    const appUrl = `whatsapp://send?phone=${phone}&text=${encoded}`;
    const webFallback = `https://wa.me/${phone}?text=${encoded}`;
    window.location.href = appUrl;
    setTimeout(() => {
      window.open(webFallback, '_blank', 'noopener,noreferrer');
    }, 1200);
    toast.success('Opening WhatsApp...');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen pb-20 pt-28 sm:pt-32">
      <div className="container mx-auto max-w-6xl px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 max-w-3xl sm:mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-accent">Get in touch · Art In</p>
          <h1 className="font-display text-5xl font-black leading-none sm:text-6xl md:text-7xl">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Questions about a piece, your order, or delivery? We’re here to help.
          </p>
          <Button asChild variant="link" className="mt-4 h-auto px-0 py-1 font-display font-bold text-accent">
            <a href="https://wa.me/8801835099504" target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" /> Chat on WhatsApp <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </motion.header>

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-2xl font-bold">Reach us directly</h2>
              <p className="mt-2 text-sm text-muted-foreground">Choose the way that works best for you.</p>
            </div>

            <div className="divide-y divide-border/70 border-y border-border/70">
              <a href="tel:01600052600" className="group flex items-center gap-4 py-4 transition-colors hover:text-accent">
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Call us</span>
                  <span className="mt-1 block text-sm font-medium">01600052600</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a href="mailto:artinclo83@gmail.com" className="group flex items-center gap-4 py-4 transition-colors hover:text-accent">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Email us</span>
                  <span className="mt-1 block break-all text-sm font-medium">artinclo83@gmail.com</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <div className="flex items-center gap-4 py-4">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Find us</span>
                  <span className="mt-1 block text-sm font-medium">DarusSalam, Mirpur, Dhaka - 1216</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Follow us</span>
              <a
                aria-label="Art In on Facebook"
                href="https://www.facebook.com/profile.php?id=61580907942625"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-accent"
              >
                <Facebook aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                aria-label="Art In on Instagram"
                href="https://www.instagram.com/artin.clo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-accent"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-accent">Send a note</p>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">What can we help with?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your message will open in WhatsApp.</p>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Your name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="mt-1 w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Email address</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="mt-1 w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-0"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Message</span>
                <textarea
                  placeholder="Tell us what you need help with..."
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  className="mt-1 w-full resize-y rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-0"
                />
              </label>
            </div>
            <Button type="submit" variant="link" className="h-auto px-0 py-1 font-display font-bold text-accent">
              Send message <ArrowUpRight aria-hidden="true" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}