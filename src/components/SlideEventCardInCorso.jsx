// SlideEventCardInCorso.jsx
import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";
import styles from "./EventCard.module.css";
import MockEventCardInCorso from "./MockEventCardInCorso";
import {
  selectParticipants,
  selectEventStats,
} from "../store/slices/sharedEventSlice";
import { useSelector } from "react-redux";

const SlideEventCardInCorso = ({
  isOwner = false,
  selectedPersonData,
  onEdit,
  onDelete,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const participants = useSelector(selectParticipants);
  const eventStats = useSelector(selectEventStats);

  // Dati mock dell'evento IN CORSO
  const mockEventInCorso = {
    id: "demo_event_in_corso_001",
    title: "Workshop di Fotografia Urbana",
    description:
      "Workshop pratico di fotografia urbana in corso! Stiamo esplorando i luoghi più caratteristici di Torino per catturare l'essenza della città attraverso l'obiettivo. Un'esperienza immersiva tra tecnica fotografica e scoperta del territorio.",
    category: "Hobby e passioni",
    language: "italiano",
    startDate: "2024-12-20", // Data di oggi
    startTime: "14:00",
    endTime: "18:00",
    placeName: "Piazza Castello",
    placeAddress: "Piazza Castello, Torino",
    coverImage: "/images/evento/workshop-fotografia.jpg",
    participants: 6, // Partecipanti attuali
    type: "presenza",
    maxParticipants: 8,
    views: 28,
    likes: 9,
    shares: 3,
    state: "in svolgimento", // Evento in corso
  };

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

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

  const organizer = {
    id: selectedPersonData.profile.firstName?.toLowerCase() || "user",
    name:
      `${selectedPersonData.profile.firstName || ""} ${
        selectedPersonData.profile.lastName || ""
      }`.trim() || "Organizzatore",
    photo: selectedPersonData.profile.profilePhoto,
    trustScore: 42,
    participationScore: 89,
  };

  return (
    <>
      {/* Card Preview - versione compatta per evento in corso */}
      <div
        className={styles.cardPreview}
        onClick={handleCardClick}
        style={{
          cursor: "pointer",
          background: "var(--secondary-muted)",
        }}
      >
        {/* Badge "In Corso" */}
        <div
          className={styles.statusBadge}
          style={{ backgroundColor: "#fd7e14" }}
        >
          🟠 In corso
        </div>

        <div className={styles.flexCard}>
          <div className={styles.flexCardMe}>
            <div className={styles.cardImage}>
              {mockEventInCorso.coverImage ? (
                <img
                  src={mockEventInCorso.coverImage}
                  alt={mockEventInCorso.title}
                  className={styles.eventImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}>📸</div>
              )}
            </div>
            <h4 className={styles.eventTitle}>{mockEventInCorso.title}</h4>
          </div>

          <div className={styles.cardPreviewContent}>
            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{mockEventInCorso.startDate}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{mockEventInCorso.startTime}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={14} />
                <span>
                  {mockEventInCorso.participants}/
                  {mockEventInCorso.maxParticipants}
                </span>
              </div>
              <div className={styles.metaItemIcon}>
                <span>{getCategoryIcon(mockEventInCorso.category)}</span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{mockEventInCorso.placeName}</span>
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

          {/* Indicatori evento in corso */}
          {/* <div className={styles.actionButtons}>
            <div className={styles.inProgressIndicators}>
              <span className={styles.inProgressBadge}>⏱️ In corso</span>
              <span className={styles.inProgressBadge}>
                👥 {mockEventInCorso.participants - 2} presenti
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
            <span>Evento in Corso</span>
          </button>
        </div>

        <div className={styles.drawerContent}>
          {isDrawerOpen && (
            <MockEventCardInCorso
              isOwner={isOwner}
              selectedPersonData={selectedPersonData}
              onEdit={onEdit}
              onDelete={onDelete}
              showExtended={true}
              mockEvent={mockEventInCorso}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SlideEventCardInCorso;
