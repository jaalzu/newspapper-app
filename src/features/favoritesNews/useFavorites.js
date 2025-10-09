import { useState } from "react";
import { readFavorites, useFavoritesStorage } from "./useFavoritesStorage";
import { useFavoritesSync } from "./useFavoritesSync";
import { useFavoritesActions } from "./useFavoritesActions";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    return readFavorites();
  });

  useFavoritesStorage(favorites);
  useFavoritesSync(setFavorites);
  const actions = useFavoritesActions(favorites, setFavorites);

  return { favorites, ...actions };
}