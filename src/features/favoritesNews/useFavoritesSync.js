import { useEffect } from "react";
import { STORAGE_KEY } from "./constants";


export function useFavoritesSync(setFavorites) {
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue));
        } catch {
            console.error('Error:' ,e)
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [setFavorites]);
}