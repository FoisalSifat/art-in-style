import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Star, ChevronLeft, Ruler } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild variant="outline"><Link to="/shop">Back to Shop</Link></Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    for (let i = 0; i < quantity; i++) {
      addItem(product, size, color);
    }
  };

  return (
    <section className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div
              className={`aspect-square overflow-hidden rounded-lg bg-card cursor-zoom-in ${imageZoomed ? 'cursor-zoom-out' : ''}`}
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${imageZoomed ? 'scale-150' : ''}`}
              />
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-accent font-medium uppercase tracking-wider">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-black mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted-foreground/30'} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-black">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${(selectedColor || product.colors[0]) === c ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider">Size</h3>
                <button onClick={() => setSizeGuideOpen(true)} className="text-xs text-accent flex items-center gap-1 hover:underline">
                  <Ruler size={12} /> Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 text-sm font-medium rounded-md border transition-colors ${(selectedSize || product.sizes[0]) === s ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary">
                  <Minus size={14} />
                </button>
                <span className="font-display font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddToCart} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-6 rounded-full">
                <ShoppingBag size={18} className="mr-2" /> Add to Cart
              </Button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors ${isWishlisted(product.id) ? 'text-destructive' : ''}`}
              >
                <Heart size={20} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-2xl font-black mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
            onClick={() => setSizeGuideOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-card border border-border rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="font-display text-xl font-bold mb-4">Size Guide</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-display">Size</th>
                    <th className="text-left py-2">Chest (in)</th>
                    <th className="text-left py-2">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {[['S', '36', '26'], ['M', '38', '27'], ['L', '40', '28'], ['XL', '42', '29'], ['XXL', '44', '30']].map(([s, c, l]) => (
                    <tr key={s} className="border-b border-border/50">
                      <td className="py-2 font-medium">{s}</td>
                      <td className="py-2 text-muted-foreground">{c}</td>
                      <td className="py-2 text-muted-foreground">{l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="outline" className="w-full mt-4" onClick={() => setSizeGuideOpen(false)}>Close</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
