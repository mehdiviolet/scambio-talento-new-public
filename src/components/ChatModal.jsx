// ChatModal.jsx
import React from "react";
import { X } from "lucide-react";
import styles from "@/components/MainApp/Profile/CherryModal.module.css";
import ChatComponentTest from "./ChatComponentTest";

const ChatModal = ({ isOpen, onClose, isOwner }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "500px", maxHeight: "80vh" }}
      >
        <div className={styles.header}>
          <h2>💬 Chat</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div
          className={styles.content}
          style={{ padding: 0, overflow: "hidden" }}
        >
          <ChatComponentTest isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
