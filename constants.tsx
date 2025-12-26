
import { Product, Category, Brand } from './types';

export const BRANDS: Brand[] = [
  { name: 'Nestle', logo: 'https://logo.clearbit.com/nestle.com' },
  { name: 'Unilever', logo: 'https://logo.clearbit.com/unilever.com' },
  { name: 'Gul Ahmed', logo: 'https://logo.clearbit.com/gulahmedshop.com' },
  { name: 'Alkaram', logo: 'https://logo.clearbit.com/alkaramstudio.com' },
  { name: 'Khaadi', logo: 'https://logo.clearbit.com/khaadi.com' },
  { name: 'PepsiCo', logo: 'https://logo.clearbit.com/pepsico.com' },
  { name: 'Zellbury', logo: 'https://logo.clearbit.com/zellbury.com' },
  { name: 'Bata', logo: 'https://logo.clearbit.com/bata.com' },
];

export const PRODUCTS: Product[] = [
  // Existing FMCG Products
  {
    id: '1',
    name: 'Fresh Milk 1L Pack of 12',
    brand: 'MilkPure',
    category: Category.DAIRY,
    price: 2400,
    unit: 'Carton',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1563636619-e910ef49e9cf?auto=format&fit=crop&q=80&w=400',
    description: 'Ultra-pasteurized fresh milk, rich in calcium.',
    isPopular: true,
    bulkDiscount: 'Save 5% on 10+ cartons'
  },
  {
    id: '2',
    name: 'Cola Classic 500ml Pack of 24',
    brand: 'FizzCo',
    category: Category.BEVERAGES,
    price: 1800,
    unit: 'Case',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    description: 'Refreshing carbonated soft drink.',
    isPopular: true
  },
  
  // Fashion - Men's
  {
    id: 'f1',
    name: 'Premium Cotton Kurta - White (Bulk 6pcs)',
    brand: 'Gul Ahmed',
    category: Category.MENS_FASHION,
    price: 15000,
    unit: 'Bundle',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=400',
    description: '100% Cotton embroidered kurtas for men. Mixed sizes.',
    isNew: true,
    bulkDiscount: 'Rs. 2000 off on 5 bundles'
  },
  {
    id: 'f2',
    name: 'Casual Slim Fit Shirts Pack of 10',
    brand: 'Zellbury',
    category: Category.MENS_FASHION,
    price: 12500,
    unit: 'Pack',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400',
    description: 'Variety of colors, slim fit oxford cotton shirts.',
    isPopular: true
  },

  // Fashion - Women's
  {
    id: 'f3',
    name: 'Unstitched Lawn Suit 3pc (Set of 5)',
    brand: 'Alkaram',
    category: Category.WOMENS_FASHION,
    price: 18500,
    unit: 'Set',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400',
    description: 'Summer collection unstitched 3pc lawn suits. Trendy prints.',
    isPopular: true,
    bulkDiscount: 'Free delivery on 3+ sets'
  },
  {
    id: 'f4',
    name: 'Ready-to-Wear Printed Tunic (Assorted 12pcs)',
    brand: 'Khaadi',
    category: Category.WOMENS_FASHION,
    price: 28000,
    unit: 'Box',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=400',
    description: 'Ready to wear digital prints. Best for retail shops.',
    isNew: true
  },

  // Kids Clothing
  {
    id: 'f5',
    name: "Infant Cotton Rompers (Pack of 24)",
    brand: 'KidsJoy',
    category: Category.KIDS_CLOTHING,
    price: 8400,
    unit: 'Pack',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=400',
    description: 'Soft organic cotton rompers for infants. Mix designs.',
    isPopular: true
  },

  // Footwear
  {
    id: 'f6',
    name: "Mens Formal Leather Shoes (Lot of 10)",
    brand: 'Bata',
    category: Category.FOOTWEAR,
    price: 25000,
    unit: 'Lot',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=400',
    description: 'Genuine leather formal shoes. Classic black and brown.',
    bulkDiscount: '10% off for 2 lots'
  },

  // Pulses & Grains (Existing)
  {
    id: '3',
    name: 'Basmati Rice 5kg Premium',
    brand: 'GrainGold',
    category: Category.PULSES,
    price: 1250,
    unit: 'Bag',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    description: 'Long grain aromatic basmati rice.',
    isPopular: true,
    isNew: true
  },
  {
    id: '8',
    name: 'Cooking Oil 5L Tin',
    brand: 'PureDrop',
    category: Category.HOUSEHOLD,
    price: 2850,
    unit: 'Tin',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    description: 'Refined sunflower oil for healthy cooking.',
    isPopular: true
  }
];

export const CATEGORIES = Object.values(Category);
