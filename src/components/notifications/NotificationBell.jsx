// components/notifications/NotificationBell.jsx
import React, { useRef, useEffect, useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import styles from "../../components/ChatComponent.module.css";

const NotificationBell = ({
  currentRole,
  notifications = [],
  unreadCount = 0,
  showBell = false, // Per decidere se mostrare la campanella o solo il dropdown
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log(notifications);

  // Chiudi dropdown se click fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.bellContainer} ref={bellRef}>
      {showBell && (
        <button
          className={`${styles.bellButton} ${isOpen ? styles.active : ""}`}
          onClick={handleToggle}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className={styles.badge}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Dropdown sempre visibile quando in modalità drawer */}
      {(isOpen || !showBell) && (
        <NotificationDropdown
          currentRole={currentRole}
          notifications={notifications}
          unreadCount={unreadCount}
        />
      )}
    </div>
  );
};

export default NotificationBell;
