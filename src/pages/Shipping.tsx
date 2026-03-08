import { motion } from 'framer-motion';

export default function Shipping() {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-black mb-8">Shipping & Returns</h1>
          <div className="prose prose-sm text-muted-foreground space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Shipping Policy</h2>
              <p>We deliver nationwide within Bangladesh. Standard delivery takes 3-5 business days. Express delivery is available in Dhaka for 1-2 business days at an additional charge.</p>
              <p>Shipping is free on all orders above ৳3,000.</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Return Policy</h2>
              <p>We accept returns within 7 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Return shipping costs are borne by the customer unless the item is defective.</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Exchange Policy</h2>
              <p>Size exchanges are free of charge. Contact us within 7 days of delivery to initiate an exchange.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
