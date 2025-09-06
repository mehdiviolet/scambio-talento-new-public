// components/MockEventCard.jsx - SISTEMA COMPLETO
import React, { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Users,
  Calendar,
  Globe,
  Edit,
  Share,
  Heart,
  Bookmark,
  UserCheck,
  CheckCircle,
  Bell,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronRight,
  Map,
} from "lucide-react";
import styles from "./EventCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  toggleParticipation,
  confirmEvent,
  endEvent,
  clearNotifications,
  selectParticipants,
  selectOrganizer,
  selectEventState,
  selectCheckInList,
  selectNotifications,
  selectEventStats,
  selectCurrentUser,
  handleNotificationClick,
  selectFeedbacks,
  selectGalleryPhotos,
  selectIsLoading,
  autoUploadPhotos,
  setLoading,
} from "../store/slices/sharedEventSlice";
import QRCodeComponent from "./QRCodeComponent";
import FeedbackModal from "./FeedbackModal";
import MapComponent from "./MapComponent";
import SimpleImageModal from "./SimpleImageModal";
import LoadingSpinner from "./LoadingSpinner";

// DATI MOCK COMPLETI
const mockEvent = {
  id: "demo_event_001",
  title: "Boardgame Night a San Salvarios",
  description:
    "Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare e divertirsi insieme. Porteremo una selezione di giochi moderni e classici adatti a tutti i livelli.",
  category: "Hobby e passioni",
  language: "italiano",
  startDate: "2024-12-20",
  startTime: "19:30",
  endTime: "22:30",
  type: "presenza",
  placeName: "Café Central",
  placeAddress: "Via Madama Cristina 45, Torino",
  views: 24,
  likes: 7,
  shares: 3,
  createdAt: "2024-12-18T15:30:00Z",
  coverImage: "/images/evento/azul-01.png",
};

