// src/store/slices/sharedEventSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Dati iniziali mockati
const initialComments = [
  {
    id: "c1",
    authorId: "mario_rossi",
    authorName: "Mario Rossi",
    text: "Non vedo l'ora! Porterò Azul 🎲",
    time: "18:30",
    timestamp: new Date().toISOString(),
  },
  {
    id: "c2",
    authorId: "anna_bianchi",
    authorName: "Anna Bianchi",
    text: "Perfetto, ci sarò! Qualcuno ha Wingspan?",
    time: "19:00",
    timestamp: new Date().toISOString(),
  },
  {
    id: "c3",
    authorId: "luca_verdi",
    authorName: "Luca Verdi",
    text: "Primo boardgame night, sono emozionato!",
    time: "19:15",
    timestamp: new Date().toISOString(),
  },
  {
    id: "c4",
    authorId: "sara_neri",
    authorName: "Sara Neri",
    text: "Ottima location, ci sono stata altre volte",
    time: "19:20",
    timestamp: new Date().toISOString(),
  },
];

const initialParticipants = [
  { id: "p1", name: "Mario Rossi", initials: "MR" },
  { id: "p2", name: "Anna Bianchi", initials: "AB" },
  { id: "p3", name: "Luca Verdi", initials: "LV" },
  { id: "p4", name: "Sara Neri", initials: "SN" },
  { id: "p5", name: "Paolo Ferrari", initials: "PF" },
  { id: "p6", name: "Giulia Romano", initials: "GR" },
  { id: "p7", name: "Luigi Rosa", initials: "GR" },
];

const mockOrganizer = {
  id: "sara_dormand",
  name: "Sara Dormand",
  photo: "/images/sara-avatar.jpg",
  trustScore: 47, // ⭐ Punteggi fiducia
  participationScore: 126, // 🎯 Punteggi partecipazione
};

const initialState = {
  // === EVENTO ===
  eventState: "idle",
  maxParticipants: 8,

  // === COMMENTI ===
  comments: initialComments,

  // === PARTECIPANTI ===
  participants: initialParticipants,
  organizer: {
    ...mockOrganizer,
    trustScore: 25, // Feedback preesistenti
  },
  checkInList: [],

  // === UTENTE CORRENTE ===
  currentUser: {
    id: "mim",
    name: "", // ✅ VUOTO: verrà popolato dinamicamente da firstName
    trustScore: 0,
    participationScore: 0,
  },
  isParticipating: false,

  // === NOTIFICHE ===
  notifications: [],

  // === FEEDBACK SISTEMA ===
  feedbacks: [
    {
      id: "feedback_existing_1",
      fromUserId: "mario_rossi",
      fromUserName: "Mario Rossi",
      toUserId: "sara_dormand",
      stars: 3,
      comment: "Ottima organizzazione!",
      timestamp: "2024-12-19T20:00:00Z",
    },
    {
      id: "feedback_existing_2",
      fromUserId: "anna_bianchi",
      fromUserName: "Anna Bianchi",
      toUserId: "sara_dormand",
      stars: 2,
      comment: "Buono ma poteva essere meglio",
      timestamp: "2024-12-19T20:15:00Z",
    },
  ],
  showFeedbackModal: false,

  // === GALLERY ===
  galleryPhotos: [],

  // === QR CODE ===
  qrCodeUrl: null,
  qrState: "placeholder",

  // === LOADING STATES ===
  loadingStates: {
    submitFeedback: false,
    simulateQRScan: false,
    uploadGallery: false,
    confirmEvent: false,
    endEvent: false,
  },

  // === PUNTEGGI TRACKING ===
  pendingScoreUpdates: {
    trustScore: 0,
    participationScore: 0,
  },

  // === META ===
  lastUpdate: new Date().toISOString(),
};

