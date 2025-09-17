// MockEventCardCompleto.jsx - STATO FINALE STATICO
import React, { useState } from "react";
import {
  Edit,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  Languages,
  ChevronDown,
  ChevronRight,
  Star,
  ShieldCheck,
  ZoomIn,
} from "lucide-react";
import styles from "./EventCard.module.css";

// DATI MOCK COMPLETI STATO FINALE
const mockEventData = {
  id: "demo_event_001",
  title: "Boardgame Night a San Salvario",
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
  coverImage: "/images/evento/azul-01.png",
};

const mockParticipants = [
  { id: "p1", name: "Mario Rossi", initials: "MR" },
  { id: "p2", name: "Anna Bianchi", initials: "AB" },
  { id: "p3", name: "Luca Verdi", initials: "LV" },
  { id: "p4", name: "Sara Neri", initials: "SN" },
  { id: "p5", name: "Paolo Ferrari", initials: "PF" },
  { id: "p6", name: "Giulia Romano", initials: "GR" },
];

const mockCheckInList = [
  { id: "c1", participantName: "Mario Rossi", time: "19:35" },
  { id: "c2", participantName: "Anna Bianchi", time: "19:40" },
  { id: "c3", participantName: "Luca Verdi", time: "19:45" },
  { id: "c4", participantName: "Sara Neri", time: "19:50" },
  { id: "c5", participantName: "Paolo Ferrari", time: "20:00" },
];

const mockFeedbacks = [
  {
    id: "f1",
    fromUserName: "Mario Rossi",
    stars: 3,
    comment: "Serata fantastica! Ottima organizzazione e giochi divertenti.",
    timestamp: "2024-12-20T23:00:00Z",
  },
  {
    id: "f2",
    fromUserName: "Anna Bianchi",
    stars: 3,
    comment: "Ambiente accogliente, perfetto per socializzare.",
    timestamp: "2024-12-20T23:15:00Z",
  },
  {
    id: "f3",
    fromUserName: "Luca Verdi",
    stars: 2,
    comment: "Bello ma poteva durare un po' di più!",
    timestamp: "2024-12-20T23:30:00Z",
  },
  {
    id: "f4",
    fromUserName: "Paolo Ferrari",
    stars: 3,
    comment: "Tornerò sicuramente al prossimo evento.",
    timestamp: "2024-12-20T23:45:00Z",
  },
];

const mockGalleryPhotos = [
  {
    id: "photo_1",
    url: "/images/evento/azul-02.png",
    alt: "Foto evento 1",
    caption: "Momento divertente durante il gioco!",
  },
  {
    id: "photo_2",
    url: "/images/evento/azul-01.png",
    alt: "Foto evento 2",
    caption: "Tutti concentrati sulla strategia",
  },
  {
    id: "photo_3",
    url: "/images/evento/azul-03.png",
    alt: "Foto evento 3",
    caption: "Il momento della vittoria!",
  },
];

const mockComments = [
  {
    id: "c1",
    authorName: "Mario Rossi",
    text: "Non vedo l'ora! Porterò Azul",
    time: "18:30",
  },
  {
    id: "c2",
    authorName: "Anna Bianchi",
    text: "Perfetto, ci sarò! Qualcuno ha Wingspan?",
    time: "19:00",
  },
  {
    id: "c3",
    authorName: "Luca Verdi",
    text: "È stato fantastico! Grazie per l'organizzazione",
    time: "22:45",
  },
];

const mockOrganizer = {
  name: "Sara Dormand",
  photo: "/images/people/sara-avatar.jpg",
  trustScore: 28, // Calcolato dai feedback
  participationScore: 126,
};

