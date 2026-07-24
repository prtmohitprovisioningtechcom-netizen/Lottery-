import { create } from "zustand";
import type { Winner } from "@/types";

interface ResultState {
  winner: Winner | null;
  prizeTickets: Record<number, string[]> | null;
  checked: boolean;
  loading: boolean;
  error: string | null;
  setResult: (
    winner: Winner | null,
    prizeTickets: Record<number, string[]> | null
  ) => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  reset: () => void;
}

export const useResultStore = create<ResultState>((set) => ({
  winner: null,
  prizeTickets: null,
  checked: false,
  loading: false,
  error: null,
  setResult: (winner, prizeTickets) =>
    set({ winner, prizeTickets, checked: !!winner, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, checked: false, winner: null }),
  reset: () =>
    set({
      winner: null,
      prizeTickets: null,
      checked: false,
      loading: false,
      error: null,
    }),
}));
