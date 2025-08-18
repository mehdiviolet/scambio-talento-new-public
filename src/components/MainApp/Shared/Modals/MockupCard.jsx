import React, { useState } from "react";
import {
  Globe,
  Home,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Gem,
  Share,
  Bookmark,
  User,
  Users,
} from "lucide-react";
import styles from "./TestCard.module.css";

const MockupCard = ({
  // Dati base corso
  title = "Fotografia / Street Avanzata",
  lezioni = 5,
  durataLezione = "2 Ore",
  costo = 70,
  descrizione = "Corso avanzato di street photography con tecniche professionali e post-produzione.",

  // Istruttore
  istruttore = "Sara Dormand",
  instructorPhoto = null,
  skillGems = 45,
  icon = "📸",

  // Info aggiuntive
  lingua = "IT",
  partecipanti = 3,
  modalita = "online", // "online" o "presenza"

  // Feedback personalizzabili
  feedbacks = [
    {
      id: 1,
      user: "Marco",
      avatar: null,
      comment: "Esperienza fantastica! Molto professionale e coinvolgente.",
      date: "2 giorni fa",
    },
    {
      id: 2,
      user: "Laura",
      avatar: null,
      comment: "Ottima lezione, ho imparato tantissimo. Consigliato!",
      date: "1 settimana fa",
    },
  ],

  // Stato mockup (opzionale per future espansioni)
  mockupState = "idle",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleFeedback = () => {
    setIsFeedbackExpanded(!isFeedbackExpanded);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log("Condividi esperienza:", title);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    console.log("Bookmark esperienza:", title);
  };

  return (
    <div className={styles.testCard}>
      <div className={styles.nav} onClick={toggleExpanded}>
        <h4 className={styles.navTitle}>{title}</h4>
        <div className={styles.navRight}>
          <ul className={styles.navUl}>
            <li>
              {modalita === "online" ? <Globe size={20} /> : <Home size={20} />}
            </li>
            <li>{lingua}</li>
          </ul>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.cardContentSperienza}>
          <div className={styles.infoLezione}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Lezioni:</span>
              <span className={styles.infoValue}>{lezioni}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Durata lezione:</span>
              <span className={styles.infoValue}>{durataLezione}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Costo:</span>
              <span className={styles.infoValue}>{costo} XP</span>
            </div>
          </div>

          <div className={styles.descAvat}>
            <div className={styles.descriptionBox}>{descrizione}</div>
            <div className={styles.requestSection}>
              <div className={styles.ownerPhotoContainer}>
                {instructorPhoto ? (
                  <img
                    src={instructorPhoto}
                    alt={`Foto profilo ${istruttore}`}
                    className={styles.ownerPhotoSmall}
                  />
                ) : (
                  <div className={styles.ownerPlaceholder}>
                    <User size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sezione Feedback */}
          {feedbacks && feedbacks.length > 0 && (
            <div className={styles.feedbackSection}>
              <div className={styles.feedbackHeader} onClick={toggleFeedback}>
                <div className={styles.feedbackTitle}>
                  <MessageCircle size={16} />
                  <span>Feedback ({feedbacks.length})</span>
                </div>
                {isFeedbackExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>

              {isFeedbackExpanded && (
                <div className={styles.feedbackContent}>
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className={styles.feedbackItem}>
                      <div className={styles.feedbackUser}>
                        <div>
                          {feedback.avatar ? (
                            <img
                              src={feedback.avatar}
                              alt={feedback.user}
                              className={styles.feedbackAvatar}
                            />
                          ) : (
                            <div className={styles.avatarPlaceholder}>
                              {feedback.user?.[0]}
                            </div>
                          )}
                        </div>

                        <div className={styles.feedbackInfo}>
                          <span className={styles.feedbackName}>
                            {feedback.user}
                          </span>
                        </div>
                        <span className={styles.feedbackDate}>
                          {feedback.date}
                        </span>
                      </div>
                      <p className={styles.feedbackComment}>
                        {feedback.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={styles.dividere}></div>

          {/* Footer Istruttore */}
          <div className={styles.footerUser}>
            <ul className={styles.userInfo}>
              <li>
                {instructorPhoto ? (
                  <img
                    src={instructorPhoto}
                    alt={`Foto profilo ${istruttore}`}
                    className={styles.instructorPhoto}
                  />
                ) : (
                  <div className={styles.userAvatar}>👨‍🎤</div>
                )}
              </li>
              <p>{istruttore}</p>
            </ul>
            <div className={styles.userGem}>
              <Gem size={16} />
              <span>{skillGems}</span>
              <div className={styles.iconclass}>{icon}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <div className={styles.actionSpacer}></div>
            <button
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              onClick={handleShareClick}
              title="Condividi"
            >
              <Share size={16} />
            </button>
            <button
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              onClick={handleBookmarkClick}
              title="Salva"
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockupCard;
