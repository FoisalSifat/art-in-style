import type { HeroContent, BrandStoryContent, AboutContent, PromoBannerContent } from '@/hooks/useSiteContent';
import heroImg1 from '@/assets/hero-main.jpg';
import heroImg2 from '@/assets/hero-2.jpg';
import brandLifestyle from '@/assets/brand-lifestyle.jpeg';

export const PROMO_BANNER_DEFAULT: PromoBannerContent = {
  enabled: false,
  eyebrow: 'Limited Time',
  title: 'Winter Drop 2026',
  subtitle: 'Get 20% off on all new arrivals. Free shipping across Bangladesh on orders above ৳2000.',
  ctaLabel: 'Shop',
  ctaHref: '/shop',
  imageUrl: '',
  layout: 'image-right',
  accentText: 'USE CODE: ARTIN20',
  endDate: '',
  height: 'standard',
  fit: 'contain',
  focalY: 50,
  mobileImageUrl: '',
  rounded: true,
};

export const HERO_DEFAULT: HeroContent = {
  eyebrow: 'Premium Artistic Streetwear',
  headlineLine1: 'Wear',
  headlineLine2: 'The',
  headlineHighlight: 'Art.',
  subheadline:
    'Where bold artistry meets premium comfort. Each piece is a canvas, every drop is a statement.',
  primaryCtaLabel: 'Shop Now',
  primaryCtaHref: '/shop',
  secondaryCtaLabel: 'Explore',
  secondaryCtaHref: '/shop',
  slides: [
    { src: heroImg1, alt: 'Art In Fashion - Collection 1', imageClass: 'object-[center_12%]' },
    { src: heroImg2, alt: 'Art In Fashion - Collection 2', imageClass: 'object-[center_10%]' },
  ],
};

export const BRAND_STORY_DEFAULT: BrandStoryContent = {
  eyebrow: 'The Brand',
  headlineLine1: 'Art You Can',
  headlineHighlight: 'Actually Wear.',
  paragraph1:
    'Art In brings bold, culture-driven designs to premium streetwear. Every piece is crafted on 220 GSM cotton with vivid, long-lasting prints — because your style should make a statement.',
  paragraph2:
    "From graphic art to iconic landmarks, our collections are inspired by creativity without boundaries. Wear your imagination — that's the Art In way.",
  imageUrl: brandLifestyle,
};

export const ABOUT_DEFAULT: AboutContent = {
  eyebrow: 'Our Story',
  title: 'About Art In',
  subtitle:
    "Born from the belief that fashion should be fearless, Art In transforms everyday wear into wearable galleries. We're not just a brand — we're a movement.",
};

/** Exact banner size versions — upload images at these dimensions for a perfect fit. */
export const BANNER_PRESETS = [
  { id: 'auto', label: 'Original', width: 0, height: 0, ratio: '', hint: 'Uses your image as-is' },
  { id: 'compact', label: 'Compact', width: 1920, height: 480, ratio: '4/1', hint: '1920 × 480 px' },
  { id: 'standard', label: 'Standard', width: 1920, height: 768, ratio: '5/2', hint: '1920 × 768 px' },
  { id: 'tall', label: 'Tall', width: 1920, height: 1080, ratio: '16/9', hint: '1920 × 1080 px' },
] as const;

export const BANNER_MOBILE_SIZE = { width: 1080, height: 1350, hint: '1080 × 1350 px (4:5)' };

export const BANNER_ASPECT_CLASS: Record<string, string> = {
  auto: '',
  compact: 'aspect-[4/1]',
  standard: 'aspect-[5/2]',
  tall: 'aspect-[16/9]',
};
