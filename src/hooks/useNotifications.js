// hooks/useNotifications.js
import { useDispatch } from "react-redux";
import {
  showToast,
  addAsyncNotification,
} from "@/store/slices/notificationSlice";

export const useNotifications = (defaultRole = null) => {
  // 🆕 ROLE OPZIONALE
  const dispatch = useDispatch();

  // 🎯 PERFORMANCE: Passa role direttamente al reducer
  const showSuccessToast = (message, duration = 3000, role = defaultRole) => {
    dispatch(showToast({ message, type: "success", duration, role }));
  };

  const showErrorToast = (message, duration = 3000, role = defaultRole) => {
    dispatch(showToast({ message, type: "error", duration, role }));
  };

  const showWarningToast = (message, duration = 3000, role = defaultRole) => {
    dispatch(showToast({ message, type: "warning", duration, role }));
  };

  const showInfoToast = (message, duration = 3000, role = defaultRole) => {
    dispatch(showToast({ message, type: "info", duration, role }));
  };

  // 🆕 BONUS: Operazioni avanzate
  const clearToastsForRole = (role = defaultRole) => {
    dispatch(clearToastsForRole({ role }));
  };

  const showGlobalToast = (message, type = "info", duration = 3000) => {
    dispatch(showToast({ message, type, duration, role: "both" }));
  };

  // Le notifiche async restano uguali (già hanno targetRole)
  const addCourseNotification = (
    title,
    message,
    actionData,
    targetRole = defaultRole
  ) => {
    dispatch(
      addAsyncNotification({
        title,
        message,
        category: "course",
        type: "info",
        actionData,
        requiresAction: true,
        targetRole, // 🆕 USA targetRole per notifiche async
      })
    );
  };

  const addChatNotification = (
    title,
    message,
    actionData,
    targetRole = defaultRole
  ) => {
    dispatch(
      addAsyncNotification({
        title,
        message,
        category: "chat",
        type: "info",
        actionData,
        targetRole, // 🆕 USA targetRole
      })
    );
  };

  const addSystemNotification = (title, message, targetRole = defaultRole) => {
    dispatch(
      addAsyncNotification({
        title,
        message,
        category: "system",
        type: "info",
        targetRole, // 🆕 USA targetRole
      })
    );
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    clearToastsForRole,
    showGlobalToast,
    addCourseNotification,
    addChatNotification,
    addSystemNotification,
  };
};
