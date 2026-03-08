import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Abstract Chaos Tee',
    price: 2490,
    originalPrice: 2990,
    image: product1,
    images: [product1, product1],
    category: 'Graphic Tees',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124,
    description: 'Bold abstract geometric art on premium 220 GSM cotton. A statement piece that merges fine art with street culture.',
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Brush Stroke Oversize',
    price: 2290,
    image: product2,
    images: [product2, product2],
    category: 'Oversized',
    colors: ['White', 'Cream'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 89,
    description: 'Minimalist brush stroke design on an oversized silhouette. Japanese-inspired artistry meets modern streetwear.',
    isFeatured: true,
    isNew: true,
    badge: 'New',
  },
  {
    id: '3',
    name: 'Line Art Portrait',
    price: 1990,
    image: product3,
    images: [product3, product3],
    category: 'Art Series',
    colors: ['Grey', 'White', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 67,
    description: 'Continuous line art portrait on premium cotton. Where contemporary art meets everyday wear.',
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Shadow Type Tee',
    price: 2190,
    image: product4,
    images: [product4, product4],
    category: 'Typography',
    colors: ['Navy', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 45,
    description: 'Tonal typography art with a shadow effect. Subtle yet bold — for those who appreciate understated design.',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Urban Silhouette',
    price: 2390,
    originalPrice: 2890,
    image: product5,
    images: [product5, product5],
    category: 'Street Art',
    colors: ['Olive', 'Black'],
    sizes: ['M', 'L', 'XL'],
    rating: 4.5,
    reviews: 38,
    description: 'Urban-inspired silhouette art on military olive cotton. Raw, unfiltered street energy.',
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Kanji Flow',
    price: 2690,
    image: product6,
    images: [product6, product6],
    category: 'Art Series',
    colors: ['Burgundy', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 156,
    description: 'Japanese calligraphy-inspired art on deep burgundy. East meets West in perfect harmony.',
    badge: 'Limited',
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Third Eye Oversized',
    price: 2490,
    image: product7,
    images: [product7, product7],
    category: 'Oversized',
    colors: ['Cream', 'White'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 92,
    description: 'Surrealist eye artwork on cream oversized tee. See beyond the ordinary.',
    isFeatured: true,
    isNew: true,
    badge: 'New',
  },
  {
    id: '8',
    name: 'Neon Splash',
    price: 2790,
    image: product8,
    images: [product8, product8],
    category: 'Graphic Tees',
    colors: ['Charcoal', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 73,
    description: 'Explosive neon abstract art on dark charcoal. When art literally bursts off the fabric.',
    isFeatured: true,
    isBestSeller: true,
  },
];

export const categories = ['All', 'Graphic Tees', 'Oversized', 'Art Series', 'Typography', 'Street Art'];
export const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
export const colorOptions = ['Black', 'White', 'Grey', 'Navy', 'Olive', 'Burgundy', 'Cream', 'Charcoal'];
