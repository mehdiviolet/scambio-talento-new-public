// RealEventSlideCard.jsx
import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";
import styles from "./EventCard.module.css";

const RealEventSlideCard = ({
  event,
  organizer,
  organizerPhoto,
  isOwner = false,
  onEdit,
  onDelete,
  currentUserEvent,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Funzioni per gestire le azioni
  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Helper per formattare data
  const formatDate = (dateString) => {
    if (!dateString) return "Data da definire";
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Helper per formattare orario
  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return timeString;
  };

  // Helper per la categoria
  const getCategoryDisplay = (category) => {
    return category || "Categoria generale";
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
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.title}
              className={styles.eventImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>📅</div>
          )}
        </div>

        <div className={styles.cardPreviewContent}>
          <h4 className={styles.eventTitle}>
            {event.title || "Evento senza titolo"}
          </h4>

          <div className={styles.eventMeta}>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={14} />
              <span>{formatTime(event.startTime)}</span>
            </div>
            <div className={styles.metaItem}>
              <Users size={14} />
              <span>
                {event.participants || 0}/{event.maxParticipants || "∞"}
              </span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <MapPin size={14} />
            <span>
              {event.placeName || event.placeAddress || "Luogo da definire"}
            </span>
          </div>
        </div>

        <div className={styles.cardActions}>
          {isOwner && (
            <div className={styles.ownerActions}>
              <button
                className={styles.actionButton}
                onClick={handleEdit}
                title="Modifica evento"
              >
                <Edit size={16} />
              </button>
              <button
                className={styles.actionButton}
                onClick={handleDelete}
                title="Elimina evento"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
          {/* <span className={styles.viewMore}>Visualizza →</span> */}
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
            <div className={styles.eventDetails}>
              {/* Header dell'evento */}
              <div className={styles.eventHeader}>
                {event.coverImage && (
                  <div className={styles.eventBanner}>
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className={styles.bannerImage}
                    />
                  </div>
                )}

                <div className={styles.eventTitleSection}>
                  <h1 className={styles.eventMainTitle}>{event.title}</h1>
                  <div className={styles.categoryBadge}>
                    {getCategoryDisplay(event.category)}
                  </div>
                </div>
              </div>

              {/* Informazioni principali */}
              <div className={styles.eventInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <Calendar className={styles.infoIcon} size={20} />
                    <div>
                      <span className={styles.infoLabel}>Data</span>
                      <span className={styles.infoValue}>
                        {formatDate(event.startDate)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <Clock className={styles.infoIcon} size={20} />
                    <div>
                      <span className={styles.infoLabel}>Orario</span>
                      <span className={styles.infoValue}>
                        {formatTime(event.startTime)} -{" "}
                        {formatTime(event.endTime)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <MapPin className={styles.infoIcon} size={20} />
                    <div>
                      <span className={styles.infoLabel}>Luogo</span>
                      <span className={styles.infoValue}>
                        {event.placeName || "Luogo da definire"}
                        {event.placeAddress && (
                          <div className={styles.address}>
                            {event.placeAddress}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <Users className={styles.infoIcon} size={20} />
                    <div>
                      <span className={styles.infoLabel}>Partecipanti</span>
                      <span className={styles.infoValue}>
                        {event.participants || 0} /{" "}
                        {event.maxParticipants || "Illimitati"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrizione */}
              {event.description && (
                <div className={styles.eventDescription}>
                  <h3>Descrizione</h3>
                  <p>{event.description}</p>
                </div>
              )}

              {/* Organizzatore */}
              <div className={styles.organizerSection}>
                <h3>Organizzatore</h3>
                <div className={styles.organizerInfo}>
                  {organizerPhoto && (
                    <img
                      src={organizerPhoto}
                      alt={organizer}
                      className={styles.organizerAvatar}
                    />
                  )}
                  <span className={styles.organizerName}>{organizer}</span>
                  {isOwner && <span className={styles.ownerBadge}>Tu</span>}
                </div>
              </div>

              {/* Azioni per il proprietario */}
              {isOwner && (
                <div className={styles.ownerActionsSection}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (onEdit) onEdit();
                    }}
                  >
                    <Edit size={18} />
                    Modifica evento
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (onDelete) onDelete();
                    }}
                  >
                    <Trash2 size={18} />
                    Elimina evento
                  </button>
                </div>
              )}

              {/* Stato dell'evento */}
              {event.status && (
                <div className={styles.eventStatus}>
                  <span
                    className={`${styles.statusBadge} ${styles[event.status]}`}
                  >
                    {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RealEventSlideCard;
