// components/notifications/NotificationPanel.jsx - Con stile chat
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
import styles from "./ChatComponent.module.css"; // USA LO STESSO CSS DEL CHAT!

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
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    // Gestisci navigazione
    if (notification.actionData) {
      console.log(`Navigating based on notification:`, notification);
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

  // Render avatar per notifica (simile alle chat)
  const renderNotificationAvatar = (notification) => {
    const iconColor =
      notification.category === "course"
        ? "#3b82f6"
        : notification.category === "event"
        ? "#10b981"
        : notification.category === "social"
        ? "#f59e0b"
        : "#6b7280";

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: iconColor + "20", // 20% opacity
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
        }}
      >
        {getCategoryIcon(notification.category)}
      </div>
    );
  };

  // Ottieni il titolo "esperienza" basato sulla categoria
  const getExperienceTitle = (notification) => {
    const titles = {
      course: "Corso",
      event: "Evento",
      social: "Sociale",
      message: "Messaggio",
    };
    return titles[notification.category] || "Notifica";
  };

  return (
    <div className={styles.conversationsList}>
      {notifications.length === 0 ? (
        <div className={styles.emptyState}>
          <Users size={40} className={styles.emptyIcon} />
          <p>Nessuna notifica</p>
          <span>Le tue notifiche appariranno qui</span>
        </div>
      ) : (
        <>
          {/* Header "Segna tutte" - solo se ci sono notifiche non lette */}
          {unreadNotifications.length > 0 && (
            <div
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}
              >
                {unreadNotifications.length} non lette
              </span>
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3b82f6",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Check size={12} />
                Segna tutte
              </button>
            </div>
          )}

          {/* Lista notifiche - STESSO STILE DELLE CHAT */}
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.conversationItem} ${
                !notification.read ? styles.unread : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              {/* Avatar - stesso della chat */}
              <div className={styles.conversationAvatar}>
                {renderNotificationAvatar(notification)}
              </div>

              {/* Content - stesso layout della chat */}
              <div className={styles.conversationContent}>
                {/* Top row: nome + tempo */}
                <div className={styles.conversationTop}>
                  <span className={styles.conversationName}>
                    {notification.title}
                  </span>
                  <span className={styles.conversationTime}>
                    {formatTime(notification.timestamp)}
                  </span>
                </div>

                {/* Bottom row: categoria come "esperienza" */}
                <div className={styles.conversationBottom}>
                  <span className={styles.experienceTitle}>
                    {getCategoryIcon(notification.category)}{" "}
                    {getExperienceTitle(notification)}
                  </span>
                </div>

                {/* Message preview - il messaggio della notifica */}
                <div className={styles.messagePreview}>
                  {notification.message}
                </div>
              </div>

              {/* Badge unread - stesso stile chat + azioni hover */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {!notification.read && (
                  <div className={styles.messageUnreadBadge}>•</div>
                )}

                {/* Azioni hover - piccole e discrete */}
                <div
                  style={{
                    opacity: 0,
                    transition: "opacity 0.2s",
                    display: "flex",
                    gap: "2px",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = 1)}
                  onMouseLeave={(e) => (e.target.style.opacity = 0)}
                >
                  {!notification.read && (
                    <button
                      onClick={(e) => handleMarkAsRead(notification.id, e)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                        borderRadius: "4px",
                        color: "#059669",
                      }}
                      title="Segna come letto"
                    >
                      <Check size={10} />
                    </button>
                  )}
                  <button
                    onClick={(e) => handleRemove(notification.id, e)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      borderRadius: "4px",
                      color: "#dc2626",
                    }}
                    title="Rimuovi"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
