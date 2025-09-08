import React from "react";
import {
  Star,
  X,
  TrendingUp,
  Calendar,
  Users,
  Award,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import styles from "./CookieModal.module.css";

const StarModal = ({ isOpen, onClose, userStars, averageRating }) => {
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
          <h3>Punteggi Fiducia Creatore</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Main Stars Display */}
          <div className={styles.xpDisplay}>
            <div className={styles.xpValue}>
              <span className={styles.valueNumber}>{userStars}</span>
              <Star size={32} className={styles.xpIcon} />
            </div>

            <h4 className={styles.xpTitle}>Stelle Totali</h4>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <ShieldCheck size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Partecipazione</span>
                <span className={styles.statValue}>
                  {averageRating || "0.0"}/3.0
                </span>
              </div>

              <div className={styles.statItem}>
                <Star size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Fiducia Creatore</span>
                <span className={styles.statValue}>+5 ⭐</span>
              </div>
            </div>

            {/* Stats Grid Uno - Star Sources */}
            <div className={styles.statsGridUno}>
              <div className={styles.statItemUno}>
                <Users size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>
                  Valutazioni Partecipanti:
                </span>
                <span className={styles.statValueUno}>+0-3 ⭐</span>
              </div>

              <div className={styles.statItemUno}>
                <Calendar size={20} className={styles.weekIcon} />
                <span className={styles.statLabel}>Eventi Completati:</span>
                <span className={styles.statValueUno}>Media Feedback</span>
              </div>

              <div className={styles.statItemUno}>
                <AlertTriangle size={20} className={styles.todayIcon} />
                <span className={styles.statLabel}>Cancellazione Evento:</span>
                <span className={styles.statValueUno}>-3 ⭐</span>
              </div>
            </div>

            {/* Info Guide */}
            <div className={styles.infoGuide}>
              <p className={styles.guideText}>
                Stelle basate su valutazioni partecipanti (0-3) e gestione
                eventi. Penalità per cancellazioni dopo conferma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarModal;
