import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem, Product, AppliedCoupon } from '@/types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      lastSearch: null,
      appliedCoupon: null,

      addToCart: (product: Product) => {
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

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item._id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      addManyItems: (newItems: CartItem[]) => {
        const currentCart = get().cart;
        const updatedCart = [...currentCart];

        newItems.forEach((newItem) => {
          const idx = updatedCart.findIndex((item) => item._id === newItem._id);
          if (idx !== -1) {
            updatedCart[idx] = { 
              ...updatedCart[idx], 
              quantity: updatedCart[idx].quantity + newItem.quantity 
            };
          } else {
            updatedCart.push(newItem);
          }
        });

        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      applyCoupon: (coupon: AppliedCoupon | null) => {
        set({ appliedCoupon: coupon });
      },

      getTotalPrice: () => {
        const { cart, appliedCoupon } = get();
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        
        if (appliedCoupon) {
          const discountAmount = (subtotal * appliedCoupon.discount) / 100;
          return Math.round(subtotal - discountAmount);
        }
        
        return subtotal;
      },

      setLastSearch: (email: string, phone: string) => {
        set({ lastSearch: { email, phone } });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);