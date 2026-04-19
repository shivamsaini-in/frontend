import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/app/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => {
        document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        set({ token, user, isAuthenticated: true });
      },

      clearAuth: () => {
        document.cookie = 'auth-token=; path=/; max-age=0';
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
