// src/store/settingsStore.ts
import { UnistylesThemes } from 'react-native-unistyles';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { localStorageAdapter } from './storage';

export interface SettingsState {
  theme: keyof UnistylesThemes | 'system';
  setTheme: (theme: SettingsState['theme']) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      theme: 'system',
      setTheme: (theme: SettingsState['theme']) => set({ theme }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorageAdapter),
    }
  )
);

export default useSettingsStore;
