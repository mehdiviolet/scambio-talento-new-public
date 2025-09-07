// chatSlice.js - VERSIONE CORRETTA
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {},
    unreadCounts: {}, // Formato: { chatId: { owner: 0, viewer: 0 } }
    activeConversation: {
      owner: null,
      viewer: null,
    },
  },

  reducers: {
    // Crea nuova conversazione da richiesta esperienza
    createConversationFromRequest: (state, action) => {
      const {
        experienceId,
        experienceTitle,
        viewerName,
        viewerAvatar,
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      const conversationId = `exp-${experienceId}`;

      // Crea conversazione se non esiste
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = {
          id: conversationId,
          type: "experience_request",
          experienceId,
          experienceTitle,
          participants: {
            viewer: {
              name: viewerName,
              avatar: viewerAvatar || "👤",
            },
            owner: {
              name: "Sara Dormand",
              avatar: "👩‍🎨",
            },
          },
          messages: [],
          createdAt: timestamp,
          lastActivity: timestamp,
          status: "active",
        };
      }

      // Aggiungi messaggio
      state.conversations[conversationId].messages.push({
        id: `msg-${experienceId}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        senderId: "viewer",
        senderName: viewerName,
        content: message,
        timestamp,
        type: "experience_request",
        experienceData: {
          experienceId,
          experienceTitle,
        },
      });

      // Aggiorna metadati
      state.conversations[conversationId].lastActivity = timestamp;

      // 🎯 FISSO: Inizializza unread counts per entrambi i ruoli
      if (!state.unreadCounts[conversationId]) {
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }

      // 🎯 SMART LOGIC: Solo se owner NON sta guardando questa conversazione
      if (state.activeConversation.owner !== conversationId) {
        state.unreadCounts[conversationId].owner += 1;
      }

      // Solo owner vede il messaggio come non letto (arriva dal viewer)
      // state.unreadCounts[conversationId].owner += 1;
    },

    // Owner risponde nella chat
    sendOwnerMessage: (state, action) => {
      const {
        conversationId,
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      if (state.conversations[conversationId]) {
        state.conversations[conversationId].messages.push({
          id: `msg-${conversationId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          senderId: "owner",
          senderName: "Sara Dormand",
          content: message,
          timestamp,
          type: "text",
        });

        state.conversations[conversationId].lastActivity = timestamp;

        // 🎯 FISSO: Solo viewer vede messaggio owner come non letto
        if (!state.unreadCounts[conversationId]) {
          state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
        }
        // 🎯 SMART LOGIC: Solo se viewer NON sta guardando questa conversazione
        if (state.activeConversation.viewer !== conversationId) {
          state.unreadCounts[conversationId].viewer += 1;
        }
        // state.unreadCounts[conversationId].viewer += 1;
      }
    },

    // Viewer risponde nella chat
    sendViewerMessage: (state, action) => {
      const {
        conversationId,
        viewerName,
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      if (state.conversations[conversationId]) {
        state.conversations[conversationId].messages.push({
          id: `msg-${conversationId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          senderId: "viewer",
          senderName: viewerName,
          content: message,
          timestamp,
          type: "text",
        });

        state.conversations[conversationId].lastActivity = timestamp;

        // 🎯 FISSO: Solo owner vede messaggio viewer come non letto
        if (!state.unreadCounts[conversationId]) {
          state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
        }
        if (state.activeConversation.owner !== conversationId) {
          state.unreadCounts[conversationId].owner += 1;
        }
        // state.unreadCounts[conversationId].owner += 1;
      }
    },

    // Messaggi di sistema (corso avviato, completato, etc.)
    addSystemMessage: (state, action) => {
      const {
        conversationId,
        message,
        systemType,
        timestamp = new Date().toISOString(),
      } = action.payload;

      if (state.conversations[conversationId]) {
        state.conversations[conversationId].messages.push({
          id: `msg-${conversationId}-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          senderId: "system",
          senderName: "Sistema",
          content: message,
          timestamp,
          type: "system",
          systemType,
        });

        state.conversations[conversationId].lastActivity = timestamp;
        // I messaggi di sistema non incrementano unread counts
      }
    },

    // 🎯 FISSO: Marca conversazione come letta per ruolo specifico
    markConversationAsRead: (state, action) => {
      const { conversationId, role } = action.payload;

      if (!state.unreadCounts[conversationId]) {
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }

      // Azzera solo per il ruolo specifico
      if (role === "owner") {
        state.unreadCounts[conversationId].owner = 0;
      } else if (role === "viewer") {
        state.unreadCounts[conversationId].viewer = 0;
      }
    },

    // 🎯 FISSO: Imposta conversazione attiva per ruolo specifico
    setActiveConversation: (state, action) => {
      const { conversationId, role } = action.payload;
      state.activeConversation[role] = conversationId;

      // Marca automaticamente come letta per il ruolo corrente
      // if (conversationId && role) {
      //   if (!state.unreadCounts[conversationId]) {
      //     state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      //   }

      //   if (role === "owner") {
      //     state.unreadCounts[conversationId].owner = 0;
      //   } else if (role === "viewer") {
      //     state.unreadCounts[conversationId].viewer = 0;
      //   }
      // }
    },

    // Archivia conversazione
    archiveConversation: (state, action) => {
      const { conversationId } = action.payload;
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].status = "archived";
      }
    },

    // Elimina conversazione
    deleteConversation: (state, action) => {
      const { conversationId } = action.payload;
      delete state.conversations[conversationId];
      delete state.unreadCounts[conversationId];
      if (state.activeConversation.owner === conversationId) {
        state.activeConversation.owner = null;
      }
      if (state.activeConversation.viewer === conversationId) {
        state.activeConversation.viewer = null;
      }
    },
  },
});

export const {
  createConversationFromRequest,
  sendOwnerMessage,
  sendViewerMessage,
  addSystemMessage,
  markConversationAsRead,
  setActiveConversation,
  archiveConversation,
  deleteConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
