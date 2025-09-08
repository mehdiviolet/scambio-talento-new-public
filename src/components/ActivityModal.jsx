// ActivityModal.jsx
import React from "react";
import { Activity, X, Trophy, Target } from "lucide-react";
import styles from "./ActivityModal.module.css";

const ActivityModal = ({
  isOpen,
  onClose,
  giorniConsecutivi,
  percentualeProgress,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>🌱 Giorni Consecutivi Attivi</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Main Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.iconContainer}>
              <Activity size={32} className={styles.activityIcon} />
            </div>

            <div className={styles.statsContent}>
              <h4 className={styles.statsTitle}>
                <strong>{giorniConsecutivi}</strong> giorno
                {giorniConsecutivi !== 1 ? "i" : ""} consecutiv
                {giorniConsecutivi !== 1 ? "i" : "o"}!
              </h4>

              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${
                      percentualeProgress >= 90
                        ? styles.progressGold
                        : styles.progressTeal
                    }`}
                    style={{ width: `${percentualeProgress}%` }}
                  />
                </div>

                <p className={styles.progressText}>
                  Progresso: <strong>{percentualeProgress}%</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Goal Section */}
          <div className={styles.goalSection}>
            <div className={styles.goalHeader}>
              <div className={styles.goalInfo}>
                <Target size={20} className={styles.targetIcon} />
                <span className={styles.goalTitle}>Obiettivo 21 giorni</span>
              </div>

              <div className={styles.progressBadge}>
                <Activity size={16} className={styles.badgeIcon} />
                <span className={styles.badgeNumber}>{giorniConsecutivi}</span>
              </div>
            </div>

            {/* Reward Info */}
            <div className={styles.rewardContainer}>
              <Trophy size={24} className={styles.trophyIcon} />
              <div className={styles.rewardText}>
                <p>
                  Completa 21 giorni consecutivi per sbloccare il
                  <br />
                  <strong className={styles.badgeHighlight}>
                    Badge Costanza
                  </strong>{" "}
                  🏆
                </p>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className={styles.quoteContainer}>
              <p className={styles.quoteText}>
                "La costanza è la chiave del successo!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
