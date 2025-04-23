// src/store/settingsStore.ts
import { UnistylesThemes } from 'react-native-unistyles';
import { create } from 'zustand';

export interface SettingsState {
  theme: keyof UnistylesThemes | 'system';
  setTheme: (theme: SettingsState['theme']) => void;
}

export const useSettingsStore = create<SettingsState>()(set => ({
  theme: 'system',
  setTheme: (theme: SettingsState['theme']) => set({ theme }),
}));

export default useSettingsStore;
