// MyEventCardDetails.jsx - VERSIONE SEMPLIFICATA (solo visualizzazione + edit/delete)
import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  Globe,
  Map,
  Languages,
  Star,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import styles from "./EventCard.module.css";
import { useAppSelector } from "@/hooks/redux";
import { ButtonEdit, ButtonParticipate, ButtonTrash } from "./ui/ButtonActions";
import MapComponent from "./MapComponent";

const MyEventCardDetails = ({
  onEdit,
  onDelete,
  showExtended = false,
  myProfile,
  mockEvent,
}) => {
  const [isExpanded, setIsExpanded] = useState(showExtended);
  const [showMap, setShowMap] = useState(false);

  const { isOwner } = useAppSelector((state) => state.onboarding);

  // Organizzatore (dati statici dal profilo)
  const organizer = {
    id: myProfile.firstName?.toLowerCase() || "user",
    name:
      `${myProfile.firstName || ""} ${myProfile.lastName || ""}`.trim() ||
      "Organizzatore",
    photo: myProfile.profilePhoto,
    trustScore: 85,
    participationScore: 92,
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

  // Helper per formattare l'orario
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.slice(0, 5);
  };

  // Helper per ottenere il tipo di luogo
  const getLocationDisplay = () => {
    if (mockEvent.type === "online") {
      return {
        icon: <Globe size={16} />,
        text: "Online",
        detail: mockEvent.onlineLink ? "Link disponibile" : "",
      };
    } else {
      return {
        icon: <MapPin size={16} />,
        text: `${mockEvent.placeName}, ${mockEvent.placeAddress}`,
        detail: mockEvent.placeAddress || "",
      };
    }
  };

  const handleCardClick = (e) => {
    if (isExpanded) {
      if (e.target.closest(`.${styles.overlayContent}`)) {
        setIsExpanded(false);
      }
      return;
    }

    if (
      e.target.closest(`.${styles.actionButton}`) ||
      e.target.closest(`.${styles.expandButton}`)
    ) {
      return;
    }

    setIsExpanded(true);
  };

  const location = getLocationDisplay();

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}>
      {/* Status Badge */}
      <div
        className={styles.statusBadge}
        style={{ backgroundColor: "var(--primary)" }}
      >
        Aperto
      </div>
      {/* Immagine copertina */}
      <div className={styles.coverImageWithOverlay}>
        {mockEvent.coverImage ? (
          <img
            src={
              mockEvent.coverImage instanceof File
                ? URL.createObjectURL(mockEvent.coverImage)
                : mockEvent.coverImage
            }
            alt={mockEvent.title}
            className={styles.eventImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>📅</div>
        )}
        <div className={styles.overlayContent}></div>
      </div>
      {/* Info quando espanso */}
      {isExpanded && (
        <div className={styles.cardHeader}>
          <h3 className={styles.eventTitleOverlay}>{mockEvent.title}</h3>
          <div className={styles.bottomContent}>
            <div className={styles.titleAndMeta}>
              <div className={styles.eventMetaOverlay}>
                <div className={styles.eventMetaOverlayMe}>
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
                  {mockEvent.language && (
                    <div className={styles.metaItemOverlay}>
                      <Languages size={16} className={styles.metaIconOverlay} />
                      <span>{mockEvent.language}</span>
                    </div>
                  )}
                </div>

                <div className={styles.participantsOverlay}>
                  <span>0/{mockEvent.maxParticipants} partecipanti</span>
                </div>
              </div>
            </div>
          </div>

          {/* Luogo */}
          <div className={styles.metaItem}>
            {location.icon}
            <span>{location.text}</span>

            {mockEvent.type === "presenza" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMap(!showMap);
                }}
                className={styles.mapToggle}
              >
                {showMap ? "Nascondi mappa" : <Map />}
              </button>
            )}
          </div>

          {/* Mappa espandibile */}
          {showMap && mockEvent.type === "presenza" && (
            <div className={styles.mapContainer}>
              <MapComponent address={mockEvent.placeAddress} height={200} />
            </div>
          )}
        </div>
      )}
      {/* Contenuto principale */}
      <div className={styles.cardContent}>
        {isExpanded && (
          <div className={styles.extraDetails}>
            <div className={styles.extraItem}>
              <strong>Descrizione:</strong>
              <div className={styles.description}>
                <p className={styles.descriptionText}>
                  {mockEvent.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!isOwner && (
        <div className={styles.actionButton}>
          <ButtonParticipate isParticipating={false} />
        </div>
      )}
      {/* Footer con organizzatore */}
      <div className={styles.cardFooter}>
        <div className={styles.organizerInfo}>
          <div className={styles.avatar}>
            {myProfile.profilePhoto ? (
              <img
                src={
                  myProfile.profilePhoto instanceof File
                    ? URL.createObjectURL(myProfile.profilePhoto)
                    : myProfile.profilePhoto
                }
                alt={`${myProfile.firstName || ""} ${myProfile.lastName || ""}`}
              />
            ) : (
              <div className={styles.avatarEmoji}>👤</div>
            )}
          </div>
          <div className={styles.organizerDetails}>
            <span className={styles.organizerLabel}>Organizzato da</span>
            <span className={styles.organizerName}>{organizer.name}</span>
          </div>
          <span className={styles.categoryIcons}>
            <span>
              <Star />
              {/* {organizer.trustScore} */}0
            </span>
            <span>
              <ShieldCheck />
              {/* {organizer.participationScore} */}0
            </span>
          </span>
        </div>

        {/* Bottoni Edit/Delete solo per owner */}
        {isOwner && (
          <div className={styles.actionButtons}>
            <ButtonTrash
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(mockEvent.id);
              }}
            />
            <ButtonEdit
            // onClick={(e) => {
            //   e.stopPropagation();
            //   onEdit && onEdit(mockEvent);
            // }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventCardDetails;
