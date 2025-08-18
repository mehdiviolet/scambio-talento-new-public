import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Gem,
  ChevronDown,
  ChevronUp,
  GemIcon,
} from "lucide-react";
// import styles from "@components/MainApp/Shared/Modals/TestCard.module.css";
import styles from "@components/MainApp/Shared/Modals/TestCard.module.css";
import { useQuickSetup } from "@/hooks/useQuickSetup";

const CompletionCardsTest = ({ data, instructorPhoto }) => {
  const [expandedCards, setExpandedCards] = useState({});
  const { profileData } = useQuickSetup();
  console.log(data);

  const toggleExpanded = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Se non ci sono corsi completati
  if (!data || data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>🎓 Nessun corso completato ancora</p>
      </div>
    );
  }

  // 🆕 GESTISCI ENTRAMBI I TIPI DI DATI
  const processedData = data.map((item, index) => {
    // Se è un bookmark (rejected/completed), trasformalo nel formato giusto
    if (item.experienceId && !item.role) {
      // Determina se è rejected o completed basandosi sui dati disponibili
      const isRejected =
        item.status === "rejected" ||
        (item.rejectData && item.rejectData.comment);

      return {
        completionId: item.experienceId || `temp-${index}`,
        title: item.experienceData?.title || "Corso",
        completedAt: item.completedAt || new Date().toISOString(),
        duration: `${item.experienceData?.lezioni || "N/A"} lezioni`,
        cost: item.experienceData?.costo || 0,
        participant: item.istruttore || "Istruttore",
        feedback: item.feedback || null,

        // 🆕 USA I DATI SALVATI NEL BOOKMARK:
        gems:
          item.currentSkillGems ||
          item.skillGemsAtBookmark ||
          item.skillGems ||
          0,
        instructorPhoto: item.instructorPhoto, // ← Ora è salvata nel bookmark
        instructorName: `${item.instructorFirstName || ""} ${
          item.instructorLastName || ""
        }`.trim(),

        role: "viewer",
        isRejected: isRejected,
        rejectComments: item.rejectComments || [],
        rejectedBy: item.rejectData?.rejectedBy || null,
      };
    }
    // Se è già un completionCard, restituiscilo così com'è (questi sono success)
    return {
      ...item,
      isRejected: false,
    };
  });

  const viewerData = processedData.filter((card) => card.role === "viewer");
  const istruttore = processedData.filter((card) => card.role !== "viewer");
  console.log(istruttore);

  return (
    <div>
      {viewerData.map((card) => {
        const isSuccess = !card.isRejected;

        return (
          <div
            className={`${styles.testCard} ${
              isSuccess ? styles.successCard : styles.rejectedCard
            }`}
            key={card.completionId}
            style={{
              borderColor: isSuccess ? "#22c55e" : "#ef4444",
              backgroundColor: isSuccess ? "#f0fdf4" : "#fef2f2",
            }}
          >
            {/* Header espandibile */}
            <div
              className={styles.nav}
              onClick={() => toggleExpanded(card.completionId)}
            >
              <h4 className={styles.navTitle}>
                {isSuccess ? "🎓" : "❌"} {card.title}
              </h4>
              <div className={styles.navRight}>
                {isSuccess ? (
                  <CheckCircle size={20} color="#22c55e" />
                ) : (
                  <XCircle size={20} color="#ef4444" />
                )}
                <div className={styles.expandIcon}>
                  {expandedCards[card.completionId] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* Content espandibile */}
            {expandedCards[card.completionId] && (
              <div className={styles.cardContentSperienza}>
                {/* Info principali */}
                <div className={styles.infoLezione}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      {isSuccess ? "Completato:" : "Interrotto:"}
                    </span>
                    <span className={styles.infoValue}>
                      {formatDate(card.completedAt)}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Status:</span>
                    <span className={styles.infoValue}>
                      {isSuccess ? "✅ Completato" : "❌ Rifiutato"}
                    </span>
                  </div>
                </div>

                {/* Durata e Costo */}
                <div className={styles.infoLezione}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Durata:</span>
                    <span className={styles.infoValue}>{card.duration}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Costo:</span>
                    <span className={styles.infoValue}>{card.cost} XP</span>
                  </div>
                </div>

                {/* 🆕 SEZIONE FEEDBACK/COMMENTI - SEMPRE AL CENTRO */}
                {((isSuccess && card.feedback) ||
                  (!isSuccess &&
                    card.rejectComments &&
                    card.rejectComments.length > 0) ||
                  (!isSuccess &&
                    (!card.rejectComments ||
                      card.rejectComments.length === 0))) && (
                  <>
                    <div className={styles.dividere}></div>

                    <div className={styles.feedbackSection}>
                      <div className={styles.feedbackContent}>
                        {/* SUCCESS: feedback dello studente */}
                        {isSuccess && card.feedback && (
                          <div className={styles.feedbackItem}>
                            <div className={styles.feedbackUser}>
                              <div className={styles.feedbackAvatar}>
                                <img src={profileData.profilePhoto} alt="Tu" />
                              </div>

                              <p className={styles.feedbackComment}>
                                "{card.feedback}"
                              </p>
                              {card.gems}
                              <span>
                                <GemIcon size={20} />
                              </span>
                            </div>
                          </div>
                        )}

                        {/* REJECTED: tutti i commenti della conversazione */}
                        {!isSuccess &&
                          card.rejectComments &&
                          card.rejectComments.length > 0 &&
                          card.rejectComments.map((comment, idx) => (
                            <div key={idx} className={styles.feedbackItem}>
                              <div className={styles.feedbackUser}>
                                <div className={styles.feedbackAvatar}>
                                  {comment.author === "student" ? (
                                    <img
                                      src={profileData.profilePhoto}
                                      alt="Tu"
                                    />
                                  ) : (
                                    <img
                                      src={card.instructorPhoto}
                                      alt={card.participant}
                                    />
                                  )}
                                </div>
                                <div className={styles.feedbackInfo}>
                                  <span className={styles.feedbackName}>
                                    {comment.author === "student"
                                      ? "Tu"
                                      : card.participant}
                                  </span>
                                  <div className={styles.feedbackDate}>
                                    {formatDate(comment.timestamp)}
                                  </div>
                                </div>
                              </div>
                              <p className={styles.feedbackComment}>
                                "{comment.comment}"
                              </p>
                            </div>
                          ))}

                        {/* REJECTED senza commenti */}
                        {!isSuccess &&
                          (!card.rejectComments ||
                            card.rejectComments.length === 0) && (
                            <div className={styles.feedbackItem}>
                              <p
                                className={styles.feedbackComment}
                                style={{ fontStyle: "italic", color: "#666" }}
                              >
                                Nessun commento nella conversazione di rifiuto
                              </p>
                            </div>
                          )}
                      </div>
                    </div>

                    <div className={styles.dividere}></div>
                  </>
                )}

                {/* Footer con ruolo - SEMPRE IN FONDO */}
                <div className={styles.footerUser}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {/* <img src={profileData.profilePhoto} alt="Tu" /> */}
                      <img src={card.instructorPhoto} alt="istruttore" />
                    </div>
                    <div>
                      <p>{card.participant}</p>
                    </div>
                  </div>

                  {isSuccess && (
                    <div className={styles.userGem}>
                      <Gem size={16} />
                      <span>{card.skillGemsAtBookmark}</span>
                      <div className={styles.iconclass}>{card.skillIcon}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CompletionCardsTest;
