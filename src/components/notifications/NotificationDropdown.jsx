// components/notifications/NotificationDropdown.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationsForCurrentRole,
  selectCurrentUserRole,
  markAsRead,
  markAllAsRead,
  removeAsyncNotification,
} from "@/store/slices/notificationSlice";
import {
  MessageCircle,
  BookOpen,
  Calendar,
  Settings,
  Trash2,
  //   MarkAsRead,
  Check,
} from "lucide-react";
import styles from "./NotificationDropdown.module.css";

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotificationsForCurrentRole);
  const currentRole = useSelector(selectCurrentUserRole);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "course":
        return <BookOpen size={16} />;
      case "chat":
        return <MessageCircle size={16} />;
      case "event":
        return <Calendar size={16} />;
      default:
        return <Settings size={16} />;
    }
  };

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Ora";
    if (minutes < 60) return `${minutes}m fa`;
    if (hours < 24) return `${hours}h fa`;
    return `${days}g fa`;
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    dispatch(markAsRead(id));
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    dispatch(removeAsyncNotification(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead({ role: currentRole }));
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    // Handle navigation based on category/actionData
    if (notification.actionData) {
      switch (notification.category) {
        case "course":
          // Navigate to course
          console.log("Navigate to course:", notification.actionData.courseId);
          break;
        case "chat":
          // Navigate to chat
          console.log("Navigate to chat:", notification.actionData.chatId);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <h4>Notifiche</h4>
        {notifications.some((n) => !n.read) && (
          <button
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
          >
            <Check size={14} />
            Segna tutte
          </button>
        )}
      </div>

      <div className={styles.notificationList}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nessuna notifica</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.notificationItem} ${
                !notification.read ? styles.unread : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={styles.notificationIcon}>
                {getCategoryIcon(notification.category)}
              </div>

              <div className={styles.notificationContent}>
                <div className={styles.notificationTitle}>
                  {notification.title}
                </div>
                <div className={styles.notificationMessage}>
                  {notification.message}
                </div>
                <div className={styles.notificationTime}>
                  {formatTime(notification.timestamp)}
                </div>
              </div>

              <div className={styles.notificationActions}>
                {!notification.read && (
                  <button
                    className={styles.markReadButton}
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    title="Segna come letto"
                  >
                    <Check size={12} />
                  </button>
                )}
                <button
                  className={styles.removeButton}
                  onClick={(e) => handleRemove(notification.id, e)}
                  title="Rimuovi"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
