import React, { useState } from "react";
import { ChevronDown, Gem, Camera, Music, Trash2, X, Save } from "lucide-react";
import styles from "./SkillsSection.module.css";
import { HeaderAddButton } from "./ui/AddButtons";

const SearchSectionTest = ({ isInstructorPanel }) => {
  const [expandedSkillId, setExpandedSkillId] = useState(null);

  // 🎯 DATI MOCKUP STATICI
  const mockSkills = [
    {
      id: "photography",
      name: "Fotografia",
      icon: Camera,
      description:
        "Voglio imparare le basi della fotografia digitale e della composizione.",
    },
    {
      id: "music",
      name: "Musica",
      icon: Music,
      description:
        "Cerco qualcuno che mi insegni a suonare la chitarra classica.",
    },
  ];

  const handleToggle = (skillId) => {
    setExpandedSkillId(expandedSkillId === skillId ? null : skillId);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Cosa voglio imparare?</h3>
      {/* <div className={styles.header}> */}
      {/* </div> */}

      <div className={styles.content}>
        <div className={styles.header}>
          {isInstructorPanel && (
            <HeaderAddButton
              // onClick={handleAddSkill}
              title="Aggiungi nuova skill"
              // txt="SKILL"
            />
          )}
        </div>

        {mockSkills.map((skill) => {
          const Icon = skill.icon;
          const isExpanded = expandedSkillId === skill.id;

          return (
            <div
              key={skill.id}
              className={`${styles.skillItem} ${
                isExpanded ? styles.expanded : ""
              }`}
            >
              {/* Skill Card */}
              <button
                onClick={() => handleToggle(skill.id)}
                className={styles.skillCard}
              >
                <div className={styles.skillInfo}>
                  <span className={styles.skillIcon}>
                    <Icon size={24} />
                  </span>
                  <div className={styles.skillName}>{skill.name}</div>
                </div>

                <div className={styles.skillMeta}>
                  <ChevronDown
                    size={16}
                    className={`${styles.expandIcon} ${
                      isExpanded ? styles.expanded : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className={styles.skillExpanded}>
                  <div className={styles.descriptionBox}>
                    <p
                      className={`${styles.descriptionText} ${styles.descriptionClickable}`}
                    >
                      {skill.description}
                    </p>
                  </div>
                  {/* 
                  {isInstructorPanel && (
                    <div className={styles.actions}>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionButtonDelete}>
                          <Trash2 size={16} />
                        </button>
                        <button className={styles.actionButtonSecondary}>
                          <X size={16} />
                        </button>
                        <button className={styles.actionButtonEdit}>
                          <Save size={16} />
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchSectionTest;
