import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  token: string | null;
  name: string | null;
  email: string | null;
  setAuth: (token: string, name: string, email: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      email: null,
      setAuth: (token, name, email) => set({ token, name, email }),
      logout: () => set({ token: null, name: null, email: null }),
    }),
    { name: "lottery-admin-auth" }
  )
);
