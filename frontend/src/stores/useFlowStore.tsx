import { create } from "zustand";

interface PersonaData {
  id: string;
  name: string;
  gender: string;
  description: string;
}

interface FlowState {
  writerId: string | null;
  characterId: string | null;
  backgroundId: string | null;
  personaId: string | null;
  selectedPersonaData: PersonaData | null;
  setWriter: (id: string) => void;
  setCharacter: (id: string) => void;
  setBackground: (id: string) => void;
  setPersona: (id: string) => void;
  setPersonaData: (persona: PersonaData) => void;
  resetFlow: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  writerId: null,
  characterId: null,
  backgroundId: null,
  personaId: null,
  selectedPersonaData: null,
  setWriter: (id) => set({ writerId: id }),
  setCharacter: (id) => set({ characterId: id }),
  setBackground: (id) => set({ backgroundId: id }),
  setPersona: (id) => set({ personaId: id }),
  setPersonaData: (persona) =>
    set({ selectedPersonaData: persona, personaId: persona.id }),
  resetFlow: () =>
    set({
      characterId: null,
      backgroundId: null,
      personaId: null,
      selectedPersonaData: null,
    }),
}));
