import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-black mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <p>At Art In, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
            <h2 className="font-display text-lg font-bold text-foreground">Information We Collect</h2>
            <p>We collect information you provide directly, such as name, email, shipping address, and payment details when you make a purchase.</p>
            <h2 className="font-display text-lg font-bold text-foreground">How We Use Your Information</h2>
            <p>Your information is used to process orders, improve our services, send promotional communications (with your consent), and provide customer support.</p>
            <h2 className="font-display text-lg font-bold text-foreground">Data Security</h2>
            <p>We use industry-standard encryption and security measures to protect your personal data. Payment information is processed through secure, PCI-compliant gateways.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
