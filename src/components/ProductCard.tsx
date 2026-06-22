import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  // Cap stagger so cards lower on the grid don't feel sluggish on mobile
  const delay = Math.min(index, 6) * 0.06;
  const eager = index < 4;
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    if (!product.sizes?.length || !product.colors?.length) return;
    const defaultSize = product.sizes.find(s => s === 'L') || product.sizes[0];
    addItem(product, defaultSize, product.colors[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          {product.badge && !outOfStock && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
              {product.badge}
            </span>
          )}
          {outOfStock && (
            <>
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-destructive text-destructive-foreground rounded-full">
                Stock Out
              </span>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Quick actions — always visible on mobile, hover on desktop */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:translate-y-2 sm:group-hover:translate-y-0">
        <button
          onClick={handleWishlist}
          className={`p-1.5 sm:p-2 rounded-full glass transition-colors ${isWishlisted(product.id) ? 'text-destructive' : ''}`}
          aria-label="Add to wishlist"
        >
          <Heart size={14} className="sm:w-4 sm:h-4" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleQuickAdd}
          disabled={outOfStock}
          className="p-1.5 sm:p-2 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Quick add"
        >
          <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
        <h3 className="font-display font-semibold text-xs sm:text-sm truncate">{product.name}</h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-bold text-xs sm:text-sm">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">৳{product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-[10px] sm:text-xs ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground/30'}`}>★</span>
          ))}
          <span className="text-[10px] sm:text-xs text-muted-foreground ml-0.5 sm:ml-1">({product.reviews})</span>
        </div>
      </div>
    </motion.div>
  );
}
