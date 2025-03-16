/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Store {
  username: string;
  setUsername: (username: string) => void;
}

export const useStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      username: "",
      setUsername: (username) => set({ username }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
