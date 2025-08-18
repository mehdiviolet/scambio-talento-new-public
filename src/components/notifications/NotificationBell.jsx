// components/notifications/NotificationBell.jsx
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  // selectUnreadCount,
  selectIsDropdownOpen,
  toggleDropdown,
  closeDropdown,
} from "@/store/slices/notificationSlice";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import styles from "./NotificationBell.module.css";

const NotificationBell = () => {
  const dispatch = useDispatch();
  // const unreadCount = useSelector(selectUnreadCount);
  const isOpen = useSelector(selectIsDropdownOpen);
  const bellRef = useRef(null);

  // Chiudi dropdown se click fuori
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

  const handleToggle = () => {
    dispatch(toggleDropdown());
  };

  return (
    <div className={styles.bellContainer} ref={bellRef}>
      <button
        className={`${styles.bellButton} ${isOpen ? styles.active : ""}`}
        onClick={handleToggle}
      >
        <Bell size={20} />
        {/* {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )} */}
      </button>

      {isOpen && <NotificationDropdown />}
    </div>
  );
};

export default NotificationBell;
