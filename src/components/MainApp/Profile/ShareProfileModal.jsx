import React from "react";
import { Copy, MessageCircle, Facebook, Twitter, X } from "lucide-react";
import styles from "./SharedModal.module.css"; // Usa stesso stile degli altri modal
// import styles from "./ProfileHeader.module.css";

const ShareProfileModal = ({ isOpen, onClose, userProfile }) => {
  const profileUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      // Mostra toast di successo interno
      console.log("Link copiato!");
      onClose();
    } catch (err) {
      console.error("Errore copia");
    }
  };

  const shareOptions = [
    {
      icon: <Copy size={20} />,
      label: "Copia link",
      action: handleCopyLink,
      color: "#6b7280",
    },
    {
      icon: <MessageCircle size={20} />,
      label: "Condividi via messaggio",
      action: () => console.log("Share via message"),
      color: "#22c55e",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Condividi Profilo</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.profilePreview}>
            <div className={styles.avatar}>
              {userProfile?.firstName?.[0]}
              {userProfile?.lastName?.[0]}
            </div>
            <h3>
              {userProfile?.firstName} {userProfile?.lastName}
            </h3>
          </div>

          <div className={styles.shareOptions}>
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className={styles.shareOption}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareProfileModal;
