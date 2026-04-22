import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProductOverride {
  product_id: string;
  is_best_seller: boolean;
  is_featured: boolean;
  display_order: number;
}

const cache: { data: ProductOverride[] | null } = { data: null };
const listeners = new Set<(d: ProductOverride[]) => void>();

async function load() {
  const { data } = await supabase.from('product_overrides').select('*');
  const list = (data || []) as ProductOverride[];
  cache.data = list;
  listeners.forEach((l) => l(list));
  return list;
}

export function useProductOverrides() {
  const [overrides, setOverrides] = useState<ProductOverride[]>(cache.data || []);
  const [loading, setLoading] = useState(cache.data === null);

  useEffect(() => {
    listeners.add(setOverrides);
    if (cache.data === null) {
      load().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      listeners.delete(setOverrides);
    };
  }, []);

  return { overrides, loading, refetch: load };
}

export function getOverrideMap(overrides: ProductOverride[]) {
  const map = new Map<string, ProductOverride>();
  overrides.forEach((o) => map.set(o.product_id, o));
  return map;
}
