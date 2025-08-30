// CherryModal.jsx
import React from "react";
import { Cherry, X } from "lucide-react";
import styles from "./CherryModal.module.css"; // o riusa gli stili di altri modal
import CherryComp from "@/components/CherryComp";

const CherryModal = ({ isOpen, onClose, currentUser }) => {
  if (!isOpen) return null;
  // NON USO QUESTO 10.08.2025
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
      </div>
    </div>
  );
};

export default CherryModal;
