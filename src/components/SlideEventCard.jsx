// SlideEventCard.jsx
import React, { useState } from "react";
import { ChevronLeft, Calendar, Clock, Users, MapPin } from "lucide-react";
import styles from "./EventCard.module.css";
import MockEventCard from "./MockEventCard";

const SlideEventCard = ({
  isOwner = false,
  selectedPersonData,
  onEdit,
  onDelete,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <>
      {/* Card Preview - versione compatta */}
      <div
        className={styles.cardPreview}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
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

        {/* <div className={styles.cardActions}>
          <span className={styles.viewMore}>Visualizza →</span>
        </div> */}
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
