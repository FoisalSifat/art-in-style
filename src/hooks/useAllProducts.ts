import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products as staticProducts, Product } from '@/data/products';

const cache: { data: Product[] | null } = { data: null };
const listeners = new Set<(d: Product[]) => void>();

async function load(): Promise<Product[]> {
  const { data } = await supabase.from('admin_products').select('*');
  const dbProducts: Product[] = (data || []).map((p) => ({
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
  }));
  const merged = [...staticProducts, ...dbProducts];
  cache.data = merged;
  listeners.forEach((l) => l(merged));
  return merged;
}

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>(cache.data ?? staticProducts);
  const [loading, setLoading] = useState(cache.data === null);

  useEffect(() => {
    listeners.add(setProducts);
    if (cache.data === null) {
      load().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      listeners.delete(setProducts);
    };
  }, []);

  return { products, loading, refetch: load };
}
