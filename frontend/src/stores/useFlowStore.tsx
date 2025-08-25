// src/stores/flowStore.ts
import { create } from "zustand";

interface PersonaData {
  id: string;
  name: string;
  gender: string;
  description: string;
}

interface FlowState {
  selectedCharacterId: string | null;
  selectedBackgroundId: string | null;
  personaId: string | null;
  selectedPersonaData: PersonaData | null;
  setCharacter: (id: string) => void;
  setBackground: (id: string) => void;
  setPersona: (id: string) => void;
  setPersonaData: (persona: PersonaData) => void;
  resetFlow: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  selectedCharacterId: null,
  selectedBackgroundId: null,
  personaId: null,
  selectedPersonaData: null,
  setCharacter: (id) => set({ selectedCharacterId: id }),
  setBackground: (id) => set({ selectedBackgroundId: id }),
  setPersona: (id) => set({ personaId: id }),
  setPersonaData: (persona) =>
    set({ selectedPersonaData: persona, personaId: persona.id }),
  resetFlow: () =>
    set({
      selectedCharacterId: null,
      selectedBackgroundId: null,
      personaId: null,
      selectedPersonaData: null,
    }),
}));
