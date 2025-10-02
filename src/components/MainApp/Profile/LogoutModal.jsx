import React, { useState } from "react";
import { LogOut, X, AlertTriangle } from "lucide-react";

import extendedStyles from "./LogoutModal.module.css";
import baseStyles from "../../../components/CookieModal.module.css";
import { ButtonCancel } from "@/components/ui/ButtonActions";

const styles = { ...baseStyles, ...extendedStyles };

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isOpen) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Simula chiamata API logout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simula cleanup: localStorage, sessionStorage, etc.
      console.log("Clearing user session...");
      console.log("Clearing local storage...");
      console.log("Redirecting to login...");

      // Chiama la funzione di conferma dal parent
      onConfirm && onConfirm();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Conferma Logout</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoggingOut}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            {/* Icon and Title */}
            <div className={styles.inviteValue}>
              <LogOut size={32} className={styles.logoutIcon} />
            </div>

            <h4 className={`${styles.inviteTitle} ${styles.logoutTitle}`}>
              Disconnessione Account
            </h4>

            {/* Warning Message */}
            <div className={styles.section}>
              <div
                className={`${styles.linkContainer} ${styles.warningContainer}`}
              >
                <AlertTriangle size={24} className={styles.warningIcon} />
                <div>
                  <p className={styles.warningTitle}>
                    Sei sicuro di voler uscire?
                  </p>
                  <p className={styles.warningDescription}>
                    Dovrai effettuare nuovamente l'accesso per utilizzare l'app
                    e accedere ai tuoi dati.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.section}>
              <div
                className={`${styles.shareButtonsLogOut} ${styles.logoutButtonsContainer}`}
              >
                <ButtonCancel
                  onClick={onClose}
                  disabled={isLoggingOut}
                  className={`${styles.shareBtn} ${styles.cancelBtn}`}
                >
                  Annulla
                </ButtonCancel>

                <button
                  onClick={handleLogout}
                  className={`${styles.actionBtn} ${styles.logoutBtn}`}
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

            {/* Info */}
            <div className={`${styles.rewardInfo} ${styles.logoutInfo}`}>
              <p className={`${styles.rewardText} ${styles.logoutInfoText}`}>
                I tuoi dati rimarranno al sicuro. Potrai accedere nuovamente in
                qualsiasi momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
