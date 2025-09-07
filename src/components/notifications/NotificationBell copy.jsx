// components/notifications/NotificationBell.jsx
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bell } from "lucide-react";
import {
  selectUnreadCountForCurrentRole,
  selectIsDropdownOpen,
  toggleDropdown,
  closeDropdown,
} from "@/store/slices/notificationSlice";
import NotificationPanel from "./NotificationPanel";
import styles from "./NotificationBell.module.css";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(selectUnreadCountForCurrentRole);
  const isOpen = useSelector(selectIsDropdownOpen);
  const bellRef = useRef(null);

  // Chiudi dropdown se click fuori (standard UX)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        dispatch(closeDropdown());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, dispatch]);

  return (
    <div className={styles.container} ref={bellRef}>
      <button
        className={`${styles.bellButton} ${isOpen ? styles.active : ""}`}
        onClick={() => dispatch(toggleDropdown())}
        aria-label={`Notifiche ${
          unreadCount > 0 ? `(${unreadCount} non lette)` : ""
        }`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationPanel />}
    </div>
  );
};

export default NotificationBell;
