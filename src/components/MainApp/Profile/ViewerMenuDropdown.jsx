import React, { useState, useRef, useEffect } from "react";
import { Share, AlertTriangle, UserX, Link } from "lucide-react";
import styles from "./ViewerMenuDropdown.module.css";
import ConfirmBlockModal from "./ConfirmBlockModal";
import ShareProfileModal from "./ShareProfileModal";

const ViewerMenuDropdown = ({
  isOpen,
  onClose,
  userProfile,
  onOpenShare,
  onOpenBlock,
}) => {
  const dropdownRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleShareProfile = () => {
    onOpenShare(); // ✅ CHIAMA LA FUNZIONE DEL PARENT
    onClose();
  };

  const handleBlock = () => {
    onOpenBlock(); // ✅ CHIAMA LA FUNZIONE DEL PARENT
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Mostra toast di successo
      console.log("Link copiato!");
    } catch (err) {
      console.error("Errore nella copia:", err);
    }
    onClose();
  };

  const handleReport = () => {
    console.log("Segnala profilo:", userProfile);
    // TODO: Apri modal di segnalazione
    onClose();
  };

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: <Share size={16} />,
      label: "Condividi profilo",
      action: handleShareProfile,
      description: "Condividi questo profilo con altri",
    },
    {
      icon: <Link size={16} />,
      label: "Copia link",
      action: handleCopyLink,
      description: "Copia il link di questo profilo",
    },
    {
      icon: <AlertTriangle size={16} />,
      label: "Segnala",
      action: handleReport,
      description: "Segnala contenuti inappropriati",
    },
    {
      icon: <UserX size={16} />,
      label: "Blocca",
      action: handleBlock,
      description: "Non vedere più contenuti di questo utente",
      danger: true,
    },
  ];

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div ref={dropdownRef} className={styles.dropdown}>
        <div className={styles.dropdownContent}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`${styles.menuItem} ${
                item.danger ? styles.danger : ""
              }`}
            >
              <div className={styles.menuIcon}>{item.icon}</div>
              <div className={styles.menuText}>
                <div className={styles.menuLabel}>{item.label}</div>
                <div className={styles.menuDescription}>{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ShareProfileModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        userProfile={userProfile}
      />
      <ConfirmBlockModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        userProfile={userProfile}
        onConfirm={() => {
          console.log("Utente bloccato!");
          setShowBlockModal(false);
        }}
      />
    </>
  );
};

export default ViewerMenuDropdown;
