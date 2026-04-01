import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Delivery App | Food Delivery & Shops',
  description:
    'Browse local shops, explore menus, and order food quickly with fast delivery.',
  keywords: [
    'food delivery',
    'restaurants',
    'shops',
    'online ordering',
    'fast food delivery',
  ],
};

export default function Page() {
  return <HomeClient />;
}

