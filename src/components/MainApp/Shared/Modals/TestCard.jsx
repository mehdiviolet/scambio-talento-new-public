import React, { useState } from "react";
import {
  MonitorSpeaker,
  Users,
  Type,
  User,
  Clock,
  Gem,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Edit,
  Share,
  Heart,
  Bookmark,
  Trash2,
  MessageCircle,
  Star,
  Send,
  CheckCircle,
  Globe2,
  GlassWaterIcon,
  GlobeIcon,
  Home,
  User2,
} from "lucide-react";
import styles from "./TestCard.module.css";
import { Button } from "@/components/ui/Button";
import { ButtonEdit, ButtonTrash } from "@/components/ui/ButtonActions";

function TestCard({
  title = "Cinema / Base",
  lezioni = 4,
  durataLezione = "1 ora",
  costo = 50,
  // ✅ NUOVO: Sistema XP
  userXP = 120, // XP attuali dell'utente
  onXPChange, // Callback per modificare XP
  descrizione = "Un percorso personalizzato per scoprire i fondamenti della pittura a olio. 4 incontri individuali per imparare in modo semplice, pratico e creativo.",
  istruttore = "Serj Tankian",
  // ✅ DEPRECATO: gemDisponibili (ora si usa skillGems)
  gemDisponibili = 25, // Mantenuto per backward compatibility
  // ✅ NUOVO: Gem dalla skill dell'owner
  skillGems,
  // ✅ NUOVO: Foto profilo dell'owner
  ownerPhoto,
  partecipanti = 3,
  icon = "_",
  lingua,
  modalita,
  experienceData,
  onEdit,
  isOwner = false,
  onDelete,
  feedbacks = [
    {
      id: 1,
      user: "Marco",
      avatar: "👨‍💼",
      rating: 5,
      comment: "Esperienza fantastica! Molto professionale e coinvolgente.",
      date: "2 giorni fa",
    },
    {
      id: 2,
      user: "Laura",
      avatar: "👩‍🎨",
      rating: 4,
      comment: "Ottima lezione, ho imparato tantissimo. Consigliato!",
      date: "1 settimana fa",
    },
  ],
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [isdescrizioneExpanded, setIsdescrizioneExpanded] = useState(false);

  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  // const [isCourseStarted, setIsCourseStarted] = useState(false);
  const [courseStatus, setCourseStatus] = useState("idle"); // 'idle', 'ready', 'waiting', 'active'
  // ✅ NUOVO: Tracking pagamenti XP
  const [xpPaid, setXpPaid] = useState(0); // Quanto ha già pagato il viewer
  const [showXPWarning, setShowXPWarning] = useState(false); // Avviso XP insufficienti

  // ✅ NUOVO: Sistema Rifiuta
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [rejectPenalty, setRejectPenalty] = useState(0);

  // ✅ NUOVO: Sistema Termina
  const [finishClicks, setFinishClicks] = useState([]); // Array di chi ha cliccato
  const [showFinishWaiting, setShowFinishWaiting] = useState(false);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackGems, setFeedbackGems] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // ✅ HELPER XP: Calcola quanto costa ogni step
  const getXPCosts = () => {
    const firstPayment = Math.floor(costo / 3); // 1/3 iniziale
    const secondPayment = costo - firstPayment; // 2/3 rimanente
    return { firstPayment, secondPayment, total: costo };
  };

  // ✅ HELPER XP: Controlla se utente può permettersi il corso
  const canAffordCourse = () => {
    const { firstPayment } = getXPCosts();
    return userXP >= firstPayment;
  };

  const handleStartCourse = () => {
    setCourseStatus("waiting");
    console.log("Owner ha avviato il corso, in attesa del viewer...");
  };

  const handleViewerAccepts = () => {
    const { firstPayment } = getXPCosts();

    if (!canAffordCourse()) {
      setShowXPWarning(true);
      return;
    }

    // Paga 1/3 XP
    setXpPaid(firstPayment);
    if (onXPChange) {
      onXPChange(-firstPayment); // Sottrae XP dall'utente
    }

    setCourseStatus("active");
    console.log(`Viewer ha pagato ${firstPayment} XP, corso attivo!`);
  };
  const handleRejectCourse = () => {
    // Non rifiuta subito, apre il modal per il commento
    setShowRejectModal(true);
  };

  // ✅ NUOVA: Funzione per confermare il rifiuto
  const handleConfirmReject = (withComment = true) => {
    let penalty = 0;

    if (!withComment || rejectComment.trim() === "") {
      // Penale 10 XP se non scrive commento
      penalty = 10;
      if (onXPChange) {
        onXPChange(-10);
      }
    }

    // Logica restituzione XP (come prima)
    if (xpPaid > 0 && onXPChange) {
      onXPChange(xpPaid);
      console.log(`Restituiti ${xpPaid} XP al viewer`);
    }

    // Reset stati
    setXpPaid(0);
    setCourseStatus("idle");
    setShowRejectModal(false);
    setRejectComment("");
    setRejectPenalty(penalty);

    console.log(
      `Corso rifiutato. Penale: ${penalty} XP. Commento: "${rejectComment}"`
    );
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
    setRejectComment("");
  };

  // ✅ NUOVO: Gestione feedback
  const handleSubmitFeedback = () => {
    let bonusXP = 0;

    // Bonus per recensione
    if (feedbackComment.trim() && feedbackRating > 0) {
      bonusXP += 5;
    }

    // Bonus per GEM (solo se corso ≥30 XP)
    if (costo >= 30 && feedbackGems > 0) {
      bonusXP += 5;
    }

    // Assegna bonus XP
    if (bonusXP > 0 && onXPChange) {
      onXPChange(bonusXP);
    }

    // Reset e chiudi
    setFeedbackSubmitted(true);

    setTimeout(() => {
      setShowFeedbackModal(false);
      setCourseStatus("idle"); // Torna allo stato iniziale
    }, 2000);

    console.log(
      `Feedback inviato! Rating: ${feedbackRating}, GEM: ${feedbackGems}, Bonus: +${bonusXP} XP`
    );
  };

  const handleSkipFeedback = () => {
    setShowFeedbackModal(false);
    setCourseStatus("idle");
    console.log("Feedback saltato");
  };

  const handleFinishCourse = () => {
    const currentUser = isOwner ? "owner" : "viewer";

    // Controlla se questo utente ha già cliccato
    if (finishClicks.includes(currentUser)) {
      console.log("Hai già cliccato Termina!");
      return;
    }

    const newClicks = [...finishClicks, currentUser];
    setFinishClicks(newClicks);

    if (newClicks.length === 1) {
      // Primo click - mostra attesa
      setShowFinishWaiting(true);
      console.log(
        `${currentUser} ha cliccato Termina. In attesa dell'altro utente...`
      );
    } else if (newClicks.length === 2) {
      // Secondo click - completa corso
      handleCompleteCourse();
    }
  };

  // ✅ NUOVA: Funzione per completare il corso
  const handleCompleteCourse = () => {
    const { secondPayment } = getXPCosts();

    // Viewer paga i 2/3 rimanenti
    if (!isOwner && onXPChange) {
      onXPChange(-secondPayment);
      setXpPaid((prev) => prev + secondPayment);
      console.log(`Viewer ha completato pagamento: ${secondPayment} XP`);
    }

    // Reset stati corso
    setCourseStatus("completed");
    setFinishClicks([]);
    setShowFinishWaiting(false);

    console.log("🎉 Corso completato con successo!");

    // ✅ NUOVO: Apri feedback solo per Viewer
    if (!isOwner) {
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 500); // Piccolo delay per UX migliore
    }
  };

  const handleRequestClick = () => {
    setIsRequestOpen(true);
  };

  const handleSendRequest = () => {
    if (requestMessage.trim()) {
      console.log("Richiesta inviata:", requestMessage);
      setIsRequestSent(true);
      setIsRequestOpen(false);
      setRequestMessage("");
    }
  };

  const handleCancelRequest = () => {
    setIsRequestOpen(false);
    setRequestMessage("");
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleFeedback = () => {
    setIsFeedbackExpanded(!isFeedbackExpanded);
  };
  // Calcola rating medio
  const getAverageRating = () => {
    if (!feedbacks || feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (total / feedbacks.length).toFixed(1);
  };

  // Genera stelle per rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={`${styles.star} ${
          index < rating ? styles.starFilled : styles.starEmpty
        }`}
      />
    ));
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit && experienceData) {
      onEdit(experienceData);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete && experienceData) {
      onDelete(experienceData);
    }
    console.log("Delete esperienza:", title);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log("Condividi esperienza:", title);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log("Like esperienza:", title);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    console.log("Bookmark esperienza:", title);
    setIsBookmarked(!isBookmarked);
  };

  // Genera gli avatar in base al numero di partecipanti (max 4)
  const generateAvatars = () => {
    const maxAvatars = Math.min(partecipanti, 4);
    const avatarEmojis = ["👨‍🎨", "👩‍🎨", "👨‍🏫", "👩‍🏫"];
    const avatarColors = ["#ff8c42", "#6c5ce7", "#fd79a8", "#00cec9"];

    return Array.from({ length: maxAvatars }, (_, index) => (
      <li key={index}>
        <div
          className={styles.avatarPlaceholder}
          style={{ background: avatarColors[index] }}
        >
          {avatarEmojis[index]}
        </div>
      </li>
    ));
  };

  // ✅ HELPER: Calcola i gem da mostrare
  const getDisplayGems = () => {
    return skillGems !== undefined && skillGems !== null ? skillGems : 0;
  };

  console.log(icon);

  return (
    <div className={`${styles.testCard} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.nav} onClick={toggleExpanded}>
        {icon && (
          <span className={styles.experienceIcon}>
            {typeof icon === "string"
              ? icon
              : React.createElement(icon, { size: 18 })}
          </span>
        )}
        <h4 className={styles.navTitle}>{title}</h4>
        <div className={styles.navRight}>
          <div className={styles.actionSpacer}></div>
          <div className={styles.hoverButtons}>
            <button
              className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
              onClick={handleShareClick}
              title="Condividi"
            >
              <Share size={16} />
            </button>

            <button
              className={`${styles.actionButton} ${
                styles.actionButtonSecondary
              } ${isBookmarked ? styles.bookmarked : ""}`}
              onClick={handleBookmarkClick}
              title={isBookmarked ? "Rimuovi dai salvati" : "Salva"}
            >
              <Bookmark size={16} />
            </button>
          </div>
          {!isExpanded && <div className={styles.userGem}>{costo} XP</div>}
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
              <span className={styles.infoLabel}>Durata:</span>
              <span className={styles.infoValue}>{durataLezione}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Costo:</span>
              <span className={styles.infoValue}>{costo} XP</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Lingua:</span>
              <span className={styles.infoValue}>{lingua}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Modalità:</span>
              <span className={styles.infoValue}>{modalita}</span>
            </div>
          </div>

          <div className={styles.descAvat}>
            <div className={styles.descriptionBox}>{descrizione}</div>

            <div className={styles.requestSection}>
              {!isRequestSent && !isOwner ? (
                // Stato 1: Bottone richiesta iniziale
                <Button
                  // className={styles.requestButton}
                  onClick={handleRequestClick}
                >
                  <Send size={16} />
                </Button>
              ) : (
                <div className={styles.actionButtons}>
                  {isOwner && (
                    <>
                      {/* <Button
                          title="Elimina esperienza"
                          variant="gray"
                          onClick={handleDeleteClick}
                          >
                          onClick={handleDeleteClick}
                          Elimina
                        </Button> */}
                      <ButtonTrash />
                      {/* <Button
                        title="Modifica esperienza"
                        onClick={handleEditClick}
                        >
                        Modifica
                        </Button> */}

                      <ButtonEdit onClick={handleEditClick} />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* ✨ SEZIONE UNIFICATA: Request + Course Control */}
          {(isRequestOpen || isRequestSent) && (
            <div className={styles.unifiedSection}>
              {isRequestOpen ? (
                // 1. Form richiesta aperto
                <div className={styles.requestForm}>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder="Scrivi la tua disponibilità per l'esperienza, giorni preferiti, orari..."
                    className={styles.requestTextarea}
                    rows={3}
                  />
                  <div className={styles.requestActions}>
                    <button
                      onClick={handleCancelRequest}
                      className={styles.requestCancel}
                    >
                      Annulla
                    </button>
                    <button
                      onClick={handleSendRequest}
                      className={styles.requestSend}
                      disabled={!requestMessage.trim()}
                    >
                      <Send size={14} /> Invia
                    </button>
                  </div>
                </div>
              ) : courseStatus === "idle" && isOwner ? (
                // 2. Owner: messaggio + due bottoni Accetto/Rifiuto
                <div className={styles.ownerNotification}>
                  <div className={styles.notificationMessage}>
                    <CheckCircle size={16} />
                    <span>🔔 Qualcuno interessato al corso.</span>
                  </div>
                  <div className={styles.ownerChoices}>
                    <button
                      className={styles.acceptRequestButton}
                      onClick={() => setCourseStatus("ready")}
                    >
                      ✅ Accetto
                    </button>
                    <button
                      className={styles.rejectRequestButton}
                      onClick={() => {
                        setCourseStatus("idle");
                        setIsRequestSent(false);
                        console.log("Richiesta rifiutata, reset completo");
                      }}
                    >
                      ❌ Rifiuto
                    </button>
                  </div>
                </div>
              ) : courseStatus === "ready" && isOwner ? (
                // 3. Owner: bottone Avvio Corso
                <button
                  className={styles.startCourseButton}
                  onClick={handleStartCourse}
                >
                  🚀 Avvio Corso!
                </button>
              ) : courseStatus === "waiting" && isOwner ? (
                // 4. Owner: in attesa viewer
                <div className={styles.waitingCourseButton}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill}></div>
                  </div>
                  <span>⏳ In attesa del viewer...</span>
                </div>
              ) : (courseStatus === "active" && isOwner) ||
                (courseStatus === "active" && !isOwner) ? (
                // 5. Owner E Viewer: controlli finali
                <div className={styles.courseActions}>
                  {showFinishWaiting ? (
                    <div className={styles.finishWaiting}>
                      <p>
                        {finishClicks.includes(isOwner ? "owner" : "viewer")
                          ? "⏳ In attesa che l'altro utente clicchi Termina..."
                          : "⏳ L'altro utente ha cliccato Termina. Clicca anche tu per completare!"}
                      </p>
                      <div className={styles.finishStatus}>
                        <span
                          className={
                            finishClicks.includes("owner")
                              ? styles.clicked
                              : styles.pending
                          }
                        >
                          Owner: {finishClicks.includes("owner") ? "✅" : "⏳"}
                        </span>
                        <span
                          className={
                            finishClicks.includes("viewer")
                              ? styles.clicked
                              : styles.pending
                          }
                        >
                          Viewer:{" "}
                          {finishClicks.includes("viewer") ? "✅" : "⏳"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p>🎓 Corso in sessione!</p>
                  )}

                  <div className={styles.courseButtons}>
                    <button
                      className={styles.rejectCourseButton}
                      onClick={handleRejectCourse}
                    >
                      ❌ Rifiuta
                    </button>
                    <button
                      className={styles.finishCourseButton}
                      onClick={handleFinishCourse}
                      disabled={finishClicks.includes(
                        isOwner ? "owner" : "viewer"
                      )}
                    >
                      ✅{" "}
                      {finishClicks.includes(isOwner ? "owner" : "viewer")
                        ? "Terminato!"
                        : "Termina"}
                    </button>
                  </div>
                </div>
              ) : !isOwner && courseStatus === "waiting" ? (
                // 6a. Viewer: bottone Accetta Corso (quando owner ha avviato)
                <>
                  <button
                    className={styles.acceptCourseButton}
                    onClick={handleViewerAccepts}
                    disabled={!canAffordCourse()}
                  >
                    ✅ Accetta Corso - {getXPCosts().firstPayment} XP ora +{" "}
                    {getXPCosts().secondPayment} XP dopo
                  </button>
                  {/* ✅ NUOVO: Avviso XP insufficienti - AGGIUNGI QUI */}
                  {showXPWarning && (
                    <div className={styles.xpWarning}>
                      <span>
                        ⚠️ XP insufficienti! Servono {getXPCosts().firstPayment}{" "}
                        XP
                      </span>
                      <button onClick={() => setShowXPWarning(false)}>
                        OK
                      </button>
                    </div>
                  )}
                </>
              ) : !isOwner ? (
                // 6b. Viewer: messaggio attesa (quando ancora non ha avviato owner)
                <div className={styles.viewerWaiting}>
                  <CheckCircle size={16} />
                  <span>Richiesta inviata! Aspetta la notifica.</span>
                </div>
              ) : null}
            </div>
          )}

          {/* ✅ MODAL RIFIUTO */}
          {showRejectModal && (
            <div className={styles.rejectModal}>
              <div className={styles.rejectModalContent}>
                <h4>Perché vuoi rifiutare il corso?</h4>
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  placeholder="Spiega il motivo del rifiuto (opzionale ma consigliato)..."
                  className={styles.rejectTextarea}
                  rows={3}
                />
                <div className={styles.rejectActions}>
                  <button
                    onClick={handleCancelReject}
                    className={styles.rejectCancel}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => handleConfirmReject(false)}
                    className={styles.rejectNoComment}
                  >
                    No comment (-10 XP)
                  </button>
                  <button
                    onClick={() => handleConfirmReject(true)}
                    className={styles.rejectConfirm}
                  >
                    Invia commento
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ✅ MODAL FEEDBACK */}
          {showFeedbackModal && (
            <div className={styles.feedbackModal}>
              <div className={styles.feedbackModalContent}>
                {!feedbackSubmitted ? (
                  <>
                    <h4>🎉 Corso completato! Lascia un feedback</h4>

                    {/* Rating */}
                    <div className={styles.ratingSection}>
                      <label>Valutazione:</label>
                      <div className={styles.starRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={24}
                            className={`${styles.starClickable} ${
                              star <= feedbackRating
                                ? styles.starFilled
                                : styles.starEmpty
                            }`}
                            onClick={() => setFeedbackRating(star)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Commento */}
                    <div className={styles.commentSection}>
                      <label>Recensione (+5 XP):</label>
                      <textarea
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        placeholder="Descrivi la tua esperienza..."
                        className={styles.feedbackTextarea}
                        rows={3}
                      />
                    </div>

                    {/* GEM (solo se corso ≥30 XP) */}
                    {costo >= 30 && (
                      <div className={styles.gemSection}>
                        <label>Assegna GEM all'istruttore (+5 XP):</label>
                        <div className={styles.gemSelector}>
                          {[1, 2, 3, 4, 5].map((gem) => (
                            <button
                              key={gem}
                              className={`${styles.gemButton} ${
                                gem <= feedbackGems ? styles.gemSelected : ""
                              }`}
                              onClick={() => setFeedbackGems(gem)}
                            >
                              💎 {gem}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.feedbackActions}>
                      <button
                        onClick={handleSkipFeedback}
                        className={styles.skipFeedback}
                      >
                        Salta
                      </button>
                      <button
                        onClick={handleSubmitFeedback}
                        className={styles.submitFeedback}
                        disabled={feedbackRating === 0}
                      >
                        Invia Feedback
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.feedbackSuccess}>
                    <h4>✅ Grazie per il feedback!</h4>
                    <p>Hai ricevuto bonus XP per il tuo contributo.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ✨ NUOVA SEZIONE FEEDBACK */}
          {getDisplayGems() > 0 && feedbacks && feedbacks.length > 0 && (
            <div className={styles.feedbackSection}>
              <div className={styles.feedbackHeader} onClick={toggleFeedback}>
                <div className={styles.feedbackTitle}>
                  {/* <MessageCircle size={16} /> */}
                  <span>Feedback ({feedbacks.length})</span>
                  <div className={styles.ratingBadge}>
                    <Star size={12} className={styles.starFilled} />
                    <span>{getAverageRating()}</span>
                  </div>
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
                        <div className={styles.feedbackAvatar}>
                          {feedback.avatar}
                        </div>
                        <div className={styles.feedbackInfo}>
                          <span className={styles.feedbackName}>
                            {feedback.user}
                          </span>
                          <div className={styles.feedbackRating}>
                            {renderStars(feedback.rating)}
                          </div>
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
          {/* {descrizione.length > 150 && (
            <button
              className={styles.cardDescrizioneExpandButton}
              onClick={() => setIsdescrizioneExpanded(!isdescrizioneExpanded)}
            >
              {isdescrizioneExpanded ? "Mostra meno" : "Mostra tutto..."}
            </button>
          )} */}
          {/* <div className={styles.divider}></div> */}
          <div className={styles.footerUser}>
            <ul className={styles.userInfo}>
              <li>
                {ownerPhoto ? (
                  <img
                    src={ownerPhoto}
                    alt={`Foto profilo ${istruttore}`}
                    className={styles.ownerPhoto}
                  />
                ) : (
                  <User />
                )}
              </li>
              <p>{istruttore}</p>
            </ul>
            <div className={styles.userGem}>
              <Gem size={20} />
              <span>{skillGems}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className={styles.actionButtons}>
            {isOwner ? (
              // OWNER MODE: [Modifica] [Delete] - Solo se corso non è attivo
              courseStatus === "idle" ? (
                <>
                  <button
                    className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                    onClick={handleEditClick}
                    title="Modifica esperienza"
                  >
                    <Edit size={16} />
                    <span>Modifica</span>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                    onClick={handleDeleteClick}
                    title="Elimina esperienza"
                  >
                    <Trash2 size={16} />
                    <span>Elimina</span>
                  </button>
                </>
              ) : (
                // Corso attivo - nessun bottone o messaggio
                <div className={styles.actionSpacer}></div>
              )
            ) : (
              // VIEWER MODE: [spazio vuoto] [Share] [Like] [Bookmark]
              <>
                <div className={styles.actionSpacer}></div>
                <button
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={handleShareClick}
                  title="Condividi"
                >
                  <Share size={16} />
                </button>
                <button
                  className={`${styles.actionButton} ${
                    styles.actionButtonSecondary
                  } ${isBookmarked ? styles.bookmarked : ""}`}
                  onClick={handleBookmarkClick}
                  title={isBookmarked ? "Rimuovi dai salvati" : "Salva"}
                >
                  <Bookmark
                    size={16}
                    className={
                      isBookmarked
                        ? styles.bookmarkFilled
                        : styles.bookmarkEmpty
                    }
                  />
                </button>
              </>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default TestCard;
