import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import styles from "../../Profile/InviteFriendModal.module.css";

const MessageModal = ({ isOpen, onClose, userProfile }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  // const handleSendMessage = async () => {
  //   if (!message.trim()) return;

  //   setIsSending(true);

  //   try {
  //     // SOSTITUISCI questa simulazione con una vera chiamata API:
  //     const response = await fetch("/api/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         recipientId: userProfile.id,
  //         message: message.trim(),
  //         senderId: 1234, // Aggiungi l'ID dell'utente corrente
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to send message");
  //     }

  //     const result = await response.json();

  //     setMessage("");
  //     setShowSuccess(true);
  //     setTimeout(() => {
  //       setShowSuccess(false);
  //       onClose();
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Failed to send message:", error);
  //     // showToast("Failed to send message. Please try again.", "error");
  //     alert("Failed to send message. Please try again.");
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    // Simula invio per UI
    setTimeout(() => {
      setMessage("");
      setShowSuccess(true);
      setIsSending(false);

      // Dopo 3 secondi chiudi tutto
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    }, 1500); // Simula 1.5 secondi di invio
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isMessageValid = message.trim().length > 0;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Invia Messaggio</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            {showSuccess ? (
              // Stato di successo - sostituisce tutto il contenuto
              <>
                <div className={styles.inviteValue}>
                  <Send
                    size={32}
                    className={styles.inviteIcon}
                    style={{ color: "var(--success-green)" }}
                  />
                </div>
                <h4
                  className={styles.inviteTitle}
                  style={{ color: "var(--success-green-dark)" }}
                >
                  Messaggio inviato!
                </h4>
                <div className={styles.rewardInfo}>
                  {/* <MessageCircle size={20} className={styles.rewardIcon} /> */}
                  <p className={styles.rewardText}>
                    Il tuo messaggio è stato inviato{" "}
                    {userProfile?.firstName ? `a ${userProfile.firstName}` : ""}{" "}
                    con successo.
                  </p>
                </div>
              </>
            ) : (
              // Contenuto normale del modal
              <>
                <div className={styles.inviteValue}>
                  <MessageCircle size={32} className={styles.inviteIcon} />
                </div>
                {/* Message Input Section */}
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Il tuo messaggio</h3>
                  <div
                    className={styles.linkContainer}
                    style={{ flexDirection: "column", gap: "0.75rem" }}
                  >
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Scrivi il tuo messaggio a ${userProfile?.firstName}...`}
                      disabled={isSending}
                      className={styles.linkInput}
                      style={{
                        minHeight: "120px",
                        resize: "vertical",
                        fontFamily: "inherit",
                        lineHeight: "1.5",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-primary-light)",
                        textAlign: "right",
                        width: "100%",
                      }}
                    >
                      {message.length}/500 caratteri
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.section}>
                  <div className={styles.shareButtonsLogOut}>
                    <button
                      onClick={onClose}
                      disabled={isSending}
                      className={styles.shareBtn}
                    >
                      <X size={16} />
                      Annulla
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!isMessageValid || isSending}
                      className={`${styles.actionBtn} ${
                        isMessageValid && !isSending ? styles.success : ""
                      }`}
                    >
                      <Send size={16} />
                      {isSending ? "Invio in corso..." : "Invia Messaggio"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
