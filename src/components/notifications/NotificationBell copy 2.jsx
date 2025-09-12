// components/notifications/NotificationBell.jsx
import React, { useRef, useEffect, useState } from "react";
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
  selectNotificationsByRole,
} from "@/store/slices/notificationSlice";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import styles from "../../components/ChatComponent.module.css";

const NotificationBell = ({ currentRole }) => {
  const dispatch = useDispatch();

  // Se passa una prop, usala, altrimenti usa lo store
  const roleFromStore = useSelector(selectCurrentRole);
  const activeRole = currentRole || roleFromStore;

  console.log("NOTTTTBELL", currentRole);

  // const isOpen = useSelector(selectIsDropdownOpen);
  const [isOpen, setIsOpen] = useState(false);
  // const unreadCount = useSelector(selectUnreadCount);
  // const unreadCount = useSelector(selectUnreadCountByRole(activeRole));
  const unreadCount = useSelector(selectUnreadCountByRole(currentRole));
  // const notifications = useSelector(selectNotificationsByRole(currentRole));
  // const notifications = useSelector(selectNotificationsByRole("owner"));
  const notifications = useSelector(selectNotificationsByRole("viewer"));
  const handleToggle = () => {
    setIsOpen(!isOpen); // Usa stato locale
  };
  const bellRef = useRef(null);

  useEffect(() => {
    if (currentRole && currentRole !== roleFromStore) {
      dispatch(setCurrentRole(currentRole));
    }
  }, [currentRole, roleFromStore, dispatch]);
  console.log("NNNNNNNnotifications", notifications);

  // Chiudi dropdown se click fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        // dispatch(closeDropdown());
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // const handleToggle = () => {
  //   dispatch(toggleDropdown());
  // };

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
