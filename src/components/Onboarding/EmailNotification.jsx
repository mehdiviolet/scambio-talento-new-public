import React, { useState, useEffect } from "react";
import styles from "./EmailNotification.module.css";

const EmailNotification = ({ onNotificationClick, show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Delay di 3 secondi poi appare
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onNotificationClick();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.notification} onClick={handleClick}>
      <div className={styles.notificationIcon}>📧</div>
      <div className={styles.notificationContent}>
        <div className={styles.notificationTitle}>Nuova Email</div>
        <div className={styles.notificationText}>
          Reset Password - TalentExchange
        </div>
      </div>
      <div className={styles.notificationTime}>ora</div>
    </div>
  );
};

export default EmailNotification;
