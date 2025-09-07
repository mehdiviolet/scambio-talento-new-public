// chatSlice.js - VERSIONE CORRETTA CON FIX SISTEMATICI
import { createSlice } from "@reduxjs/toolkit";

// ✅ HELPER FUNCTION per generare ID conversazione robusto
const generateConversationId = (experienceId, ownerData) => {
  // Usa firstName + lastName per creare ID univoco e pulito
  const ownerIdentifier = `${ownerData.firstName}_${ownerData.lastName}`
    .toLowerCase()
    .replace(/\s+/g, "_") // Tutti gli spazi → underscore
    .replace(/[^a-z0-9_]/g, ""); // Solo caratteri alfanumerici e underscore

  return `exp-${experienceId}-${ownerIdentifier}`;
};

// ✅ HELPER FUNCTION per creare ID persona univoco
const generatePersonId = (firstName, lastName) => {
  return `${firstName}_${lastName}`
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: {},
    unreadCounts: {}, // Formato: { chatId: { owner: 0, viewer: 0 } }
    activeConversation: {
      owner: null,
      viewer: null,
    },
    selectedOwner: null, // { firstName, lastName, profilePhoto, id }
  },

  reducers: {
    // ✅ CREA CONVERSAZIONE - Versione robusta
    createConversationFromRequest: (state, action) => {
      const {
        experienceId,
        experienceTitle,
        viewerName,
        viewerAvatar,
        ownerData, // ✅ Oggetto completo invece di stringhe separate
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      // ✅ Validazione input
      if (!experienceId || !ownerData?.firstName || !ownerData?.lastName) {
        console.error("createConversationFromRequest: Missing required data");
        return;
      }

      // ✅ ID conversazione robusto
      const conversationId = generateConversationId(experienceId, ownerData);

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
              name: `${ownerData.firstName} ${ownerData.lastName}`,
              avatar: ownerData.profilePhoto || ownerData.avatar || "👤",
              id: generatePersonId(ownerData.firstName, ownerData.lastName),
            },
          },
          messages: [],
          createdAt: timestamp,
          lastActivity: timestamp,
          status: "active",
        };

        // ✅ Inizializza unread counts
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }

      // Aggiungi messaggio
      state.conversations[conversationId].messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

      // ✅ LOGICA SEMPLIFICATA: incrementa sempre per owner (riceve messaggio da viewer)
      state.unreadCounts[conversationId].owner += 1;
    },

    // ✅ SELEZIONA OWNER - Versione migliorata
    setSelectedOwner: (state, action) => {
      const { firstName, lastName, profilePhoto } = action.payload;

      // ✅ Validazione
      if (!firstName || !lastName) {
        state.selectedOwner = null;
        return;
      }

      state.selectedOwner = {
        firstName,
        lastName,
        profilePhoto,
        id: generatePersonId(firstName, lastName),
      };
    },

    // ✅ MESSAGGIO OWNER - Versione migliorata
    sendOwnerMessage: (state, action) => {
      const {
        conversationId,
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      const conversation = state.conversations[conversationId];
      if (!conversation) {
        console.error(`Conversation ${conversationId} not found`);
        return;
      }

      conversation.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: "owner",
        senderName: conversation.participants.owner.name,
        content: message,
        timestamp,
        type: "text",
      });

      conversation.lastActivity = timestamp;

      // ✅ LOGICA SEMPLIFICATA: incrementa sempre per viewer (riceve messaggio da owner)
      if (!state.unreadCounts[conversationId]) {
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }
      state.unreadCounts[conversationId].viewer += 1;
    },

    // ✅ MESSAGGIO VIEWER - Versione migliorata
    sendViewerMessage: (state, action) => {
      const {
        conversationId,
        viewerName,
        message,
        timestamp = new Date().toISOString(),
      } = action.payload;

      const conversation = state.conversations[conversationId];
      if (!conversation) {
        console.error(`Conversation ${conversationId} not found`);
        return;
      }

      conversation.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: "viewer",
        senderName: viewerName,
        content: message,
        timestamp,
        type: "text",
      });

      conversation.lastActivity = timestamp;

      // ✅ LOGICA SEMPLIFICATA: incrementa sempre per owner (riceve messaggio da viewer)
      if (!state.unreadCounts[conversationId]) {
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }
      state.unreadCounts[conversationId].owner += 1;
    },

    // ✅ MESSAGGIO SISTEMA - Versione migliorata
    addSystemMessage: (state, action) => {
      const {
        conversationId,
        message,
        systemType,
        timestamp = new Date().toISOString(),
      } = action.payload;

      const conversation = state.conversations[conversationId];
      if (!conversation) {
        console.error(`Conversation ${conversationId} not found`);
        return;
      }

      conversation.messages.push({
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderId: "system",
        senderName: "Sistema",
        content: message,
        timestamp,
        type: "system",
        systemType,
      });

      conversation.lastActivity = timestamp;
      // I messaggi di sistema non incrementano unread counts
    },

    // ✅ MARCA COME LETTO - Versione semplificata
    markConversationAsRead: (state, action) => {
      const { conversationId, role } = action.payload;

      // ✅ Validazione
      if (!conversationId || !role || !["owner", "viewer"].includes(role)) {
        console.error("markConversationAsRead: Invalid parameters");
        return;
      }

      if (!state.unreadCounts[conversationId]) {
        state.unreadCounts[conversationId] = { owner: 0, viewer: 0 };
      }

      // Azzera solo per il ruolo specifico
      state.unreadCounts[conversationId][role] = 0;
    },

    // ✅ IMPOSTA CONVERSAZIONE ATTIVA
    setActiveConversation: (state, action) => {
      const { conversationId, role } = action.payload;

      // ✅ Validazione
      if (!["owner", "viewer"].includes(role)) {
        console.error("setActiveConversation: Invalid role");
        return;
      }

      state.activeConversation[role] = conversationId;
    },

    // ✅ ARCHIVIA CONVERSAZIONE
    archiveConversation: (state, action) => {
      const { conversationId } = action.payload;
      const conversation = state.conversations[conversationId];
      if (conversation) {
        conversation.status = "archived";
      }
    },

    // ✅ ELIMINA CONVERSAZIONE
    deleteConversation: (state, action) => {
      const { conversationId } = action.payload;

      delete state.conversations[conversationId];
      delete state.unreadCounts[conversationId];

      // Pulisci activeConversation se necessario
      if (state.activeConversation.owner === conversationId) {
        state.activeConversation.owner = null;
      }
      if (state.activeConversation.viewer === conversationId) {
        state.activeConversation.viewer = null;
      }
    },

    // ✅ NUOVO: Ottieni conversazioni per owner specifico
    getConversationsForOwner: (state, action) => {
      const { ownerId } = action.payload;

      if (!ownerId) return [];

      return Object.values(state.conversations).filter(
        (conversation) => conversation.participants?.owner?.id === ownerId
      );
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
  setSelectedOwner,
  getConversationsForOwner,
} = chatSlice.actions;

export default chatSlice.reducer;
