import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, Ruler, CreditCard } from 'lucide-react';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/integrations/supabase/client';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dbProduct, setDbProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id?.startsWith('db-')) {
      setLoading(true);
      const dbId = id.replace('db-', '');
      supabase.from('admin_products').select('*').eq('id', dbId).single().then(({ data }) => {
        if (data) {
          const gallery = Array.isArray((data as any).images) && (data as any).images.length > 0
            ? ((data as any).images as string[])
            : (data.image_url ? [data.image_url] : []);
          const rawSizeQty = (data as any).size_quantities;
          const sizeStock: Record<string, number> | undefined =
            rawSizeQty && typeof rawSizeQty === 'object' && !Array.isArray(rawSizeQty) && Object.keys(rawSizeQty).length > 0
              ? Object.fromEntries(Object.entries(rawSizeQty).map(([k, v]) => [k, Number(v) || 0]))
              : undefined;
          const totalFromSizes = sizeStock ? Object.values(sizeStock).reduce((a, b) => a + b, 0) : undefined;
          const rawCi = (data as any).color_images;
          const colorImages: Record<string, string> | undefined =
            rawCi && typeof rawCi === 'object' && !Array.isArray(rawCi) && Object.keys(rawCi).length > 0
              ? Object.fromEntries(
                  Object.entries(rawCi)
                    .map(([k, v]) => [k, String(v || '')])
                    .filter(([, v]) => v)
                )
              : undefined;
          setDbProduct({
            id: `db-${data.id}`,
            name: data.name,
            price: data.price,
            originalPrice: data.original_price ?? undefined,
            image: gallery[0] || data.image_url,
            images: gallery,
            category: data.category,
            colors: data.colors,
            sizes: data.sizes,
            rating: 5,
            reviews: 0,
            description: data.description,
            badge: data.badge ?? undefined,
            isBestSeller: data.is_best_seller ?? false,
            isFeatured: data.is_featured ?? false,
            isNew: data.is_new ?? false,
            stock: totalFromSizes ?? (typeof data.quantity === 'number' ? data.quantity : undefined),
            sizeStock,
            colorImages,
          });
        }
        setLoading(false);
      });
    }
  }, [id]);

  const product = id?.startsWith('db-') ? dbProduct : products.find(p => p.id === id);
  const { addItem, setIsOpen } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  if (loading) {
    return (
      <section className="pt-20 sm:pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <Skeleton className="h-4 w-28 mb-4 sm:mb-8" />
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4 sm:space-y-6">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 sm:h-10 w-3/4" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-20 w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-16" />
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-16 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-16" />
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 sm:h-12 sm:w-12 rounded-md" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-12 sm:h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

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

  const allProducts = [...products];
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const activeSize = selectedSize || product.sizes[0];
  const stock = product.sizeStock && activeSize in product.sizeStock
    ? product.sizeStock[activeSize]
    : product.stock;
  const outOfStock = stock !== undefined && stock <= 0;
  const maxQty = stock ?? Infinity;

  const handleAddToCart = () => {
    if (outOfStock) return;
    const size = activeSize;
    const color = selectedColor || product.colors[0];
    for (let i = 0; i < quantity; i++) {
      addItem(product, size, color);
    }
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    const size = activeSize;
    const color = selectedColor || product.colors[0];
    for (let i = 0; i < quantity; i++) {
      addItem(product, size, color);
    }
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <section className="pt-20 sm:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
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
              {(() => {
                const activeColor = selectedColor || product.colors[0];
                const displayImage = (product.colorImages && activeColor && product.colorImages[activeColor]) || product.image;
                return (
                  <img
                    src={displayImage}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${imageZoomed ? 'scale-150' : ''}`}
                  />
                );
              })()}
            </div>
            {product.badge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <p className="text-xs sm:text-sm text-accent font-medium uppercase tracking-wider">{product.category}</p>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black mt-1">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="font-display text-2xl sm:text-3xl font-black">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm sm:text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
              )}
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.description}</p>

            {/* Color */}
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border transition-colors ${(selectedColor || product.colors[0]) === c ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider">Size</h3>
                <button onClick={() => setSizeGuideOpen(true)} className="text-[10px] sm:text-xs text-accent flex items-center gap-1 hover:underline">
                  <Ruler size={12} /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm font-medium rounded-md border transition-colors ${(selectedSize || product.sizes[0]) === s ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider">Quantity</h3>
                {stock !== undefined && (
                  <span className={`text-[10px] sm:text-xs font-medium ${outOfStock ? 'text-destructive' : stock <= 5 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                    {outOfStock ? 'Out of stock' : `${stock} in stock`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary">
                  <Minus size={14} />
                </button>
                <span className="font-display font-bold w-8 text-center text-sm sm:text-base">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(maxQty, quantity + 1))} disabled={quantity >= maxQty} className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-stretch gap-2 sm:gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold py-4 sm:py-5 rounded-full text-sm sm:text-base disabled:opacity-50"
              >
                <ShoppingBag size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" /> {outOfStock ? 'Stock Out' : 'Add to Cart'}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={outOfStock}
                variant="outline"
                className="flex-1 font-display font-bold py-4 sm:py-5 rounded-full text-sm sm:text-base border-foreground/20 hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                <CreditCard size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" /> Buy Now
              </Button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors shrink-0 self-center ${isWishlisted(product.id) ? 'text-destructive' : ''}`}
              >
                <Heart size={18} className="sm:w-5 sm:h-5" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h2 className="font-display text-xl sm:text-2xl font-black mb-6 sm:mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/70 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setSizeGuideOpen(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-card border border-border rounded-t-2xl sm:rounded-lg p-5 sm:p-6 w-full sm:max-w-md"
            >
              <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-4 sm:hidden" />
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4">Size Guide</h3>
              <table className="w-full text-xs sm:text-sm">
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
