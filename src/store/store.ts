/* eslint-disable no-unused-vars */
import { Warehouse } from "@/types/warehouses/warehouse";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Store {
  username: string;
  role: string;
  warehouse: Warehouse;
  productID: string;
  product: string;
  description: string;
  price: number;
  location: { lat: number; lng: number };
  setWarehouse: (warehouse: Warehouse) => void;
  setUsername: (username: string) => void;
  setRole: (role: string) => void;
  logOut: () => void;
  setProductID: (productID: string) => void;
  setProduct: (product: string) => void;
  setDescription: (description: string) => void;
  setPrice: (price: number) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
}

export const useStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      username: "",
      role: "",
      productID: "",
      product: "",
      description: "",
      price: 0,
      location: { lat: 0, lng: 0 },
      warehouse: {} as Warehouse,
      setUsername: (username) => set({ username }),
      setWarehouse: (warehouse) => set({ warehouse }),
      setRole: (role) => set({ role }),
      logOut: () => set({ username: "", role: "" }),
      setProductID: (productID) => set({ productID }),
      setProduct: (product) => set({ product }),
      setDescription: (description) => set({ description }),
      setPrice: (price) => set({ price }),
      setLocation: (location: { lat: number; lng: number }) => set({ location }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
