import React, { useState } from "react";
import { ChevronDown, Gem } from "lucide-react";
import styles from "./SkillsSection.module.css";
import { HeaderAddButton } from "./ui/AddButtons";

const SkillMockup = ({ mockSkills, selectedPersonData, isInstructorPanel }) => {
  const [expandedSkillId, setExpandedSkillId] = useState(null);

  // Dati utente fissi (Sara Dormand)
  // const mockUserData = {
  //   firstName: "Sara",
  //   lastName: "Dormand",
  //   profilePhoto: null,
  //   avatar: "👩‍🎨",
  // };

  console.log(selectedPersonData);

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
        {/* <h2 className={styles.title}>Skills</h2> */}
        {isInstructorPanel && (
          <HeaderAddButton
            // onClick={handleAddSkill}
            title="Aggiungi nuova skill"
          />
        )}
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
                  {/* <span className={styles.skillIcon}>{skill.icon}</span> */}
                  {skill.icon && (
                    <span className={styles.experienceIcon}>
                      {typeof skill.icon === "string"
                        ? skill.icon
                        : React.createElement(skill.icon, { size: 18 })}
                    </span>
                  )}
                  <div className={styles.skillName}>
                    {skill.name || skill.name}
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
                  <div className={styles.descriptionBox}>
                    <p className={styles.descriptionText}>
                      {skill.description || (
                        <span className={styles.descriptionPlaceholder}>
                          Nessuna descrizione disponibile.
                        </span>
                      )}
                    </p>
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

export default SkillMockup;
