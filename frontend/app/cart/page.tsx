import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Manage your selected products, apply promo codes, and place your order with fast delivery.',
  keywords: [
    'shopping cart',
    'checkout',
    'order food',
    'confirm order',
    'cart management',
    'apply coupon',
  ],
};

export default function Page() {
  return <CartClient />;
}