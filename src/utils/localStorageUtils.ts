/**
 * Utility functions to work with localStorage
 */

// Generic function to get data from localStorage
export function getLocalData<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return defaultValue;
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Generic function to set data in localStorage
export function setLocalData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Remove data from localStorage
export function removeLocalData(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

// Clear all application data from localStorage
export function clearAppData(): void {
  const appKeys = ["gigzlrUser", "gigzlrJobs"];

  appKeys.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing ${key} from localStorage:`, error);
    }
  });
}
