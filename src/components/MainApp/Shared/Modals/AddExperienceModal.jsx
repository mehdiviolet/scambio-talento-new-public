import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft } from "lucide-react";
import styles from "./AddExperienceModal.module.css";
import { Globe, Building, Users, BookOpen, Clock, Gem } from "lucide-react";

const AddExperienceModal = ({
  isOpen,
  onClose,
  onSave,
  formData,
  userSkills: skills,
  editMode = false,
  initialData = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillDetail, setSkillDetail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const MAX_DESCRIPTION_CHARS = 150;
  const descriptionText = description || "Nessuna descrizione disponibile";
  const needsTruncation = descriptionText.length > MAX_DESCRIPTION_CHARS;
  const visibleText =
    showFullDescription || !needsTruncation
      ? description
      : description.substring(0, MAX_DESCRIPTION_CHARS) + "...";

  const [lessonConfig, setLessonConfig] = useState({
    modalita: "online",
    lingua: "IT",
    partecipanti: "1",
    lezioni: "1",
    durata: "1",
    costo: "20",
  });

  const detailInputRef = useRef(null);
  const descriptionRef = useRef(null);

  // const skillSuggestions = {
  //   writing: ["Creativa", "Tecnica", "Giornalistica"],
  //   cooking: ["Italiana", "Internazionale", "Dolci"],
  //   photography: ["Ritratti", "Paesaggi", "Eventi"],
  //   history: ["Antica", "Moderna", "Locale"],
  //   music: ["Chitarra", "Pianoforte", "Canto"],
  //   dance: ["Reggaetón", "Classica", "Moderna"],
  //   painting: ["Acquerello", "Olio", "Digitale"],
  //   video: ["Editing", "Riprese", "Animazione"],
  //   programming: ["Web", "Mobile", "AI"],
  // };

  const skillSuggestions = {
    writing: ["Creativa", "Tecnica", "Giornalistica"],
    cooking: ["Italiana", "Internazionale", "Dolci"],
    photography: ["Ritratti", "Paesaggi", "Eventi"],
    history: ["Antica", "Moderna", "Locale"],
    music: ["Chitarra", "Pianoforte", "Canto"],
    dance: ["Reggaetón", "Classica", "Moderna"],
    painting: ["Acquerello", "Olio", "Digitale"],
    video: ["Editing", "Riprese", "Animazione"],
    programming: ["Web", "Mobile", "AI"],
    architecture: ["Sostenibile", "Storica", "Moderna"],
    graphics: ["Branding", "UI/UX", "3D"],
    theater: ["Recitazione", "Regia", "Scenografia"],
    psychology: ["Cognitiva", "Clinica", "Sociale"],
    fashion: ["Stilismo", "Moda Etica", "Accessori"],
    health: ["Fitness", "Nutrizione", "Benessere mentale"],
    gardening: ["Orto", "Fiori", "Permacultura"],
    languages: ["Inglese", "Spagnolo", "Cinese"],
    videogames: ["Game Design", "Gameplay", "eSport"],
    podcast: ["Interviste", "Storytelling", "Tecnica audio"],
  };

  const configOptions = {
    modalita: [
      { value: "online", label: "Online", icon: Globe },
      { value: "presenza", label: "In Presenza", icon: Building },
    ],
    lingua: [
      { value: "IT", label: "Italiano" },
      { value: "EN", label: "English" },
      { value: "FR", label: "Français" },
      { value: "DE", label: "Deutsch" },
      { value: "ES", label: "Español" },
    ],
    // partecipanti: [
    //   { value: "1", label: "1 Persona", icon: Users },
    //   { value: "2", label: "2 Persone", icon: Users },
    //   { value: "3", label: "3 Persone", icon: Users },
    //   { value: "4", label: "4 Persone", icon: Users },
    // ],
    lezioni: [
      { value: "1", label: "1 Lezione", icon: BookOpen },
      { value: "2", label: "2 Lezioni", icon: BookOpen },
      { value: "3", label: "3 Lezioni", icon: BookOpen },
      { value: "4", label: "4 Lezioni", icon: BookOpen },
    ],
    durata: [
      { value: "1", label: "1 Ora", icon: Clock },
      { value: "2", label: "2 Ore", icon: Clock },
      { value: "3", label: "3 Ore", icon: Clock },
      { value: "4", label: "4 Ore", icon: Clock },
    ],
    costo: [
      { value: "10", label: "10 XP", icon: Gem },
      { value: "20", label: "20 XP", icon: Gem },
      { value: "30", label: "30 XP", icon: Gem },
      { value: "40", label: "40 XP", icon: Gem },
      { value: "50", label: "50 XP", icon: Gem },
      { value: "60", label: "60 XP", icon: Gem },
      { value: "70", label: "70 XP", icon: Gem },
      { value: "80", label: "80 XP", icon: Gem },
      { value: "90", label: "90 XP", icon: Gem },
    ],
  };

  const extractDurata = (durataLezione) => {
    if (!durataLezione) return "1";
    const match = durataLezione.match(/(\d+)/);
    return match ? match[1] : "1";
  };

  const initializeEditData = () => {
    if (!editMode || !initialData) return;

    console.log("🔧 Inizializzando dati per edit:", initialData);

    const skillIndex = skills.findIndex(
      (skill) =>
        skill.id === initialData.skillId ||
        skill.name === initialData.skillName ||
        skill.detail === initialData.skillDetail
    );

    if (skillIndex !== -1) {
      setSelectedIndex(skillIndex);
      setSelectedSkill(skills[skillIndex]);
    }

    setSkillDetail(initialData.title || initialData.skillDetail || "");
    setDescription(initialData.descrizione || "");

    setLessonConfig({
      modalita: initialData.modalita || "online",
      lingua: initialData.lingua || "IT",
      // partecipanti: initialData.partecipanti?.toString() || "1",
      lezioni: initialData.lezioni?.toString() || "1",
      durata: extractDurata(initialData.durataLezione) || "1",
      costo: initialData.costo?.toString() || "20",
    });

    setCurrentStep(5);
  };

  useEffect(() => {
    if (isOpen) {
      if (editMode && initialData) {
        initializeEditData();
      } else {
        setCurrentStep(1);
        setSelectedSkill(null);
        setSkillDetail("");
        setDescription("");
        setSelectedIndex(0);
        setLessonConfig({
          modalita: "online",
          lingua: "IT",
          partecipanti: "1",
          lezioni: "1",
          durata: "1",
          costo: "20",
        });
      }
    }
  }, [isOpen, editMode, initialData]);

  useEffect(() => {
    if (currentStep === 2 && detailInputRef.current) {
      detailInputRef.current.focus();
    }
    if (currentStep === 3 && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [currentStep]);

  const handleWheelSpin = (direction) => {
    const itemsCount = skills.length;
    let newIndex;
    if (direction === "up") {
      newIndex = selectedIndex > 0 ? selectedIndex - 1 : itemsCount - 1;
    } else {
      newIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0;
    }
    setSelectedIndex(newIndex);
  };

  const handleSkillSelect = () => {
    const skill = skills[selectedIndex];
    setSelectedSkill(skill);
    setSkillDetail(skill.name + " / ");
    setCurrentStep(2);
  };

  const handleDetailSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (skillDetail.trim()) {
        setCurrentStep(3);
      }
    }
  };

  const handleDescriptionSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (description.trim()) {
        setCurrentStep(4);
      }
    }
  };

  const handleConfigSubmit = () => {
    setCurrentStep(5);
  };

  const handleFinalSubmit = () => {
    const skillData = {
      id: selectedSkill.id,
      name: selectedSkill.name,
      icon: selectedSkill.icon,
      detail: skillDetail.trim(),
      description: description.trim(),
      config: lessonConfig,
      gems: parseInt(lessonConfig.costo),
      createdAt: editMode ? initialData.createdAt : new Date().toISOString(),
    };

    if (editMode && initialData) {
      skillData.experienceId = initialData.id;
      skillData.updatedAt = new Date().toISOString();
    }

    onSave(skillData);
    onClose();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfigChange = (field, value) => {
    setLessonConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCurrentSuggestions = () => {
    if (!selectedSkill) return [];
    return skillSuggestions[selectedSkill.id] || [];
  };

  if (!skills || skills.length === 0) {
    return null;
  }

  if (!isOpen) return null;

  const getStepTitle = () => {
    const prefix = editMode ? "MODIFICA" : " CREA";

    switch (currentStep) {
      case 1:
        return `${prefix} - Scegli un skill`;
      case 2:
        return `${prefix} - Dettaglio`;
      case 3:
        return `${prefix} - descrizione`;
      case 4:
        return `${prefix} - configurazione`;
      case 5:
        return editMode ? "Rivedi" : "Riepilogo";
      default:
        return "";
    }
  };

  const getFinalButtonText = () => {
    return editMode ? " Salva Modifiche" : " Crea Skill Card";
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{getStepTitle()}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X />
          </button>
        </div>

        <div className={styles.content}>
          {currentStep === 1 && (
            <div className={styles.centerAlign}>
              <div className={styles.wheelContainer}>
                <div className={styles.selectionHighlight}></div>

                <div className={styles.scrollContainer}>
                  <div
                    className={styles.scrollContent}
                    style={{
                      transform: `translateY(${-selectedIndex * 64}px)`,
                    }}
                  >
                    {skills.map((skill, index) => {
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
                Seleziona {skills[selectedIndex]?.name}
              </button>
            </div>
          )}

          {currentStep === 2 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>{selectedSkill.icon}</span>
                </div>
                <h3 className={styles.stepTitle}>{selectedSkill.name}</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Specifica il dettaglio:</label>
                <input
                  ref={detailInputRef}
                  type="text"
                  value={skillDetail}
                  onChange={(e) => setSkillDetail(e.target.value)}
                  onKeyPress={handleDetailSubmit}
                  placeholder={`es. ${selectedSkill.name} / ${
                    getCurrentSuggestions()[0] || "Dettaglio"
                  }`}
                  className={styles.input}
                />
              </div>

              <div className={styles.suggestions}>
                {getCurrentSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSkillDetail(`${selectedSkill.name} / ${suggestion}`)
                    }
                    className={styles.suggestionButton}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleDetailSubmit}
                  disabled={!skillDetail.trim()}
                  className={`${styles.continueButton} ${
                    skillDetail.trim() ? styles.enabled : styles.disabled
                  }`}
                >
                  Continua →
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>{selectedSkill.icon}</span>
                </div>
                <h3 className={styles.stepTitle}>{skillDetail}</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Descrivi la tua esperienza:</label>
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Racconta in cosa consiste la tua esperienza, cosa insegni e perché è utile per chi ti segue...."
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

          {currentStep === 4 && selectedSkill && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>⚙️</span>
                </div>
                <h3 className={styles.stepTitle}>Configura la lezione</h3>
              </div>

              <div className={styles.configGrid}>
                <div className={styles.formGroup}>
                  <label>Modalità:</label>
                  <select
                    value={lessonConfig.modalita}
                    onChange={(e) =>
                      handleConfigChange("modalita", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.modalita.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Lingua:</label>
                  <select
                    value={lessonConfig.lingua}
                    onChange={(e) =>
                      handleConfigChange("lingua", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.lingua.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className={styles.formGroup}>
                  <label>N. Partecipanti:</label>
                  <select
                    value={lessonConfig.partecipanti}
                    onChange={(e) =>
                      handleConfigChange("partecipanti", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.partecipanti.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div className={styles.formGroup}>
                  <label>Lezioni:</label>
                  <select
                    value={lessonConfig.lezioni}
                    onChange={(e) =>
                      handleConfigChange("lezioni", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.lezioni.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Durata:</label>
                  <select
                    value={lessonConfig.durata}
                    onChange={(e) =>
                      handleConfigChange("durata", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.durata.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Costo:</label>
                  <select
                    value={lessonConfig.costo}
                    onChange={(e) =>
                      handleConfigChange("costo", e.target.value)
                    }
                    className={styles.input}
                  >
                    {configOptions.costo.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleConfigSubmit}
                  className={`${styles.continueButton} ${styles.enabled}`}
                >
                  Continua →
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && selectedSkill && (
            <div className={styles.stepContent}>
              {editMode && (
                <div className={styles.editNavigation}>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className={styles.navButton}
                  >
                    ⚙️ Config
                  </button>
                  <div className={styles.navButtons}>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className={styles.navButton}
                    >
                      Skill
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className={styles.navButton}
                    >
                      Dettaglio
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className={styles.navButton}
                    >
                      Descrizione
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.previewCard}>
                <div className={styles.previewPadding}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewIconContainer}>
                      <span className={styles.previewIconLarge}>
                        {selectedSkill.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className={styles.previewTitle}>{skillDetail}</h4>
                      {/* <p className={styles.previewDescription}>
                        {description.substring(0, 30)}...
                      </p> */}
                      <div className={styles.descriptionContainer}>
                        <p className={styles.aboutText}>{visibleText}</p>
                        {needsTruncation && (
                          <button
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                            className={styles.expandTextButton}
                          >
                            {showFullDescription ? "Riduci" : "Leggi tutto"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.configSummary}>
                    <div>
                      <strong>Modalità:</strong>
                      <br />
                      {
                        configOptions.modalita.find(
                          (opt) => opt.value === lessonConfig.modalita
                        )?.label
                      }
                    </div>
                    <div>
                      <strong>Lingua:</strong>
                      <br />
                      {
                        configOptions.lingua.find(
                          (opt) => opt.value === lessonConfig.lingua
                        )?.label
                      }
                    </div>
                    {/* <div>
                      <strong>Partecipanti:</strong>
                      <br />
                      {
                        configOptions.partecipanti.find(
                          (opt) => opt.value === lessonConfig.partecipanti
                        )?.label
                      }
                    </div> */}
                    <div>
                      <strong>Lezioni:</strong>
                      <br />
                      {
                        configOptions.lezioni.find(
                          (opt) => opt.value === lessonConfig.lezioni
                        )?.label
                      }
                    </div>
                    <div>
                      <strong>Durata:</strong>
                      <br />
                      {
                        configOptions.durata.find(
                          (opt) => opt.value === lessonConfig.durata
                        )?.label
                      }
                    </div>
                    <div>
                      <strong>Costo:</strong>
                      <br />
                      <span className={styles.costHighlight}>
                        {
                          configOptions.costo.find(
                            (opt) => opt.value === lessonConfig.costo
                          )?.label
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className={`${styles.createButton} ${styles.enabled}`}
                >
                  {getFinalButtonText()}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExperienceModal;
