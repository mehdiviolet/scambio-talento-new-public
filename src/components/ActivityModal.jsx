// ActivityModal.jsx
import React from "react";
import { Activity, X, Trophy, Target } from "lucide-react";
import styles from "@/components/MainApp/Profile/CherryModal.module.css";

const ActivityModal = ({
  isOpen,
  onClose,
  giorniConsecutivi,
  percentualeProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🌱 Giorni Consecutivi Attivi</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Progress Section */}
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
              <Activity size={32} className={styles.cherryIcon} />
              <div>
                <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                  <strong>{giorniConsecutivi}</strong> giorno
                  {giorniConsecutivi !== 1 ? "i" : ""} consecutiv
                  {giorniConsecutivi !== 1 ? "i" : "o"}! 🌱
                </p>
              </div>
            </div>

            {/* Progress Bar */}
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
                  width: `${percentualeProgress}%`,
                  background:
                    percentualeProgress >= 90
                      ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                      : "linear-gradient(90deg, #2e9688, #22d3ee)",
                  height: "100%",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>

            {/* Progress Info */}
            <p
              style={{
                textAlign: "center",
                margin: "0 0 1.5rem 0",
                color: "#374151",
                fontSize: "0.9rem",
              }}
            >
              Progresso:{" "}
              <strong style={{ color: "#1f2937" }}>
                {percentualeProgress}%
              </strong>
            </p>

            {/* Goal Section */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "1.25rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Main Goal */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Target size={20} style={{ color: "#f59e0b" }} />
                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    Obiettivo 21 giorni
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.4rem 0.8rem",
                    background: "rgba(251, 191, 36, 0.2)",
                    borderRadius: "20px",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                  }}
                >
                  <Activity size={16} style={{ color: "#f59e0b" }} />
                  <span
                    style={{
                      color: "#92400e",
                      fontWeight: "700",
                      fontSize: "1rem",
                    }}
                  >
                    {giorniConsecutivi}
                  </span>
                </div>
              </div>

              {/* Reward Info */}
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
                  Completa 21 giorni consecutivi per sbloccare il
                  <br />
                  <strong style={{ color: "#f59e0b" }}>
                    Badge Costanza
                  </strong>{" "}
                  🏆
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
                  "La costanza è la chiave del successo!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
