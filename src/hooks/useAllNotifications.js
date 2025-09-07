// hooks/useAllNotifications.js
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { useSelector } from "react-redux";
import { selectUnreadCountForCurrentRole } from "@/store/slices/notificationSlice";

export const useAllNotifications = (role) => {
  const chatNotifications = useUnreadMessages(role);
  const notificationCount = useSelector(selectUnreadCountForCurrentRole);

  return {
    total: chatNotifications.total + notificationCount,
    hasUnread: chatNotifications.hasUnread || notificationCount > 0,
    chat: chatNotifications,
    notifications: notificationCount,
  };
};
