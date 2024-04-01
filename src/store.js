import { create } from "zustand";
import { supabaseClient } from "./config/supabase";

const useStore = create((set) => ({
  user: null,
  todos: [],

  // Users actions
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    set({ user: { id: data.user.id, email: data.user.email } });
  },
  signUp: async (email, password) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    set({ user: { id: data.user.id, email: data.user.email } });
  },
  signOut: async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },

  // Todos actions
  setTodos: (todos) => set({ todos }),
}));

export default useStore;
