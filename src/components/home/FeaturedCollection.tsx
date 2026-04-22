import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useProductOverrides, getOverrideMap } from '@/hooks/useProductOverrides';

export default function FeaturedCollection() {
  const { products } = useAllProducts();
  const { overrides } = useProductOverrides();
  const map = getOverrideMap(overrides);

  const featured = products
    .map((p) => ({ p, o: map.get(p.id) }))
    .filter(({ p, o }) => (o ? o.is_featured : p.isFeatured))
    .sort((a, b) => (a.o?.display_order ?? 0) - (b.o?.display_order ?? 0))
    .map(({ p }) => p)
    .slice(0, 8);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-2 sm:mb-3">Curated For You</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black">Featured Collection</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