const MockEventCardCompleto = ({ isOwner = true }) => {
  // Stati per toggle delle sezioni
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Hobby e passioni": "🎨",
    };
    return icons[category] || "🎉";
  };

  return (
    <div className={`${styles.card} ${styles.expanded}`}>
      {/* Status Badge - COMPLETATO */}
      <div
        className={styles.statusBadge}
        style={{ backgroundColor: "#6c757d" }}
      >
        ✅ Completato
      </div>

      {/* Immagine copertina con QR finito */}
      <div className={styles.coverImageWithOverlay}>
        <img
          src={mockEventData.coverImage}
          alt={mockEventData.title}
          className={styles.coverImg}
        />
        <div className={styles.overlayContent}>
          <div className={styles.bottomRightIcons}>
            {/* QR Code in stato "Finito" */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                border: "2px solid #6c757d",
                color: "#6c757d",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Finito
            </div>
          </div>
        </div>
      </div>

      {/* Header espanso */}
      <div className={styles.cardHeader}>
        <h3 className={styles.eventTitleOverlay}>{mockEventData.title}</h3>
        <div className={styles.bottomContent}>
          <div className={styles.titleAndMeta}>
            <div className={styles.eventMetaOverlay}>
              <div className={styles.eventMetaOverlayMe}>
                <div className={styles.metaItemOverlay}>
                  <Calendar size={16} className={styles.metaIconOverlay} />
                  <span>{formatDate(mockEventData.startDate)}</span>
                </div>
                <div className={styles.metaItemOverlay}>
                  <Clock size={16} className={styles.metaIconOverlay} />
                  <span>
                    {formatTime(mockEventData.startTime)} -{" "}
                    {formatTime(mockEventData.endTime)}
                  </span>
                </div>
                <div className={styles.metaItemOverlay}>
                  <Languages size={16} className={styles.metaIconOverlay} />
                  <span>{mockEventData.language}</span>
                </div>
              </div>

              <div className={styles.participantsOverlay}>
                <div className={styles.participantAvatars}>
                  {mockParticipants.slice(0, 3).map((participant, index) => (
                    <div
                      key={index}
                      className={styles.pic}
                      title={participant.name}
                    >
                      <img
                        src={`/images/people/pic-${index}.jpg`}
                        alt="participant"
                      />
                    </div>
                  ))}
                </div>
                <span className={styles.participantCount}>
                  {mockParticipants.length}/8 partecipanti
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.metaItem}>
          <MapPin size={16} />
          <span>
            {mockEventData.placeName}, {mockEventData.placeAddress}
          </span>
        </div>
      </div>

      {/* Contenuto principale */}
      <div className={styles.cardContent}>
        {/* Check-in sezione (solo owner) */}
        {isOwner && (
          <div className={styles.checkInSection}>
            <div className={styles.dropdownTrigger}>
              ✅ Check-in ({mockCheckInList.length}/{mockParticipants.length})
              <ChevronDown size={16} />
            </div>
            <div className={styles.checkInList}>
              {mockCheckInList.map((checkin) => (
                <div key={checkin.id} className={styles.checkInItem}>
                  <span>• {checkin.participantName}</span>
                  <span>{checkin.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback sezione (toggle) */}
        <div className={styles.feedbackSection}>
          <button
            className={styles.dropdownTrigger}
            onClick={(e) => {
              console.log(e);
              e.stopPropagation();
              setShowFeedbacks(!showFeedbacks);
            }}
          >
            ⭐ Feedback ricevuti ({mockFeedbacks.length})
            {showFeedbacks ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {showFeedbacks && (
            <div className={styles.feedbackList}>
              {mockFeedbacks.map((feedback) => (
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
                  <div className={styles.feedbackComment}>
                    "{feedback.comment}"
                  </div>
                  <div className={styles.feedbackTime}>
                    {new Date(feedback.timestamp).toLocaleDateString("it-IT")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gallery sezione (toggle) */}
        <div className={styles.gallerySection}>
          <button
            className={styles.dropdownTrigger}
            onClick={(e) => {
              console.log(e);
              e.stopPropagation();
              setShowGallery(!showGallery);
            }}
          >
            📸 Gallery ({mockGalleryPhotos.length} foto)
            {showGallery ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>

          {showGallery && (
            <div className={styles.galleryGrid}>
              {mockGalleryPhotos.map((photo, index) => (
                <div key={photo.id} className={styles.galleryItem}>
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className={styles.galleryImage}
                  />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>
                      <ZoomIn style={{ color: "var(--primary-lighter)" }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dettagli extra */}
        <div className={styles.extraDetails}>
          <div className={styles.extraItem}>
            <strong>Descrizione:</strong>
            <div className={styles.description}>
              <p className={styles.descriptionText}>
                {mockEventData.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione commenti (toggle) */}
      <div className={styles.commentsSection}>
        <div className={styles.commentsHeader}>
          <button
            onClick={(e) => {
              console.log(e);
              e.stopPropagation();
              setShowComments(!showComments);
            }}
            className={styles.commentsToggle}
          >
            Commenti ({mockComments.length}) {showComments ? "▼" : "▶"}
          </button>
        </div>

        {showComments && (
          <div className={styles.commentsContainer}>
            {mockComments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <strong>{comment.authorName}:</strong> {comment.text}
                <span className={styles.commentTime}>{comment.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer con organizzatore */}
      <div className={styles.cardFooter}>
        <div className={styles.organizerInfo}>
          <div className={styles.avatar}>
            <div className={styles.avatarEmoji}>👩‍🎨</div>
          </div>
          <div className={styles.organizerDetails}>
            <span className={styles.organizerLabel}>Organizzato da</span>
            <span className={styles.organizerName}>{mockOrganizer.name}</span>
          </div>
          <span className={styles.categoryIcons}>
            <span>
              <Star />
              {mockOrganizer.trustScore}
            </span>
            <span>
              <ShieldCheck />
              {mockOrganizer.participationScore}
            </span>
          </span>
        </div>

        {/* Bottoni owner */}
        {isOwner && (
          <div className={styles.actionButtons}>
            <button
              className={`${styles.actionButton} ${styles.actionButtonEdit}`}
            >
              <Edit size={16} />
              <span>Modifica</span>
            </button>
            <button
              className={`${styles.actionButton} ${styles.actionButtonDelete}`}
            >
              <Trash2 size={16} />
              <span>Elimina</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockEventCardCompleto;
