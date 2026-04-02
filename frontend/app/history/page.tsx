import type { Metadata } from 'next';
import HistoryClient from "./HistoryClient";

export const metadata: Metadata = {
  title: "Order History",
  description: "View your past orders, track delivery details, and reorder your favorite meals from local shops.",
  keywords: [
    'order history',
    'past orders',
    'track delivery',
    'food history',
  ],
};

export default function HistoryPage() {
  return <HistoryClient />;
}