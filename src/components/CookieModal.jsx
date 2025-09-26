import React from "react";
import {
  Cookie,
  X,
  Star,
  TrendingUp,
  Cherry,
  Telescope,
  Book,
  Activity,
  Trash2,
} from "lucide-react";
import styles from "./CookieModal.module.css";
import IconButton from "./ui/IconButton";

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
          <h3>XP Totali</h3>
          {/* <h3>XP</h3> */}
          {/* <Cookie size={32} className={styles.xpIcon} /> */}
          {/* <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button> */}

          <IconButton icon={X} onClick={onClose} />
        </div>

        <div className={styles.content}>
          {/* Main XP Display */}
          <div className={styles.xpDisplay}>
            <div className={styles.xpValue}>
              <span className={styles.valueNumber}>{userXP}</span>
              {/* <Cookie size={32} className={styles.xpIcon} /> */}
              <h1 style={{ color: "var(--secondary)" }}>XP</h1>

              {/* <h1>XP</h1> */}
            </div>

            {/* <h4 className={styles.xpTitle}>XP Totali</h4> */}

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

            {/* Stats Grid--uno */}
            <div className={styles.statsGridUno}>
              {/* <span>Oggi:</span> */}
              <div className={styles.statItemUno}>
                <Cherry size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Slot Machine:</span>
                <span className={styles.statValueUno}>+10 XP</span>
              </div>

              <div className={styles.statItemUno}>
                <Telescope size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Feedback Positivi:</span>
                <span className={styles.statValueUno}>+10 XP </span>
              </div>
              <div className={styles.statItemUno}>
                <Activity size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>
                  21 Giorni Consecutivi Attivi:
                </span>
                <span className={styles.statValueUno}>+50 XP </span>
              </div>
              <div className={styles.statItemUno}>
                <Book size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Esperienza:</span>
                <span className={styles.statValueUno}>+80 XP </span>
              </div>
              <div className={styles.statItemUno}>
                <TrendingUp size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Completamento Profilo:</span>
                <span className={styles.statValueUno}>+200 XP</span>
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
