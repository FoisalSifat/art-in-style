import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products as staticProducts, categories, sizes as sizeOptions, colorOptions, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'best-selling';

export default function Shop() {
  const [category, setCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase.from('admin_products').select('*').then(({ data }) => {
      if (data) {
        setDbProducts(data.map(p => ({
          id: `db-${p.id}`,
          name: p.name,
          price: p.price,
          originalPrice: p.original_price ?? undefined,
          image: p.image_url,
          images: [p.image_url],
          category: p.category,
          colors: p.colors,
          sizes: p.sizes,
          rating: 5,
          reviews: 0,
          description: p.description,
          badge: p.badge ?? undefined,
          isBestSeller: p.is_best_seller ?? false,
          isFeatured: p.is_featured ?? false,
          isNew: p.is_new ?? false,
        })));
      }
    });
  }, []);

  const allProducts = useMemo(() => [...staticProducts, ...dbProducts], [dbProducts]);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (selectedSizes.length > 0) result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    if (selectedColors.length > 0) result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'best-selling': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }
    return result;
  }, [category, selectedSizes, selectedColors, sort, allProducts]);

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleColor = (c: string) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${category === c ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map(s => (
            <button key={s} onClick={() => toggleSize(s)} className={`w-10 h-10 text-xs font-medium rounded-md border transition-colors ${selectedSizes.includes(s) ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map(c => (
            <button key={c} onClick={() => toggleColor(c)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${selectedColors.includes(c) ? 'bg-accent text-accent-foreground border-accent' : 'border-border hover:border-foreground/30'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const activeFilterCount = (category !== 'All' ? 1 : 0) + selectedSizes.length + selectedColors.length;
  const clearAll = () => {
    setCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <section className="pt-16 sm:pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-12 pt-4 sm:pt-0">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-black">Shop</h1>
          <p className="text-muted-foreground text-xs sm:text-base mt-1 sm:mt-2">Explore our collection of wearable art</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop filter */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel />
          </div>

          {/* Mobile sticky filter/sort bar */}
          <div className="lg:hidden sticky top-14 z-30 -mx-4 px-4 py-2.5 bg-background/95 backdrop-blur-md border-b border-border/60">
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen(!filterOpen)}
                className="gap-2 h-9"
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{filtered.length} items</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="text-xs bg-background border border-border rounded-md px-2 h-9 max-w-[130px]"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>

            {activeFilterCount > 0 && (
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto -mx-1 px-1 pb-0.5" style={{ scrollbarWidth: 'none' }}>
                {category !== 'All' && (
                  <button onClick={() => setCategory('All')} className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/15 text-accent border border-accent/30">
                    {category} <X size={10} />
                  </button>
                )}
                {selectedSizes.map(s => (
                  <button key={s} onClick={() => toggleSize(s)} className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/15 text-accent border border-accent/30">
                    Size {s} <X size={10} />
                  </button>
                ))}
                {selectedColors.map(c => (
                  <button key={c} onClick={() => toggleColor(c)} className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/15 text-accent border border-accent/30">
                    {c} <X size={10} />
                  </button>
                ))}
                <button onClick={clearAll} className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-2">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {filterOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="lg:hidden border border-border rounded-lg p-4 overflow-hidden">
              <div className="flex justify-between mb-4">
                <span className="font-display font-bold">Filters</span>
                <button onClick={() => setFilterOpen(false)} aria-label="Close filters"><X size={18} /></button>
              </div>
              <FilterPanel />
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="flex-1" onClick={clearAll}>Clear</Button>
                <Button size="sm" className="flex-1" onClick={() => setFilterOpen(false)}>Show {filtered.length} items</Button>
              </div>
            </motion.div>
          )}

          <div className="flex-1">
            {/* Desktop sort */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} products</p>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="text-sm bg-background border border-border rounded-md px-3 py-2"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-4 lg:mt-0">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="font-display text-xl font-bold">No products found</p>
                <p className="mt-2 text-sm">Try adjusting your filters</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
