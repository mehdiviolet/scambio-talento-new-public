// SlideEventCardCompleted.jsx
import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  ShieldCheck,
  Palette,
} from "lucide-react";
import styles from "./EventCard.module.css";
import MockEventCard from "./MockEventCard";
import {
  selectParticipants,
  selectEventStats,
} from "../store/slices/sharedEventSlice";
import { useSelector } from "react-redux";

const SlideEventCardCompleted = ({
  isOwner = false,
  selectedPersonData,
  onEdit,
  onDelete,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const participants = useSelector(selectParticipants);
  const eventStats = useSelector(selectEventStats);

  // Dati mock dell'evento COMPLETATO
  const mockCompletedEvent = {
    id: "demo_event_completed_001",
    title: "Aperitivo Spagnolo al Centro",
    description:
      "Serata di scambio linguistico spagnolo-italiano completata con successo! È stata un'esperienza fantastica di conversazione e condivisione culturale. Abbiamo praticato entrambe le lingue in un ambiente rilassato e amichevole.",
    category: "Hobby e passioni",
    language: "spagnolo/italiano",
    startDate: "2024-09-04", // Data nel passato
    startTime: "19:00",
    endTime: "21:30",
    placeName: "Bar Centrale",
    placeAddress: "Via Roma 15, Torino",
    coverImage: "/images/evento/aperitivo-02.jpeg",
    participants: 10, // Partecipanti effettivi
    type: "presenza",
    maxParticipants: 10,
    views: 35,
    likes: 12,
    shares: 5,
    state: "fatto", // Evento completato
  };

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Lingua e identità": "🗣️",
      "Hobby e passioni": <Palette size={16} />,
      "Sport e fitness": "🏃‍♂️",
      Tecnologia: "💻",
      "Musica e Arte": "🎵",
      "Attività sociali": "👥",
    };
    return icons[category] || "🎉";
  };

  const organizer = {
    id: selectedPersonData.profile.firstName?.toLowerCase() || "user",
    name:
      `${selectedPersonData.profile.firstName || ""} ${
        selectedPersonData.profile.lastName || ""
      }`.trim() || "Organizzatore",
    photo: selectedPersonData.profile.profilePhoto,
    trustScore: 36,
    participationScore: 112,
  };

  return (
    <>
      {/* Card Preview - versione compatta per evento completato */}
      <div
        className={styles.cardPreview}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        {/* Badge "Completato" */}
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: "#6c757d" }}
        >
          ✅ Completato
        </div>

        <div className={styles.flexCard}>
          <div className={styles.flexCardMe}>
            <div className={styles.cardImage}>
              {mockCompletedEvent.coverImage ? (
                <img
                  src={mockCompletedEvent.coverImage}
                  alt={mockCompletedEvent.title}
                  className={styles.eventImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}>📅</div>
              )}
            </div>
            <h4 className={styles.eventTitle}>{mockCompletedEvent.title}</h4>
          </div>

          <div className={styles.cardPreviewContent}>
            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{mockCompletedEvent.startDate}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{mockCompletedEvent.startTime}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={14} />
                {/* <span>{mockCompletedEvent.participants} partecipanti</span> */}
                <span>
                  {mockCompletedEvent.participants}/
                  {mockCompletedEvent.maxParticipants}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span>{getCategoryIcon(mockCompletedEvent.category)}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{mockCompletedEvent.placeName}</span>
            </div>
          </div>
        </div>

        {/* Footer con organizzatore */}
        <div className={styles.cardFooterPiccolo}>
          <div className={styles.organizerInfoPiccolo}>
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
                <Star />
                {organizer.trustScore}
              </span>
              <span>
                <ShieldCheck />
                {organizer.participationScore}
              </span>
            </span>
          </div>

          {/* Indicatori evento completato */}
          {/* <div className={styles.actionButtons}>
            <div className={styles.completedIndicators}>
              <span className={styles.completedBadge}>
                📸{" "}
                {mockCompletedEvent.participants > 5
                  ? "5+"
                  : mockCompletedEvent.participants}{" "}
                foto
              </span>
              <span className={styles.completedBadge}>
                ⭐ {Math.floor(Math.random() * 5) + 3} recensioni
              </span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Event Slide Drawer */}
      <div
        className={`${styles.slideDrawer} ${isDrawerOpen ? styles.open : ""}`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsDrawerOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Evento Completato</span>
          </button>
        </div>

        <div className={styles.drawerContent}>
          {isDrawerOpen && (
            <MockEventCard
              isOwner={isOwner}
              selectedPersonData={selectedPersonData}
              onEdit={onEdit}
              onDelete={onDelete}
              showExtended={true}
              mockEvent={mockCompletedEvent}
              // Forza lo stato "fatto" per mostrare le sezioni specifiche
              initialEventState="fatto"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SlideEventCardCompleted;
