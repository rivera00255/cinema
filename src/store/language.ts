import { create } from 'zustand';

type LanguageState = {
  mode: 'ko' | 'en-US';
  setMode: (mode: 'ko' | 'en-US') => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  mode: 'ko',
  setMode: (mode: 'ko' | 'en-US') => set({ mode }),
}));
