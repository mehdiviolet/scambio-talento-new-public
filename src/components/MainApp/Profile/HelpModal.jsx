import React, { useState } from "react";
import {
  HelpCircle,
  X,
  Mail,
  MessageCircle,
  Book,
  Phone,
  ExternalLink,
} from "lucide-react";
import styles from "./InviteFriendModal.module.css";

const HelpModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!isOpen) return null;

  const helpCategories = [
    {
      id: "account",
      title: "Account e Profilo",
      description: "Gestione account, password, impostazioni",
      icon: <Book size={16} />,
    },
    {
      id: "events",
      title: "Eventi e Partecipazione",
      description: "Come creare e partecipare agli eventi",
      icon: <MessageCircle size={16} />,
    },
    {
      id: "xp",
      title: "XP e Livelli",
      description: "Come guadagnare punti esperienza",
      icon: <HelpCircle size={16} />,
    },
  ];

  const contactOptions = [
    {
      label: "Email Support",
      description: "Rispondiamo entro 24 ore",
      icon: <Mail size={16} />,
      action: () => window.open("mailto:support@myapp.com"),
    },
    {
      label: "Chat dal vivo",
      description: "Disponibile 9:00-18:00",
      icon: <MessageCircle size={16} />,
      action: () => console.log("Opening chat..."),
    },
    {
      label: "FAQ Complete",
      description: "Tutte le domande frequenti",
      icon: <ExternalLink size={16} />,
      action: () => window.open("https://help.myapp.com"),
    },
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Aiuto e Supporto</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            <div className={styles.inviteValue}>
              <HelpCircle size={32} className={styles.inviteIcon} />
            </div>

            <h4 className={styles.inviteTitle}>Come possiamo aiutarti?</h4>

            {/* Help Categories */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Argomenti di aiuto</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${styles.shareBtn} ${
                      selectedCategory === category.id ? styles.actionBtn : ""
                    }`}
                    style={{
                      justifyContent: "flex-start",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {category.icon}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "0.875rem" }}>
                        {category.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                        {category.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Contatta il supporto</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {contactOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className={styles.shareBtn}
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
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.8,
                      }}
                    >
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            {/* {selectedCategory && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Suggerimenti rapidi</h3>
                <div
                  className={styles.linkContainer}
                  style={{ flexDirection: "column", gap: "0.5rem" }}
                >
                  {selectedCategory === "account" && (
                    <>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Cambia password dalle impostazioni profilo
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Verifica email per attivare tutte le funzioni
                      </div>
                    </>
                  )}
                  {selectedCategory === "events" && (
                    <>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Usa QR code per confermare partecipazione
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Lascia feedback per guadagnare XP
                      </div>
                    </>
                  )}
                  {selectedCategory === "xp" && (
                    <>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Partecipa agli eventi per guadagnare XP
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        • Invita amici per bonus XP
                      </div>
                    </>
                  )}
                </div>
              </div>
            )} */}

            {/* Info */}
            <div className={styles.rewardInfo}>
              <Phone size={20} className={styles.rewardIcon} />
              <p className={styles.rewardText}>
                Il nostro team di supporto è sempre pronto ad aiutarti. Scegli
                il metodo di contatto che preferisci.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
