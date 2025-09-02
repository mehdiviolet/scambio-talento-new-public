// useSlideDrawer.js - Hook custom per gestire slide drawer
import { useState, useCallback, useEffect } from "react";

export const useSlideDrawer = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  // Funzione per aprire il drawer
  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Funzione per chiudere il drawer
  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Funzione per toggle
  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Gestione tasto ESC per chiudere
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Previene scroll del body quando drawer è aperto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeDrawer]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    setIsOpen,
  };
};
