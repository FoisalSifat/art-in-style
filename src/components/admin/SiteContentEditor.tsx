import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, Save, Image as ImageIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  HERO_DEFAULT,
  BRAND_STORY_DEFAULT,
  ABOUT_DEFAULT,
  PROMO_BANNER_DEFAULT,
} from '@/lib/siteContentDefaults';
import type {
  HeroContent,
  BrandStoryContent,
  AboutContent,
  HeroSlide,
  PromoBannerContent,
} from '@/hooks/useSiteContent';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useProductOverrides } from '@/hooks/useProductOverrides';

type SubTab = 'hero' | 'promo' | 'brand_story' | 'about' | 'featured';

async function uploadSiteImage(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('site-content').upload(path, file);
  if (error) {
    toast.error('Image upload failed');
    return null;
  }
  const { data } = supabase.storage.from('site-content').getPublicUrl(path);
  return data.publicUrl;
}

async function saveSection(key: string, content: object) {
  const payload = content as never;
  const { data: existing } = await supabase
    .from('site_content')
    .select('id')
    .eq('section_key', key)
    .maybeSingle();

  if (existing) {
    return supabase.from('site_content').update({ content: payload }).eq('id', existing.id);
  }
  return supabase.from('site_content').insert({ section_key: key, content: payload });
}

