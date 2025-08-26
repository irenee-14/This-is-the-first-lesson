import { create } from "zustand";

interface UserState {
  userId: string | null;
  setUserId: (id: string) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: localStorage.getItem("userId"),
  setUserId: (id) => {
    localStorage.setItem("userId", id);
    set({ userId: id });
  },
  resetUser: () => {
    localStorage.removeItem("userId");
    set({ userId: null });
  },
}));
