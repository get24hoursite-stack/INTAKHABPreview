export interface Product {
  id: string;
  name: string;
  urduName?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  category: 'New Arrivals' | 'Best Sellers' | 'Solids' | 'Velvet Edit';
  material: string;
  colour: string;
  modelSpecs: string;
  description: string;
  features: string[];
  careInstructions: string[];
  images: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  shirtSize: string;
  pantSize: string;
  shirtLength: string;
  pantLength: string;
  quantity: number;
  material: string;
  colour: string;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CheckoutDetails;
}
