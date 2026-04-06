import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function OrderSuccess() {
  const orderId = useMemo(() => Math.random().toString(36).substring(2, 8).toUpperCase(), []);

  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <CheckCircle size={72} className="text-accent mx-auto mb-6 sm:w-20 sm:h-20" />
        </motion.div>
        <h1 className="font-display text-2xl sm:text-3xl font-black mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-2">Thank you for your order. Your wearable art is on its way.</p>
        <p className="text-xs sm:text-sm text-muted-foreground mb-8">Order #ART-{orderId}</p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display text-sm sm:text-base">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full font-display text-sm sm:text-base">
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
