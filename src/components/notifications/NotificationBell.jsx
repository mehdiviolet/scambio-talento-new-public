// components/notifications/NotificationBell.jsx
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  // selectUnreadCount,
  selectIsDropdownOpen,
  toggleDropdown,
  closeDropdown,
  selectUnreadCountByRole,
  selectNotificationsForCurrentRole,
  selectCurrentRole,
  setCurrentRole,
} from "@/store/slices/notificationSlice";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import styles from "../../components/ChatComponent.module.css";

const NotificationBell = ({ currentRole }) => {
  const dispatch = useDispatch();

  // Se passa una prop, usala, altrimenti usa lo store
  const roleFromStore = useSelector(selectCurrentRole);
  const activeRole = currentRole || roleFromStore;

  const isOpen = useSelector(selectIsDropdownOpen);
  // const unreadCount = useSelector(selectUnreadCount);
  const bellRef = useRef(null);

  useEffect(() => {
    if (currentRole && currentRole !== roleFromStore) {
      dispatch(setCurrentRole(currentRole));
    }
  }, [currentRole, roleFromStore, dispatch]);

  const unreadCount = useSelector(selectUnreadCountByRole(activeRole));

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
    <>
      <NotificationDropdown currentRole={activeRole} />
      <div className={styles.bellContainer} ref={bellRef}>
        {/* <button
        className={`${styles.bellButton} ${isOpen ? styles.active : ""}`}
        onClick={handleToggle}
        > */}
        {/* <Bell size={20} /> */}
        {/* {unreadCount > 0 && (
          <span className={styles.badge}>
          {unreadCount > 99 ? "99+" : unreadCount}
          </span>
          )} */}

        {/* </button> */}

        {/* {isOpen && <NotificationDropdown currentRole={currentRole} />} */}
      </div>
    </>
  );
};

export default NotificationBell;