export default function SiteContentEditor() {
  const [sub, setSub] = useState<SubTab>('hero');

  const tabs: { id: SubTab; label: string }[] = [
    { id: 'hero', label: 'Hero / Banners' },
    { id: 'promo', label: 'Promo Banner' },
    { id: 'brand_story', label: 'Brand Story' },
    { id: 'about', label: 'About Page' },
    { id: 'featured', label: 'Featured & Best Sellers' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-bold">Landing Page CMS</h2>
        <p className="text-sm text-muted-foreground">Edit your homepage content, banners, and featured products.</p>
      </div>

      <div className="flex flex-wrap gap-1 bg-card border border-border rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              sub === t.id ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === 'hero' && <HeroEditor />}
      {sub === 'promo' && <PromoBannerEditor />}
      {sub === 'brand_story' && <BrandStoryEditor />}
      {sub === 'about' && <AboutEditor />}
      {sub === 'featured' && <FeaturedEditor />}
    </motion.div>
  );
}

/* ----------------- Hero Editor ----------------- */
function HeroEditor() {
  const [data, setData] = useState<HeroContent>(HERO_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('content')
      .eq('section_key', 'hero')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setData({ ...HERO_DEFAULT, ...(data.content as object) } as HeroContent);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await saveSection('hero', data);
    setSaving(false);
    if (error) toast.error('Failed to save');
    else toast.success('Hero section saved! Reload the homepage to see changes.');
  };

  const updateSlide = (i: number, patch: Partial<HeroSlide>) => {
    const slides = [...data.slides];
    slides[i] = { ...slides[i], ...patch };
    setData({ ...data, slides });
  };

  const addSlide = () => {
    setData({ ...data, slides: [...data.slides, { src: '', alt: 'New banner', imageClass: 'object-center' }] });
  };

  const removeSlide = (i: number) => {
    setData({ ...data, slides: data.slides.filter((_, idx) => idx !== i) });
  };

  const handleSlideImage = async (i: number, file: File) => {
    const url = await uploadSiteImage(file);
    if (url) updateSlide(i, { src: url });
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
      <SectionHeading title="Hero Text & CTAs" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Eyebrow (top label)">
          <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
        </Field>
        <Field label="Subheadline">
          <Input value={data.subheadline} onChange={(e) => setData({ ...data, subheadline: e.target.value })} />
        </Field>
        <Field label="Headline line 1">
          <Input value={data.headlineLine1} onChange={(e) => setData({ ...data, headlineLine1: e.target.value })} />
        </Field>
        <Field label="Headline line 2 (before highlight)">
          <Input value={data.headlineLine2} onChange={(e) => setData({ ...data, headlineLine2: e.target.value })} />
        </Field>
        <Field label="Headline highlight (gradient word)">
          <Input value={data.headlineHighlight} onChange={(e) => setData({ ...data, headlineHighlight: e.target.value })} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Primary button label">
          <Input value={data.primaryCtaLabel} onChange={(e) => setData({ ...data, primaryCtaLabel: e.target.value })} />
        </Field>
        <Field label="Primary button link">
          <Input value={data.primaryCtaHref} onChange={(e) => setData({ ...data, primaryCtaHref: e.target.value })} placeholder="/shop" />
        </Field>
        <Field label="Secondary button label">
          <Input value={data.secondaryCtaLabel} onChange={(e) => setData({ ...data, secondaryCtaLabel: e.target.value })} />
        </Field>
        <Field label="Secondary button link">
          <Input value={data.secondaryCtaHref} onChange={(e) => setData({ ...data, secondaryCtaHref: e.target.value })} placeholder="/shop" />
        </Field>
      </div>

      <div className="border-t border-border pt-5">
        <div className="flex items-center justify-between mb-4">
          <SectionHeading title="Banner Slides" sub="Upload campaign banners. They auto-rotate every 7s." />
          <Button onClick={addSlide} size="sm" variant="outline" className="gap-1.5">
            <Plus size={14} /> Add Slide
          </Button>
        </div>

        <div className="space-y-3">
          {data.slides.map((slide, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 bg-background border border-border rounded-lg">
              <label className="block w-full sm:w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors flex-shrink-0 relative">
                {slide.src ? (
                  <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Upload size={20} />
                    <span className="text-[10px] mt-1">Upload image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleSlideImage(i, e.target.files[0])}
                />
              </label>

              <div className="flex-1 space-y-2">
                <Field label={`Slide ${i + 1} — Alt text`}>
                  <Input
                    value={slide.alt}
                    onChange={(e) => updateSlide(i, { alt: e.target.value })}
                    placeholder="Describe image (for accessibility)"
                  />
                </Field>
                <Field label="Image position (e.g. object-center, object-[center_20%])">
                  <Input
                    value={slide.imageClass ?? ''}
                    onChange={(e) => updateSlide(i, { imageClass: e.target.value })}
                    placeholder="object-center"
                  />
                </Field>
              </div>

              <button
                onClick={() => removeSlide(i)}
                className="self-start sm:self-center p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Remove slide"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {data.slides.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No slides yet. Add one to display banners.</p>
          )}
        </div>
      </div>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}

/* ----------------- Promo Banner Editor ----------------- */
function PromoBannerEditor() {
  const [data, setData] = useState<PromoBannerContent>(PROMO_BANNER_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('content')
      .eq('section_key', 'promo_banner')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setData({ ...PROMO_BANNER_DEFAULT, ...(data.content as object) } as PromoBannerContent);
        }
        setLoading(false);
      });
  }, []);

  const handleImage = async (file: File) => {
    const url = await uploadSiteImage(file);
    if (url) setData({ ...data, imageUrl: url });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await saveSection('promo_banner', data);
    setSaving(false);
    if (error) toast.error('Failed to save');
    else toast.success('Promo banner saved!');
  };

  if (loading) return <Loader />;

  const layouts: { id: PromoBannerContent['layout']; label: string }[] = [
    { id: 'image-right', label: 'Image Right' },
    { id: 'image-left', label: 'Image Left' },
    { id: 'overlay', label: 'Full Overlay' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
      <SectionHeading
        title="Campaign / Promo Banner"
        sub="A dedicated space on the homepage for campaigns, sales, or events."
      />

      {/* Prominent enable/disable status bar */}
      <div
        className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 transition-colors ${
          data.enabled
            ? 'bg-accent/10 border-accent'
            : 'bg-destructive/10 border-destructive/40'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              data.enabled ? 'bg-accent animate-pulse' : 'bg-destructive'
            }`}
          />
          <div>
            <p className="font-display font-bold text-sm">
              {data.enabled ? 'Banner is LIVE on homepage' : 'Banner is HIDDEN'}
            </p>
            <p className="text-xs text-muted-foreground">
              {data.enabled
                ? 'Visitors can see this banner right now.'
                : 'Turn this on to display the banner on your landing page. Don\'t forget to Save.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setData({ ...data, enabled: !data.enabled })}
          className={`px-4 py-2 rounded-lg font-display font-bold text-xs sm:text-sm shrink-0 transition-colors ${
            data.enabled
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-accent text-accent-foreground hover:bg-accent/90'
          }`}
        >
          {data.enabled ? 'Turn OFF' : 'Turn ON'}
        </button>
      </div>

      <div className="grid sm:grid-cols-[200px_1fr] gap-4 items-start">
        <label className="block w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors relative">
          {data.imageUrl ? (
            <img src={data.imageUrl} alt="Promo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Upload size={20} />
              <span className="text-[10px] mt-1">Upload banner image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
          />
        </label>

        <div className="space-y-3">
          <Field label="Eyebrow badge (e.g. 'Limited Time')">
            <Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} />
          </Field>
          <Field label="Title">
            <Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </Field>
          <Field label="Accent text (coupon / tag line)">
            <Input
              value={data.accentText}
              onChange={(e) => setData({ ...data, accentText: e.target.value })}
              placeholder="USE CODE: ARTIN20"
            />
          </Field>
        </div>
      </div>

      <Field label="Subtitle">
        <textarea
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Button label">
          <Input value={data.ctaLabel} onChange={(e) => setData({ ...data, ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <Input value={data.ctaHref} onChange={(e) => setData({ ...data, ctaHref: e.target.value })} placeholder="/shop" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Layout">
          <div className="flex flex-wrap gap-2">
            {layouts.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setData({ ...data, layout: l.id })}
                className={`px-3 py-2 rounded-md text-xs font-medium border transition-colors ${
                  data.layout === l.id
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background border-border text-muted-foreground hover:border-foreground/30'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Countdown end date (optional)">
          <Input
            type="datetime-local"
            value={data.endDate ? data.endDate.slice(0, 16) : ''}
            onChange={(e) =>
              setData({ ...data, endDate: e.target.value ? new Date(e.target.value).toISOString() : '' })
            }
          />
        </Field>
      </div>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}

/* ----------------- Brand Story Editor ----------------- */
function BrandStoryEditor() {
  const [data, setData] = useState<BrandStoryContent>(BRAND_STORY_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('content')
      .eq('section_key', 'brand_story')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setData({ ...BRAND_STORY_DEFAULT, ...(data.content as object) } as BrandStoryContent);
        }
        setLoading(false);
      });
  }, []);

  const handleImage = async (file: File) => {
    const url = await uploadSiteImage(file);
    if (url) setData({ ...data, imageUrl: url });
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await saveSection('brand_story', data);
    setSaving(false);
    if (error) toast.error('Failed to save');
    else toast.success('Brand Story saved!');
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
      <SectionHeading title="Brand Story Section" sub="The 'Art You Can Actually Wear' block on the homepage." />

      <div className="grid sm:grid-cols-[160px_1fr] gap-4 items-start">
        <label className="block w-full aspect-[3/4] rounded-lg overflow-hidden border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors relative">
          {data.imageUrl ? (
            <img src={data.imageUrl} alt="Brand story" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Upload size={20} />
              <span className="text-[10px] mt-1">Upload image</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} />
        </label>

        <div className="space-y-3">
          <Field label="Eyebrow"><Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
          <Field label="Headline (line 1)"><Input value={data.headlineLine1} onChange={(e) => setData({ ...data, headlineLine1: e.target.value })} /></Field>
          <Field label="Headline highlight (gradient)"><Input value={data.headlineHighlight} onChange={(e) => setData({ ...data, headlineHighlight: e.target.value })} /></Field>
        </div>
      </div>

      <Field label="Paragraph 1">
        <textarea
          value={data.paragraph1}
          onChange={(e) => setData({ ...data, paragraph1: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>
      <Field label="Paragraph 2">
        <textarea
          value={data.paragraph2}
          onChange={(e) => setData({ ...data, paragraph2: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}

/* ----------------- About Editor ----------------- */
function AboutEditor() {
  const [data, setData] = useState<AboutContent>(ABOUT_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('content')
      .eq('section_key', 'about')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setData({ ...ABOUT_DEFAULT, ...(data.content as object) } as AboutContent);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await saveSection('about', data);
    setSaving(false);
    if (error) toast.error('Failed to save');
    else toast.success('About page saved!');
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
      <SectionHeading title="About Page Hero" sub="The top section of the About page." />

      <Field label="Eyebrow"><Input value={data.eyebrow} onChange={(e) => setData({ ...data, eyebrow: e.target.value })} /></Field>
      <Field label="Title"><Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} /></Field>
      <Field label="Subtitle">
        <textarea
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </Field>

      <SaveButton saving={saving} onClick={handleSave} />
    </div>
  );
}

/* ----------------- Featured / Best Sellers Editor ----------------- */
function FeaturedEditor() {
  const { products } = useAllProducts();
  const { overrides, refetch } = useProductOverrides();
  const [savingId, setSavingId] = useState<string | null>(null);

  const map = new Map(overrides.map((o) => [o.product_id, o]));

  const toggle = async (productId: string, field: 'is_featured' | 'is_best_seller', currentValue: boolean) => {
    setSavingId(productId + field);
    const existing = map.get(productId);
    const newVal = !currentValue;

    if (existing) {
      const patch = { [field]: newVal } as never;
      await supabase.from('product_overrides').update(patch).eq('product_id', productId);
    } else {
      const product = products.find((p) => p.id === productId);
      await supabase.from('product_overrides').insert({
        product_id: productId,
        is_featured: field === 'is_featured' ? newVal : !!product?.isFeatured,
        is_best_seller: field === 'is_best_seller' ? newVal : !!product?.isBestSeller,
      });
    }
    await refetch();
    setSavingId(null);
  };

  const getEffective = (productId: string, fallback: boolean, field: 'is_featured' | 'is_best_seller') => {
    const o = map.get(productId);
    return o ? o[field] : fallback;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4">
      <SectionHeading
        title="Featured & Best Sellers"
        sub="Toggle which products appear in the Featured Collection and Best Sellers sections on the homepage."
      />

      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">No products yet.</p>
      ) : (
        <div className="space-y-2">
          <div className="hidden sm:grid grid-cols-[1fr_120px_120px] gap-3 px-3 py-2 text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
            <div>Product</div>
            <div className="text-center">Featured</div>
            <div className="text-center">Best Seller</div>
          </div>
          {products.map((p) => {
            const isFeatured = getEffective(p.id, !!p.isFeatured, 'is_featured');
            const isBest = getEffective(p.id, !!p.isBestSeller, 'is_best_seller');
            return (
              <div
                key={p.id}
                className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_120px_120px] gap-3 items-center p-3 bg-background border border-border rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={16} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category} · ৳{p.price}</p>
                  </div>
                </div>

                <ToggleChip
                  active={isFeatured}
                  loading={savingId === p.id + 'is_featured'}
                  onClick={() => toggle(p.id, 'is_featured', isFeatured)}
                />
                <ToggleChip
                  active={isBest}
                  loading={savingId === p.id + 'is_best_seller'}
                  onClick={() => toggle(p.id, 'is_best_seller', isBest)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------- Tiny shared bits ----------------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h3 className="font-display font-bold text-base">{title}</h3>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function SaveButton({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <Button onClick={onClick} disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-display font-bold gap-2">
      <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ToggleChip({ active, loading, onClick }: { active: boolean; loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`mx-auto w-10 h-10 sm:w-full sm:h-9 sm:rounded-full rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
        active
          ? 'bg-accent text-accent-foreground border-accent'
          : 'bg-background text-muted-foreground border-border hover:border-foreground/30'
      } ${loading ? 'opacity-50 cursor-wait' : ''}`}
    >
      {loading ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> : active ? <Check size={14} /> : <span className="hidden sm:inline">Off</span>}
      {active && <span className="hidden sm:inline ml-1">On</span>}
    </button>
  );
}
