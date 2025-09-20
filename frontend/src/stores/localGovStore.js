import { create } from "zustand";

const EXPIRY_TIME = 30 * 60 * 1000;

export const useLocalGovStore = create((set, get) => ({
  localGov: null,
  lastUpdated: null,

  setLocalGov: (localGov) =>
    set({
      localGov,
      lastUpdated: Date.now(),
    }),

  getLocalGov: () => {
    const { localGov, lastUpdated } = get();
    if (!localGov || !lastUpdated) return null;

    const now = Date.now();
    if (now - lastUpdated > EXPIRY_TIME) {
      // Expired → clear cache
      set({ localGov: null, lastUpdated: null });
      return null;
    }
    return localGov;
  },

  clearLocalGov: () => set({ localGov: null, lastUpdated: null }),
}));
