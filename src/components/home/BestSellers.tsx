import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function BestSellers() {
  const bestSellers = products.filter(p => p.isBestSeller);

  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3">Most Loved</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black">Best Sellers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
