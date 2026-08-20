import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../data/homeData';

export interface WishlistItem {
  id: string;
  name: string;
  nameAr?: string;
  specs: string;
  specsAr?: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  brand?: string;
  inStock?: boolean;
  rating: number;
  reviewsCount: number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product | WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product | WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.some((i) => i.id === product.id)) {
          const newItem: WishlistItem = {
            id: product.id,
            name: product.name,
            nameAr: product.nameAr,
            specs: product.specs,
            specsAr: product.specsAr,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            brand: product.brand,
            inStock: product.inStock !== false,
            rating: product.rating,
            reviewsCount: product.reviewsCount,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },

      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.some((i) => i.id === product.id);
        if (exists) {
          set({ items: currentItems.filter((i) => i.id !== product.id) });
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'nexus-store-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
