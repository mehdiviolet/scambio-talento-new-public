// hooks/useEvents.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  updateEvent,
  removeEvent,
  setCreateEventModalOpen,
  joinEvent,
  leaveEvent,
  updateEventStatus,
  incrementEventViews,
  toggleEventLike,
  cleanupExpiredEvents,
} from "@/store/slices/eventsSlice"; // ✅ CORRETTO: eventsSlice (non EventSlices)

export const useEvents = () => {
  const dispatch = useDispatch();

  // Selettori
  const events = useSelector((state) => state.events.events);
  const isCreateEventModalOpen = useSelector(
    (state) => state.events.isCreateEventModalOpen
  );

  // ===== CRUD OPERATIONS =====

  const handleAddEvent = useCallback(
    (eventData) => {
      console.log("🎉 useEvents: Aggiungendo evento", eventData);
      dispatch(addEvent(eventData));
      return eventData; // Ritorna per compatibilità
    },
    [dispatch]
  );

  const handleUpdateEvent = useCallback(
    ({ eventId, updates }) => {
      // ✅ CORRETTO: destructuring per matching con EventsSection
      console.log("🔄 useEvents: Aggiornando evento", eventId, updates);
      dispatch(updateEvent({ eventId, updates }));
    },
    [dispatch]
  );

  const handleRemoveEvent = useCallback(
    (eventId) => {
      console.log("🗑️ useEvents: Rimuovendo evento", eventId);
      dispatch(removeEvent(eventId));
    },
    [dispatch]
  );

  // ===== MODAL MANAGEMENT =====

  const openCreateEventModal = useCallback(() => {
    dispatch(setCreateEventModalOpen(true));
  }, [dispatch]);

  const closeCreateEventModal = useCallback(() => {
    dispatch(setCreateEventModalOpen(false));
  }, [dispatch]);

  // ===== EVENT INTERACTIONS =====

  const handleJoinEvent = useCallback(
    (eventId, userId, userInfo = {}) => {
      console.log("👥 useEvents: Utente si iscrive a evento", {
        eventId,
        userId,
      });
      dispatch(joinEvent({ eventId, userId, userInfo }));
    },
    [dispatch]
  );

  const handleLeaveEvent = useCallback(
    (eventId, userId) => {
      console.log("👋 useEvents: Utente si disiscrive da evento", {
        eventId,
        userId,
      });
      dispatch(leaveEvent({ eventId, userId }));
    },
    [dispatch]
  );

  const handleUpdateEventStatus = useCallback(
    (eventId, status) => {
      console.log("📊 useEvents: Aggiornando status evento", {
        eventId,
        status,
      });
      dispatch(updateEventStatus({ eventId, status }));
    },
    [dispatch]
  );

  const handleIncrementViews = useCallback(
    (eventId) => {
      dispatch(incrementEventViews(eventId));
    },
    [dispatch]
  );

  const handleToggleLike = useCallback(
    (eventId, userId, isLiked) => {
      dispatch(toggleEventLike({ eventId, userId, isLiked }));
    },
    [dispatch]
  );

  // ===== UTILITY FUNCTIONS =====

  const handleCleanupExpiredEvents = useCallback(() => {
    console.log("🧹 useEvents: Pulizia eventi scaduti");
    dispatch(cleanupExpiredEvents());
  }, [dispatch]);

  // ===== DERIVED DATA =====

  const getEventById = useCallback(
    (eventId) => {
      return events.find((event) => event.id === eventId);
    },
    [events]
  );

  const getEventsByCategory = useCallback(
    (category) => {
      return events.filter((event) => event.category === category);
    },
    [events]
  );

  const getUpcomingEvents = useCallback(() => {
    const now = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate > now && event.status === "scheduled";
    });
  }, [events]);

  const getEventsStats = useCallback(() => {
    return {
      total: events.length,
      upcoming: getUpcomingEvents().length,
      byCategory: events.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1;
        return acc;
      }, {}),
    };
  }, [events, getUpcomingEvents]);

  // ===== DEBUG INFO =====

  console.log("🔍 useEvents DEBUG:", {
    eventsCount: events.length,
    isModalOpen: isCreateEventModalOpen,
    upcomingCount: getUpcomingEvents().length,
  });

  return {
    // Data
    events,
    isCreateEventModalOpen,

    // CRUD operations (nomi compatibili con useProfileLogic)
    addEvent: handleAddEvent,
    updateEvent: handleUpdateEvent,
    removeEvent: handleRemoveEvent,

    // Modal management
    openCreateEventModal,
    closeCreateEventModal,

    // Event interactions
    joinEvent: handleJoinEvent,
    leaveEvent: handleLeaveEvent,
    updateEventStatus: handleUpdateEventStatus,
    incrementViews: handleIncrementViews,
    toggleLike: handleToggleLike,

    // Utilities
    cleanupExpiredEvents: handleCleanupExpiredEvents,
    getEventById,
    getEventsByCategory,
    getUpcomingEvents,
    getEventsStats,
  };
};
