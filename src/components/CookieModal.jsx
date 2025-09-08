import React from "react";
import { Cookie, X, Star, TrendingUp } from "lucide-react";
import styles from "./CookieModal.module.css";

const CookieModal = ({ isOpen, onClose, userXP }) => {
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
          <h3>Experience Points</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Main XP Display */}
          <div className={styles.xpDisplay}>
            <div className={styles.xpValue}>
              <span className={styles.valueNumber}>{userXP}</span>
              <Cookie size={32} className={styles.xpIcon} />
            </div>

            <h4 className={styles.xpTitle}>XP Totali</h4>

            {/* Progress Bar */}
            {/* <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${userXP % 100}%` }}
                />
              </div>
              <p className={styles.progressText}>
                Progresso livello: <strong>{userXP % 100}%</strong>
              </p>
            </div> */}

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <Star size={20} className={styles.todayIcon} />
                <span className={styles.statLabel}>Oggi</span>
                <span className={styles.statValue}>+25 XP</span>
              </div>

              <div className={styles.statItem}>
                <TrendingUp size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Questa settimana</span>
                <span className={styles.statValue}>+120 XP</span>
              </div>
            </div>

            {/* Info Guide */}
            <div className={styles.infoGuide}>
              <p className={styles.guideText}>
                Fonti XP: Slot Machine, Completamento Profilo, Feedback
                Positivi, Esperienze Completate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
