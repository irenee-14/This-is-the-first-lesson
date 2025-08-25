// src/stores/flowStore.ts
import { create } from "zustand";

interface FlowState {
  selectedCharacterId: string | null;
  selectedBackgroundId: string | null;
  personaId: string | null;
  setCharacter: (id: string) => void;
  setBackground: (id: string) => void;
  setPersona: (id: string) => void;
  resetFlow: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  selectedCharacterId: null,
  selectedBackgroundId: null,
  personaId: null,
  setCharacter: (id) => set({ selectedCharacterId: id }),
  setBackground: (id) => set({ selectedBackgroundId: id }),
  setPersona: (id) => set({ personaId: id }),
  resetFlow: () =>
    set({
      selectedCharacterId: null,
      selectedBackgroundId: null,
      personaId: null,
    }),
}));
