// hooks/favorites/useFavoritesStorage.js
import { useEffect } from "react";
import { STORAGE_KEY } from "./constants";


export function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavoritesStorage(favorites) {
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Error guardando favoritos", e);
    }
  }, [favorites]);
}