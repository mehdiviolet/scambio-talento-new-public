import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    // Toast immediate (temporanee)
    toasts: {
      instructor: [],
      student: [],
      // system: [],     // 🚀 Facilmente estendibile
      // admin: [],      // 🚀 Scalabile
    },
    toastIdCounter: 0,

    // Notifiche asincrone (persistenti)
    asyncNotifications: [],
    asyncIdCounter: 0,

    // UI state
    isDropdownOpen: false,

    // 🆕 NUOVO: Ruolo attivo per filtering
    currentUserRole: "instructor", // "instructor" | "student"
  },
  reducers: {
    // =============== TOAST IMMEDIATE ===============
    showToast: (state, action) => {
      const {
        message,
        type = "info",
        duration = 3000,
        role = "both",
      } = action.payload;

      const toast = {
        id: state.toastIdCounter++,
        message,
        type,
        duration,
        timestamp: Date.now(),
      };

      // 🚀 SMART ROUTING - Una sola operazione
      if (role === "both") {
        state.toasts.instructor.push({ ...toast });
        state.toasts.student.push({ ...toast });
      } else if (role === "instructor" || role === "student") {
        state.toasts[role].push(toast);
      }
    },
    hideToast: (state, action) => {
      const { id, role } = action.payload;

      if (role && state.toasts[role]) {
        // 🚀 Rimozione mirata
        state.toasts[role] = state.toasts[role].filter(
          (toast) => toast.id !== id
        );
      } else {
        // 🔄 Fallback: rimuovi da tutti
        Object.keys(state.toasts).forEach((roleKey) => {
          state.toasts[roleKey] = state.toasts[roleKey].filter(
            (toast) => toast.id !== id
          );
        });
      }
    },

    clearToastsForRole: (state, action) => {
      const { role } = action.payload;
      if (state.toasts[role]) {
        state.toasts[role] = [];
      }
    },

    clearAllToasts: (state) => {
      Object.keys(state.toasts).forEach((role) => {
        state.toasts[role] = [];
      });
    },

    // =============== ASYNC NOTIFICATIONS ===============
    addAsyncNotification: (state, action) => {
      const {
        title,
        message,
        type = "info",
        category = "general", // 'course', 'chat', 'system', 'event'
        actionData = null, // dati per azioni (es: courseId, chatId)
        requiresAction = false,
        // 🆕 NUOVO: Specifica chi deve vedere la notifica
        targetRole = "both", // "instructor" | "student" | "both"

        // 🆕 NUOVO: Chi ha generato l'azione (opzionale per context)
        fromRole = null, // "instructor" | "student" | "system"

        // 🆕 NUOVO: ID conversazione/esperienza per linking
        experienceId = null,
        conversationId = null,
      } = action.payload;

      state.asyncNotifications.unshift({
        id: state.asyncIdCounter++,
        title,
        message,
        type,
        category,
        actionData,
        requiresAction,
        // 🆕 Metadati per filtering
        targetRole,
        fromRole,
        experienceId,
        conversationId,
        read: false,
        timestamp: Date.now(),
      });

      // Salva in localStorage
      localStorage.setItem(
        "asyncNotifications",
        JSON.stringify(state.asyncNotifications)
      );
    },

    // 🆕 NUOVO: Set current user role
    setCurrentUserRole: (state, action) => {
      state.currentUserRole = action.payload;
    },

    addNotificationForBothRoles: (state, action) => {
      const {
        instructorNotification,
        studentNotification,
        sharedData = {},
      } = action.payload;

      // Notifica per Instructor
      if (instructorNotification) {
        state.asyncNotifications.unshift({
          id: state.asyncIdCounter++,
          ...sharedData,
          ...instructorNotification,
          targetRole: "instructor",
          read: false,
          timestamp: Date.now(),
        });
      }

      // Notifica per Student
      if (studentNotification) {
        state.asyncNotifications.unshift({
          id: state.asyncIdCounter++,
          ...sharedData,
          ...studentNotification,
          targetRole: "student",
          read: false,
          timestamp: Date.now(),
        });
      }

      localStorage.setItem(
        "asyncNotifications",
        JSON.stringify(state.asyncNotifications)
      );
    },

    markAsRead: (state, action) => {
      const notification = state.asyncNotifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
        localStorage.setItem(
          "asyncNotifications",
          JSON.stringify(state.asyncNotifications)
        );
      }
    },

    markAllAsRead: (state, action) => {
      const { role } = action.payload || {};

      state.asyncNotifications.forEach((n) => {
        // Se non specifico ruolo, marca tutto come letto
        if (!role) {
          n.read = true;
        }
        // Altrimenti marca solo per il ruolo specifico
        else if (n.targetRole === role || n.targetRole === "both") {
          n.read = true;
        }
      });

      localStorage.setItem(
        "asyncNotifications",
        JSON.stringify(state.asyncNotifications)
      );
    },

    removeAsyncNotification: (state, action) => {
      state.asyncNotifications = state.asyncNotifications.filter(
        (n) => n.id !== action.payload
      );
      localStorage.setItem(
        "asyncNotifications",
        JSON.stringify(state.asyncNotifications)
      );
    },

    clearAllAsyncNotifications: (state) => {
      state.asyncNotifications = [];
      localStorage.removeItem("asyncNotifications");
    },

    // =============== UI CONTROLS ===============
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },

    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },

    // =============== PERSISTENCE ===============
    loadAsyncNotifications: (state) => {
      try {
        const saved = localStorage.getItem("asyncNotifications");
        if (saved) {
          const parsed = JSON.parse(saved);
          state.asyncNotifications = parsed;
          // Aggiorna il counter per evitare conflitti
          if (parsed.length > 0) {
            state.asyncIdCounter = Math.max(...parsed.map((n) => n.id)) + 1;
          }
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    },

    // =============== CROSS-WINDOW SYNC ===============
    syncFromStorage: (state, action) => {
      state.asyncNotifications = action.payload;
    },
  },
});