const sharedEventSlice = createSlice({
  name: "sharedEvent",
  initialState,
  reducers: {
    // === LOADING MANAGEMENT ===
    setLoading: (state, action) => {
      const { operation, isLoading } = action.payload;
      if (state.loadingStates.hasOwnProperty(operation)) {
        state.loadingStates[operation] = isLoading;
      }
    },

    clearAllLoadings: (state) => {
      Object.keys(state.loadingStates).forEach((key) => {
        state.loadingStates[key] = false;
      });
    },

    // === GESTIONE COMMENTI ===
    addComment: (state, action) => {
      const { text } = action.payload;

      const newComment = {
        id: `c_${Date.now()}`,
        authorId: state.currentUser.id,
        authorName: state.currentUser.name,
        text: text.trim(),
        time: new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: new Date().toISOString(),
      };

      state.comments.push(newComment);
      state.lastUpdate = new Date().toISOString();
    },

    removeComment: (state, action) => {
      const commentId = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment.id !== commentId
      );
      state.lastUpdate = new Date().toISOString();
    },

    // === GESTIONE PARTECIPAZIONI ===
    toggleParticipation: (state, action) => {
      const { firstName } = action.payload || {};
      const currentUserId = state.currentUser.id;
      const userDisplayName = firstName || state.currentUser.name || "Utente";

      // Aggiorna nome utente se firstName disponibile
      if (firstName && !state.currentUser.name) {
        state.currentUser.name = firstName;
      }

      const existingParticipant = state.participants.find(
        (p) => p.id === currentUserId
      );

      if (existingParticipant) {
        // ✅ RIMUOVI PARTECIPAZIONE
        state.participants = state.participants.filter(
          (p) => p.id !== currentUserId
        );
        state.isParticipating = false;

        // ✅ PENALITÀ SE ABBANDONA DOPO CONFERMA
        if (
          state.eventState === "confirmed" ||
          state.eventState === "in svolgimento"
        ) {
          state.currentUser.participationScore = Math.max(
            0,
            state.currentUser.participationScore - 3
          );

          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "penalty_applied",
            message: `❌ ${userDisplayName} ha abbandonato dopo la conferma. -3 punti partecipazione.`,
            timestamp: new Date().toISOString(),
            metadata: {
              userId: currentUserId,
              userName: userDisplayName,
              action: "leave_penalty",
            },
          });
        } else {
          // Normale uscita senza penalità
          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "participant_left",
            message: `👋 ${userDisplayName} non partecipa più all'evento.`,
            timestamp: new Date().toISOString(),
          });
        }
      } else {
        // ✅ AGGIUNGI PARTECIPAZIONE
        const newParticipant = {
          id: currentUserId,
          name: userDisplayName,
          initials:
            userDisplayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "U",
        };
        state.participants.push(newParticipant);
        state.isParticipating = true;

        // ✅ NOTIFICA CLICKABLE PER OWNER
        state.notifications.push({
          id: `notif_${Date.now()}`,
          type: "new_participant",
          message: `🎉 ${userDisplayName} partecipa all'evento!`,
          timestamp: new Date().toISOString(),
          metadata: {
            userId: currentUserId,
            userName: userDisplayName,
            clickable: true,
            action: "view_profile",
          },
        });

        // CHECK: Se raggiunge limite max → auto waiting
        if (
          state.participants.length >= state.maxParticipants &&
          state.eventState === "idle"
        ) {
          state.eventState = "waiting";
          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "event_full",
            message: "🔥 Evento pieno! Conferma l'evento per procedere.",
            timestamp: new Date().toISOString(),
          });
        }
      }

      state.lastUpdate = new Date().toISOString();
    },

    // === GESTIONE STATI EVENTO ===
    confirmEvent: (state) => {
      if (state.eventState === "waiting" || state.eventState === "idle") {
        state.eventState = "confirmed";
        state.qrState = "active";
        state.qrCodeUrl = `https://app.boardgamenight.com/events/demo_event_001/checkin`;

        state.notifications.push({
          id: `notif_${Date.now()}`,
          type: "event_confirmed",
          message: "✅ Evento confermato! QR Code attivo per check-in.",
          timestamp: new Date().toISOString(),
        });
      }
      state.lastUpdate = new Date().toISOString();
    },

    // === GESTIONE QR SCAN ===
    simulateQRScan: (state, action) => {
      const { participantName, myFirstName } = action.payload;

      if (
        state.eventState === "confirmed" ||
        state.eventState === "in svolgimento"
      ) {
        // ✅ CHECK: Non superare numero partecipanti
        if (state.checkInList.length >= state.participants.length) {
          return; // Tutti già presenti
        }

        // ✅ CHECK: Non scansionare stesso nome due volte
        if (
          state.checkInList.some((c) => c.participantName === participantName)
        ) {
          return; // Già scansionato
        }

        // Crea entry check-in
        const checkInEntry = {
          id: `checkin_${Date.now()}`,
          participantName: participantName || "Mario Rossi",
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        state.checkInList.push(checkInEntry);

        // ✅ CONTROLLA SE È IL MIO SCAN
        const isMyCheckIn =
          participantName === myFirstName ||
          participantName === state.currentUser.name ||
          (myFirstName && participantName.includes(myFirstName));

        if (isMyCheckIn) {
          state.currentUser.participationScore += 2;
          state.pendingScoreUpdates.participationScore += 2;

          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "participation_score",
            message: `✅ ${participantName} check-in completato! +2 punti partecipazione.`,
            timestamp: new Date().toISOString(),
          });
        }

        // Se primo scan → evento in svolgimento
        if (
          state.eventState === "confirmed" &&
          state.checkInList.length === 1
        ) {
          state.eventState = "in svolgimento";
          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "event_started",
            message: "🚀 Evento iniziato! Primo partecipante presente.",
            timestamp: new Date().toISOString(),
          });
        } else {
          // Notifica check-in normale
          state.notifications.push({
            id: `notif_${Date.now()}`,
            type: "checkin_update",
            message: `📍 ${participantName} ha fatto check-in.`,
            timestamp: new Date().toISOString(),
          });
        }
      }

      state.lastUpdate = new Date().toISOString();
    },

    // === FINE EVENTO ===
    endEvent: (state) => {
      if (state.eventState === "in svolgimento") {
        state.eventState = "fatto";
        state.qrState = "disabled";
        state.qrCodeUrl = null;

        // Mostra modal feedback per partecipanti
        if (state.isParticipating) {
          state.showFeedbackModal = true;
        }

        state.notifications.push({
          id: `notif_${Date.now()}`,
          type: "event_ended",
          message: "🏁 Evento terminato! Sistema feedback attivo.",
          timestamp: new Date().toISOString(),
        });
      }
      state.lastUpdate = new Date().toISOString();
    },

    // === GESTIONE FEEDBACK ===
    submitFeedback: (state, action) => {
      const { stars, comment } = action.payload;

      const feedback = {
        id: `feedback_${Date.now()}`,
        fromUserId: state.currentUser.id,
        fromUserName: state.currentUser.name,
        toUserId: state.organizer.id,
        stars: parseInt(stars),
        comment: comment.trim(),
        timestamp: new Date().toISOString(),
      };

      state.feedbacks.push(feedback);

      // ✅ FIX CALCOLO TRUST SCORE
      const allStars = state.feedbacks.map((f) => f.stars);
      const avgStars =
        allStars.reduce((sum, stars) => sum + stars, 0) / allStars.length;
      state.organizer.trustScore = Math.round(avgStars * 10);

      // Assegna punteggio partecipazione
      if (
        state.checkInList.some(
          (c) => c.participantName === state.currentUser.name
        )
      ) {
        state.currentUser.participationScore += 3;
      } else {
        state.currentUser.participationScore += 1;
      }

      state.notifications.push({
        id: `notif_${Date.now()}`,
        type: "feedback_sent",
        message: `📝 Feedback inviato! +${
          state.checkInList.some(
            (c) => c.participantName === state.currentUser.name
          )
            ? 3
            : 1
        } punti.`,
        timestamp: new Date().toISOString(),
      });

      state.lastUpdate = new Date().toISOString();
    },

    closeFeedbackModal: (state) => {
      state.showFeedbackModal = false;
    },

    // === GESTIONE GALLERY ===
    autoUploadPhotos: (state) => {
      // Simula upload di 2-3 foto
      const mockPhotos = [
        {
          id: "photo_1",
          url: "https://picsum.photos/800/600?random=1",
          alt: "Foto evento 1",
          caption: "Momento divertente durante il gioco!",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "photo_2",
          url: "https://picsum.photos/800/600?random=2",
          alt: "Foto evento 2",
          caption: "Tutti concentrati sulla strategia",
          uploadedAt: new Date().toISOString(),
        },
        {
          id: "photo_3",
          url: "https://picsum.photos/800/600?random=3",
          alt: "Foto evento 3",
          caption: "Il momento della vittoria!",
          uploadedAt: new Date().toISOString(),
        },
      ];

      // Aggiungi foto randomiche (2-3)
      const photosToAdd = mockPhotos.slice(
        0,
        Math.floor(Math.random() * 2) + 2
      );
      state.galleryPhotos.push(...photosToAdd);

      // Notifica caricamento completato
      state.notifications.push({
        id: `notif_${Date.now()}`,
        type: "gallery_uploaded",
        message: `📸 ${photosToAdd.length} foto caricate nella gallery!`,
        timestamp: new Date().toISOString(),
      });

      state.lastUpdate = new Date().toISOString();
    },

    // === GESTIONE NOTIFICHE ===
    clearNotifications: (state) => {
      state.notifications = [];
    },

    removeNotification: (state, action) => {
      const notifId = action.payload;
      state.notifications = state.notifications.filter((n) => n.id !== notifId);
    },

    // ✅ NUOVO: Handler click su nome in notifica
    handleNotificationClick: (state, action) => {
      const { notificationId, userId } = action.payload;

      // TODO: Qui implementerai la logica per aprire profilo
      // Per ora aggiungi solo una notifica di conferma
      state.notifications.push({
        id: `notif_${Date.now()}`,
        type: "profile_view",
        message: `👀 Visualizzando profilo utente... [SOSTITUIRE CON COMPONENTE PROFILO]`,
        timestamp: new Date().toISOString(),
      });
    },

    // === RESET E UTILITY ===
    resetEvent: (state) => {
      return {
        ...initialState,
        currentUser: state.currentUser,
      };
    },

    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

