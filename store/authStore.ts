import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SignFormPayload {
  email: string;
  password: string;
  fullName?: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  address1?: string;
  address2?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  signUp: (data: SignFormPayload) => Promise<void>;
  signIn: (data: SignFormPayload) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      initialize: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        set({
          user: session?.user ?? null,
          isAuthenticated: !!session?.user,
          isLoading: false,
        });

        supabase.auth.onAuthStateChange((event, session) => {
          set({
            user: session?.user ?? null,
            isAuthenticated: !!session?.user,
          });
        });
      },

      signUp: async (payload: SignFormPayload) => {
        const { error } = await supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            data: {
              full_name: payload.fullName,
            },
          },
        });
        if (error) {
          console.error("Sign up error:", error);
          throw new Error(error.message);
        }
      },

      signIn: async (payload: SignFormPayload) => {
        const { error } = await supabase.auth.signInWithPassword({
          email: payload.email,
          password: payload.password,
        });

        if (error) {
          console.error("Sign in error:", error);
          throw new Error(error.message);
        }
      },

      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Sign out error:", error);
          throw new Error(error.message);
        }
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: async (payload: UpdateProfilePayload) => {
        const { error } = await supabase.auth.updateUser({
          data: payload,
        });

        if (error) {
          console.error("Update profile error:", error);
          throw new Error(error.message);
        }

        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              user_metadata: {
                ...currentUser.user_metadata,
                ...payload,
              },
            },
          });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
