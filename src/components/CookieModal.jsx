// CookieModal.jsx
import React from "react";
import { Cookie, X, Trophy, Star, TrendingUp } from "lucide-react";
import styles from "@/components/MainApp/Profile/CherryModal.module.css";

const CookieModal = ({ isOpen, onClose, userXP }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🍪 Experience Points</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.cherryStats}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
                justifyContent: "center",
              }}
            >
              <Cookie size={32} className={styles.cherryIcon} />
              <div>
                <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                  <strong>{userXP}</strong> XP Totali
                </p>
              </div>
            </div>

            {/* Progress verso prossimo livello */}
            <div
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                height: "8px",
                overflow: "hidden",
                marginBottom: "1rem",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: `${userXP % 100}%`,
                  background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
                  height: "100%",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>

            {/* Info livello */}
            <p
              style={{
                textAlign: "center",
                margin: "0 0 1.5rem 0",
                color: "#374151",
                fontSize: "0.9rem",
              }}
            >
              Livello: <strong>{Math.floor(userXP / 100) + 1}</strong> •
              Prossimo livello: <strong>{100 - (userXP % 100)} XP</strong>
            </p>

            {/* Statistiche XP */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "1.25rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Star
                    size={20}
                    style={{ color: "#f59e0b", marginBottom: "0.5rem" }}
                  />
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}
                  >
                    Oggi
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    +25 XP
                  </p>
                </div>

                <div style={{ textAlign: "center" }}>
                  <TrendingUp
                    size={20}
                    style={{ color: "#10b981", marginBottom: "0.5rem" }}
                  />
                  <p
                    style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}
                  >
                    Questa settimana
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    +120 XP
                  </p>
                </div>
              </div>

              {/* Fonti XP */}
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                }}
              >
                <Trophy
                  size={24}
                  style={{
                    color: "#fbbf24",
                    marginBottom: "0.5rem",
                    display: "block",
                    margin: "0 auto 0.5rem auto",
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    color: "#374151",
                    lineHeight: "1.4",
                  }}
                >
                  Fonti XP: Slot Machine, Completamento Profilo,
                  <br />
                  Feedback Positivi, Esperienze Completate
                </p>
              </div>

              {/* Motivational Quote */}
              <div
                style={{
                  textAlign: "center",
                  padding: "0.75rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "8px",
                  borderLeft: "3px solid #3b82f6",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: "#1e40af",
                    fontStyle: "italic",
                    fontWeight: "500",
                  }}
                >
                  "Ogni XP ti avvicina al prossimo traguardo!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
