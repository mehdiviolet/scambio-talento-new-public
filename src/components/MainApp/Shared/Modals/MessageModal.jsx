import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import styles from "./ViewSkillModal.module.css";

const MessageModal = ({ isOpen, onClose, userProfile }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    try {
      // SOSTITUISCI questa simulazione con una vera chiamata API:
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: userProfile.id,
          message: message.trim(),
          senderId: currentUserId, // Aggiungi l'ID dell'utente corrente
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();

      setMessage("");
      onClose();

      // Usa una notifica toast invece di alert
      // showToast("Message sent successfully!");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      // showToast("Failed to send message. Please try again.", "error");
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isMessageValid = message.trim().length > 0;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Send Message</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Message Info */}
          <div className={styles.descriptionBox}>
            <p className={styles.descriptionText}>
              Send a message to {userProfile?.firstName} {userProfile?.lastName}
            </p>
          </div>

          <div className={styles.divider}></div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message-input"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "white",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              Your Message
            </label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write your message to ${userProfile?.firstName}...`}
              disabled={isSending}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "none",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
                color: "#1f2937",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                resize: "vertical",
                transition: "all 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                e.target.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                e.target.style.boxShadow = "none";
              }}
            />
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "right",
              }}
            >
              {message.length}/500 characters
            </div>
          </div>

          {/* Message Guidelines */}
          {/* <div
            style={{
              padding: "0.75rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.4",
              }}
            >
              💡 <strong>Tip:</strong> Be respectful and clear in your message.
              This will be delivered directly to {userProfile?.firstName}'s
              inbox.
            </p>
          </div> */}
        </div>

        {/* Footer */}
        {/* <div className={styles.footer}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {userProfile?.profilePhoto ? (
                <img
                  src={userProfile.profilePhoto}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarEmoji}>
                  {userProfile?.firstName?.[0]}
                  {userProfile?.lastName?.[0]}
                </span>
              )}
            </div>
            <span className={styles.userName}>
              To: {userProfile?.firstName} {userProfile?.lastName}
            </span>
          </div>

          <div className={styles.gems}>
            <div className={styles.gemsContent}>
              <MessageCircle className={styles.gemsIcon} size={20} />
              <span className={styles.gemsCount}>Message</span>
            </div>
          </div>
        </div> */}

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.editActions}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isSending}
            >
              <X />
              Cancel
            </button>
            <button
              className={`${styles.saveButton} ${
                isMessageValid && !isSending ? "enabled" : "disabled"
              }`}
              onClick={handleSendMessage}
              disabled={!isMessageValid || isSending}
            >
              <Send />
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
