// src/stores/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // Login action
  login: (data) =>
    set({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),

  // Logout action
  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    }),
}));
