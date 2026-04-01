import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IProduct } from '@/types/types';

export interface ICartItem extends IProduct {
  quantity: number;
}

interface CartState {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  resetAndAdd: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item._id === product._id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return;
        set({
          cart: get().cart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      resetAndAdd: (product: IProduct) => {
        set({ cart: [{ ...product, quantity: 1 }] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);