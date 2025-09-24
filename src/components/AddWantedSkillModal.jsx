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
  ArrowUp,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import baseStyles from "../components/MainApp/Shared/Modals/AddSkillModal.module.css";
import extendedStyles from "./AddWantedSkillModal.module.css";
import IconButton from "./ui/IconButton";

const styles = { ...baseStyles, ...extendedStyles };

const AddWantedSkillModal = ({
  isOpen,
  onClose,
  onSave,
  currentWantedSkills = [],
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    { id: "programming", name: "Coding", icon: Code },
    { id: "fashion", name: "Fashion", icon: Shirt },
    { id: "health", name: "Salute", icon: Heart },
    { id: "gardening", name: "Giardinaggio", icon: Flower },
    { id: "languages", name: "Lingue", icon: Languages },
    { id: "videogames", name: "Videogiochi", icon: Gamepad2 },
    { id: "podcast", name: "Podcast", icon: Mic },
  ];

  // ✅ Filtra skills già aggiunte
  const getAvailableSkills = () => {
    const existingSkillIds = currentWantedSkills.map((skill) => skill.id);
    return allSkillsData.filter(
      (skill) => !existingSkillIds.includes(skill.id)
    );
  };

  const skillsData = getAvailableSkills();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedSkill(null);
      setDescription("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentStep === 2 && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [currentStep]);

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
      setCurrentStep(3);
    }
  };

  const handleFinalSubmit = () => {
    const newWantedSkill = {
      id: selectedSkill.id,
      name: selectedSkill.name,
      icon: selectedSkill.icon,
      description: description.trim(),
      addedAt: new Date().toISOString(),
    };

    console.log("💾 Salvando nuova wanted skill:", newWantedSkill);
    onSave(newWantedSkill);
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
          ? "Scegli una competenza"
          : "Tutte le skills aggiunte!";
      case 2:
        return "Descrivi la tua motivazione";
      case 3:
        return "Riassunto finale";
      default:
        return "";
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles.modalSkill}`}>
        <div className={styles.header}>
          <h2>{getStepTitle()}</h2>
          <IconButton icon={X} onClick={onClose} />
        </div>

        <div className={styles.content}>
          {/* STEP 1: Selezione Skill */}
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
                    <IconButton
                      icon={ArrowUp}
                      position="relative"
                      // className={styles.controlButton}
                      onClick={() => handleWheelSpin("up")}
                    />

                    <IconButton
                      icon={ArrowDown}
                      position="relative"
                      // className={styles.controlButton}
                      onClick={() => handleWheelSpin("down")}
                    />
                  </div>

                  <button
                    onClick={handleSkillSelect}
                    className={styles.primaryButton}
                  >
                    Seleziona {skillsData[selectedIndex]?.name}
                  </button>
                </>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🎯</div>
                  <h3 className={styles.emptyTitle}>Ottimo lavoro!</h3>
                  <p className={styles.emptyDescription}>
                    Hai già aggiunto tutte le competenze disponibili alla tua
                    lista dei desideri.
                  </p>
                  <button onClick={onClose} className={styles.primaryButton}>
                    Chiudi
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Descrizione */}
          {currentStep === 2 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span className={styles.skillIcon}>
                    {selectedSkill.icon ? (
                      <selectedSkill.icon size={24} />
                    ) : (
                      "⚡"
                    )}
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{selectedSkill.name}</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Perché vuoi imparare questa skill?</label>
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrivi perché ti interessa questa competenza..."
                  rows={5}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.secondaryButton}>
                  {/* <ArrowLeft size={16} /> Indietro */}
                  <ArrowLeft size={20} />
                </button>
                {/* <button
                  onClick={handleDescriptionSubmit}
                  className={styles.continueButton}
                >
                  Continua →
                </button> */}
                <button
                  onClick={handleDescriptionSubmit}
                  disabled={!description.trim()}
                  className={`${styles.continueButton} ${
                    description.trim() ? styles.enabled : styles.disabled
                  }`}
                >
                  <span>Continua</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Riassunto */}
          {currentStep === 3 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.summary}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryIcon}>
                    {selectedSkill.icon ? (
                      <selectedSkill.icon size={24} />
                    ) : (
                      "⚡"
                    )}
                  </span>
                  <h3>{selectedSkill.name}</h3>
                </div>

                {description.trim() && (
                  <div className={styles.summaryDescription}>
                    <p>{description}</p>
                  </div>
                )}
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.secondaryButton}>
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className={styles.primaryButton}
                >
                  Aggiungi alla Lista
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWantedSkillModal;
