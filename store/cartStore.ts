import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  restaurantId: string;
  restaurantName: string;
  selectedToppings?: Array<{ name: string; price: number }>;
  selectedSides?: Array<{ name: string; price: number }>;
  specialInstructions?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (i) =>
            i.menuItemId === item.menuItemId &&
            i.restaurantId === item.restaurantId &&
            JSON.stringify(i.selectedToppings) ===
              JSON.stringify(item.selectedToppings) &&
            JSON.stringify(i.selectedSides) === JSON.stringify(item.selectedSides) &&
            i.size === item.size
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += item.quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                id: `${item.menuItemId}-${Date.now()}`,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const toppingsTotal =
            item.selectedToppings?.reduce(
              (sum, topping) => sum + topping.price,
              0
            ) || 0;
          const sidesTotal =
            item.selectedSides?.reduce((sum, side) => sum + side.price, 0) || 0;
          return total + (item.price + toppingsTotal + sidesTotal) * item.quantity;
        }, 0);
      },

      getCartItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
