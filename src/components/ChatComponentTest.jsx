// ChatComponentTest.js - VERSIONE CORRETTA CON FILTRO ROBUSTO
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOwnerMessage,
  markConversationAsRead,
  sendViewerMessage,
} from "@/store/slices/chatSlice";
import {
  MessageCircle,
  Send,
  ChevronLeft,
  BookOpen,
  FileText,
} from "lucide-react";
import styles from "./ChatComponent.module.css";

// ✅ HELPER per generare ID persona (stesso del chatSlice)
const generatePersonId = (firstName, lastName) => {
  return `${firstName}_${lastName}`
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

// Helper per ottenere iniziali nome cognome
const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return "U";
  const first = firstName ? firstName.charAt(0).toUpperCase() : "";
  const last = lastName ? lastName.charAt(0).toUpperCase() : "";
  return first + last;
};

// Helper per renderizzare avatar con foto o iniziali
const renderAvatar = (userData) => {
  if (userData?.profilePhoto) {
    return (
      <img
        src={userData.profilePhoto}
        alt="Avatar"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        background: "var(--bg--skill-01, #cecec7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary, #1f2937)",
      }}
    >
      {getInitials(userData?.firstName, userData?.lastName)}
    </div>
  );
};

const ChatComponentTest = ({ isOwner = true }) => {
  const dispatch = useDispatch();

  // Redux selectors
  const conversations = useSelector((state) => state.chat.conversations);
  const allUnreadCounts = useSelector((state) => state.chat.unreadCounts);
  const selectedOwner = useSelector((state) => state.chat.selectedOwner);
  const userProfile = useSelector((state) => state.onboarding?.userProfile);

  // State locale
  const [localActiveConversation, setLocalActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  // Calcola unread solo per il ruolo corrente
  const userRole = isOwner ? "owner" : "viewer";

  // ✅ FUNZIONE ROBUSTA per filtrare conversazioni
  // const getConversationsForSelectedOwner = () => {

  //   if (!selectedOwner) {
  //     console.log("No selectedOwner found");
  //     return [];
  //   }

  //   // ✅ Genera ID della persona selezionata
  //   const selectedPersonId = generatePersonId(
  //     selectedOwner.firstName,
  //     selectedOwner.lastName
  //   );

  //   console.log("Looking for conversations with personId:", selectedPersonId);
  //   console.log("Available conversations:", Object.keys(conversations));

  //   // ✅ Filtra per ID invece di nome
  //   const filteredConversations = Object.values(conversations).filter(
  //     (conversation) => {
  //       const ownerParticipantId = conversation.participants?.owner?.id;
  //       const match = ownerParticipantId === selectedPersonId;

  //       if (match) {
  //         console.log("Found matching conversation:", conversation.id);
  //       }

  //       return match;
  //     }
  //   );

  //   console.log("Filtered conversations count:", filteredConversations.length);
  //   return filteredConversations;
  // };
  const getConversationsForSelectedOwner = () => {
    // Se sei un viewer, mostra TUTTE le conversazioni
    if (!isOwner) {
      return Object.values(conversations);
    }

    // Se sei un owner, filtra solo per selectedOwner
    if (!selectedOwner) {
      return [];
    }

    const selectedPersonId = generatePersonId(
      selectedOwner.firstName,
      selectedOwner.lastName
    );

    return Object.values(conversations).filter((conversation) => {
      const ownerParticipantId = conversation.participants?.owner?.id;
      return ownerParticipantId === selectedPersonId;
    });
  };
  // ✅ Conversazioni filtrate e ordinate
  const sortedConversations = getConversationsForSelectedOwner().sort(
    (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)
  );

  // ✅ Calcola unread counts solo per conversazioni filtrate
  const unreadCounts = {};
  sortedConversations.forEach((conversation) => {
    const chatId = conversation.id;
    unreadCounts[chatId] = allUnreadCounts[chatId]?.[userRole] || 0;
  });

  const totalUnread = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // ✅ Dati utente per compatibilità
  const getOwnerData = () => {
    return selectedOwner || { firstName: "Owner", lastName: "User" };
  };

  const getViewerData = () => {
    return userProfile || { firstName: "Viewer", lastName: "User" };
  };

  const ownerData = getOwnerData();
  const viewerData = getViewerData();

  // Reset chat quando cambia owner selezionato
  useEffect(() => {
    console.log("Selected owner changed:", selectedOwner);
    setLocalActiveConversation(null);
    setShowChatList(true);
    setNewMessage("");
  }, [selectedOwner?.id]);

  // ✅ GESTIONE INVIO MESSAGGIO
  const handleSendMessage = () => {
    if (newMessage.trim() && localActiveConversation) {
      const messageData = {
        conversationId: localActiveConversation,
        message: newMessage.trim(),
      };

      if (isOwner) {
        dispatch(sendOwnerMessage(messageData));
      } else {
        dispatch(
          sendViewerMessage({
            ...messageData,
            viewerName: `${viewerData.firstName} ${viewerData.lastName}`,
          })
        );
      }

      // Marca come letto
      dispatch(
        markConversationAsRead({
          conversationId: localActiveConversation,
          role: userRole,
        })
      );

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ✅ APERTURA CONVERSAZIONE
  const openConversation = (conversationId) => {
    console.log("Opening conversation:", conversationId);

    dispatch(
      markConversationAsRead({
        conversationId,
        role: userRole,
      })
    );

    setLocalActiveConversation(conversationId);
    setShowChatList(false);
  };

  const backToList = () => {
    setLocalActiveConversation(null);
    setShowChatList(true);
  };

  // ✅ UTILITY FUNCTIONS
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Ora";
    if (diffMins < 60) return `${diffMins}m fa`;
    if (diffHours < 24) return `${diffHours}h fa`;
    if (diffDays < 7) return `${diffDays}g fa`;
    return date.toLocaleDateString();
  };

  const getMessagePreview = (conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return "Nessun messaggio";

    if (lastMessage.type === "system") {
      return lastMessage.content;
    }

    const prefix = lastMessage.senderId === userRole ? "Tu: " : "";
    return (
      `${prefix}${lastMessage.content}`.substring(0, 50) +
      (lastMessage.content.length > 50 ? "..." : "")
    );
  };

  const getSelectedOwnerName = () => {
    if (selectedOwner) {
      return `${selectedOwner.firstName} ${selectedOwner.lastName}`;
    }
    return "Nessuna persona selezionata";
  };

  // ✅ CORRETTO - estrae nome owner dalla conversazione specifica
  const getConversationOwnerName = (conversation) => {
    return conversation.participants?.owner?.name || "Utente sconosciuto";
  };

  // ✅ CORRETTO - estrae avatar owner dalla conversazione specifica
  const getConversationOwnerAvatar = (conversation) => {
    return conversation.participants?.owner?.avatar || null;
  };

  // ✅ VISTA LISTA CONVERSAZIONI
  if (showChatList || !localActiveConversation) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <div className={styles.headerTitle}>
            <MessageCircle size={20} />
            <span>
              Chats
              {/* Chat con {getSelectedOwnerName()} ({sortedConversations.length}) */}
            </span>
            {totalUnread > 0 && (
              <div className={styles.unreadBadge}>{totalUnread}</div>
            )}
          </div>
        </div>

        <div className={styles.conversationsList}>
          {sortedConversations.length === 0 ? (
            <div className={styles.emptyState}>
              <MessageCircle size={40} className={styles.emptyIcon} />
              <p>Nessun messaggio ancora</p>
              <span>
                Invia una richiesta di esperienza per iniziare a chattare
              </span>
            </div>
          ) : (
            sortedConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`${styles.conversationItem} ${
                  unreadCounts[conversation.id] > 0 ? styles.unread : ""
                }`}
                onClick={() => openConversation(conversation.id)}
              >
                <div className={styles.conversationAvatar}>
                  {/* {renderAvatar(ownerData)} */}
                  {renderAvatar({
                    profilePhoto: getConversationOwnerAvatar(conversation),
                    firstName:
                      getConversationOwnerName(conversation).split(" ")[0],
                    lastName:
                      getConversationOwnerName(conversation).split(" ")[1],
                  })}
                </div>
                <div className={styles.conversationContent}>
                  <div className={styles.conversationTop}>
                    <span className={styles.conversationName}>
                      {/* {getSelectedOwnerName()} */}
                      {getConversationOwnerName(conversation)}
                    </span>
                    <span className={styles.conversationTime}>
                      {formatTime(conversation.lastActivity)}
                    </span>
                  </div>
                  <div className={styles.conversationBottom}>
                    <span className={styles.experienceTitle}>
                      <BookOpen size={16} /> {conversation.experienceTitle}
                    </span>
                  </div>
                  <div className={styles.messagePreview}>
                    {getMessagePreview(conversation)}
                  </div>
                </div>
                {unreadCounts[conversation.id] > 0 && (
                  <div className={styles.messageUnreadBadge}>
                    {unreadCounts[conversation.id]}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ✅ VISTA CONVERSAZIONE SINGOLA
  const currentConversation = conversations[localActiveConversation];
  if (!currentConversation) {
    console.error("Current conversation not found:", localActiveConversation);
    return (
      <div className={styles.chatContainer}>
        <div className={styles.errorState}>
          <p>Conversazione non trovata</p>
          <button onClick={backToList}>Torna alla lista</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatContainer}>
      {/* Header conversazione */}
      <div className={styles.chatHeader}>
        <button className={styles.backButton} onClick={backToList}>
          <ChevronLeft size={20} />
        </button>
        <div className={styles.conversationInfo}>
          <div className={styles.conversationAvatar}>
            {/* {renderAvatar(ownerData)} */}
            {renderAvatar({
              profilePhoto: currentConversation?.participants?.owner?.avatar,
              firstName:
                currentConversation?.participants?.owner?.name?.split(" ")[0],
              lastName:
                currentConversation?.participants?.owner?.name?.split(" ")[1],
            })}
          </div>
          <div className={styles.conversationDetails}>
            <span className={styles.conversationName}>
              {/* {getSelectedOwnerName()} */}
              {getConversationOwnerName(currentConversation)}
            </span>
            <span className={styles.experienceSubtitle}>
              <BookOpen size={16} /> {currentConversation.experienceTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Messaggi */}
      <div className={styles.messagesContainer}>
        {currentConversation.messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.senderId === userRole
                ? styles.messageOwn
                : message.senderId === "system"
                ? styles.messageSystem
                : styles.messageOther
            }`}
          >
            {message.senderId !== userRole && message.senderId !== "system" && (
              <div className={styles.messageAvatar}>
                {/* {renderAvatar(
                  message.senderId === "owner" ? ownerData : viewerData
                )} */}
                {renderAvatar({
                  profilePhoto:
                    currentConversation?.participants?.owner?.avatar,
                  firstName:
                    currentConversation?.participants?.owner?.name?.split(
                      " "
                    )[0],
                  lastName:
                    currentConversation?.participants?.owner?.name?.split(
                      " "
                    )[1],
                })}
              </div>
            )}
            <div className={styles.messageContent}>
              {message.type === "experience_request" && (
                <div className={styles.experienceRequestBadge}>
                  <FileText size={16} /> Richiesta per:{" "}
                  {message.experienceData.experienceTitle}
                </div>
              )}
              <div className={styles.messageText}>{message.content}</div>
              <div className={styles.messageTime}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input messaggio */}
      <div className={styles.messageInput}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Scrivi una risposta..."
          className={styles.messageTextarea}
          rows={2}
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className={styles.sendButton}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponentTest;
