import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Product } from '@/data/products';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const dbIds = wishlist.filter(id => id.startsWith('db-')).map(id => id.replace('db-', ''));
    if (dbIds.length > 0) {
      supabase.from('admin_products').select('*').in('id', dbIds).then(({ data }) => {
        if (data) {
          setDbProducts(data.map(d => ({
            id: `db-${d.id}`,
            name: d.name,
            price: d.price,
            originalPrice: d.original_price ?? undefined,
            image: d.image_url,
            images: [d.image_url],
            category: d.category,
            colors: d.colors,
            sizes: d.sizes,
            rating: 5,
            reviews: 0,
            description: d.description,
            badge: d.badge ?? undefined,
            isBestSeller: d.is_best_seller ?? false,
            isFeatured: d.is_featured ?? false,
            isNew: d.is_new ?? false,
          })));
        }
      });
    }
  }, [wishlist]);

  const allProducts = [
    ...products.filter(p => wishlist.includes(p.id)),
    ...dbProducts,
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <Heart className="mx-auto mb-3 text-accent" size={32} />
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Your Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {allProducts.length === 0 ? "Your wishlist is empty" : `${allProducts.length} item${allProducts.length > 1 ? 's' : ''} saved`}
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">You haven't added any items to your wishlist yet.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              <ShoppingBag size={18} /> Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">{product.badge}</span>
                    )}
                  </div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                  <button onClick={() => toggleWishlist(product.id)} className="p-1.5 sm:p-2 rounded-full glass text-destructive" aria-label="Remove from wishlist">
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button onClick={() => addItem(product, product.sizes[1] || product.sizes[0], product.colors[0])} className="p-1.5 sm:p-2 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Add to cart">
                    <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="mt-2 sm:mt-3 space-y-0.5">
                  <h3 className="font-display font-semibold text-xs sm:text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm">৳{product.price}</span>
                    {product.originalPrice && <span className="text-[10px] sm:text-xs text-muted-foreground line-through">৳{product.originalPrice}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
