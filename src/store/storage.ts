import { MMKV } from 'react-native-mmkv';

// Initialize MMKV instance for local storage
export const storage = new MMKV({
  id: 'my-app-storage',
  encryptionKey: 'my-encryption-key',
});

// Adapter for single-item local storage operations
export const localStorageAdapter = {
  setItem: (key: string, value: string) => storage.set(key, value),
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => storage.delete(key),
  clearAll: () => storage.clearAll(),

  getAllKeys: () => storage.getAllKeys(),
};

// Bulk local storage operations
/**
 * Store multiple key-value pairs in local storage
 * @param entries Array of { key, value } objects
 */
export const setLocalItems = (entries: Array<{ key: string; value: string }>): void => {
  try {
    entries.forEach(({ key, value }) => {
      if (key && value !== undefined) {
        storage.set(key, value);
      }
    });
  } catch (error) {
    console.error('Failed to set multiple local items:', error);
  }
};

/**
 * Retrieve multiple values by keys from local storage
 * @param keys Array of keys to fetch
 * @returns Object mapping each key to its stored value or null
 */
export const getLocalItems = (keys: string[]): Record<string, string | null> => {
  const results: Record<string, string | null> = {};
  try {
    keys.forEach(key => {
      const value = storage.getString(key);
      results[key] = value !== undefined ? value : null;
    });
  } catch (error) {
    console.error('Failed to get multiple local items:', error);
  }
  return results;
};

/**
 * Remove multiple keys from local storage
 * @param keys Array of keys to remove
 */
export const removeLocalItems = (keys: string[]): void => {
  try {
    keys.forEach(key => storage.delete(key));
  } catch (error) {
    console.error('Failed to remove multiple local items:', error);
  }
};
