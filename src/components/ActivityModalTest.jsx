import React from "react";
import { Activity, X, Trophy, Target, Cookie } from "lucide-react";
import { useSelector } from "react-redux";
import { selectDemoState } from "@/services/xpService";
import baseStyles from "./CookieModal.module.css";
import extendedStyles from "./ActivityModal.module.css";
const styles = { ...baseStyles, ...extendedStyles };

const ActivityModalTest = ({ isOpen, onClose }) => {
  // Accesso diretto Redux per dati attività
  const demoState = useSelector(selectDemoState);
  const giorniConsecutivi = demoState.currentDay;

  // Configurazione - stesso del MainAppRouter
  const GIORNI_MASSIMI = 20;

  // Funzioni di calcolo spostate nel modal
  const calcolaPercentualeProgressBar = (giorniAttuali, giorniMax) => {
    const percentuale = Math.min((giorniAttuali / giorniMax) * 100, 100);
    return Math.round(percentuale);
  };

  const getMessaggioGiorni = (giorni, max) => {
    if (giorni >= max) {
      return "Grande! 💎";
    } else if (giorni === 0) {
      return "Inizia il tuo streak!";
    } else if (giorni >= max - 3) {
      return `Ci sei quasi! ${giorni} giorni! 🔥`;
    } else if (giorni >= max - 5) {
      return `Quasi al traguardo! ${giorni} giorni! ⭐`;
    } else if (giorni >= max / 2) {
      return `Ottimo lavoro! ${giorni} giorni! 🚀`;
    } else if (giorni >= 5) {
      return `Continua così! ${giorni} giorni! 💪`;
    } else {
      return `${giorni} ${giorni > 1 ? "" : "giorno"} 🌱`;
    }
  };

  // Calcoli basati sui dati Redux
  const percentualeProgress = calcolaPercentualeProgressBar(
    giorniConsecutivi,
    GIORNI_MASSIMI
  );
  const messaggioGiorni = getMessaggioGiorni(giorniConsecutivi, GIORNI_MASSIMI);

  // Calcolo badge achievements
  const badgeEarnedCount = Math.floor(giorniConsecutivi / 21);
  const cookieReward = badgeEarnedCount * 50;
  const giorniRimasti = 21 - (giorniConsecutivi % 21);

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
          <h3>Giorni Consecutivi </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Main Activity Display */}
          <div className={styles.activityDisplay}>
            <div className={styles.activityValue}>
              <Activity size={32} className={styles.activityIcon} />
              {/* <span className={styles.valueNumber}>{giorniConsecutivi}</span> */}
              <span className={styles.valueNumber}>0</span>
            </div>

            <h4 className={styles.statsTitle}>
              <strong>{giorniConsecutivi}</strong> giorno
              {giorniConsecutivi !== 1 ? "i" : ""} consecutiv
              {giorniConsecutivi !== 1 ? "i" : "o"}!
            </h4>

            {/* Message dinamico */}
            {/* <p className={styles.dynamicMessage}>{messaggioGiorni}</p> */}

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
                Progresso verso 20 giorni:{" "}
                <strong>{percentualeProgress}%</strong>
              </p>
            </div>

            {/* Badge System */}
            <div className={styles.progressBadge}>
              <div className={styles.goalInfo}>
                {/* Badge guadagnati */}
                {badgeEarnedCount > 0 && (
                  <div className={styles.goalHeader}>
                    <span className={styles.goalTitle}>Badge guadagnati:</span>
                    <span className={styles.badgeNumber}>
                      {badgeEarnedCount}
                    </span>
                    <Activity size={20} className={styles.badgeIcon} />
                  </div>
                )}

                {/* Cookie guadagnati */}
                {cookieReward > 0 && (
                  <div className={styles.goalHeader}>
                    <span className={styles.goalTitle}>XP guadagnati:</span>
                    <span className={styles.badgeNumber}>{cookieReward}</span>
                    <Cookie size={20} className={styles.badgeIcon} />
                  </div>
                )}

                {/* Sezione guida/regole - FISSA */}
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
                  <span className={styles.badgeNumber}>
                    {" "}
                    = 50 <strong>XP</strong>{" "}
                  </span>
                  {/* <Cookie size={20} className={styles.badgeIcon} /> */}
                </div>

                {/* Prossimo obiettivo - dinamico */}
                {/* <div className={styles.nextGoal}>
                  <span className={styles.goalSubtext}>
                    {giorniConsecutivi < 21
                      ? `Ancora ${21 - giorniConsecutivi} giorni per 50 XP`
                      : `Ancora ${giorniRimasti} giorni per +50 XP`}
                  </span>
                </div> */}
              </div>
            </div>
            {/* Motivational message */}
            {giorniConsecutivi === 0 && (
              <div className={styles.motivationalBox}>
                <p>
                  Inizia oggi il tuo streak di attività! Ogni giorno consecutivo
                  ti avvicina ai tuoi obiettivi.
                </p>
              </div>
            )}

            {giorniConsecutivi >= GIORNI_MASSIMI && (
              <div className={styles.achievementBox}>
                <Trophy size={24} className={styles.trophyIcon} />
                <p>Complimenti! Hai raggiunto l'obiettivo massimo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModalTest;
