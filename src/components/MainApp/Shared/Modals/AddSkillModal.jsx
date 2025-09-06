import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft } from "lucide-react";
import styles from "./AddSkillModal.module.css";
import { SKILL_ICONS } from "@/components/ui/SkillIconsMap";

const AddSkillModal = ({ isOpen, onClose, onSave, formData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const descriptionRef = useRef(null);

  // ✅ Lista completa di skills disponibili
  const allSkillsData = [
    // { id: "writing", name: "Scrittura", IconComponent: SKILL_ICONS.writing },
    // { id: "cooking", name: "Cucina", IconComponent: SKILL_ICONS.cooking },
    // {
    //   id: "photography",
    //   name: "Fotografia",
    //   IconComponent: SKILL_ICONS.photography,
    // },
    // { id: "writing", name: "Scrittura", icon: "✍️" },
    // { id: "cooking", name: "Cucina", icon: "🍳" },
    // { id: "photography", name: "Fotografia", icon: "📸" },
    // { id: "history", name: "Storia", IconComponent: SKILL_ICONS.history },
    // { id: "music", name: "Musica", IconComponent: SKILL_ICONS.music },
    // { id: "dance", name: "Danza", IconComponent: SKILL_ICONS.dance },
    // { id: "painting", name: "Pittura", IconComponent: SKILL_ICONS.painting },
    // { id: "video", name: "Video", IconComponent: SKILL_ICONS.video },
    // {
    //   id: "programming",
    //   name: "Programmazione",
    //   IconComponent: SKILL_ICONS.programming,
    // },
    // {
    //   id: "architecture",
    //   name: "Architettura",
    //   IconComponent: SKILL_ICONS.architecture,
    // },
    // { id: "graphics", name: "Grafica", IconComponent: SKILL_ICONS.graphics },
    // { id: "theater", name: "Teatro", IconComponent: SKILL_ICONS.theater },
    // {
    //   id: "psychology",
    //   name: "Psicologia",
    //   IconComponent: SKILL_ICONS.psychology,
    // },
    // { id: "fashion", name: "Fashion", IconComponent: SKILL_ICONS.fashion },
    // { id: "health", name: "Salute", IconComponent: SKILL_ICONS.health },
    // {
    //   id: "gardening",
    //   name: "Giardinaggio",
    //   IconComponent: SKILL_ICONS.gardening,
    // },
    // { id: "languages", name: "Lingue", IconComponent: SKILL_ICONS.languages },
    // {
    //   id: "videogames",
    //   name: "Videogiochi",
    //   IconComponent: SKILL_ICONS.videogames,
    // },
    // { id: "podcast", name: "Podcast", IconComponent: SKILL_ICONS.podcast },
    { id: "writing", name: "Scrittura", icon: "✍️" },
    { id: "cooking", name: "Cucina", icon: "🍳" },
    { id: "photography", name: "Fotografia", icon: "📸" },
    { id: "history", name: "Storia", icon: "📚" },
    { id: "music", name: "Musica", icon: "🎵" },
    { id: "dance", name: "Danza", icon: "💃" },
    { id: "painting", name: "Pittura", icon: "🎨" },
    { id: "video", name: "Video", icon: "🎬" },
    { id: "architecture", name: "Architettura", icon: "🏛️" },
    { id: "graphics", name: "Grafica", icon: "🎭" },
    { id: "theater", name: "Teatro", icon: "🎪" },
    { id: "psychology", name: "Psicologia", icon: "🧠" },
    { id: "programming", name: "coding", icon: "💻" },
    { id: "fashion", name: "Fashion", icon: "👗" },
    { id: "health", name: "Salute", icon: "💪" },
    { id: "gardening", name: "Giardinaggio", icon: "🌱" },
    { id: "languages", name: "Lingue", icon: "🗣️" },
    { id: "videogames", name: "Videogiochi", icon: "🎮" },
    { id: "podcast", name: "Podcast", icon: "🎙️" },
  ];
  // ✅ FILTRO: Mostra solo le skills NON ancora aggiunte
  const getAvailableSkills = () => {
    const existingSkillIds = (formData?.skills || []).map((skill) => skill.id);
    const availableSkills = allSkillsData.filter(
      (skill) => !existingSkillIds.includes(skill.id)
    );

    // console.log("🔍 Skills esistenti:", existingSkillIds);
    // console.log(
    //   "✅ Skills disponibili:",
    //   availableSkills.map((s) => s.name)
    // );

    return availableSkills;
  };

  // ✅ Skills filtrate da mostrare nel modal
  const skillsData = getAvailableSkills();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedSkill(null);
      setDescription("");
      setSelectedIndex(0);

      // ✅ Log per debugging
      // console.log("🎯 AddSkillModal aperto:");
      // console.log("📊 Skills totali disponibili:", allSkillsData.length);
      // console.log("📋 Skills già aggiunte:", formData?.skills?.length || 0);
      // console.log("🆕 Skills selezionabili:", skillsData.length);
    }
  }, [isOpen, formData?.skills]);

  useEffect(() => {
    if (currentStep === 2 && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [currentStep]);

  // ✅ Controllo se non ci sono skills disponibili
  const hasAvailableSkills = skillsData.length > 0;

  const handleWheelSpin = (direction) => {
    if (!hasAvailableSkills) return;

    const itemsCount = skillsData.length;
    let newIndex;
    if (direction === "up") {
      newIndex = selectedIndex > 0 ? selectedIndex - 1 : itemsCount - 1;
    } else {
      newIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0;
    }
    setSelectedIndex(newIndex);
  };

  const handleSkillSelect = () => {
    if (!hasAvailableSkills) return;

    const skill = skillsData[selectedIndex];
    setSelectedSkill(skill);
    setCurrentStep(2);
  };

  const handleDescriptionSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (description.trim()) {
        setCurrentStep(3);
      }
    }
  };

  const handleFinalSubmit = () => {
    const newSkill = {
      id: selectedSkill.id,
      name: selectedSkill.name,
      icon: selectedSkill.icon,
      detail: selectedSkill.name, // ✅ Aggiunto per compatibilità con ProfilePage
      description: description.trim(),
      gems: 0, // ✅ Gems iniziali
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), // ✅ Timestamp aggiornamento
      source: "manual", // ✅ Identifica come aggiunta manuale
      isFromOnboarding: false, // ✅ Non dall'onboarding
    };

    // console.log("💾 Salvando nuova skill manuale:", newSkill);
    onSave(newSkill);
    onClose();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return hasAvailableSkills
          ? " Scegli una competenza"
          : "Tutte le skills aggiunte!";
      case 2:
        return "Descrivi la tua skill";
      case 3:
        return "Riassunto finale";
      default:
        return "";
    }
  };

  const MAX_PREVIEW_LENGTH = 120; // caratteri
  const shouldTruncate = description.length > MAX_PREVIEW_LENGTH;
  const displayText =
    isDescriptionExpanded || !shouldTruncate
      ? description
      : description.substring(0, MAX_PREVIEW_LENGTH) + "...";

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles.modalSkill}`}>
        <div className={styles.header}>
          <h2>{getStepTitle()}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X />
          </button>
        </div>

        <div className={styles.content}>
          {currentStep === 1 && (
            <div className={styles.centerAlign}>
              {hasAvailableSkills ? (
                <>
                  <div className={styles.wheelContainer}>
                    <div className={styles.selectionHighlight}></div>

                    <div className={styles.scrollContainer}>
                      <div
                        className={styles.scrollContent}
                        style={{
                          transform: `translateY(${-selectedIndex * 64}px)`,
                        }}
                      >
                        {skillsData.map((skill, index) => {
                          const isSelected = index === selectedIndex;
                          const distance = Math.abs(index - selectedIndex);
                          const opacity =
                            distance === 0 ? 1 : distance === 1 ? 0.7 : 0.4;
                          const scale =
                            distance === 0 ? 1 : distance === 1 ? 0.95 : 0.85;

                          return (
                            <div
                              key={skill.id}
                              className={`${styles.skillItem} ${
                                isSelected ? styles.selected : ""
                              }`}
                              style={{ opacity, transform: `scale(${scale})` }}
                              onClick={() => setSelectedIndex(index)}
                            >
                              <div className={styles.skillContent}>
                                <span
                                  className={`${styles.skillIcon} ${
                                    isSelected ? styles.selected : ""
                                  }`}
                                >
                                  {/* {skill.IconComponent ? (
                                    <skill.IconComponent size={24} />
                                  ) : (
                                    skill.icon
                                  )} */}
                                  {skill.icon}
                                </span>
                                <span
                                  className={`${styles.skillName} ${
                                    isSelected ? styles.selected : ""
                                  }`}
                                >
                                  {skill.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className={styles.controls}>
                    <button
                      onClick={() => handleWheelSpin("up")}
                      className={styles.controlButton}
                    >
                      ↑ Su
                    </button>
                    <button
                      onClick={() => handleWheelSpin("down")}
                      className={styles.controlButton}
                    >
                      ↓ Giù
                    </button>
                  </div>

                  <button
                    onClick={handleSkillSelect}
                    className={styles.primaryButton}
                  >
                    Seleziona {skillsData[selectedIndex]?.name}
                  </button>
                </>
              ) : (
                // ✅ Stato quando tutte le skills sono già state aggiunte
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🎯</div>
                  <h3 className={styles.emptyTitle}>Ottimo lavoro!</h3>
                  <p className={styles.emptyDescription}>
                    Hai già aggiunto tutte le competenze disponibili.
                    <br />
                    Continua a migliorare quelle esistenti!
                  </p>
                  <button onClick={onClose} className={styles.primaryButton}>
                    Chiudi
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  {/* <span>{selectedSkill.icon}</span> */}
                  {/* {selectedSkill.IconComponent ? (
                    <selectedSkill.IconComponent size={24} />
                  ) : (
                    "⚡"
                  )} */}
                  <span>{selectedSkill.icon}</span>
                </div>
                <h3 className={styles.stepTitle}>{selectedSkill.name}</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Descrivi la tua competenza:</label>
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Racconta come hai ottenuto questa competenza..."
                  rows={5}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleDescriptionSubmit}
                  disabled={!description.trim()}
                  className={`${styles.continueButton} ${
                    description.trim() ? styles.enabled : styles.disabled
                  }`}
                >
                  Continua →
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.summary}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryIcon}>
                    {selectedSkill.icon}
                  </span>
                  <h3>{selectedSkill.name}</h3>
                </div>

                <div className={styles.summaryDescription}>
                  {/* <p>{description}</p> */}

                  <p>{displayText}</p>
                  {shouldTruncate && (
                    <button
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className={styles.expandButton}
                    >
                      {isDescriptionExpanded ? "Mostra meno" : "Leggi tutto"}
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className={styles.primaryButton}
                >
                  Aggiungi Skill
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSkillModal;
