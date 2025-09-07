// components/notifications/NotificationPanel.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationsForCurrentRole,
  selectCurrentRole,
  markAsRead,
  markAllAsRead,
  removeNotification,
} from "@/store/slices/notificationSlice";
import {
  MessageCircle,
  BookOpen,
  Calendar,
  Users,
  Heart,
  Check,
  X,
  Trash2,
} from "lucide-react";
import styles from "./NotificationBell.module.css";

const NotificationPanel = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotificationsForCurrentRole);
  const currentRole = useSelector(selectCurrentRole);
  const unreadNotifications = notifications.filter((n) => !n.read);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "course":
        return <BookOpen size={16} />;
      case "event":
        return <Calendar size={16} />;
      case "message":
        return <MessageCircle size={16} />;
      case "social":
        return <Heart size={16} />;
      default:
        return <Users size={16} />;
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

  const handleNotificationClick = (notification) => {
    // Marca come letta se non lo è già
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    // Gestisci navigazione basata su actionData
    if (notification.actionData) {
      console.log(`Navigating based on notification:`, notification);
      // Qui potresti aggiungere logica di navigazione
      // es: navigate(`/course/${notification.actionData.experienceId}`)
    }
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    dispatch(markAsRead(id));
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    dispatch(removeNotification(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead({ role: currentRole }));
  };

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <h3>Notifiche {currentRole === "owner" ? "👩‍🏫" : "👨‍🎓"}</h3>
        {unreadNotifications.length > 0 && (
          <button
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
          >
            <Check size={14} />
            Segna tutte
          </button>
        )}
      </div>

      {/* Lista notifiche */}
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
              {/* Icona categoria */}
              <div className={styles.icon}>
                {getCategoryIcon(notification.category)}
              </div>

              {/* Contenuto */}
              <div className={styles.content}>
                <div className={styles.title}>{notification.title}</div>
                <div className={styles.message}>{notification.message}</div>
                <div className={styles.meta}>
                  <span className={styles.time}>
                    {formatTime(notification.timestamp)}
                  </span>
                  {notification.fromRole && (
                    <span className={styles.fromRole}>
                      da{" "}
                      {notification.fromRole === "owner"
                        ? "istruttore"
                        : "studente"}
                    </span>
                  )}
                </div>
              </div>

              {/* Azioni */}
              <div className={styles.actions}>
                {!notification.read && (
                  <button
                    className={styles.readButton}
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

      {/* Footer con stats */}
      {notifications.length > 0 && (
        <div className={styles.footer}>
          <small>
            {notifications.length} totali • {unreadNotifications.length} non
            lette
          </small>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
