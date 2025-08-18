import React, { useState } from "react";
import { LogOut, X } from "lucide-react";
import styles from "./SharedModal.module.css";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Simula chiamata API logout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simula cleanup: localStorage, sessionStorage, etc.
      console.log("🔐 Clearing user session...");
      console.log("🗑️ Clearing local storage...");
      console.log("🔄 Redirecting to login...");

      // Chiama la funzione di conferma dal parent
      onConfirm && onConfirm();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.logoutModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <LogOut size={24} className={styles.logoutIcon} />
          </div>
          <h2>Logout</h2>
          <button onClick={onClose} disabled={isLoggingOut}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.logoutContent}>
            <p className={styles.logoutMessage}>
              Sei sicuro di voler uscire dal tuo account?
            </p>
            <p className={styles.logoutSubtext}>
              Dovrai effettuare nuovamente l'accesso per utilizzare l'app.
            </p>
          </div>

          <div className={styles.logoutActions}>
            <button
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoggingOut}
            >
              Annulla
            </button>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <div className={styles.spinner}></div>
                  Disconnessione...
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
