import React, { useState, useRef, useEffect } from "react";
import {
  Lock,
  HelpCircle,
  LogOut,
  User,
  Shield,
  UserPlus2Icon,
} from "lucide-react";
import styles from "./SettingsDropdown.module.css";

const SettingsDropdown = ({
  onInviteFriend,
  isOpen,
  onClose,
  onOpenPrivacy,
  onOpenHelp,
  onLogout,
}) => {
  const dropdownRef = useRef(null);

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

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: <UserPlus2Icon size={16} />,
      label: "Invita un amico",
      action: onInviteFriend,
      description: "Invita qualcuno e ottiene 10XP!",
    },
    {
      icon: <Shield size={16} />,
      label: "Privacy del profilo",
      action: onOpenPrivacy,
      description: "Controlla chi può vedere il tuo profilo",
    },
    {
      icon: <HelpCircle size={16} />,
      label: "Aiuto e supporto",
      action: onOpenHelp,
      description: "Ottieni aiuto o contatta il supporto",
    },
    {
      icon: <LogOut size={16} />,
      label: "Esci",
      action: onLogout,
      description: "Disconnettiti dal tuo account",
      danger: true,
    },
  ];

  return (
    <>
      {/* ✅ AGGIUNGI OVERLAY SFOCATO IDENTICO */}
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
    </>
  );
};

export default SettingsDropdown;
