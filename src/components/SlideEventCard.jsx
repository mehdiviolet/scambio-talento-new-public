// SlideEventCard.jsx
import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Bookmark,
  Share,
  Trash2,
  Edit,
  ShieldCheck,
  Star,
} from "lucide-react";
import styles from "./EventCard.module.css";
import MockEventCard from "./MockEventCard";

const SlideEventCard = ({
  isOwner = false,
  selectedPersonData,
  onEdit,
  onDelete,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Dati mock dell'evento per la card preview
  const mockEvent = {
    id: "demo_event_001",
    title: "Boardgame Night a San Salvarios",
    description:
      "Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare...",
    category: "Hobby e passioni",
    startDate: "2024-12-20",
    startTime: "19:30",
    endTime: "22:30",
    placeName: "Café Central",
    placeAddress: "Via Madama Cristina 45, Torino",
    coverImage: "/images/evento/azul-01.png",
    participants: 12,
    maxParticipants: 20,
  };

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

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

  return (
    <>
      {/* Card Preview - versione compatta */}
      <div
        className={styles.cardPreview}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.flexCard}>
          <div className={styles.cardImage}>
            {mockEvent.coverImage ? (
              <img
                src={mockEvent.coverImage}
                alt={mockEvent.title}
                className={styles.eventImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>📅</div>
            )}
          </div>

          <div className={styles.cardPreviewContent}>
            <h4 className={styles.eventTitle}>{mockEvent.title}</h4>

            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{mockEvent.startDate}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{mockEvent.startTime}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={14} />
                <span>
                  {mockEvent.participants}/{mockEvent.maxParticipants}
                </span>
              </div>
            </div>

            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{mockEvent.placeName}</span>
            </div>
          </div>
        </div>
        {/* <hr /> */}

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
            {!isOwner && (
              <div className={styles.bookShareLayout}>
                {/* <button
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("📤 DEMO: Condividi evento");
                  }}
                  title="Condividi"
                >
                  <Share size={16} />
                </button> */}

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
              </div>
            )}
          </div>
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
            <span>Evento</span>
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
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SlideEventCard;
