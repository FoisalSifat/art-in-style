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
  stock?: number;
  sizeStock?: Record<string, number>;
  colorImages?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Mountain Trail Oversize',
    price: 1290,
    originalPrice: 1490,
    image: product1,
    images: [product1, product1],
    category: 'Graphic Tees',
    colors: ['Mauve', 'Burgundy'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124,
    description: 'Golden mountain sunset graphic on rich mauve cotton. Adventure-inspired art meets premium 220 GSM streetwear.',
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Raju Guidance Tee',
    price: 1190,
    image: product2,
    images: [product2, product2],
    category: 'Art Series',
    colors: ['Teal', 'Sea Green'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 89,
    description: 'Vintage-inspired illustration art on deep teal. A tribute to Bengali culture with bold artistic expression.',
    isFeatured: true,
    isNew: true,
    badge: 'New',
  },
  {
    id: '3',
    name: 'Swiss Alps Magic Winter',
    price: 990,
    image: product3,
    images: [product3, product3],
    category: 'Oversized',
    colors: ['Beige', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 67,
    description: 'Swiss Alps mountain art on warm sand-toned oversized tee. Retro typography meets cozy winter vibes.',
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Château de Sin',
    price: 1390,
    image: product4,
    images: [product4, product4],
    category: 'Typography',
    colors: ['Dark Brown', 'Chocolate'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 45,
    description: 'Royal crest emblem with elegant French typography on deep chocolate. Luxury streetwear with old-world charm.',
    isFeatured: true,
    badge: 'Limited',
  },
  {
    id: '5',
    name: 'Curzon Hall Heritage',
    price: 1290,
    originalPrice: 1490,
    image: product5,
    images: [product5, product5],
    category: 'Art Series',
    colors: ['Teal', 'Mint'],
    sizes: ['M', 'L', 'XL'],
    rating: 4.5,
    reviews: 38,
    description: 'Vibrant Curzon Hall illustration on fresh teal. Celebrating Dhaka\'s iconic heritage through wearable art.',
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Mountain Calling Oversize',
    price: 1190,
    image: product6,
    images: [product6, product6],
    category: 'Oversized',
    colors: ['Mauve', 'Dusty Rose'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 156,
    description: '"The Mountains Are Calling And I Must Go" — golden adventure art on dusty rose oversized cotton.',
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Paris Eiffel Minimal',
    price: 1090,
    image: product7,
    images: [product7, product7],
    category: 'Typography',
    colors: ['Navy', 'Dark Blue'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 92,
    description: 'Minimalist Eiffel Tower emblem with tricolor accent on deep navy. Parisian elegance in everyday wear.',
    isFeatured: true,
    isNew: true,
    badge: 'New',
  },
  {
    id: '8',
    name: 'Simple Things Mandala',
    price: 1290,
    image: product8,
    images: [product8, product8],
    category: 'Graphic Tees',
    colors: ['Navy', 'Steel Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 73,
    description: 'Intricate mandala art with "Simple Things" script on navy. Front pocket detail, full back print masterpiece.',
    isFeatured: true,
    isBestSeller: true,
  },
];

export const categories = ['All', 'Graphic Tees', 'Oversized', 'Art Series', 'Typography'];
export const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
export const colorOptions = ['Navy', 'Teal', 'Beige', 'Mauve', 'Dark Brown', 'Sand', 'Mint', 'Dusty Rose'];
