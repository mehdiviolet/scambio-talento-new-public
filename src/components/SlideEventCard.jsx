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
  Palette,
} from "lucide-react";
import styles from "./EventCard.module.css";
import MockEventCard from "./MockEventCard";
import {
  selectParticipants,
  selectEventStats,
} from "../store/slices/sharedEventSlice";
import { useSelector } from "react-redux";

const SlideEventCard = ({
  isOwner = false,
  selectedPersonData,
  onEdit,
  onDelete,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const participants = useSelector(selectParticipants);
  const eventStats = useSelector(selectEventStats);

  console.log(eventStats);

  // Dati mock dell'evento per la card preview
  const mockEvent = {
    id: "demo_event_001",
    // title: "Boardgame Night a San Salvario",
    title: "Boardgame Night",
    description:
      "Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare. Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare.Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare.Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare. Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare. Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare...",
    category: "Hobby e passioni",
    language: "italiano",
    startDate: "2025-10-24",
    startTime: "19:30",
    endTime: "22:30",
    placeName: "Café Central",
    placeAddress: "Via M.Cristina 45, Torino",
    coverImage: "/images/evento/azul-03.png",
    // participants: 11,
    participants: eventStats.participantsCount,
    // type: eventStats.type,
    type: "presenza",
    // maxParticipants: 20,
    // maxParticipants: eventStats.maxParticipants,
    maxParticipants: eventStats.maxParticipants,
    views: 24,
    likes: 7,
    shares: 3,
  };

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };
  console.log(selectedPersonData);

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
  console.log(getCategoryIcon("Hobby e passioni"));

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
        {/* Footer con organizzatore */}
        <div className={styles.cardFooterPiccolo}>
          <div className={styles.organizerInfoPiccolo}>
            <div
              className={styles.statusBadge}
              style={{ backgroundColor: "#28a745" }}
            >
              Aperto
            </div>
            {/* <div className={styles.avatar}>
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
            </div> */}
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
            {!isOwner && <div className={styles.bookShareLayout}></div>}
          </div>
        </div>

        {/* <div className={styles.flexCard}>
          <div className={styles.flexCardMe}>
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
            <h4 className={styles.eventTitle}>{mockEvent.title}</h4>
          </div>

          <div className={styles.cardPreviewContent}>
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
        </div> */}
        <div className={styles.flexCard}>
          {/* COLONNA 1: Solo immagine */}
          <div className={styles.flexCardMe}>
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
          </div>

          {/* COLONNA 2: Titolo + Meta info */}
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
            </div>
            <div className={styles.metaItem}>
              <Users size={14} />
              <span>
                {mockEvent.participants}/{mockEvent.maxParticipants}
              </span>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{mockEvent.placeName}</span>
            </div>
          </div>
        </div>
        {/* <hr /> */}
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
              mockEvent={mockEvent}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SlideEventCard;
