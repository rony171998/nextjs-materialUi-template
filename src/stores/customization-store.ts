// src/stores/customization-store.ts
import { createStore } from 'zustand/vanilla';

export type CustomizationState = {
  isOpen: string[];
  defaultId: string;
  fontFamily: string;
  borderRadius: number;
  opened: boolean;
};

export type CustomizationActions = {
  setMenuOpen: (id: string) => void;
  setMenu: (opened: boolean) => void;
  setFontFamily: (fontFamily: string) => void;
  setBorderRadius: (borderRadius: number) => void;
};

export type CustomizationStore = CustomizationState & CustomizationActions;

export const defaultInitState: CustomizationState = {
  isOpen: [],
  defaultId: 'default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  opened: true,
};

export const createCustomizationStore = (
  initState: CustomizationState = defaultInitState,
) => {
  return createStore<CustomizationStore>((set) => ({
    ...initState,
    setMenuOpen: (id) => set((state) => ({ ...state, isOpen: [id] })),
    setMenu: (opened) => set((state) => ({ ...state, opened })),
    setFontFamily: (fontFamily) => set((state) => ({ ...state, fontFamily })),
    setBorderRadius: (borderRadius) =>
      set((state) => ({ ...state, borderRadius })),
  }));
};
