import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavoritesContext debe usarse dentro de FavoritesProvider");
  }
  return context;
}