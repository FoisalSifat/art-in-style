
-- Site content: key/value JSON store for landing-page sections
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can insert site content"
  ON public.site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site content"
  ON public.site_content FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete site content"
  ON public.site_content FOR DELETE USING (true);

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Per-product homepage flags (works for both static catalog ids and admin_products db- ids)
CREATE TABLE public.product_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  is_best_seller BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read product overrides"
  ON public.product_overrides FOR SELECT USING (true);
CREATE POLICY "Anyone can insert product overrides"
  ON public.product_overrides FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update product overrides"
  ON public.product_overrides FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete product overrides"
  ON public.product_overrides FOR DELETE USING (true);

CREATE TRIGGER update_product_overrides_updated_at
  BEFORE UPDATE ON public.product_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public bucket for landing-page assets (hero banners, brand story, about images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-content', 'site-content', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view site-content"
  ON storage.objects FOR SELECT USING (bucket_id = 'site-content');
CREATE POLICY "Anyone can upload site-content"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-content');
CREATE POLICY "Anyone can update site-content"
  ON storage.objects FOR UPDATE USING (bucket_id = 'site-content');
CREATE POLICY "Anyone can delete site-content"
  ON storage.objects FOR DELETE USING (bucket_id = 'site-content');
