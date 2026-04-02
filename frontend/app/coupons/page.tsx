import { couponService } from "@/services/api";
import CouponsClient from "./CouponsClient";
import { Coupon } from "@/types/index";

export const metadata = {
  title: "Coupons | Food Delivery",
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