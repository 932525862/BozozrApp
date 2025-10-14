import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useStore = create()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setUserChange: (user) =>
       set({ user}),

      setUser: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      updateTokens: (newAccessToken, newRefreshToken) =>
        set({ accessToken: newAccessToken, refreshToken: newRefreshToken }),

      clearUser: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "user-store-market-client",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
