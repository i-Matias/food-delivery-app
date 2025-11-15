import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "./cartStore";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: "pending" | "confirmed" | "preparing" | "on-the-way" | "delivered" | "cancelled";
  createdAt: string;
  estimatedDeliveryTime?: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORDER-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: "confirmed",
          estimatedDeliveryTime: new Date(
            Date.now() + 30 * 60 * 1000
          ).toISOString(), // 30 minutes from now
        };

        set({
          orders: [newOrder, ...get().orders],
          currentOrder: newOrder,
        });
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        });
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
