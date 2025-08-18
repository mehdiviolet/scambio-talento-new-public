// hooks/useUnreadMessages.js - Hook personalizzato
import { useSelector } from "react-redux";
import { useMemo } from "react";

export const useUnreadMessages = (userRole) => {
  const allUnreadCounts = useSelector((state) => state.chat.unreadCounts);

  const unreadData = useMemo(() => {
    const userUnreads = {};
    let totalUnread = 0;

    Object.keys(allUnreadCounts).forEach((chatId) => {
      const count = allUnreadCounts[chatId]?.[userRole] || 0;
      userUnreads[chatId] = count;
      totalUnread += count;
    });

    return {
      byChat: userUnreads,
      total: totalUnread,
      hasUnread: totalUnread > 0,
      // Funzioni di utilità
      getUnreadForChat: (chatId) => userUnreads[chatId] || 0,
      hasUnreadInChat: (chatId) => (userUnreads[chatId] || 0) > 0,
    };
  }, [allUnreadCounts, userRole]);

  return unreadData;
};
// Hooks specifici per ruolo
export const useOwnerUnread = () => useUnreadMessages("owner");
export const useViewerUnread = () => useUnreadMessages("viewer");
