import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItemState {
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  price: number;
  image: string;
  quantity: number;
  attributes?: Record<string, string>;
}

interface CartStore {
  items: CartItemState[];
  isOpen: boolean;
  addItem: (item: CartItemState) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
        );

        if (existingIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingIndex].quantity += newItem.quantity;
          set({ items: updatedItems, isOpen: true });
        } else {
          set({ items: [...currentItems, newItem], isOpen: true });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: (open) => set({ isOpen: open ?? !get().isOpen }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'kimo-store-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
