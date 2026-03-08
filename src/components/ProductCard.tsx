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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Quick actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`p-2 rounded-full glass transition-colors ${isWishlisted(product.id) ? 'text-destructive' : ''}`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={() => addItem(product, product.sizes[1] || product.sizes[0], product.colors[0])}
          className="p-2 rounded-full glass hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Quick add"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-display font-semibold text-sm">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">৳{product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground/30'}`}>★</span>
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
      </div>
    </motion.div>
  );
}
