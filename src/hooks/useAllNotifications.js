// hooks/useAllNotifications.js
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { useSelector } from "react-redux";
import {
  selectUnreadCountByRole,
  selectUnreadCountForCurrentRole,
} from "@/store/slices/notificationSlice";

export const useAllNotifications = (role) => {
  const chatNotifications = useUnreadMessages(role);
  // const notificationCount = useSelector(selectUnreadCountForCurrentRole);
  const notificationCount = useSelector(selectUnreadCountByRole(role));

  return {
    total: chatNotifications.total + notificationCount,
    hasUnread: chatNotifications.hasUnread || notificationCount > 0,
    chat: chatNotifications,
    notifications: notificationCount,
  };
};