// === SELECTORS ===
export const selectEventState = (state) => state.sharedEvent.eventState;
export const selectComments = (state) => state.sharedEvent.comments;
export const selectParticipants = (state) => state.sharedEvent.participants;
export const selectOrganizer = (state) => state.sharedEvent.organizer;
export const selectCheckInList = (state) => state.sharedEvent.checkInList;
export const selectNotifications = (state) => state.sharedEvent.notifications;
export const selectFeedbacks = (state) => state.sharedEvent.feedbacks;
export const selectGalleryPhotos = (state) => state.sharedEvent.galleryPhotos;
export const selectQRState = (state) => ({
  state: state.sharedEvent.qrState,
  url: state.sharedEvent.qrCodeUrl,
  eventState: state.sharedEvent.eventState,
});

export const selectEventStats = (state) => ({
  participantsCount: state.sharedEvent.participants.length,
  maxParticipants: state.sharedEvent.maxParticipants,
  checkInsCount: state.sharedEvent.checkInList.length,
  feedbacksCount: state.sharedEvent.feedbacks.length,
  eventState: state.sharedEvent.eventState,
});

export const selectIsParticipating = (state) =>
  state.sharedEvent.isParticipating;

export const selectCurrentUser = (state) => state.sharedEvent.currentUser;
export const selectLoadingStates = (state) => state.sharedEvent.loadingStates;
export const selectIsLoading = (operation) => (state) =>
  state.sharedEvent.loadingStates[operation] || false;

// === EXPORTS ===
export const {
  addComment,
  removeComment,
  toggleParticipation,
  confirmEvent,
  simulateQRScan,
  endEvent,
  submitFeedback,
  closeFeedbackModal,
  autoUploadPhotos,
  clearNotifications,
  removeNotification,
  handleNotificationClick,
  setLoading,
  clearAllLoadings,
  resetEvent,
  updateCurrentUser,
} = sharedEventSlice.actions;

export default sharedEventSlice.reducer;
