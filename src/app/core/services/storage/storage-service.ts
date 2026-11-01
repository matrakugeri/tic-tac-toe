import { Service } from '@angular/core';

@Service()
export class StorageService {
  private readonly STORAGE_KEY = 'tic_tac_toe_tournament_state';

  loadState<T>(): T | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }

      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  }

  saveState<T>(state: T): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }

  clearState(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear state from localStorage:', error);
    }
  }
}