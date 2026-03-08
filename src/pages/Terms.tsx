import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-black mb-8">Terms & Conditions</h1>
          <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
            <p>By using the Art In website and purchasing our products, you agree to the following terms and conditions.</p>
            <h2 className="font-display text-lg font-bold text-foreground">Orders & Payments</h2>
            <p>All prices are listed in BDT (৳). We accept cash on delivery and various digital payment methods. Orders are confirmed upon successful payment verification.</p>
            <h2 className="font-display text-lg font-bold text-foreground">Intellectual Property</h2>
            <p>All designs, artwork, and content on this website are the property of Art In and its collaborating artists. Unauthorized reproduction is strictly prohibited.</p>
            <h2 className="font-display text-lg font-bold text-foreground">Limitation of Liability</h2>
            <p>Art In shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
