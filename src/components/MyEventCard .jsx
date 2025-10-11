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
import {
  selectParticipants,
  selectEventStats,
  selectCurrentUser,
} from "../store/slices/sharedEventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/redux";
import { selectEventById } from "@/store/slices/eventsSlice";
import MyEventCardDetails from "./MyEventCardDetails";

const SlideEventCard = ({
  isOwner = true,
  // selectedPersonData,
  onEdit,
  onDelete,
  eventId,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  // const participants = useSelector(selectParticipants);
  // const eventStats = useSelector(selectEventStats);
  // const dispatch = useDispatch();
  const event = useAppSelector((state) => selectEventById(state, eventId));
  const myProfile = useSelector((state) => state.quickSetup.profileData);
  const myCurrentUser = useSelector(selectCurrentUser);

  console.log(event, myProfile, myCurrentUser);
  // console.log(event.coverImage.name);

  const {
    id = eventId,
    title,
    description,
    category,
    language,
    startDate,
    startTime,
    endTime,
    placeName,
    placeAddress,
    coverImage,
    // participants: 11,
    participants,
    type,
    // maxParticipants: 20,
    maxParticipants,
  } = event;

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };
  // console.log(selectedPersonData);

  const organizer = {
    id: myProfile.firstName?.toLowerCase() || "user",
    name:
      `${myProfile.firstName || ""} ${myProfile.lastName || ""}`.trim() ||
      "Organizzatore",
    photo: myProfile.profilePhoto,
    trustScore: Number(myCurrentUser.trustScore), // Mantieni valore di default o calcolalo
    participationScore: Number(myCurrentUser.participationScore), // Mantieni valore di default o calcolalo
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
              style={{ backgroundColor: "var(--primary)" }}
            >
              Aperto
            </div>
            {/* <div
                      className={styles.statusBadge}
                      style={{ backgroundColor: stateDisplay.color }}
                    >
                      {stateDisplay.label}
                    </div> */}

            {/* <div className={styles.avatar}>
              {myProfile.profilePhoto ? (
                <img
                  src={
                    myProfile.profilePhoto instanceof File
                      ? URL.createObjectURL(myProfile.profilePhoto)
                      : myProfile.profilePhoto
                  }
                  alt={`${myProfile.firstName || "Sara"} ${
                    myProfile.lastName || "Dormand"
                  }`}
                />
              ) : (
                <div className={styles.avatarEmoji}>👩‍🎨</div>
              )}
            </div> */}
            {/* <div className={styles.organizerDetails}>
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

                {/* <button
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
                </button> */}
              </div>
            )}
          </div>
        </div>
        <div className={styles.flexCard}>
          {/* COLONNA 1: Solo immagine */}
          <div className={styles.flexCardMe}>
            <div className={styles.cardImage}>
              {coverImage ? (
                <img
                  src={
                    event.coverImage instanceof File
                      ? URL.createObjectURL(event.coverImage)
                      : event.coverImage
                  }
                  alt={`${event.coverImage.name || "Pic"}`}
                  className={styles.eventImage}
                />
              ) : (
                <div className={styles.imagePlaceholder}>📅</div>
              )}
            </div>
          </div>

          {/* COLONNA 2: Titolo + Meta info */}
          <div className={styles.cardPreviewContent}>
            <h4 className={styles.eventTitle}>{title}</h4>

            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{startDate}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{startTime}</span>
              </div>
            </div>
            <div className={styles.metaItem}>
              <Users size={14} />
              <span>0/{maxParticipants}</span>
            </div>
            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{placeName}</span>
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
            <MyEventCardDetails
              isOwner={isOwner}
              myProfile={myProfile}
              onEdit={onEdit}
              onDelete={onDelete}
              showExtended={true}
              mockEvent={event}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SlideEventCard;
