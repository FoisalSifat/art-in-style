import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, totalPrice, discount } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });

  if (items.length === 0) {
    return (
      <section className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed! Redirecting to confirmation...');
    window.location.href = '/order-success';
  };

  return (
    <section className="pt-20 sm:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl sm:text-4xl font-black mb-6 sm:mb-8">Checkout</motion.h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Order summary — shown first on mobile */}
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 h-fit order-first lg:order-last">
            <h2 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Order Summary</h2>
            <div className="space-y-2 sm:space-y-3">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex justify-between text-xs sm:text-sm">
                  <span className="truncate mr-2">{item.product.name} × {item.quantity}</span>
                  <span className="shrink-0">৳{item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 sm:pt-3">
                <div className="flex justify-between text-xs sm:text-sm"><span>Subtotal</span><span>৳{items.reduce((s, i) => s + i.product.price * i.quantity, 0)}</span></div>
                {discount > 0 && <div className="flex justify-between text-xs sm:text-sm text-accent"><span>Discount ({discount}%)</span><span>-৳{Math.round(items.reduce((s, i) => s + i.product.price * i.quantity, 0) * discount / 100)}</span></div>}
                <div className="flex justify-between text-xs sm:text-sm"><span>Shipping</span><span className="text-accent">Free</span></div>
              </div>
              <div className="border-t border-border pt-2 sm:pt-3 flex justify-between font-display font-bold text-base sm:text-lg">
                <span>Total</span>
                <span>৳{Math.round(totalPrice)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <h2 className="font-display font-bold text-base sm:text-lg">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="sm:col-span-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="tel" placeholder="Phone" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="Address" required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="sm:col-span-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="City" required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="ZIP Code" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <h2 className="font-display font-bold text-base sm:text-lg mt-6 sm:mt-8">Payment Method</h2>
            <div className="space-y-2">
              {['Cash on Delivery', 'bKash', 'Nagad', 'Card Payment'].map(m => (
                <label key={m} className="flex items-center gap-3 p-2.5 sm:p-3 border border-border rounded-lg cursor-pointer hover:bg-card">
                  <input type="radio" name="payment" value={m} defaultChecked={m === 'Cash on Delivery'} className="accent-[hsl(var(--accent))]" />
                  <span className="text-xs sm:text-sm font-medium">{m}</span>
                </label>
              ))}
            </div>

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-5 sm:py-6 rounded-full mt-4 sm:mt-6 text-sm sm:text-base">
              Place Order — ৳{Math.round(totalPrice)}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
