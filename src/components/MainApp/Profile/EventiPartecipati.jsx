import React from "react";
import styles from "./ProfilePage.module.css";
import MockEventCard from "@/components/MockEventCard";
import { useSelector } from "react-redux";
import {
  selectEventState,
  selectEventStats,
  selectIsParticipating,
} from "@/store/slices/sharedEventSlice";
import { useStatusFilter } from "@/components/useStatusFilter";
import { useAppSelector } from "@/hooks/redux";
import StatusFilterButtons from "@/components/StatusFilterButtons";
import { DropdownFilters } from "@/components/ui/SmartFilters";

const EventiPartecipati = () => {
  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );
  const isParticipating = useSelector(selectIsParticipating);

  const eventState = useAppSelector(selectEventStats);

  const eventFilterConfig = {
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
      statuses: [
        "waiting",
        "confirmed",
        "in svolgimento",
        "completed",
        "fatto",
      ],
    },
  };

  // 🎯 Eventi unificati con status dinamici
  const allEvents = [
    {
      id: "mock-event-1",
      type: "mock",
      component: MockEventCard,
      status: eventState.eventState,
      // altri dati...
    },
  ];

  // 🎯 Hook per filtri
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredEvents,
    filterCounts,
    filterConfig,
  } = useStatusFilter(allEvents, null, eventFilterConfig);

  return (
    <div className={styles.eventsSection}>
      <h3 className={styles.eventsTitle}>Eventi Partecipati</h3>

      {/* <StatusFilterButtons
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        filterCounts={filterCounts}
        filterConfig={filterConfig}
      /> */}
      <DropdownFilters
        filters={Object.entries(filterConfig).map(([key, config]) => ({
          key,
          label: config.label,
          count: filterCounts[key] || 0,
        }))}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {isParticipating && filteredEvents.length > 0 ? (
        <div className={styles.eventsContainer}>
          {filteredEvents.map((event) => {
            const EventComponent = event.component;
            return (
              <EventComponent
                key={event.id}
                isOwner={false}
                selectedPersonData={selectedPersonData}
                eventData={event}
              />
            );
          })}
        </div>
      ) : (
        // <div className={styles.searchEmpty}>
        //   <div className={styles.emptyIconSmall}>🔍</div>
        //   <p className={styles.emptyText}>
        //     Nessun evento trovato per questo filtro
        //   </p>
        // </div>
        <p className={styles.emptyText}>Nessun evento trovato</p>
      )}

      <div className={styles.dividerEvent}></div>
    </div>
  );
};

export default EventiPartecipati;
