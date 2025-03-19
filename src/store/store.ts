/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Store {
  username: string;
  role: string;
  setUsername: (username: string) => void;
  setRole: (role: string) => void;
  logOut: () => void;
}

export const useStore = create<Store, [["zustand/persist", Store]]>(
  persist(
    (set) => ({
      username: "",
      role: "",
      setUsername: (username) => set({ username }),
      setRole: (role) => set({ role }),
      logOut: () => set({ username: "", role: "" }),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
