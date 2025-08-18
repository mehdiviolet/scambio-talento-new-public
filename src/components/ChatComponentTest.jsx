// ChatComponentTest.js - VERSIONE CORRETTA SENZA ERRORI
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendOwnerMessage,
  markConversationAsRead,
  sendViewerMessage,
} from "@/store/slices/chatSlice";
import {
  MessageCircle,
  Send,
  Clock,
  User,
  Settings,
  Archive,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import styles from "./ChatComponent.module.css";

const ChatComponentTest = ({ isOwner = true }) => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const allUnreadCounts = useSelector((state) => state.chat.unreadCounts);

  // 🎯 STATE LOCALE - Ogni finestra ha la sua conversazione attiva
  const [localActiveConversation, setLocalActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  // 🎯 Calcola unread solo per il ruolo corrente
  const userRole = isOwner ? "owner" : "viewer";
  const unreadCounts = {};
  Object.keys(allUnreadCounts).forEach((chatId) => {
    unreadCounts[chatId] = allUnreadCounts[chatId]?.[userRole] || 0;
  });

  // 🎯 Dati utente basati sul ruolo
  const currentUser = {
    role: userRole,
    name: isOwner ? "Sara Dormand" : "Marco Rossi",
    avatar: isOwner ? "👩‍🎨" : "👨‍💼",
    id: isOwner ? "owner456" : "user123",
  };

  // Ordina conversazioni per ultima attività
  const sortedConversations = Object.values(conversations).sort(
    (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && localActiveConversation) {
      if (isOwner) {
        dispatch(
          sendOwnerMessage({
            conversationId: localActiveConversation,
            message: newMessage.trim(),
          })
        );
      } else {
        dispatch(
          sendViewerMessage({
            conversationId: localActiveConversation,
            viewerName: currentUser.name,
            message: newMessage.trim(),
          })
        );
      }

      // 🎯 BONUS: Se scrivi, significa che stai leggendo
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

  const openConversation = (conversationId) => {
    // Prima: marca come letta SUBITO quando clicchi sulla conversazione
    dispatch(
      markConversationAsRead({
        conversationId,
        role: userRole,
      })
    );

    // 🎯 USA state locale - ogni finestra indipendente
    setLocalActiveConversation(conversationId);
    setShowChatList(false);
  };

  const backToList = () => {
    // 🎯 CORRETTO: Solo per questa finestra!
    setLocalActiveConversation(null);
    setShowChatList(true);
  };

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

    // 🎯 Controllo corretto per "Tu:"
    const prefix = lastMessage.senderId === userRole ? "Tu: " : "";
    return (
      `${prefix}${lastMessage.content}`.substring(0, 50) +
      (lastMessage.content.length > 50 ? "..." : "")
    );
  };

  const totalUnread = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Vista lista conversazioni
  if (showChatList || !localActiveConversation) {
    return (
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <div className={styles.headerTitle}>
            <MessageCircle size={20} />
            <span>
              Chat {isOwner ? "(Owner)" : "(Viewer)"} (
              {sortedConversations.length})
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
              <p>Nessuna conversazione ancora</p>
              <span>Le richieste di esperienza appariranno qui</span>
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
                  {isOwner
                    ? conversation.participants.viewer.avatar
                    : conversation.participants.owner.avatar}
                </div>
                <div className={styles.conversationContent}>
                  <div className={styles.conversationTop}>
                    <span className={styles.conversationName}>
                      {isOwner
                        ? conversation.participants.viewer.name
                        : conversation.participants.owner.name}
                    </span>
                    <span className={styles.conversationTime}>
                      {formatTime(conversation.lastActivity)}
                    </span>
                  </div>
                  <div className={styles.conversationBottom}>
                    <span className={styles.experienceTitle}>
                      📚 {conversation.experienceTitle}
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

  // Vista conversazione singola
  const currentConversation = conversations[localActiveConversation];
  if (!currentConversation) return null;

  return (
    <div className={styles.chatContainer}>
      {/* Header conversazione */}
      <div className={styles.chatHeader}>
        <button className={styles.backButton} onClick={backToList}>
          <ChevronLeft size={20} />
        </button>
        <div className={styles.conversationInfo}>
          <div className={styles.conversationAvatar}>
            {isOwner
              ? currentConversation.participants.viewer.avatar
              : currentConversation.participants.owner.avatar}
          </div>
          <div className={styles.conversationDetails}>
            <span className={styles.conversationName}>
              {isOwner
                ? currentConversation.participants.viewer.name
                : currentConversation.participants.owner.name}
            </span>
            <span className={styles.experienceSubtitle}>
              📚 {currentConversation.experienceTitle}
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
                {isOwner
                  ? currentConversation.participants.viewer.avatar
                  : currentConversation.participants.owner.avatar}
              </div>
            )}
            <div className={styles.messageContent}>
              {message.type === "experience_request" && (
                <div className={styles.experienceRequestBadge}>
                  📋 Richiesta per: {message.experienceData.experienceTitle}
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
