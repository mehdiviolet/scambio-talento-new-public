import React, { useState } from "react";
import { ChevronDown, Gem } from "lucide-react";
import styles from "./SkillsSection.module.css";

const SkillSectionTest = () => {
  const [expandedSkillId, setExpandedSkillId] = useState(null);

  // Dati fissi delle skills (selezione da skillsData con dati aggiuntivi)
  const mockSkills = [
    {
      id: "photography",
      name: "Fotografia",
      icon: "📸",
      detail: "Street Photography",
      description:
        "Ho iniziato a fotografare 3 anni fa durante un viaggio a Parigi. Mi affascina catturare momenti spontanei della vita urbana, dalle espressioni delle persone ai giochi di luce sui palazzi. Ho sviluppato un occhio particolare per la composizione e l'uso della luce naturale.",
      gems: 127,
      createdAt: "2023-06-15T14:30:00Z",
      updatedAt: "2024-01-20T09:15:00Z",
    },
    {
      id: "cooking",
      name: "Cucina",
      icon: "🍳",
      detail: "Cucina Italiana Tradizionale",
      description:
        "La passione per la cucina nasce in famiglia. Ho imparato i segreti della pasta fresca dalla nonna e ho perfezionato le tecniche dei risotti piemontesi. Amo sperimentare con ingredienti locali e creare piatti che raccontano il territorio.",
      gems: 89,
      createdAt: "2022-11-08T16:45:00Z",
      updatedAt: "2024-01-18T11:20:00Z",
    },
    {
      id: "programming",
      name: "Coding",
      icon: "💻",
      detail: "Frontend Development",
      description:
        "Specializzata in React e JavaScript moderno. Mi piace creare interfacce intuitive e responsive che offrono un'esperienza utente eccellente. Ho lavorato su diversi progetti web, dalla progettazione UI/UX all'implementazione completa.",
      gems: 156,
      createdAt: "2023-01-20T10:00:00Z",
      updatedAt: "2024-01-25T15:30:00Z",
    },
    {
      id: "painting",
      name: "Pittura",
      icon: "🎨",
      detail: "Acquerello e Tecniche Miste",
      description:
        "L'arte è sempre stata la mia forma di espressione preferita. Dipingo principalmente con acquerelli, catturando paesaggi urbani e nature morte. Ogni dipinto racconta una storia e trasmette emozioni attraverso colori e forme.",
      gems: 73,
      createdAt: "2023-03-12T18:20:00Z",
      updatedAt: "2024-01-15T14:10:00Z",
    },
    {
      id: "languages",
      name: "Lingue",
      icon: "🗣️",
      detail: "Inglese e Francese",
      description:
        "Parlo fluentemente inglese e francese oltre all'italiano. Ho vissuto 6 mesi a Londra per migliorare il mio inglese e frequento regolarmente corsi di conversazione francese. Le lingue aprono porte a nuove culture e opportunità.",
      gems: 94,
      createdAt: "2022-09-05T12:30:00Z",
      updatedAt: "2024-01-22T16:45:00Z",
    },
  ];

  // Dati utente fissi (Sara Dormand)
  const mockUserData = {
    firstName: "Sara",
    lastName: "Dormand",
    profilePhoto: null,
    avatar: "👩‍🎨",
  };

  // Helper per verificare se una skill è espansa
  const isExpanded = (skill) => {
    const skillId = `skill-${skill.createdAt}-${skill.name}`;
    return expandedSkillId === skillId;
  };

  // Gestione toggle espansione
  const handleSkillToggle = (skill) => {
    const skillId = `skill-${skill.createdAt}-${skill.name}`;
    setExpandedSkillId(expandedSkillId === skillId ? null : skillId);
  };

  return (
    <div className={styles.container}>
      {/* Header - NO add button (viewer mode) */}
      <div className={styles.header}>
        <h2 className={styles.title}>Skills</h2>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {mockSkills.map((skill, index) => {
          const isSkillExpanded = isExpanded(skill);

          return (
            <div
              key={`skill-${index}-${skill.createdAt}`}
              className={`${styles.skillItem} ${
                isSkillExpanded ? styles.expanded : ""
              }`}
            >
              {/* Skill Toggle Button */}
              <button
                onClick={() => handleSkillToggle(skill)}
                className={styles.skillCard}
              >
                <div className={styles.skillInfo}>
                  <span className={styles.skillIcon}>{skill.icon}</span>
                  <div className={styles.skillName}>
                    {skill.detail || skill.name}
                  </div>
                </div>

                <div className={styles.skillMeta}>
                  <span className={styles.skillGems}>
                    <Gem size={16} />
                    <span className={styles.gemsCount}>{skill.gems || 0}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`${styles.expandIcon} ${
                      isSkillExpanded ? styles.expanded : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {isSkillExpanded && (
                <div className={styles.skillExpanded}>
                  {/* Description Box - viewer mode only */}
                  <div className={styles.descriptionBox}>
                    <p className={styles.descriptionText}>
                      {skill.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={styles.divider}></div>

                  {/* Footer */}
                  <div className={styles.footer}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {mockUserData.profilePhoto ? (
                          <img
                            src={mockUserData.profilePhoto}
                            alt={`${mockUserData.firstName} ${mockUserData.lastName}`}
                            className={styles.avatarImage}
                          />
                        ) : (
                          <div className={styles.avatarEmoji}>👩‍🎨</div>
                        )}
                      </div>
                      <span className={styles.userName}>
                        {mockUserData.firstName} {mockUserData.lastName}
                      </span>
                    </div>

                    <div className={styles.skillGemsDisplay}>
                      <span className={styles.gemsIcon}>⚡</span>
                      <span className={styles.gemsCount}>
                        {skill.gems || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSectionTest;
