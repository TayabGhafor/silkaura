export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  ingredients: string[];
  skinType: string[];
  inStock: boolean;
  variants?: { size: string; price: number }[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Radiance Vitamin C Serum',
    price: 48.00,
    image: '/src/assets/product-serum.jpg',
    rating: 4.8,
    reviews: 326,
    category: 'Serums',
    description: 'A powerful brightening serum enriched with 20% Vitamin C to reduce dark spots and reveal luminous skin.',
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    skinType: ['All Skin Types', 'Dull Skin', 'Uneven Tone'],
    inStock: true,
    variants: [
      { size: '30ml', price: 48.00 },
      { size: '50ml', price: 72.00 },
    ],
  },
  {
    id: '2',
    name: 'Gentle Cloud Cleanser',
    price: 32.00,
    image: '/src/assets/product-cleanser.jpg',
    rating: 4.9,
    reviews: 512,
    category: 'Cleansers',
    description: 'A creamy, sulfate-free cleanser that melts away impurities while maintaining your skin\'s natural moisture barrier.',
    ingredients: ['Coconut Oil', 'Chamomile Extract', 'Glycerin', 'Aloe Vera'],
    skinType: ['Dry Skin', 'Sensitive Skin', 'Normal Skin'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Hydrating Sheet Mask Set',
    price: 24.00,
    image: '/src/assets/product-mask.jpg',
    rating: 4.7,
    reviews: 289,
    category: 'Masks',
    description: 'Set of 5 ultra-hydrating sheet masks infused with hyaluronic acid and botanical extracts for instant glow.',
    ingredients: ['Hyaluronic Acid', 'Rose Water', 'Green Tea Extract', 'Niacinamide'],
    skinType: ['All Skin Types', 'Dehydrated Skin'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Invisible Shield SPF 50',
    price: 36.00,
    image: '/src/assets/product-suncare.jpg',
    rating: 4.9,
    reviews: 421,
    category: 'Sun Care',
    description: 'Lightweight, invisible sunscreen with broad-spectrum protection. Perfect under makeup.',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin E', 'Green Tea'],
    skinType: ['All Skin Types', 'Oily Skin', 'Acne-Prone'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Night Renewal Cream',
    price: 64.00,
    image: '/src/assets/product-serum.jpg',
    rating: 4.8,
    reviews: 198,
    category: 'Moisturizers',
    description: 'Rich overnight cream with retinol and peptides to rejuvenate skin while you sleep.',
    ingredients: ['Retinol', 'Peptides', 'Shea Butter', 'Squalane'],
    skinType: ['Mature Skin', 'Dry Skin', 'All Skin Types'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Rose Petal Toner',
    price: 28.00,
    image: '/src/assets/product-cleanser.jpg',
    rating: 4.6,
    reviews: 256,
    category: 'Toners',
    description: 'Alcohol-free toner with real rose petals to balance pH and prep skin for serums.',
    ingredients: ['Rose Water', 'Witch Hazel', 'Aloe Vera', 'Glycerin'],
    skinType: ['All Skin Types', 'Sensitive Skin'],
    inStock: true,
  },
];

export const collections = [
  { id: '1', name: 'Serums', image: '/src/assets/product-serum.jpg', count: 12 },
  { id: '2', name: 'Cleansers', image: '/src/assets/product-cleanser.jpg', count: 8 },
  { id: '3', name: 'Masks', image: '/src/assets/product-mask.jpg', count: 15 },
  { id: '4', name: 'Sun Care', image: '/src/assets/product-suncare.jpg', count: 6 },
];

export const testimonials = [
  {
    id: '1',
    name: 'Emma Chen',
    text: 'The Vitamin C serum transformed my skin! My dark spots faded within 3 weeks.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sofia Martinez',
    text: 'Gentle yet effective products. My sensitive skin has never looked better!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    text: 'Love the packaging and the quality. These are my new holy grails!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Olivia Anderson',
    text: 'The Night Renewal Cream is a game-changer! I wake up with glowing, plump skin.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Mia Thompson',
    text: 'Best sunscreen I\'ve ever used! No white cast and sits perfectly under makeup.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Ava Johnson',
    text: 'The Gentle Cloud Cleanser is so soothing. My dry skin feels nourished, not stripped.',
    rating: 5,
  },
  {
    id: '7',
    name: 'Isabella Garcia',
    text: 'These sheet masks are incredible! Instant hydration and my skin feels so soft.',
    rating: 5,
  },
  {
    id: '8',
    name: 'Charlotte Lee',
    text: 'Amazing quality for the price. I\'ve recommended these to all my friends!',
    rating: 5,
  },
  {
    id: '9',
    name: 'Amelia Wilson',
    text: 'The Rose Petal Toner smells divine and my skin has never been so balanced.',
    rating: 5,
  },
];
