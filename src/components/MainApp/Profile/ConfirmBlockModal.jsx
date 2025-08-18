import React from "react";
import { UserX, X } from "lucide-react";
import styles from "./SharedModal.module.css"; // Usa stesso stile degli altri modal

const ConfirmBlockModal = ({ isOpen, onClose, userProfile, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <UserX size={24} color="#ef4444" />
          <h2>Blocca Utente</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <p>
            Sei sicuro di voler bloccare{" "}
            <strong>
              {userProfile?.firstName} {userProfile?.lastName}
            </strong>
            ?
          </p>
          <p className={styles.warning}>
            Non vedrai più i suoi contenuti e non potrà contattarti.
          </p>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Annulla
          </button>
          <button onClick={onConfirm} className={styles.blockBtn}>
            Blocca
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBlockModal;
