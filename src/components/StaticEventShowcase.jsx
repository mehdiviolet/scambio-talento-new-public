// components/StaticEventShowcase.jsx - MOCKUP STATICO
import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  Globe,
  Star,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  UsersIcon,
} from "lucide-react";
import styles from "./EventCard.module.css";
import SimpleImageModal from "./SimpleImageModal";
import QRCodeComponent from "./QRCodeComponent";

// DATI MOCKUP HARDCODED
const mockEvent = {
  id: "static_demo_001",
  title: "Aperitivo Spagnolo",
  description:
    "Serata di scambio linguistico spagnolo-italiano in videochiamata! Ambiente rilassato per praticare la conversazione, condividere cultura e fare nuove amicizie. Livello principiante-intermedio benvenuto.",
  category: "Lingua e identità",
  language: "spagnolo/italiano",
  startDate: "2024-12-15",
  startTime: "19:00",
  endTime: "21:30",
  type: "online",
  onlineLink: "https://meet.google.com/xyz-demo-link",
  views: 47,
  likes: 12,
  shares: 8,
  createdAt: "2024-12-13T10:30:00Z",
  coverImage: "/images/evento/aperitivo-02.jpeg",

  state: "fatto", // Evento completato
};

const mockParticipants = [
  {
    id: "p1",
    name: "Maria García",
    initials: "MG",
    photo: "/images/people/laura-la.jpg",
  },
  {
    id: "p2",
    name: "Luca Rossi",
    initials: "LR",
    photo: "/images/people/marco-ro.jpg",
  },
  {
    id: "p3",
    name: "Ana Martínez",
    initials: "AM",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "p4",
    name: "Paolo Verdi",
    initials: "PV",
    photo: "/images/people/laura-la.jpg",
  },
  {
    id: "p5",
    name: "Carmen Lopez",
    initials: "CL",
    photo: "/images/people/laura-la.jpg",
  },
  {
    id: "p6",
    name: "Marco Bianchi",
    initials: "MB",
    photo: "/images/people/laura-la.jpg",
  },
];

// const mockOrganizer = {
//   id: "sofia_hernandez",
//   name: "Sofia Hernandez",
//   photo: "https://picsum.photos/100/100?random=200",
//   trustScore: 34,
//   participationScore: 89,
// };

const mockComments = [
  {
    id: "c1",
    authorName: "Maria García",
    text: "¡Perfecto para practicar! Muy bien organizado 🇪🇸",
    time: "18:45",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "c2",
    authorName: "Luca Rossi",
    text: "Fantastica esperienza, ho imparato molto!",
    time: "19:20",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "c3",
    authorName: "Ana Martínez",
    text: "Ambiente molto accogliente, tornerò sicuramente",
    time: "20:15",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "c4",
    authorName: "Paolo Verdi",
    text: "Ottimo per rompere il ghiaccio con la lingua spagnola",
    time: "20:30",
    photo: "/images/people/sara-dormand.jpg",
  },
];

const mockCheckIns = [
  { id: "ch1", participantName: "Maria García", time: "19:02" },
  { id: "ch2", participantName: "Luca Rossi", time: "19:05" },
  { id: "ch3", participantName: "Ana Martínez", time: "19:08" },
  { id: "ch4", participantName: "Paolo Verdi", time: "19:12" },
  { id: "ch5", participantName: "Carmen Lopez", time: "19:15" },
];

const mockFeedbacks = [
  {
    id: "f1",
    fromUserName: "Maria García",
    stars: 3,
    comment: "Excelente organizadora, muy profesional",
    timestamp: "2024-12-15T21:45:00Z",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "f2",
    fromUserName: "Luca Rossi",
    stars: 3,
    comment: "Ottima esperienza, molto coinvolgente!",
    timestamp: "2024-12-15T21:50:00Z",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    id: "f3",
    fromUserName: "Paolo Verdi",
    stars: 2,
    comment: "Bene ma poteva durare di più",
    timestamp: "2024-12-15T22:00:00Z",
    photo: "/images/people/sara-dormand.jpg",
  },
];

const mockGallery = [
  {
    id: "photo_1",
    url: "/images/evento/azul-01.png",
    // url: "https://picsum.photos/600/400?random=301",
    alt: "Screenshot videocall 1",
    caption: "Tutti connessi e pronti per l'intercambio!",
  },
];

