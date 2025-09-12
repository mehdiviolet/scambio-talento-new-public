// store/slices/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    // Array unico con tutte le notifiche
    items: [],

    // Ruolo attuale per filtraggio
    currentRole: "owner", // "owner" | "viewer"

    // UI state
    ui: {
      isOpen: false,
    },

    // Counter per ID unici
    idCounter: 0,
  },

  reducers: {
    // =============== CORE ACTIONS ===============

    addNotification: (state, action) => {
      const {
        type,
        title,
        message,
        targetRole,
        fromRole = null,
        actionData = null,
        category = "general",
      } = action.payload;

      const notification = {
        id: state.idCounter++,
        type,
        title,
        message,
        targetRole, // "owner" | "viewer"
        fromRole, // "owner" | "viewer" | "system"
        category, // "course" | "event" | "message" | "social"
        actionData,
        read: false,
        timestamp: Date.now(),
      };

      // Aggiungi in cima alla lista
      state.items.unshift(notification);

      // Mantieni solo ultime 50 notifiche per performance
      if (state.items.length > 50) {
        state.items = state.items.slice(0, 50);
      }
    },

    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.items.find((n) => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },

    markAllAsRead: (state, action) => {
      const { role } = action.payload || {};

      state.items.forEach((notification) => {
        if (!role || notification.targetRole === role) {
          notification.read = true;
        }
      });
    },

    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.items = state.items.filter((n) => n.id !== notificationId);
    },

    clearAllNotifications: (state) => {
      state.items = [];
    },

    // =============== ROLE MANAGEMENT ===============

    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },

    // =============== UI CONTROLS ===============

    toggleDropdown: (state) => {
      state.ui.isOpen = !state.ui.isOpen;
    },

    closeDropdown: (state) => {
      state.ui.isOpen = false;
    },
  },
});

// =============== SELECTORS ===============

// Notifiche per il ruolo corrente
export const selectNotificationsForCurrentRole = (state) => {
  return state.notifications.items.filter(
    (notification) =>
      notification.targetRole === state.notifications.currentRole
  );
};

// Notifiche per ruolo specifico
export const selectNotificationsByRole = (role) => (state) => {
  return state.notifications.items.filter(
    (notification) => notification.targetRole === role
  );
};

// Conteggio non lette per ruolo corrente
export const selectUnreadCountForCurrentRole = (state) => {
  return state.notifications.items.filter(
    (notification) =>
      notification.targetRole === state.notifications.currentRole &&
      !notification.read
  ).length;
};

// Conteggio non lette per ruolo specifico
export const selectUnreadCountByRole = (role) => (state) => {
  return state.notifications.items.filter(
    (notification) => notification.targetRole === role && !notification.read
  ).length;
};

// Ruolo corrente
export const selectCurrentRole = (state) => state.notifications.currentRole;

// UI state
export const selectIsDropdownOpen = (state) => state.notifications.ui.isOpen;

// Tutte le notifiche (per debug)
export const selectAllNotifications = (state) => state.notifications.items;

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  setCurrentRole,
  toggleDropdown,
  closeDropdown,
} = notificationSlice.actions;

export default notificationSlice.reducer;
