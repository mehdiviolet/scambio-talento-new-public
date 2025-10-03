import React, { useState } from "react";
import CreateEventModal from "@/components/MainApp/Shared/Modals/CreateEventModal";
import EventCard from "./EventCard";
import { useAppSelector } from "../hooks/redux";
import { selectCurrentUserProfile } from "@/services/userService";
import { useEvents } from "../hooks/useEvents";
import MockEventCard from "./MockEventCard";
import StaticEventShowcase from "./StaticEventShowcase";
import StatusFilterButtons from "./StatusFilterButtons";
import { useStatusFilter } from "./useStatusFilter";
import {
  selectEventState,
  selectEventStats,
} from "@/store/slices/sharedEventSlice";
import SlideEventCard from "./SlideEventCard";
import { HeaderAddButton } from "./ui/AddButtons";
import SlideEventCardCompleted from "./SlideEventCardCompleted";
import SlideEventCardInCorso from "./SlideEventCardInCorso";
import baseStyles from "./ExperiencesSection.module.css";
import extendedStyles from "./EventsSection.module.css";

const styles = { ...baseStyles, ...extendedStyles };

const EventSectionTest = ({
  isOwner,
  isInstructorPanel,
  selectedPersonData,
}) => {
  // State per il modal eventi
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Leggi direttamente da Redux
  // const currentProfile = useAppSelector(selectCurrentUserProfile);
  // const { isOwner } = useAppSelector((state) => state.onboarding);
  console.log(selectedPersonData.profile);

  // ✅ Hook per gestire events
  const { events } = useEvents();
  const eventState = useAppSelector(selectEventStats);
  console.log(eventState);

  // 🎯 Configurazione filtri personalizzata per eventi
  const eventFilterConfig = {
    idle: {
      label: "Idle",
      icon: "BookmarkCheckIcon",
      statuses: ["idle"],
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
      statuses: ["completed", "fatto"],
    },
    all: {
      label: "Tutti",
      icon: null,
      statuses: null,
    },
  };

  // 🎯 Unifica eventi con status dinamici
  const allEvents = [
    // Evento dinamico (prende status da Redux)
    {
      id: "mock-event-1",
      type: "mock",
      component: MockEventCard,
      status: eventState.eventState, // ← USA LO STATO DIRETTAMENTE

      // altri dati...
    },
    // Eventi statici (sempre completed)
    {
      id: "static-event-1",
      type: "static",
      component: StaticEventShowcase,
      status: "completed", // <- hardcoded
      // altri dati...
    },
  ];

  // 🎯 USA IL CUSTOM HOOK
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredEvents, // <- cambia nome
    filterCounts,
    filterConfig,
  } = useStatusFilter(
    allEvents, // <- usa events invece di mockExperiences
    null, // <- o il path Redux giusto per gli eventi
    eventFilterConfig // <- passa la configurazione personalizzata
  );
  // Handler per aprire modal in modalità create
  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {/* <>
          <button
            className={styles.toggleFiltersBtn}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filtri {showFilters ? "↑" : "↓"}
          </button>
          {isInstructorPanel && (
            <HeaderAddButton
              onClick={handleOpenCreateModal}
              title="Crea nuovo evento"
            />
          )}
        </> */}
        {isOwner && (
          <>
            <div
              className={`${styles.addButtonContainer} ${
                showFilters ? styles.hidden : ""
              }`}
            >
              <HeaderAddButton
                onClick={handleOpenCreateModal}
                title="Crea nuovo evento"
                txt="EVENT"
              />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* <div className={styles.emptyState}>
          <MockEventCard
            isOwner={isOwner}
            selectedPersonData={selectedPersonData}
          />
        </div> */}
        <div
          className={`${styles.filtersContainer} ${
            showFilters ? styles.expanded : ""
          }`}
        >
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
        </div>
        {filteredEvents.map((event) => {
          if (event.type === "mock") {
            return (
              // <MockEventCard
              //   key={event.id}
              //   isOwner={isOwner}
              //   selectedPersonData={selectedPersonData}
              // />

              <SlideEventCard
                key={event.id}
                isOwner={isOwner}
                selectedPersonData={selectedPersonData}
              />
            );
          }

          // if (event.type === "static") {
          //   return (
          //     <>
          //       <SlideEventCardInCorso
          //         key={event.id}
          //         isOwner={isOwner}
          //         selectedPersonData={selectedPersonData}
          //         stato={"inCorso"}
          //       />
          //       <SlideEventCardCompleted
          //         key={event.id}
          //         isOwner={isOwner}
          //         selectedPersonData={selectedPersonData}
          //       />

          //       <SlideEventCardCompleted
          //         key={event.id}
          //         isOwner={isOwner}
          //         selectedPersonData={selectedPersonData}
          //       />
          //     </>
          //   );
          // }

          return null;
        })}
      </div>
    </div>
  );
};

export default EventSectionTest;