const StaticEventShowcase = ({ selectedPersonData }) => {
  // UNICA INTERAZIONE: expand/collapse
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCheckIns, setShowCheckIns] = useState(false);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // Lightbox per gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  console.log(selectedPersonData);

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const mockOrganizer = {
    id: selectedPersonData.profile.firstName?.toLowerCase() || "user",
    name:
      `${selectedPersonData.profile.firstName || ""} ${
        selectedPersonData.profile.lastName || ""
      }`.trim() || "Organizzatore",
    photo: selectedPersonData.profile.profilePhoto,
    trustScore: 47, // Mantieni valore di default o calcolalo
    participationScore: 126, // Mantieni valore di default o calcolalo
  };
  const formatTime = (timeString) => timeString.slice(0, 5);

  const getCategoryIcon = (category) => {
    const icons = {
      "Lingua e identità": "🗣️",
      "Hobby e passioni": "🎨",
      "Sport e fitness": "🏃‍♂️",
      Tecnologia: "💻",
      "Musica e Arte": "🎵",
      "Attività sociali": "👥",
    };
    return icons[category] || "🎉";
  };

  // Lightbox handlers
  const handlePhotoClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => Math.min(mockGallery.length - 1, prev + 1));
  };

  // Click handler per expand/collapse
  const handleCardClick = (e) => {
    // Evita toggle se click su dropdown o lightbox
    if (
      e.target.closest("button") ||
      e.target.closest(".dropdown-trigger") ||
      e.target.closest(`.${styles.galleryItem}`)
    ) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        {/* Status Badge */}
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: "#6c757d" }}
        >
          ✅ Completato
        </div>

        {/* Cover Image con Overlay */}
        <div className={styles.coverImageWithOverlay}>
          <img
            src={mockEvent.coverImage}
            alt={mockEvent.title}
            className={styles.coverImg}
          />
          <div className={styles.overlayContent}>
            {/* Icone tipo evento */}
            <div className={styles.topRightIcons}>
              <button className={styles.overlayIcon} title="completato">
                {/* ✅ */}
                <UsersIcon size={16} />
              </button>
              <button className={styles.overlayIcon} title="online">
                <Globe size={16} />
              </button>
            </div>

            {/* Contenuto principale */}
            <div className={styles.bottomContent}>
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
                      {mockParticipants
                        .slice(0, 3)
                        .map((participant, index) => (
                          <div
                            key={index}
                            className={styles.participantAvatar}
                            title={participant.name}
                          >
                            <img
                              src={participant.photo}
                              alt={participant.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <span style={{ display: "none" }}>
                              {participant.initials}
                            </span>
                          </div>
                        ))}
                    </div>
                    <span className={styles.participantCount}>
                      {mockParticipants.length} partecipanti
                    </span>
                  </div>
                </div>
              </div>
              <QRCodeComponent isOwner={false} size={80} />
            </div>
          </div>
        </div>

        {/* Info aggiuntive quando espanso */}
        {isExpanded && (
          <div className={styles.cardHeader}>
            <div className={styles.metaItem}>
              <Globe size={16} />
              <span>Online - {mockEvent.onlineLink}</span>
            </div>
          </div>
        )}

        {/* Contenuto principale espanso */}
        {isExpanded && (
          <div className={styles.cardContent}>
            {/* Check-in List */}
            <div className={styles.checkInSection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCheckIns(!showCheckIns);
                }}
              >
                ✅ Check-in ({mockCheckIns.length}/{mockParticipants.length})
                {showCheckIns ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {showCheckIns && (
                <div className={styles.checkInList}>
                  {mockCheckIns.map((checkin) => (
                    <div key={checkin.id} className={styles.checkInItem}>
                      <span>• {checkin.participantName}</span>
                      <span>{checkin.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Feedback ricevuti */}
            <div className={styles.feedbackSection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={feedback.photo}
                            alt={feedback.fromUserName}
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <strong>{feedback.fromUserName}</strong>
                        </div>
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

            {/* Gallery */}
            <div className={styles.gallerySection}>
              <button
                className={styles.dropdownTrigger}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGallery(!showGallery);
                }}
              >
                📸 Gallery ({mockGallery.length} foto)
                {showGallery ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {showGallery && (
                <div className={styles.galleryGrid}>
                  {mockGallery.map((photo, index) => (
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

            {/* Dettagli evento */}
            <div className={styles.extraDetails}>
              <div className={styles.extraItem}>
                <strong>Descrizione:</strong>
                <div className={styles.description}>
                  <p className={styles.descriptionText}>
                    {mockEvent.description}
                  </p>
                </div>
              </div>

              <div className={styles.extraItem}>
                <strong>Lingua:</strong> {mockEvent.language}
              </div>
            </div>

            {/* Sezione commenti */}
            <div className={styles.commentsSection}>
              <div className={styles.commentsHeader}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowComments(!showComments);
                  }}
                  className={styles.commentsToggle}
                >
                  💬 Commenti ({mockComments.length}) {showComments ? "▼" : "▶"}
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
          </div>
        )}

        {/* Footer con organizzatore */}
        <div className={styles.cardFooter}>
          <div className={styles.organizerInfo}>
            <div className={styles.organizerAvatar}>
              <img
                src={mockOrganizer.photo}
                alt={mockOrganizer.name}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.organizerDetails}>
              <span className={styles.organizerLabel}>Organizzato da</span>
              <span className={styles.organizerName}>{mockOrganizer.name}</span>
            </div>
            <span className={styles.categoryIcons}>
              <span>
                {" "}
                <Star />
                {mockOrganizer.trustScore}{" "}
              </span>
              <span>
                <ShieldCheck />
                {mockOrganizer.participationScore}
              </span>
            </span>{" "}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <SimpleImageModal
        isOpen={lightboxOpen}
        photos={mockGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrevious={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </>
  );
};

export default StaticEventShowcase;
