import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <CheckCircle size={80} className="text-accent mx-auto mb-6" />
        </motion.div>
        <h1 className="font-display text-3xl font-black mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your order. Your wearable art is on its way.</p>
        <p className="text-sm text-muted-foreground mb-8">Order #ART-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full font-display">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
