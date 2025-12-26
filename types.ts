
export enum Category {
  BEVERAGES = 'Beverages',
  SNACKS = 'Snacks',
  PERSONAL_CARE = 'Personal Care',
  HOUSEHOLD = 'Household',
  DAIRY = 'Dairy & Eggs',
  PULSES = 'Pulses & Grains',
  FROZEN = 'Frozen Foods',
  PHARMACY = 'Pharmacy',
  MENS_FASHION = "Men's Fashion",
  WOMENS_FASHION = "Women's Fashion",
  KIDS_CLOTHING = "Kids' Clothing",
  FOOTWEAR = 'Footwear',
  ACCESSORIES = 'Accessories'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string;
  stock: number;
  image: string;
  description: string;
  brand: string;
  isPopular?: boolean;
  bulkDiscount?: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  items: number;
}
