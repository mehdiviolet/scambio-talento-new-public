// contexts/NotificationProvider.jsx
import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadAsyncNotifications,
  syncFromStorage,
} from "@/store/slices/notificationSlice";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Carica notifiche al mount
  useEffect(() => {
    dispatch(loadAsyncNotifications());
  }, [dispatch]);

  // Cross-window sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "asyncNotifications" && e.newValue) {
        try {
          const notifications = JSON.parse(e.newValue);
          dispatch(syncFromStorage(notifications));
        } catch (error) {
          console.error("Error syncing notifications:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  const value = {
    // Metodi di utilità se servono
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
