import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/apiClient';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  createdAt?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login({ email, password });
          const { user, accessToken, refreshToken } = res.data;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken);
          }
          set({ user, accessToken, refreshToken, isLoading: false, error: null });
        } catch (err: any) {
          set({ isLoading: false, error: err.message || 'Login failed' });
          throw err;
        }
      },

      register: async (name, email, password, phone) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.register({ name, email, password, phone });
          const { user, accessToken, refreshToken } = res.data;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken);
          }
          set({ user, accessToken, refreshToken, isLoading: false, error: null });
        } catch (err: any) {
          set({ isLoading: false, error: err.message || 'Registration failed' });
          throw err;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (e) {}
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
        }
        set({ user: null, accessToken: null, refreshToken: null, error: null });
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.updateProfile(data);
          set((state) => ({
            user: state.user ? { ...state.user, ...res.data } : res.data,
            isLoading: false,
          }));
        } catch (err: any) {
          set({ isLoading: false, error: err.message || 'Profile update failed' });
          throw err;
        }
      },

      fetchProfile: async () => {
        const { accessToken } = get();
        if (!accessToken) return;
        try {
          const res = await authApi.me();
          const u = res.data;
          set({
            user: {
              id: u._id || u.id,
              email: u.email,
              name: u.name,
              phone: u.phone,
              role: u.role,
              createdAt: u.createdAt,
            },
          });
        } catch (e) {}
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'nexus-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
