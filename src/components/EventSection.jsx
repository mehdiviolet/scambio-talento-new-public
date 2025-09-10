import React, { useState } from "react";
import CreateEventModal from "@/components/MainApp/Shared/Modals/CreateEventModal";
import EventCard from "./EventCard";
import styles from "./EventsSection.module.css";
import { useAppSelector } from "../hooks/redux";
import { selectCurrentUserProfile } from "@/services/userService";
import { useEvents } from "../hooks/useEvents";
import StatusFilterButtons from "./StatusFilterButtons";
import { useStatusFilter } from "./useStatusFilter";
import {
  selectCurrentUser,
  selectEventStats,
  selectOrganizer,
} from "@/store/slices/sharedEventSlice";
import { AddEventButton, HeaderAddButton } from "./ui/AddButtons";
import { DropdownFilters } from "./ui/SmartFilters";
import RealEventSlideCard from "./RealEventSlideCard";

const EventsSection = () => {
  // State per il modal eventi
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Leggi direttamente da Redux
  const currentProfile = useAppSelector(selectCurrentUserProfile);
  const { isOwner } = useAppSelector((state) => state.onboarding);

  // ✅ Hook per gestire events
  const { events, addEvent, removeEvent, updateEvent } = useEvents();

  // Handler per salvare evento
  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      // Modalità edit
      console.log("🔄 Aggiornando evento:", editingEvent.id, eventData);
      updateEvent({ eventId: editingEvent.id, updates: eventData });
      setEditingEvent(null);
    } else {
      // Modalità create
      console.log("🎉 Salvando nuovo evento:", eventData);
      const savedEvent = addEvent(eventData);
      console.log("✅ Evento salvato:", savedEvent);
    }
    setIsEventModalOpen(false);
  };

  // Handler per aprire modal in modalità create
  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  // Handler per aprire modal in modalità edit
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  // Handler per eliminare evento
  const handleDeleteEvent = (eventId) => {
    console.log("🗑️ Eliminando evento:", eventId);

    const eventToDelete = events.find((e) => e.id === eventId);

    if (
      window.confirm(
        `Sei sicuro di voler eliminare l'evento "${
          eventToDelete?.title || "questo evento"
        }"?`
      )
    ) {
      removeEvent(eventId);
      console.log("✅ Evento eliminato");
    }
  };

  // Helper per ottenere la foto profilo dell'owner
  const getOwnerPhoto = () => {
    const photo = currentProfile?.profilePhoto;

    if (!photo) return null;

    if (typeof photo === "string") {
      return photo;
    }

    if (photo instanceof File) {
      try {
        return URL.createObjectURL(photo);
      } catch (error) {
        console.warn("Errore nella conversione foto profilo:", error);
        return null;
      }
    }

    return null;
  };

  // 🎯 Configurazione filtri personalizzata per eventi
  const eventFilterConfig = {
    idle: {
      label: "Idle",
      icon: "BookmarkCheckIcon",
      statuses: ["idle", "scheduled"],
    },
    waiting: {
      label: "waiting",
      icon: "BookmarkCheckIcon",
      statuses: ["waiting"],
    },
    inCorso: {
      label: "in corso",
      icon: "BookmarkCheckIcon",
      statuses: ["confirmed", "in svolgimento"],
    },
    completed: {
      label: "Completati",
      icon: "Flame",
      statuses: ["completed"],
    },
    // all: {
    //   label: "Tutti",
    //   icon: null,
    //   statuses: null,
    // },
  };

  // 🎯 USA IL CUSTOM HOOK
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredEvents, // <- cambia nome
    filterCounts,
    filterConfig,
  } = useStatusFilter(
    events, // <- usa events invece di mockExperiences
    null, // <- o il path Redux giusto per gli eventi
    eventFilterConfig // <- passa la configurazione personalizzata
  );

  const currentUserEvent = useAppSelector(selectCurrentUser);
  console.log(currentUserEvent);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Eventi Creati ({events.length})</h3>

        {isOwner && events.length !== 0 && (
          // <button
          //   onClick={handleOpenCreateModal}
          //   className={styles.addButton}
          //   title="Crea nuovo evento"
          // >
          //   +
          // </button>
          <HeaderAddButton
            onClick={handleOpenCreateModal}
            title="Crea nuovo evento"
          />
        )}
      </div>
      <div className={styles.filtersContainer}>
        <button
          className={styles.toggleFiltersBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtri {showFilters ? "↑" : "↓"}
        </button>

        <div
          className={`${styles.filterContent} ${
            showFilters ? styles.open : ""
          }`}
        >
          <StatusFilterButtons
            activeFilter={statusFilter}
            onFilterChange={setStatusFilter}
            filterCounts={filterCounts}
            filterConfig={filterConfig}
          />
        </div>
      </div>
      {/* <div>
        <span>Now/</span>
        <span>past</span>
      </div> */}
      {/* Content */}
      <div className={styles.content}>
        {events.length > 0 ? (
          <div className={styles.eventsGrid}>
            {/* {events.map((event) => {
              const ownerPhoto = getOwnerPhoto();

              return (
                <EventCard
                  currentUserEvent={currentUserEvent}
                  key={event.id}
                  event={event}
                  organizer={`${currentProfile?.firstName || "Tu"} ${
                    currentProfile?.lastName || ""
                  }`}
                  organizerPhoto={ownerPhoto}
                  isOwner={isOwner}
                  onEdit={isOwner ? () => handleEditEvent(event) : undefined}
                  onDelete={
                    isOwner ? () => handleDeleteEvent(event.id) : undefined
                  }
                />
              );
            })} */}

            {filteredEvents.map((event) => {
              const ownerPhoto = getOwnerPhoto();
              return (
                <RealEventSlideCard
                  key={event.id}
                  event={event}
                  organizer={`${currentProfile?.firstName || "Tu"} ${
                    currentProfile?.lastName || ""
                  }`}
                  organizerPhoto={ownerPhoto}
                  isOwner={isOwner}
                  onEdit={isOwner ? () => handleEditEvent(event) : undefined}
                  onDelete={
                    isOwner ? () => handleDeleteEvent(event.id) : undefined
                  }
                  currentUserEvent={currentUserEvent}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            {isOwner ? (
              // Owner Mode - Empty State
              <>
                {/* <div className={styles.emptyIcon}>🎪</div>
                <h4 className={styles.emptyTitle}>Nessun evento creato</h4>
                <p className={styles.emptyDescription}>
                  Clicca + per creare il tuo primo evento
                </p> */}
                <AddEventButton onClick={handleOpenCreateModal} />
              </>
            ) : (
              // Viewer Mode - Empty State
              <>
                {/* <div className={styles.emptyIcon}>👀</div>
                <h4 className={styles.emptyTitle}>Nessun evento disponibile</h4>
                <p className={styles.emptyDescription}>
                  Questo utente non ha ancora creato eventi
                </p> */}
                <p className={styles.emptyTitle}>Nessun evento disponibile</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal per creare/modificare eventi */}
      <CreateEventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        editMode={!!editingEvent}
        initialData={editingEvent}
      />
    </div>
  );
};

export default EventsSection;
