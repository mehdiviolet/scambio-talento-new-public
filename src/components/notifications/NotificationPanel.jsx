// components/notifications/NotificationPanel.jsx
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  markAsRead,
  markAllAsRead,
  removeNotification,
} from "@/store/slices/notificationSlice";
import {
  MessageCircle,
  BookOpen,
  Calendar,
  Settings,
  Trash2,
  Check,
  Users,
  Heart,
  Bell,
} from "lucide-react";
import styles from "../ChatComponent.module.css";

const NotificationPanel = ({
  currentRole,
  notifications = [],
  unreadCount = 0,
  // mode = "panel", // "dropdown" | "panel"
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log("AAAAAAAAAAAAAAAA");
  console.log("NNNNOtPANEL", notifications);

  // // Chiudi dropdown se click fuori (solo in modalità dropdown)
  // useEffect(() => {
  //   if (mode !== "dropdown") return;

  //   const handleClickOutside = (event) => {
  //     if (bellRef.current && !bellRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isOpen, mode]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "course":
        return <BookOpen size={16} />;
      case "chat":
        return <MessageCircle size={16} />;
      case "event":
        return <Calendar size={16} />;
      case "social":
        return <Heart size={16} />;
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
    dispatch(removeNotification(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead({ role: currentRole }));
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    if (notification.actionData) {
      switch (notification.category) {
        case "course":
          console.log(
            "Navigate to course:",
            notification.actionData.experienceId
          );
          break;
        case "chat":
          console.log(
            "Navigate to chat:",
            notification.actionData.conversationId
          );
          break;
        default:
          break;
      }
    }
  };

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
          background: iconColor + "20",
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

  const getExperienceTitle = (notification) => {
    const titles = {
      course: "Corso",
      event: "Evento",
      social: "Sociale",
      message: "Messaggio",
    };
    return titles[notification.category] || "Notifica";
  };

  // Componente lista notifiche
  const NotificationList = () => (
    <div className={styles.conversationsList}>
      {notifications.length === 0 ? (
        <div className={styles.emptyState}>
          <Users size={40} className={styles.emptyIcon} />
          <p>Nessuna notifica</p>
          <span>Le tue notifiche appariranno qui</span>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${styles.conversationItem} ${
              !notification.read ? styles.unread : ""
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            {/* Avatar */}
            <div className={styles.conversationAvatar}>
              {renderNotificationAvatar(notification)}
            </div>

            {/* Content */}
            <div className={styles.conversationContent}>
              <div className={styles.conversationTop}>
                <span className={styles.conversationName}>
                  {notification.title}
                </span>
                <span className={styles.conversationTime}>
                  {formatTime(notification.timestamp)}
                </span>
              </div>

              <div className={styles.conversationBottom}>
                <span className={styles.experienceTitle}>
                  {getCategoryIcon(notification.category)}{" "}
                  {getExperienceTitle(notification)}
                </span>
              </div>

              <div className={styles.messagePreview}>
                {notification.message}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {!notification.read && (
                <div className={styles.messageUnreadBadge}>•</div>
              )}

              <div
                style={{
                  opacity: 0,
                  transition: "opacity 0.2s",
                  display: "flex",
                  gap: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
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
        ))
      )}
    </div>
  );

  // Modalità dropdown - con campanella
  // if (mode === "dropdown") {
  // return (
  //   <div className={styles.bellContainer} ref={bellRef}>
  //     <button
  //       className={`${styles.bellButton} ${isOpen ? styles.active : ""}`}
  //       onClick={handleToggle}
  //     >
  //       <Bell size={20} />
  //       <span>Notifications</span>
  //       {unreadCount > 0 && (
  //         <div className={styles.unreadBadge}>{unreadCount}</div>
  //       )}
  //     </button>

  //     {isOpen && (
  //       <div className={styles.dropdownContainer}>
  //         <NotificationList />
  //       </div>
  //     )}
  //   </div>
  // );
  // }

  // Modalità panel - solo lista (per drawer)
  return <NotificationList />;
};

export default NotificationPanel;
