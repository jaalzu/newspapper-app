import { createContext } from "react";
import { useFavorites } from "./useFavorites";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favoritesData = useFavorites();
  
  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}