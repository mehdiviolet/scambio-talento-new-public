// CherryModal.jsx
import React from "react";
import { Cherry, X } from "lucide-react";
import styles from "./CherryModal.module.css"; // o riusa gli stili di altri modal
import CherryComp from "@/components/CherryComp";

const CherryModal = ({ isOpen, onClose, currentUser }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🍒 Cherry Dashboard</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <CherryComp currentUser={currentUser} />

        {/* <div className={styles.content}>
          <div className={styles.cherryStats}>
            <Cherry size={24} className={styles.cherryIcon} />
            <p>
              Oggi hai raccolto <strong>10 Cherry</strong>!
            </p>
            <p>
              Totale Cherry: <strong>47</strong>
            </p>
            <p>
              Prossimo premio a: <strong>50 Cherry</strong>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CherryModal;
