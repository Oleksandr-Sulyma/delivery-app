import type { Metadata } from 'next';
import { couponService } from "@/services/api";
import CouponsClient from "./CouponsClient";
import { Coupon } from "@/types/index";

export const metadata: Metadata = {
  title: "Coupons",
  description: "Browse and copy the best discount coupons for your favorite meals. Save money on every order from local shops.",
  keywords: [
    'food coupons',
    'promo codes',
    'discounts',
    'delivery offers',
    'save on food',
    'free delivery codes',
  ],
};

export default async function CouponsPage() {
  let coupons: Coupon[] = [];
  
  try {
    coupons = await couponService.getAll();
  } catch (error) {
    console.error("Помилка завантаження купонів:", error);
  }

  return <CouponsClient initialCoupons={coupons} />;
}