const MockEventCard = ({
  onEdit,
  onDelete,
  isOwner = false,
  showExtended = false,
  selectedPersonData,
}) => {
  const [isExpanded, setIsExpanded] = useState(showExtended);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMap, setShowMap] = useState(false);
  // ✅ NUOVI STATES PER DROPDOWNS
  const [showCheckIns, setShowCheckIns] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  // ✅ LIGHTBOX STATES
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Redux selectors
  const dispatch = useDispatch();
  const eventState = useSelector(selectEventState);
  const participants = useSelector(selectParticipants);
  // const organizer = useSelector(selectOrganizer);
  const checkInList = useSelector(selectCheckInList);
  const notifications = useSelector(selectNotifications);
  const eventStats = useSelector(selectEventStats);
  const feedbacks = useSelector(selectFeedbacks);
  const galleryPhotos = useSelector(selectGalleryPhotos);

  const comments = useSelector((state) => state.sharedEvent.comments);
  const isParticipating = useSelector(
    (state) => state.sharedEvent.isParticipating
  );
  const firstName = useSelector(
    (state) => state.quickSetup.profileData.firstName
  );

  const currentUserEvent = useSelector(selectCurrentUser);

  // ✅ LOADING SELECTORS
  const isConfirmingEvent = useSelector(selectIsLoading("confirmEvent"));
  const isEndingEvent = useSelector(selectIsLoading("endEvent"));
  const isUploadingGallery = useSelector(selectIsLoading("uploadGallery"));

  const organizer = {
    id: selectedPersonData.profile.firstName?.toLowerCase() || "user",
    name:
      `${selectedPersonData.profile.firstName || ""} ${
        selectedPersonData.profile.lastName || ""
      }`.trim() || "Organizzatore",
    photo: selectedPersonData.profile.profilePhoto,
    trustScore: 47, // Mantieni valore di default o calcolalo
    participationScore: 126, // Mantieni valore di default o calcolalo
  };
  // console.log(currentUserEvent, checkInList);
  console.log(selectedPersonData?.profile);

  // ✅ TIMER PER AUTO-UPLOAD GALLERY
  useEffect(() => {
    if (eventState === "fatto" && isOwner && galleryPhotos.length === 0) {
      const timer = setTimeout(() => {
        dispatch(setLoading({ operation: "uploadGallery", isLoading: true }));

        setTimeout(() => {
          dispatch(autoUploadPhotos());
          dispatch(
            setLoading({ operation: "uploadGallery", isLoading: false })
          );
        }, 1500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [eventState, isOwner, galleryPhotos.length, dispatch]);

  // ✅ LIGHTBOX HANDLERS
  const handlePhotoClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => Math.min(galleryPhotos.length - 1, prev + 1));
  };

  // Helper per formattare la data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper per formattare l'orario
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.slice(0, 5);
  };

  // Helper per ottenere l'icona della categoria
  const getCategoryIcon = (category) => {
    const icons = {
      "Hobby e passioni": "🎨",
      "Sport e fitness": "🏃‍♂️",
      Tecnologia: "💻",
      "Musica e Arte": "🎵",
      "Lingua e identità": "🗣️",
      "Attività sociali": "👥",
    };
    return icons[category] || "🎉";
  };

  // Helper per ottenere il tipo di luogo
  const getLocationDisplay = () => {
    if (mockEvent.type === "online") {
      return {
        icon: <Globe size={16} />,
        text: "Online",
        detail: mockEvent.onlineLink ? "Link disponibile" : "",
      };
    } else {
      return {
        icon: <MapPin size={16} />,
        text: `${mockEvent.placeName}, ${mockEvent.placeAddress}`,
        detail: mockEvent.placeAddress || "",
      };
    }
  };

  // Helper per get stato display
  const getEventStateDisplay = () => {
    const stateLabels = {
      idle: { label: "🟢 Aperto", color: "#28a745" },
      waiting: { label: "🟡 In attesa conferma", color: "#ffc107" },
      confirmed: { label: "🔵 Confermato", color: "#007bff" },
      "in svolgimento": { label: "🟠 In corso", color: "#fd7e14" },
      fatto: { label: "✅ Completato", color: "#6c757d" },
    };
    return (
      stateLabels[eventState] || { label: "❓ Sconosciuto", color: "#6c757d" }
    );
  };

  // ✅ HANDLER CLICK NOME IN NOTIFICA
  const handleNameClick = (userId, userName) => {
    // TODO: [SOSTITUIRE CON COMPONENTE PROFILO]
    dispatch(handleNotificationClick({ userId, userName }));
    alert(
      `Visualizzando profilo di: ${userName}\n[SOSTITUIRE CON COMPONENTE PROFILO]`
    );
  };

  // Handler per espandere/comprimere la card
  // const handleCardClick = (e) => {
  //   if (
  //     e.target.closest(`.${styles.actionButton}`) ||
  //     e.target.closest(`.${styles.expandButton}`)
  //   ) {
  //     return;
  //   }
  //   setIsExpanded(!isExpanded);
  // };
  const handleCardClick = (e) => {
    // ✅ NUOVO: Solo overlayContent può chiudere la carta quando espansa
    if (isExpanded) {
      // Se carta è espansa, chiudi solo se click su overlayContent
      if (e.target.closest(`.${styles.overlayContent}`)) {
        setIsExpanded(false);
      }
      return; // Non fare nulla per altri click quando espansa
    }

    // ✅ ESISTENTE: Quando carta è chiusa, evita click su bottoni
    if (
      e.target.closest(`.${styles.actionButton}`) ||
      e.target.closest(`.${styles.expandButton}`)
    ) {
      return;
    }

    // Espandi la carta se era chiusa
    setIsExpanded(true);
  };
  const location = getLocationDisplay();
  const stateDisplay = getEventStateDisplay();

  return (
    <>
      <div
        className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
        onClick={handleCardClick}
      >
        {/* Notifiche per Owner */}
        {isOwner && notifications.length > 0 && (
          <div className={styles.notificationBadge}>{notifications.length}</div>
        )}

        {/* Status Badge */}
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: stateDisplay.color }}
        >
          {stateDisplay.label}
        </div>

        {/* Immagine copertina con overlay */}
        <div className={styles.coverImageWithOverlay}>
          <img
            src={mockEvent.coverImage}
            alt={mockEvent.title}
            className={styles.coverImg}
            // onError={(e) => {
            //   e.target.style.display = "none";
            //   e.target.nextSibling.style.background =
            //     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            //   e.target.nextSibling.style.display = "flex";
            //   e.target.nextSibling.style.alignItems = "center";
            //   e.target.nextSibling.style.justifyContent = "center";
            //   e.target.nextSibling.innerHTML =
            //     '<span style="font-size: 3rem;">🎲</span>';
            // }}
          />
          <div className={styles.overlayContent}>
            {/* Icone in alto a destra */}
            <div className={styles.topRightIcons}>
              <button className={styles.overlayIcon} title="partecipo">
                <UserCheck size={16} />
              </button>
              {mockEvent.type === "online" ? (
                <button className={styles.overlayIcon} title="online">
                  <Globe size={16} />
                </button>
              ) : (
                <button className={styles.overlayIcon} title="in presenza">
                  <MapPin size={16} />
                </button>
              )}
            </div>

            {/* <div className={styles.bottomContent}>
              <div className={styles.titleAndMeta}>
                <h3 className={styles.eventTitleOverlay}>{mockEvent.title}</h3>
                <div className={styles.eventMetaOverlay}>
                  <div className={styles.metaItemOverlay}>
                    <Calendar size={16} className={styles.metaIconOverlay} />
                    <span>{formatDate(mockEvent.startDate)}</span>
                  </div>
                  <div className={styles.metaItemOverlay}>
                    <Clock size={16} className={styles.metaIconOverlay} />
                    <span>
                      {formatTime(mockEvent.startTime)} -{" "}
                      {formatTime(mockEvent.endTime)}
                    </span>
                  </div>

                  <div className={styles.participantsOverlay}>
                    <div className={styles.participantAvatars}>
                      {participants.slice(0, 3).map((participant, index) => (
                        <div
                          key={index}
                          className={styles.pic}
                          title={participant.name}
                        >
                          <img
                            src={`/images/people/pic-${index}.jpg`}
                            alt="ax"
                          />
                        </div>
                      ))}
                    </div>
                    <span className={styles.participantCount}>
                      {eventStats.maxParticipants
                        ? `${eventStats.participantsCount}/${eventStats.maxParticipants} partecipanti`
                        : `${eventStats.participantsCount} partecipanti`}
                    </span>
                  </div>
                </div>
              </div>

              {mockEvent.type === "presenza" && (
                <QRCodeComponent isOwner={isOwner} size={80} />
              )}
            </div> */}
          </div>
        </div>

        {/* Info aggiuntive quando espanso */}
        {isExpanded && (
          <div className={styles.cardHeader}>
            <h3 className={styles.eventTitleOverlay}>{mockEvent.title}</h3>
            <div className={styles.bottomContent}>
              <div className={styles.titleAndMeta}>
                <div className={styles.eventMetaOverlay}>
                  <div className={styles.metaItemOverlay}>
                    <Calendar size={16} className={styles.metaIconOverlay} />
                    <span>{formatDate(mockEvent.startDate)}</span>
                  </div>
                  <div className={styles.metaItemOverlay}>
                    <Clock size={16} className={styles.metaIconOverlay} />
                    <span>
                      {formatTime(mockEvent.startTime)} -{" "}
                      {formatTime(mockEvent.endTime)}
                    </span>
                  </div>

                  <div className={styles.participantsOverlay}>
                    <div className={styles.participantAvatars}>
                      {participants.slice(0, 3).map((participant, index) => (
                        <div
                          key={index}
                          className={styles.pic}
                          title={participant.name}
                        >
                          <img
                            src={`/images/people/pic-${index}.jpg`}
                            alt="ax"
                          />
                        </div>
                      ))}
                    </div>
                    <span className={styles.participantCount}>
                      {eventStats.maxParticipants
                        ? `${eventStats.participantsCount}/${eventStats.maxParticipants} partecipanti`
                        : `${eventStats.participantsCount} partecipanti`}
                    </span>
                  </div>
                </div>
              </div>

              {mockEvent.type === "presenza" && (
                <QRCodeComponent isOwner={isOwner} size={80} />
              )}
            </div>
            <div className={styles.metaItem}>
              {location.icon}

              <span>{location.text}</span>

              {/* Toggle mappa per eventi in presenza */}
              {mockEvent.type === "presenza" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMap(!showMap);
                  }}
                  className={styles.mapToggle}
                >
                  {showMap ? "Nascondi mappa" : <Map />}
                </button>
              )}
            </div>

            {/* Mappa espandibile */}
            {showMap && mockEvent.type === "presenza" && (
              <div className={styles.mapContainer}>
                <MapComponent address={mockEvent.placeAddress} height={200} />
              </div>
            )}
          </div>
        )}

        {/* Contenuto principale */}
        <div className={styles.cardContent}>
          {/* Notifiche per Owner quando espanso */}
          {isExpanded && isOwner && notifications.length > 0 && (
            <div className={styles.notificationsSection}>
              <div className={styles.notificationsHeader}>
                <button
                  className={styles.dropdownTrigger}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotifications(!showNotifications);
                  }}
                >
                  🔔 Notifiche ({notifications.length})
                  {showNotifications ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(clearNotifications());
                  }}
                  className={styles.clearButton}
                >
                  Cancella tutto
                </button>
              </div>

              {showNotifications && (
                <div className={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div key={notif.id} className={styles.notificationItem}>
                      •{" "}
                      {notif.metadata?.clickable ? (
                        <span>
                          {notif.message.split(notif.metadata.userName)[0]}
                          <span
                            className={styles.clickableName}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNameClick(
                                notif.metadata.userId,
                                notif.metadata.userName
                              );
                            }}
                          >
                            {notif.metadata.userName}
                          </span>
                          {notif.message.split(notif.metadata.userName)[1]}
                        </span>
                      ) : (
                        notif.message
                      )}
                      <div className={styles.notificationTime}>
                        {new Date(notif.timestamp).toLocaleTimeString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ CHECK-IN DROPDOWN per Owner */}
          {isExpanded && isOwner && checkInList.length > 0 && (
            <div className={styles.checkInSection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCheckIns(!showCheckIns);
                }}
              >
                ✅ Check-in ({checkInList.length}/{participants.length})
                {showCheckIns ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {showCheckIns && (
                <div className={styles.checkInList}>
                  {checkInList.map((checkin) => (
                    <div key={checkin.id} className={styles.checkInItem}>
                      <span>• {checkin.participantName}</span>
                      <span>{checkin.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ FEEDBACK DROPDOWN (visibile a tutti quando evento concluso) */}
          {isExpanded && eventState === "fatto" && feedbacks.length > 0 && (
            <div className={styles.feedbackSection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFeedbacks(!showFeedbacks);
                }}
              >
                ⭐ Feedback ricevuti ({feedbacks.length})
                {showFeedbacks ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {showFeedbacks && (
                <div className={styles.feedbackList}>
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className={styles.feedbackItem}>
                      <div className={styles.feedbackHeader}>
                        <strong>{feedback.fromUserName}</strong>
                        <div className={styles.starsContainer}>
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={i < feedback.stars ? "#ffd700" : "none"}
                              color={i < feedback.stars ? "#ffd700" : "#ddd"}
                            />
                          ))}
                        </div>
                      </div>
                      {feedback.comment && (
                        <div className={styles.feedbackComment}>
                          "{feedback.comment}"
                        </div>
                      )}
                      <div className={styles.feedbackTime}>
                        {new Date(feedback.timestamp).toLocaleDateString(
                          "it-IT"
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ✅ GALLERY DROPDOWN (visibile a tutti quando foto presenti) */}
          {isExpanded && galleryPhotos.length > 0 && (
            <div className={styles.gallerySection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGallery(!showGallery);
                }}
              >
                📸 Gallery ({galleryPhotos.length} foto)
                {showGallery ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {showGallery && (
                <div className={styles.galleryGrid}>
                  {galleryPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={styles.galleryItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePhotoClick(index);
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className={styles.galleryImage}
                      />
                      <div className={styles.galleryOverlay}>
                        <span className={styles.galleryIcon}>🔍</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loading gallery per owner */}
          {isExpanded && isOwner && isUploadingGallery && (
            <div className={styles.galleryLoading}>
              <LoadingSpinner
                size={20}
                color="#007bff"
                text="Caricando foto..."
                showText={true}
              />
            </div>
          )}

          {/* Dettagli extra quando espanso */}
          {isExpanded && (
            <div className={styles.extraDetails}>
              {/* Descrizione evento */}
              <div className={styles.extraItem}>
                <strong>Descrizione:</strong>
                <div className={styles.description}>
                  <p className={styles.descriptionText}>
                    {mockEvent.description}
                  </p>
                </div>
              </div>

              {/* Lingua */}
              {mockEvent.language && (
                <div className={styles.extraItem}>
                  <strong>Lingua:</strong> {mockEvent.language}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottoni Owner */}
        {isOwner && eventState !== "idle" && (
          <div className={styles.confermButtonOwner}>
            {eventState === "waiting" && (
              <button
                className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                disabled={isConfirmingEvent}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setLoading({ operation: "confirmEvent", isLoading: true })
                  );

                  setTimeout(() => {
                    dispatch(confirmEvent());
                    dispatch(
                      setLoading({
                        operation: "confirmEvent",
                        isLoading: false,
                      })
                    );
                  }, 1200);
                }}
              >
                {isConfirmingEvent ? (
                  <LoadingSpinner
                    size={16}
                    color="white"
                    text="Confermando..."
                    showText={true}
                  />
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Conferma Evento</span>
                  </>
                )}
              </button>
            )}

            {eventState === "in svolgimento" && (
              <button
                className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                disabled={isEndingEvent}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setLoading({ operation: "endEvent", isLoading: true })
                  );

                  setTimeout(() => {
                    dispatch(endEvent());
                    dispatch(
                      setLoading({ operation: "endEvent", isLoading: false })
                    );
                  }, 1000);
                }}
              >
                {isEndingEvent ? (
                  <LoadingSpinner
                    size={16}
                    color="white"
                    text="Terminando..."
                    showText={true}
                  />
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Termina Evento</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Bottoni Participant */}
        {!isOwner && eventState !== "fatto" && (
          <div className={styles.actionButtons}>
            <button
              disabled={
                eventState === "confirmed" ||
                eventState === "fatto" ||
                eventState === "in svolgimento"
              }
              className={`${styles.actionButton} ${
                isParticipating
                  ? styles.actionButtonParticipating
                  : styles.actionButtonValutando
              }`}
              onClick={(e) => {
                e.stopPropagation();
                // ✅ PASSA FIRSTNAME NEL PAYLOAD
                dispatch(toggleParticipation({ firstName }));
              }}
              title={
                isParticipating
                  ? "Rimuovi partecipazione"
                  : "Partecipa all'evento"
              }
            >
              <UserCheck size={16} />
              <span>{isParticipating ? "Partecipo! ✓" : "Ci sono!"}</span>
            </button>
          </div>
        )}

        {/* Sezione commenti */}
        {isExpanded && (
          <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
                className={styles.commentsToggle}
              >
                💬 Commenti ({comments.length}) {showComments ? "▼" : "▶"}
              </button>
            </div>

            {showComments && (
              <div className={styles.commentsContainer}>
                {comments.map((comment, index) => {
                  const displayName =
                    comment.authorId === "mim"
                      ? isOwner
                        ? firstName || "unknown"
                        : "Tu"
                      : comment.authorName;

                  return (
                    <div key={index} className={styles.comment}>
                      <strong>{displayName}:</strong> {comment.text}
                      <span className={styles.commentTime}>{comment.time}</span>
                    </div>
                  );
                })}

                {/* Input nuovo commento */}
                <div className={styles.newCommentInput}>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Scrivi un commento..."
                    className={styles.commentField}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (newComment.trim()) {
                        dispatch(addComment({ text: newComment }));
                        setNewComment("");
                      }
                    }}
                    className={styles.commentBtn}
                  >
                    Invia
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer con organizzatore */}
        <div className={styles.cardFooter}>
          <div className={styles.organizerInfo}>
            {/* <div className={styles.organizerAvatar}>
              <img
                src={organizer.photo}
                alt={organizer.name}
                className={styles.avatarImage}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "inline-flex";
                }}
              />
              <span className={styles.avatarIcon} style={{ display: "none" }}>
                👤
              </span>
            </div> */}
            <div className={styles.avatar}>
              {selectedPersonData?.profile?.profilePhoto ? (
                <img
                  src={
                    selectedPersonData?.profile.profilePhoto instanceof File
                      ? URL.createObjectURL(
                          selectedPersonData?.profile.profilePhoto
                        )
                      : selectedPersonData?.profile.profilePhoto
                  }
                  alt={`${selectedPersonData?.profile?.firstName || "Sara"} ${
                    selectedPersonData?.profile?.lastName || "Dormand"
                  }`}
                />
              ) : (
                <div className={styles.avatarEmoji}>👩‍🎨</div>
              )}
            </div>
            <div className={styles.organizerDetails}>
              <span className={styles.organizerLabel}>Organizzato da</span>
              <span className={styles.organizerName}>{organizer.name}</span>
            </div>
            <span className={styles.categoryIcons}>
              <span>
                {" "}
                <Star />
                {organizer.trustScore}{" "}
              </span>
              <span>
                <ShieldCheck />
                {organizer.participationScore}
              </span>
            </span>
            {/* <span className={styles.categoryIcon}>
              {getCategoryIcon(mockEvent.category)}
            </span> */}
          </div>

          <div className={styles.actionButtons}>
            {isOwner ? (
              <>
                <button
                  className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(mockEvent);
                    console.log("🔧 DEMO: Modifica evento", mockEvent.title);
                  }}
                  title="Modifica evento"
                >
                  <Edit size={16} />
                  <span>Modifica</span>
                </button>
                <button
                  className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(mockEvent.id);
                    console.log("🗑️ DEMO: Elimina evento", mockEvent.title);
                  }}
                  title="Elimina evento"
                >
                  <Trash2 size={16} />
                  <span>Elimina</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("📤 DEMO: Condividi evento");
                  }}
                  title="Condividi"
                >
                  <Share size={16} />
                </button>

                <button
                  className={`${styles.actionButton} ${
                    isSaved
                      ? styles.actionButtonSaved
                      : styles.actionButtonSecondary
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSaved(!isSaved);
                    console.log("🔖 DEMO: Bookmark evento");
                  }}
                  title="Salva evento"
                >
                  <Bookmark size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <SimpleImageModal
        isOpen={lightboxOpen}
        photos={galleryPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrevious={handleLightboxPrev}
        onNext={handleLightboxNext}
      />

      {/* Modal Feedback */}
      {!isOwner ? <FeedbackModal /> : null}
    </>
  );
};

export default MockEventCard;
