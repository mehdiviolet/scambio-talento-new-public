import React from "react";
import { Activity, X, Trophy, Target, Cookie } from "lucide-react";
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
          <h3>Giorni Consecutivi Attivi</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Main Activity Display */}
          <div className={styles.activityDisplay}>
            <div className={styles.activityValue}>
              <Activity size={32} className={styles.activityIcon} />{" "}
              <span className={styles.valueNumber}>0</span>
            </div>

            <h4 className={styles.statsTitle}>
              <strong>{giorniConsecutivi}</strong> giorno
              {giorniConsecutivi !== 1 ? "i" : ""} consecutiv
              {giorniConsecutivi !== 1 ? "i" : "o"}!
            </h4>

            {/* Progress Bar */}
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

            <div className={styles.progressBadge}>
              {/* Goal Info */}
              <div className={styles.goalInfo}>
                <div className={styles.goalHeader}>
                  <span className={styles.goalTitle}>
                    21 giorni consecutivi:
                  </span>
                  <span className={styles.badgeNumber}>1</span>
                  <Activity size={20} className={styles.badgeIcon} />
                </div>
                <div className={styles.goalHeader}>
                  <span className={styles.badgeNumber}>1</span>
                  <Activity size={20} className={styles.badgeIcon} />
                  <span className={styles.badgeNumber}> = 50</span>
                  <Cookie size={20} className={styles.badgeIcon} />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
