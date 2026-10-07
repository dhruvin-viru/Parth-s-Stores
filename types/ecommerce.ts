export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  categoryId: string;
  categoryName?: string;
  stock: number;
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId?: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  subtotal?: number;
  discountApplied: number;
  couponCode?: string;
  totalAmount: number;
  status: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percent' | 'flat';
  value: number;
  minOrderAmount: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiryDate: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  active: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
