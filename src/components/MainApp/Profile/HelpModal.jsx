import React from "react";
import { Shield, X } from "lucide-react";
import styles from "./SharedModal.module.css";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🔒 Privacy del Profilo</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>Gestisci chi può vedere il tuo profilo e i tuoi contenuti.</p>
          {/* TODO: Aggiungi toggle per privacy settings */}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
