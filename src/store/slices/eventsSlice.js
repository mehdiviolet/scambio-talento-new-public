// src/store/slices/eventsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  isCreateEventModalOpen: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Modal management
    setCreateEventModalOpen: (state, action) => {
      state.isCreateEventModalOpen = action.payload;
    },

    // Add event
    addEvent: (state, action) => {
      const eventData = action.payload;

      // Trasforma i dati nel formato completo per EventCard
      const transformedEvent = {
        id: `evt_${Date.now()}`,

        // Dati base dall'utente
        ...eventData,

        // Metadati aggiuntivi
        status: "scheduled", // scheduled, active, completed, cancelled
        participantsCount: 0,
        participantsList: [],

        // Dati di gestione
        createdAt: eventData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,

        // Owner info (viene dall'hook)
        ownerId: "current_user", // In produzione sarà l'ID dell'utente loggato

        // Statistiche
        views: 0,
        likes: 0,
        shares: 0,
      };

      state.events.push(transformedEvent);
    },

    // Update event
    updateEvent: (state, action) => {
      const { eventId, updates } = action.payload;
      const index = state.events.findIndex((event) => event.id === eventId);

      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Remove event
    removeEvent: (state, action) => {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event.id !== eventId);
    },

    // Join event (quando un utente si iscrive)
    joinEvent: (state, action) => {
      const { eventId, userId, userInfo } = action.payload;
      const event = state.events.find((e) => e.id === eventId);

      if (event && !event.participantsList.includes(userId)) {
        event.participantsList.push(userId);
        event.participantsCount = event.participantsList.length;

        // Se ha limite partecipanti, controlla
        if (
          event.maxParticipants &&
          event.participantsCount >= event.maxParticipants
        ) {
          event.status = "full";
        }
      }
    },

    // Leave event (quando un utente si disiscrive)
    leaveEvent: (state, action) => {
      const { eventId, userId } = action.payload;
      const event = state.events.find((e) => e.id === eventId);

      if (event) {
        event.participantsList = event.participantsList.filter(
          (id) => id !== userId
        );
        event.participantsCount = event.participantsList.length;

        // Se non è più pieno, cambia status
        if (event.status === "full") {
          event.status = "scheduled";
        }
      }
    },

    // Update event status
    updateEventStatus: (state, action) => {
      const { eventId, status } = action.payload;
      const event = state.events.find((e) => e.id === eventId);

      if (event) {
        event.status = status;
        event.updatedAt = new Date().toISOString();
      }
    },

    // Incrementa views
    incrementEventViews: (state, action) => {
      const eventId = action.payload;
      const event = state.events.find((e) => e.id === eventId);

      if (event) {
        event.views += 1;
      }
    },

    // Toggle like
    toggleEventLike: (state, action) => {
      const { eventId, userId } = action.payload;
      const event = state.events.find((e) => e.id === eventId);

      if (event) {
        // In un'app reale avresti una lista di chi ha messo like
        // Per ora incrementa/decrementa semplicemente
        event.likes = Math.max(
          0,
          event.likes + (action.payload.isLiked ? 1 : -1)
        );
      }
    },

    // Bulk operations per amministrazione
    removeEventsByOwner: (state, action) => {
      const ownerId = action.payload;
      state.events = state.events.filter((event) => event.ownerId !== ownerId);
    },

    // Cleanup eventi scaduti
    cleanupExpiredEvents: (state) => {
      const now = new Date();
      state.events = state.events.filter((event) => {
        const eventDate = new Date(event.startDate);
        const isExpired = eventDate < now && event.status !== "completed";

        if (isExpired) {
          // Marca come completato invece di eliminare
          event.status = "expired";
        }

        return true; // Mantieni tutti gli eventi, anche quelli scaduti
      });
    },

    // Reset completo
    resetEvents: (state) => {
      return initialState;
    },
  },
});

// Selectors utili
export const selectEventsByOwner = (state, ownerId) => {
  return state.events.events.filter((event) => event.ownerId === ownerId);
};

export const selectUpcomingEvents = (state) => {
  const now = new Date();
  return state.events.events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate > now && event.status === "scheduled";
  });
};

export const selectEventsByCategory = (state, category) => {
  return state.events.events.filter((event) => event.category === category);
};

export const selectEventsCount = (state) => {
  return state.events.events.length;
};

export const selectEventById = (state, eventId) => {
  return state.events.events.find((event) => event.id === eventId);
};

export const {
  setCreateEventModalOpen,
  addEvent,
  updateEvent,
  removeEvent,
  joinEvent,
  leaveEvent,
  updateEventStatus,
  incrementEventViews,
  toggleEventLike,
  removeEventsByOwner,
  cleanupExpiredEvents,
  resetEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
