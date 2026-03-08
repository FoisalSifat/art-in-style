import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, couponCode, setCouponCode, discount, applyCoupon } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md bg-background border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
              <h2 className="font-display text-base sm:text-lg font-bold flex items-center gap-2">
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" /> Cart ({totalItems})
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingBag size={48} className="mb-4 opacity-30" />
                  <p className="font-display text-lg">Your cart is empty</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)} asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg bg-card"
                    >
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-xs sm:text-sm truncate">{item.product.name}</h3>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{item.size} / {item.color}</p>
                        <p className="text-xs sm:text-sm font-bold mt-0.5 sm:mt-1">৳{item.product.price}</p>
                        <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="p-1 rounded border border-border hover:bg-secondary">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs sm:text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="p-1 rounded border border-border hover:bg-secondary">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="self-start p-1 hover:text-destructive">
                        <X size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-3 sm:p-4 space-y-2.5 sm:space-y-3 safe-area-bottom">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <Button variant="outline" size="sm" onClick={applyCoupon}>Apply</Button>
                </div>
                {discount > 0 && <p className="text-xs text-accent font-medium">🎉 {discount}% discount applied!</p>}
                <div className="flex justify-between font-display font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span>৳{Math.round(totalPrice)}</span>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-5 sm:py-6" asChild>
                  <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
