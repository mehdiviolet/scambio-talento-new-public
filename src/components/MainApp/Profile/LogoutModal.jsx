import React, { useState } from "react";
import { LogOut, X, AlertTriangle } from "lucide-react";
import styles from "./InviteFriendModal.module.css";

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
            <div className={styles.inviteValue}>
              <LogOut
                size={32}
                className={styles.inviteIcon}
                style={{ color: "var(--danger-red)" }}
              />
            </div>

            <h4
              className={styles.inviteTitle}
              style={{ color: "var(--danger-red)" }}
            >
              Disconnessione Account
            </h4>

            {/* Warning Message */}
            <div className={styles.section}>
              <div
                className={styles.linkContainer}
                style={{
                  flexDirection: "column",
                  gap: "1rem",
                  textAlign: "center",
                  padding: "1rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <AlertTriangle
                  size={24}
                  style={{ color: "var(--danger-red)", alignSelf: "center" }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontWeight: "600",
                      color: "var(--danger-red-dark)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Sei sicuro di voler uscire?
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "var(--text-primary-light)",
                      lineHeight: "1.4",
                    }}
                  >
                    Dovrai effettuare nuovamente l'accesso per utilizzare l'app
                    e accedere ai tuoi dati.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.section}>
              <div
                className={styles.shareButtonsLogOut}
                style={{ gap: "1rem" }}
              >
                <button
                  onClick={onClose}
                  className={styles.shareBtn}
                  disabled={isLoggingOut}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.25)",
                    color: "var(--text-primary)",
                  }}
                >
                  Annulla
                </button>

                <button
                  onClick={handleLogout}
                  className={styles.actionBtn}
                  disabled={isLoggingOut}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    background: isLoggingOut
                      ? "rgba(239, 68, 68, 0.6)"
                      : "rgba(239, 68, 68, 0.2)",
                    borderColor: "var(--danger-red)",
                    color: "var(--danger-red-dark)",
                    opacity: isLoggingOut ? 0.7 : 1,
                  }}
                >
                  {isLoggingOut ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid transparent",
                          borderTop: "2px solid var(--danger-red-dark)",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
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
            <div
              className={styles.rewardInfo}
              style={{
                // borderLeft: "3px solid var(--danger-red)",
                background: "rgba(239, 68, 68, 0.05)",
              }}
            >
              {/* <LogOut
                size={20}
                className={styles.rewardIcon}
                style={{ color: "var(--danger-red)" }}
              /> */}
              <p
                className={styles.rewardText}
                style={{ color: "var(--danger-red-dark)" }}
              >
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
