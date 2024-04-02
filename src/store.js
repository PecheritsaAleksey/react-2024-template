import { create } from "zustand";
import { supabaseClient } from "./config/supabase";

const useStore = create((set) => ({
  user: null,
  todos: [],
  isTodosLoading: true,

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
  getTodos: async () => {
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError) throw userError;

    const { data, error } = await supabaseClient
      .from("todos")
      .select()
      .eq("user_id", user.id);

    if (error) throw error;
    set({ isTodosLoading: false });
    set({ todos: data });
  },
  addTodo: async (todo) => {
    const { data, error } = await supabaseClient
      .from("todos")
      .insert(todo)
      .select();

    if (error) throw error;
    set((state) => ({ todos: [...state.todos, data[0]] }));
  },
  updateTodo: async (todo) => {
    const { data, error } = await supabaseClient
      .from("todos")
      .update(todo)
      .eq("id", todo.id)
      .select();
    if (error) throw error;

    set((state) => ({
      todos: state.todos.map((t) => (t.id === data[0].id ? data[0] : t)),
    }));
  },
  deleteTodo: async (id) => {
    const { data, error } = await supabaseClient
      .from("todos")
      .delete()
      .eq("id", id);
    if (error) throw error;
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    }));
  },
}));

export default useStore;
