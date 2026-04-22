import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroSlide {
  src: string;
  alt: string;
  imageClass?: string;
}

export interface HeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineHighlight: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  slides: HeroSlide[];
}

export interface BrandStoryContent {
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export type SectionMap = {
  hero: HeroContent;
  brand_story: BrandStoryContent;
  about: AboutContent;
};

const cache = new Map<string, unknown>();

export function useSiteContent<K extends keyof SectionMap>(
  key: K,
  fallback: SectionMap[K]
): { content: SectionMap[K]; loading: boolean } {
  const [content, setContent] = useState<SectionMap[K]>(
    (cache.get(key) as SectionMap[K]) ?? fallback
  );
  const [loading, setLoading] = useState(!cache.has(key));

  useEffect(() => {
    let mounted = true;
    supabase
      .from('site_content')
      .select('content')
      .eq('section_key', key)
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted) return;
        if (data?.content) {
          const merged = { ...fallback, ...(data.content as object) } as SectionMap[K];
          cache.set(key, merged);
          setContent(merged);
        }
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { content, loading };
}
