import { create } from "zustand";

interface UserState {
  userId: string | null;
  userName: string | null;
  setUserId: (id: string) => void;
  setUserName: (name: string) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: localStorage.getItem("userId"),
  userName: localStorage.getItem("userName"),
  setUserId: (id) => {
    localStorage.setItem("userId", id);
    set({ userId: id });
  },
  setUserName: (name) => {
    localStorage.setItem("userName", name);
    set({ userName: name });
  },
  resetUser: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    set({ userId: null, userName: null });
  },
}));
