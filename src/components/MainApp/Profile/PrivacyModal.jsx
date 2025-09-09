import React, { useState } from "react";
import { Shield, X, Eye, EyeOff, Users, Globe, Lock } from "lucide-react";
import styles from "./InviteFriendModal.module.css";

const PrivacyModal = ({ isOpen, onClose }) => {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityVisible, setActivityVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  if (!isOpen) return null;

  const visibilityOptions = [
    {
      id: "public",
      label: "Pubblico",
      description: "Tutti possono vedere il tuo profilo",
      icon: <Globe size={16} />,
    },
    {
      id: "friends",
      label: "Solo amici",
      description: "Solo i tuoi amici possono vedere il profilo",
      icon: <Users size={16} />,
    },
    {
      id: "private",
      label: "Privato",
      description: "Solo tu puoi vedere il tuo profilo",
      icon: <Lock size={16} />,
    },
  ];

  const handleVisibilityChange = (value) => {
    setProfileVisibility(value);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Privacy del Profilo</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            <div className={styles.inviteValue}>
              <Shield size={32} className={styles.inviteIcon} />
            </div>

            <h4 className={styles.inviteTitle}>Controlla la tua privacy</h4>

            {/* Profile Visibility Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Visibilità profilo</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {visibilityOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleVisibilityChange(option.id)}
                    className={`${styles.shareBtn} ${
                      profileVisibility === option.id ? styles.actionBtn : ""
                    }`}
                    style={{
                      justifyContent: "flex-start",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {option.icon}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "0.875rem" }}>
                        {option.label}
                      </div>
                      <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Settings */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Impostazioni attività</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={() => setActivityVisible(!activityVisible)}
                  className={`${styles.shareBtn} ${
                    activityVisible ? styles.actionBtn : ""
                  }`}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {activityVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>Mostra attività recente</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.8,
                      color: activityVisible
                        ? "var(--success-green)"
                        : "var(--text-primary-light)",
                    }}
                  >
                    {activityVisible ? "Visibile" : "Nascosta"}
                  </div>
                </button>

                <button
                  onClick={() => setContactVisible(!contactVisible)}
                  className={`${styles.shareBtn} ${
                    contactVisible ? styles.actionBtn : ""
                  }`}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Users size={16} />
                    <span>Mostra info contatto</span>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.8,
                      color: contactVisible
                        ? "var(--success-green)"
                        : "var(--text-primary-light)",
                    }}
                  >
                    {contactVisible ? "Visibile" : "Nascosta"}
                  </div>
                </button>
              </div>
            </div>

            {/* Info */}
            <div className={styles.rewardInfo}>
              <Shield size={20} className={styles.rewardIcon} />
              <p className={styles.rewardText}>
                Le tue impostazioni privacy vengono applicate immediatamente e
                controllano chi può vedere il tuo profilo e le tue attività.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
