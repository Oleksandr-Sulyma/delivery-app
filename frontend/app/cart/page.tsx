import type { Metadata } from 'next';
import CartClient from './CartClient';


export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Manage your selected products and place an order.',
};

export default function Page() {
  return <CartClient />;
}