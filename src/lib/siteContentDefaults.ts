import type { HeroContent, BrandStoryContent, AboutContent, PromoBannerContent } from '@/hooks/useSiteContent';
import heroImg1 from '@/assets/hero-main.jpg';
import heroImg2 from '@/assets/hero-2.jpg';
import brandLifestyle from '@/assets/brand-lifestyle.jpeg';

export const PROMO_BANNER_DEFAULT: PromoBannerContent = {
  enabled: false,
  eyebrow: 'Limited Time',
  title: 'Winter Drop 2026',
  subtitle: 'Get 20% off on all new arrivals. Free shipping across Bangladesh on orders above ৳2000.',
  ctaLabel: 'Shop the Drop',
  ctaHref: '/shop',
  imageUrl: '',
  layout: 'image-right',
  accentText: 'USE CODE: ARTIN20',
  endDate: '',
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
