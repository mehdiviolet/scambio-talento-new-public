// components/notifications/RoleSpecificNotificationDropdown.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationsByRole,
  // selectUnreadCountForRole,
  markAsRead,
  markAllAsRead,
  // removeAsyncNotification,
  // showToast,
} from "@/store/slices/notificationSlice";
import {
  MessageCircle,
  BookOpen,
  Calendar,
  Settings,
  Trash2,
  Check,
  Bell,
} from "lucide-react";
import styles from "./NotificationDropdown.module.css";
import { bookmarkCourse } from "@/store/slices/experienceSliceTest";

const RoleSpecificNotificationDropdown = ({ role, title }) => {
  const dispatch = useDispatch();

  // 🎯 SELECTORS SPECIFICI PER RUOLO
  const notifications = useSelector(selectNotificationsByRole(role));
  const unreadCount = useSelector(
    (state) =>
      state.notifications.asyncNotifications.filter(
        (n) => !n.read && (n.targetRole === role || n.targetRole === "both")
      ).length
  );

  // 🔍 DEBUG: Vedi quante notifiche ci sono
  console.log("🔍 Notifiche per role", role, ":", notifications);
  console.log(
    "🔍 Tutte le notifiche:",
    useSelector((state) => state.notifications.asyncNotifications)
  );

  const [isOpen, setIsOpen] = React.useState(false);

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
    // dispatch(removeAsyncNotification(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead({ role }));
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }

    if (notification.actionData?.action === "bookmark_question") {
      handleBookmarkQuestion(notification);
      return;
    }

    // Handle navigation based on category/actionData
    if (notification.actionData) {
      switch (notification.category) {
        case "course":
          console.log(
            `[${role}] Navigate to course:`,
            notification.actionData.experienceId
          );
          break;
        case "chat":
          console.log(
            `[${role}] Navigate to chat:`,
            notification.actionData.conversationId
          );
          break;
        default:
          break;
      }
    }
  };

  // 🆕 NUOVA FUNZIONE
  const handleBookmarkQuestion = (notification) => {
    const confirmed = window.confirm(
      `Salvare "${notification.actionData.title}" nei bookmark?`
    );

    if (confirmed) {
      // Esegui bookmark
      dispatch(
        bookmarkCourse({
          experienceId: notification.actionData.experienceId,
          userId: "currentUser",
          experienceData: notification.actionData.experienceData,
          istruttore: notification.actionData.istruttore,
          instructorPhoto: notification.actionData.instructorPhoto,
          skillGems: notification.actionData.skillGems,
        })
      );

      // Toast conferma (se hai showToast disponibile)
      // dispatch(
      //   showToast({
      //     message: "Corso salvato nei bookmark!",
      //     type: "success",
      //     role: "student",
      //     duration: 2000,
      //   })
      // );
    }

    // Rimuovi notifica in entrambi i casi
    // dispatch(removeAsyncNotification(notification.id));
  };

  const getRoleColor = () => {
    return role === "owner" ? "#3b82f6" : "#10b981"; // Blue for owner, Green for viewer
  };

  const getRoleEmoji = () => {
    return role === "owner" ? "👩‍🏫" : "👨‍🎓";
  };

  return (
    <div className={styles.roleNotificationContainer}>
      {/* 🔔 NOTIFICATION BELL SPECIFIC TO ROLE */}
      <div
        className={styles.notificationBell}
        style={{ borderColor: getRoleColor() }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.bellButton}
          style={{ color: getRoleColor() }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              className={styles.badge}
              style={{ backgroundColor: getRoleColor() }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* 📋 DROPDOWN PANEL */}
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div
            className={styles.dropdown}
            style={{ borderTopColor: getRoleColor() }}
          >
            <div
              className={styles.header}
              style={{ backgroundColor: getRoleColor() }}
            >
              <h4>
                {getRoleEmoji()} {title}
              </h4>
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
                  <p>Nessuna notifica per {role}</p>
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
                      <div className={styles.notificationMeta}>
                        <span className={styles.notificationTime}>
                          {formatTime(notification.timestamp)}
                        </span>
                        {notification.fromRole && (
                          <span
                            className={styles.fromRole}
                            style={{ color: getRoleColor() }}
                          >
                            da {notification.fromRole}
                          </span>
                        )}
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

            {/* 📊 STATS FOOTER */}
            <div className={styles.footer}>
              <small>
                {notifications.length} totali • {unreadCount} non lette
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleSpecificNotificationDropdown;
