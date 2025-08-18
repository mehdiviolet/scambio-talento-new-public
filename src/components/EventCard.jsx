// components/EventCard.jsx - VERSIONE SEMPLIFICATA
import React, { useState } from "react";
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
  UsersIcon,
  Star,
  ShieldCheck,
} from "lucide-react";
import styles from "./EventCard.module.css";
import QRCodeComponent from "./QRCodeComponent";
import QRCodeStatic from "./QRCodeStatic";

const EventCard = ({
  event,
  organizer,
  organizerPhoto,
  isOwner = false,
  onEdit,
  onDelete,
  currentUserEvent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [qrState, setQrState] = useState(0); // 0=placeholder, 1=blurred, 2=sharp
  const [isdescrizioneExpanded, setIsdescrizioneExpanded] = useState(false);

  // Partecipanti dell'evento (vengono da props o simulazione)
  const participants = event.participantsList || [];

  // Handler per espandere/comprimere la card
  const handleCardClick = (e) => {
    // Non espandere se si clicca sui bottoni di azione
    if (
      e.target.closest(`.${styles.actionButton}`) ||
      e.target.closest(`.${styles.expandButton}`)
    ) {
      return;
    }
    setIsExpanded(!isExpanded);
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

  // Helper per formattare l'orario (ora con slot 30min)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.slice(0, 5); // "HH:MM"
  };

  // Helper per ottenere l'icona della categoria (6 categorie semplificate)
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
    if (event.type === "online") {
      return {
        icon: <Globe size={16} />,
        text: "Online",
        detail: event.onlineLink ? "Link disponibile" : "",
      };
    } else {
      return {
        icon: <MapPin size={16} />,
        text: `${event.placeName}` + `${event.placeAddress}` || "In presenza",
        detail: event.placeAddress || "",
      };
    }
  };

  const location = getLocationDisplay();

  // console.log(currentProfile);

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
      onClick={handleCardClick}
    >
      {/* Immagine copertina con overlay se presente */}

      <div className={styles.coverImageWithOverlay}>
        {/* <img
            src={URL.createObjectURL(event.coverImage)}
            alt={event.title}
            className={styles.coverImg}
          /> */}
        <img
          src={
            event.coverImage
              ? URL.createObjectURL(event.coverImage)
              : "/images/default-event-cover.jpg"
          }
          alt={event.title}
          className={styles.coverImg}
          onError={(e) => {
            e.target.src = "/images/default-event-cover.jpg";
          }}
        />
        <div className={styles.overlayContent}>
          {/* Icone in alto a destra */}
          <div className={styles.topRightIcons}>
            <button className={styles.overlayIcon} title="partecipo">
              {/* <UserCheck size={16} /> */}
              {event.language === "misto" ? (
                <UsersIcon size={16} />
              ) : (
                event.language.slice(0, 2).toUpperCase()
              )}
            </button>
            {event.type === "online" ? (
              <button className={styles.overlayIcon} title="online">
                <Globe size={16} />
              </button>
            ) : (
              <button className={styles.overlayIcon} title="in presenza">
                <MapPin size={16} />
              </button>
            )}
          </div>

          {/* Contenuto in basso (titolo e meta) */}
          <div className={styles.bottomContent}>
            <div className={styles.titleAndMeta}>
              <h3 className={styles.eventTitleOverlay}>{event.title}</h3>
              <div className={styles.eventMetaOverlay}>
                <div className={styles.metaItemOverlay}>
                  <Calendar size={16} className={styles.metaIconOverlay} />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className={styles.metaItemOverlay}>
                  <Clock size={16} className={styles.metaIconOverlay} />
                  <span>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>

                <div className={styles.participantsOverlay}>
                  <div className={styles.participantAvatars}>
                    {/* Mostra partecipanti esistenti */}
                    {participants.slice(0, 3).map((participant, index) => (
                      <div
                        key={index}
                        className={styles.participantAvatar}
                        title={participant.name}
                      >
                        {participant.initials}
                      </div>
                    ))}

                    {/* Slot vuoti se mancano partecipanti */}
                    {participants.length < 3 &&
                      Array.from({ length: 3 - participants.length }).map(
                        (_, index) => (
                          <div
                            key={`empty-${index}`}
                            className={`${styles.participantAvatar} ${styles.emptySlot}`}
                          />
                        )
                      )}
                  </div>
                  <span className={styles.participantCount}>
                    {event.maxParticipants
                      ? `${participants.length}/${event.maxParticipants} partecipanti`
                      : `${participants.length} partecipanti`}
                  </span>
                </div>
              </div>
            </div>
            {/* QR Code Box - solo per eventi in presenza */}
            {/* {event.type === "presence" && (
              <div
                className={`${styles.qrBox} ${styles[`qrState${qrState}`]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setQrState((prev) => (prev + 1) % 3); // Cicla tra 0, 1, 2
                }}
              >
                {qrState === 0 && <span className={styles.qrText}>QR</span>}
                {qrState === 1 && <div className={styles.qrBlurred}></div>}
                {qrState === 2 && <div className={styles.qrSharp}></div>}
              </div>
            )} */}

            <QRCodeStatic size={80} />
            {/* <QRCodeComponent isOwner={isOwner} size={80} /> */}
            {/* {event.type === "presence" && (
              <QRCodeComponent isOwner={isOwner} size={80} />
            )} */}
          </div>
        </div>
      </div>

      {/* Info aggiuntive solo quando espanso */}
      {isExpanded && (
        <div className={styles.cardHeader}>
          <div className={styles.metaItem}>
            {location.icon}
            <span>{location.text}</span>
          </div>
        </div>
      )}

      {/* Contenuto principale */}
      <div className={styles.cardContent}>
        {/* Dettagli extra quando espanso */}
        {isExpanded && (
          <div className={styles.extraDetails}>
            {/* Descrizione evento */}
            <div className={styles.extraItem}>
              <strong>Descrizione:</strong>
              <div className={styles.description}>
                <p
                  className={`${styles.descriptionText} ${
                    isdescrizioneExpanded ? styles.expanded : ""
                  }`}
                >
                  {event.description}
                </p>
                {event.description.length > 150 && (
                  <button
                    className={styles.expandButton}
                    onClick={() =>
                      setIsdescrizioneExpanded(!isdescrizioneExpanded)
                    }
                  >
                    {isdescrizioneExpanded ? "Mostra meno" : "Mostra tutto"}
                  </button>
                )}
              </div>
            </div>

            {/* Lingua */}
            {event.language && (
              <div className={styles.extraItem}>
                <strong>Lingua:</strong> {event.language}
              </div>
            )}

            {/* Bottoni azione - solo per NON-owner */}
            {!isOwner && (
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.actionButton} ${
                    isParticipating
                      ? styles.actionButtonParticipating
                      : styles.actionButtonEdit
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsParticipating(!isParticipating);
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
          </div>
        )}
      </div>

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
              {/* Lista commenti */}
              {comments.map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <strong>{comment.author}:</strong> {comment.text}
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
              ))}

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
                      setComments([
                        ...comments,
                        {
                          author: "Tu",
                          text: newComment,
                          time: new Date().toLocaleTimeString(),
                        },
                      ]);
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
          <div className={styles.organizerAvatar}>
            {organizerPhoto ? (
              <img
                src={organizerPhoto}
                alt={organizer}
                className={styles.avatarImage}
              />
            ) : (
              <span className={styles.avatarIcon}>👤</span>
            )}
          </div>

          <div className={styles.organizerDetails}>
            <span className={styles.organizerLabel}>Organizzato da</span>
            <span className={styles.organizerName}>{organizer}</span>
          </div>
          <span className={styles.categoryIcons}>
            <span>
              {" "}
              <Star />
              {currentUserEvent.trustScore}{" "}
            </span>
            <span>
              <ShieldCheck />
              {currentUserEvent.participationScore}
            </span>
          </span>
        </div>

        <div className={styles.actionButtons}>
          {isOwner ? (
            // OWNER MODE: [Modifica] [Elimina]
            <>
              <button
                className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit(event);
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
                  onDelete && onDelete(event.id);
                }}
                title="Elimina evento"
              >
                <Trash2 size={16} />
                <span>Elimina</span>
              </button>
            </>
          ) : (
            // VIEWER MODE: [Share] [Bookmark]
            <>
              <button
                className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implementare condivisione
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
  );
};

export default EventCard;
