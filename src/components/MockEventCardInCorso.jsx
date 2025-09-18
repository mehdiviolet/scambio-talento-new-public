// MockEventCardInCorso.jsx - STATO IN CORSO STATICO
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
  CheckCircle,
} from "lucide-react";
import styles from "./EventCard.module.css";

// DATI MOCK STATO IN CORSO
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

// Check-in parziale - solo 4 su 6 hanno fatto check-in
const mockCheckInList = [
  { id: "c1", participantName: "Mario Rossi", time: "19:35" },
  { id: "c2", participantName: "Anna Bianchi", time: "19:40" },
  { id: "c3", participantName: "Luca Verdi", time: "19:45" },
  { id: "c4", participantName: "Sara Neri", time: "19:50" },
];

// Commenti durante l'evento - no commenti post-evento
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
    text: "Appena arrivato, che bello!",
    time: "19:45",
  },
  {
    id: "c4",
    authorName: "Sara Neri",
    text: "Sto arrivando, 5 minuti!",
    time: "19:48",
  },
];

const mockOrganizer = {
  name: "Sara Dormand",
  photo: "/images/people/sara-avatar.jpg",
  trustScore: 25, // Ancora in costruzione
  participationScore: 126,
};

const MockEventCardInCorso = ({ isOwner = true }) => {
  // Stati per toggle delle sezioni
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
    <div
      className={`${styles.card} ${styles.expanded}`}
      style={{
        background: "var(--secondary-muted)",
      }}
    >
      {/* Status Badge - IN CORSO */}
      <div
        className={styles.statusBadge}
        style={{ backgroundColor: "#fd7e14" }}
      >
        🟠 In corso
      </div>

      {/* Immagine copertina con QR attivo */}
      <div className={styles.coverImageWithOverlay}>
        <img
          src={mockEventData.coverImage}
          alt={mockEventData.title}
          className={styles.coverImg}
        />
        {/* <div className={styles.overlayContent}>
          <div className={styles.bottomRightIcons}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--white)",
                border: "2px solid #28a745",
                backdropFilter: "blur(8px)",
                cursor: isOwner ? "pointer" : "default",
                transition: "transform 0.2s",
              }}
              title={
                isOwner
                  ? `Click per scan (${
                      mockParticipants.length - mockCheckInList.length
                    } rimanenti)`
                  : "QR Code attivo"
              }
              onMouseEnter={(e) => {
                if (isOwner) e.target.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                if (isOwner) e.target.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "70%",
                  background: `
                    linear-gradient(90deg, var(--text-primary) 50%, transparent 50%),
                    linear-gradient(var(--text-primary) 50%, transparent 50%)
                  `,
                  backgroundSize: "4px 4px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
              </div>
            </div>
          </div>
        </div> */}
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
        {/* Check-in sezione (solo owner) - PARZIALE */}
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

        {/* NO Feedback - non ancora disponibili */}
        {/* NO Gallery - non ancora disponibile */}

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

      {/* Bottone Termina Evento per Owner */}
      {isOwner && (
        <div className={styles.confermButtonOwner}>
          <button
            className={`${styles.actionButton} ${styles.actionButtonDelete}`}
            onClick={(e) => {
              e.stopPropagation();
              console.log("🏁 DEMO: Termina evento");
            }}
          >
            <CheckCircle size={16} />
            <span>Termina Evento</span>
          </button>
        </div>
      )}

      {/* Sezione commenti (toggle) - DURANTE EVENTO */}
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

        {/* Bottoni normali per owner (sempre disponibili) */}
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

export default MockEventCardInCorso;