// =============== ENHANCED SELECTORS ===============

export const selectToastsByRole = (role) => (state) =>
  state.notifications.toasts[role] || [];

export const selectToastCountByRole = (role) => (state) =>
  state.notifications.toasts[role]?.length || 0;

export const selectAllToastsCount = (state) =>
  Object.values(state.notifications.toasts).reduce(
    (total, roleToasts) => total + roleToasts.length,
    0
  );

export const selectAsyncNotifications = (state) =>
  state.notifications.asyncNotifications;

export const selectCurrentUserRole = (state) =>
  state.notifications.currentUserRole;

// 🆕 NUOVO: Filtra notifiche per ruolo corrente
export const selectNotificationsForCurrentRole = (state) => {
  const role = state.notifications.currentUserRole;
  return state.notifications.asyncNotifications.filter(
    (notification) =>
      notification.targetRole === role || notification.targetRole === "both"
  );
};

// 🆕 NUOVO: Conta non lette per ruolo corrente
export const selectUnreadCountForRole = (state) => {
  const role = state.notifications.currentUserRole;
  return state.notifications.asyncNotifications.filter(
    (notification) =>
      !notification.read &&
      (notification.targetRole === role || notification.targetRole === "both")
  ).length;
};

// 🆕 NUOVO: Filtra per ruolo specifico
export const selectNotificationsByRole = (role) => (state) =>
  state.notifications.asyncNotifications.filter(
    (notification) =>
      notification.targetRole === role || notification.targetRole === "both"
  );

// 🆕 NUOVO: Filtra per categoria E ruolo
export const selectNotificationsByCategoryAndRole =
  (category, role) => (state) =>
    state.notifications.asyncNotifications.filter(
      (notification) =>
        notification.category === category &&
        (notification.targetRole === role || notification.targetRole === "both")
    );

// 🆕 NUOVO: Notifiche per esperienza specifica
export const selectNotificationsByExperience = (experienceId) => (state) =>
  state.notifications.asyncNotifications.filter(
    (notification) => notification.experienceId === experienceId
  );

export const selectIsDropdownOpen = (state) =>
  state.notifications.isDropdownOpen;

export const {
  showToast,
  hideToast,
  clearToastsForRole, // ← AGGIUNGI QUESTO
  clearAllToasts, // ← AGGIUNGI QUESTO
  addAsyncNotification,
  addNotificationForBothRoles, // ← AGGIUNGI QUESTO
  setCurrentUserRole, // ← AGGIUNGI QUESTO
  markAsRead,
  markAllAsRead,
  removeAsyncNotification,
  clearAllAsyncNotifications,
  toggleDropdown,
  closeDropdown,
  loadAsyncNotifications,
  syncFromStorage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
