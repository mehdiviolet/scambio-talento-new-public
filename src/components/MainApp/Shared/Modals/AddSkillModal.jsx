import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ArrowLeft,
  BookOpen,
  ChefHat,
  Camera,
  GraduationCap,
  Music,
  Zap,
  Palette,
  Video,
  Building,
  Monitor,
  Drama,
  Brain,
  Code,
  Shirt,
  Heart,
  Flower,
  Languages,
  Gamepad2,
  Mic,
} from "lucide-react";
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
    { id: "writing", name: "Scrittura", icon: BookOpen },
    { id: "cooking", name: "Cucina", icon: ChefHat },
    { id: "photography", name: "Fotografia", icon: Camera },
    { id: "history", name: "Storia", icon: GraduationCap },
    { id: "music", name: "Musica", icon: Music },
    { id: "dance", name: "Danza", icon: Zap },
    { id: "painting", name: "Pittura", icon: Palette },
    { id: "video", name: "Video", icon: Video },
    { id: "architecture", name: "Architettura", icon: Building },
    { id: "graphics", name: "Grafica", icon: Monitor },
    { id: "theater", name: "Teatro", icon: Drama },
    { id: "psychology", name: "Psicologia", icon: Brain },
    { id: "programming", name: "Programmazione", icon: Code },
    { id: "fashion", name: "Fashion", icon: Shirt },
    { id: "health", name: "Salute", icon: Heart },
    { id: "gardening", name: "Giardinaggio", icon: Flower },
    { id: "languages", name: "Lingue", icon: Languages },
    { id: "videogames", name: "Videogiochi", icon: Gamepad2 },
    { id: "podcast", name: "Podcast", icon: Mic },
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
                                <span className={styles.skillIcon}>
                                  {skill.icon ? <skill.icon size={24} /> : "⚡"}
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
                  {selectedSkill.IconComponent ? (
                    <selectedSkill.IconComponent size={24} />
                  ) : (
                    "⚡"
                  )}
                  {/* <span>{selectedSkill.icon}</span> */}
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
                  {/* <span className={styles.summaryIcon}>
                    {selectedSkill.icon}
                  </span> */}
                  <span className={styles.summaryIcon}>
                    {selectedSkill.IconComponent && (
                      <selectedSkill.IconComponent size={24} />
                    )}
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
