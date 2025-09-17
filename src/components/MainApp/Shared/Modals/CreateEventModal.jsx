import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, Upload } from "lucide-react";
import styles from "./CreateEventModal.module.css";
import { Calendar, Clock, MapPin, Users, Globe, Languages } from "lucide-react";

const CreateEventModal = ({
  isOpen,
  onClose,
  onSave,
  editMode = false,
  initialData = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Categoria
  const [selectedCategory, setSelectedCategory] = useState("");

  // Step 2: Titolo e Descrizione
  const [eventTitle, setEventTitle] = useState("Board Game...");
  const [eventDescription, setEventDescription] = useState("");

  // Step 3: Data, Ora, Partecipanti
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  // Step 4: Luogo
  const [eventType, setEventType] = useState("presenza");
  const [onlineLink, setOnlineLink] = useState("");
  const [placeName, setPlaceName] = useState("Via Roma, 45");
  const [placeAddress, setPlaceAddress] = useState("");

  // Step 5: Lingua
  const [eventLanguage, setEventLanguage] = useState("italiano");
  const [customLanguage, setCustomLanguage] = useState("");

  // Step 6: Immagine
  const [coverImage, setCoverImage] = useState(null);

  // Step 7: Conferma
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [wantNotifications, setWantNotifications] = useState(true);

  const titleInputRef = useRef(null);
  const descriptionRef = useRef(null);

  // 6 categorie semplificate
  const categories = [
    "Hobby e passioni",
    "Sport e fitness",
    "Tecnologia",
    "Musica e Arte",
    "Lingua e identità",
    "Attività sociali",
  ];

  const languages = [
    { value: "italiano", label: "Italiano" },
    { value: "inglese", label: "Inglese" },
    { value: "misto", label: "Misto" },
    { value: "altro", label: "Altro" },
  ];

  // Genera orari slot 30min (8:00, 8:30, 9:00...)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 23) {
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editMode && initialData) {
        // Inizializza con dati esistenti - solo campi modificabili
        setMaxParticipants(initialData.maxParticipants || "");
        setEventDescription(initialData.description || "");
        setCurrentStep(7); // Va diretto al recap
      } else {
        resetForm();
        setCurrentStep(1);
      }
    }
  }, [isOpen, editMode, initialData]);

  // Focus management
  useEffect(() => {
    if (currentStep === 2 && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [currentStep]);

  // const resetForm = () => {
  //   setSelectedCategory("");
  //   setEventTitle("");
  //   setEventDescription("");
  //   setStartDate("");
  //   setStartTime("");
  //   setEndTime("");
  //   setMaxParticipants("");
  //   setEventType("presenza");
  //   setOnlineLink("");
  //   setPlaceName("");
  //   setPlaceAddress("");
  //   setEventLanguage("italiano");
  //   setCustomLanguage("");
  //   setCoverImage(null);
  //   setAcceptTerms(false);
  //   setWantNotifications(true);
  // };

  const resetForm = () => {
    // Valori per demo/presentazione
    setSelectedCategory("Hobby e passioni");
    setEventTitle("Boardgame Night a San Salvario");
    setEventDescription(
      "Una serata speciale tutta dedicata ai giochi da tavolo, pensata sia per gli appassionati che per chi vuole scoprire questo mondo per la prima volta! Ci ritroveremo per condividere il piacere di giocare insieme, tra risate, strategia e un po’ di sana competizione amichevole. Metteremo sul tavolo alcuni titoli che sono ormai dei veri e propri classici moderni, come Azul e Splendor, perfetti per chi ama sfide rapide e avvincenti, ma ci sarà spazio anche per altri giochi che sapranno sorprendere con meccaniche diverse e atmosfere coinvolgenti. Sarà l’occasione ideale per imparare nuove regole, sperimentare strategie originali e passare qualche ora in buona compagnia, lasciandosi catturare dal fascino di tessere colorate, gemme scintillanti e mondi da esplorare."
    );
    setStartDate("2025-10-20");
    setStartTime("19:30");
    setEndTime("22:00");
    setMaxParticipants("8");
    setEventType("presenza");
    setOnlineLink("");
    setPlaceName("Café Central");
    setPlaceAddress("Via Roma 45");
    setEventLanguage("italiano");
    setCustomLanguage("");
    setCoverImage(null);
    setAcceptTerms(false);
    setWantNotifications(true);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== "";
      case 2:
        return eventTitle.trim() !== "" && eventDescription.trim() !== "";
      case 3:
        // Validazione orari: fine deve essere dopo inizio
        if (startDate === "" || startTime === "" || endTime === "")
          return false;
        if (startTime >= endTime) return false;
        return true;
      case 4:
        if (eventType === "online") {
          return onlineLink.trim() !== "";
        }
        return placeName.trim() !== "" && placeAddress.trim() !== "";
      case 5:
        if (eventLanguage === "altro") {
          return customLanguage.trim() !== "";
        }
        return true;
      case 6:
        return true; // Immagine opzionale
      case 7:
        return acceptTerms;
      default:
        return true;
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleFinalSubmit = () => {
    if (editMode && initialData) {
      // Solo i campi modificabili
      const updates = {
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
        description: eventDescription.trim(),
        updatedAt: new Date().toISOString(),
      };
      onSave(updates);
    } else {
      // Creazione completa
      const eventData = {
        // Step 1
        category: selectedCategory.substring(2), // Rimuove emoji

        // Step 2
        title: eventTitle.trim(),
        description: eventDescription.trim(),

        // Step 3
        startDate,
        startTime,
        endTime,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,

        // Step 4
        type: eventType,
        onlineLink: eventType === "online" ? onlineLink.trim() : null,
        placeName: eventType === "presenza" ? placeName.trim() : null,
        placeAddress: eventType === "presenza" ? placeAddress.trim() : null,

        // Step 5
        language:
          eventLanguage === "altro" ? customLanguage.trim() : eventLanguage,

        // Step 6
        coverImage,

        // Step 7
        wantNotifications,

        // Meta
        createdAt: new Date().toISOString(),
      };

      onSave(eventData);
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    const prefix = editMode ? "MODIFICA EVENTO" : "CREA EVENTO";

    if (editMode) {
      return "📝 Modifica evento";
    }

    switch (currentStep) {
      case 1:
        return `Categoria`;
      // return `${prefix} - Categoria`;
      case 2:
        return `Titolo e Descrizione`;
      // return `${prefix} - Titolo e Descrizione`;
      case 3:
        return `Data, Ora, Partecipanti`;
      // return `${prefix} - Data, Ora, Partecipanti`;
      case 4:
        return `Luogo dell'evento`;
      // return `${prefix} - Luogo dell'evento`;
      case 5:
        return `Lingua`;
      // return `${prefix} - Lingua`;
      case 6:
        return `Immagine`;
      // return `${prefix} - Immagine`;
      case 7:
        return "✅ Conferma evento";
      // return "✅ Conferma evento";
      default:
        return "";
    }
  };

  const isNextDisabled = () => {
    return !validateCurrentStep();
  };

  const getProgressWidth = () => {
    const totalSteps = editMode ? 1 : 7;
    const progress = editMode ? 1 : currentStep;
    return `${(progress / totalSteps) * 100}%`;
  };

  // Se in edit mode, mostra solo i campi modificabili
  if (editMode && initialData) {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3>{getStepTitle()}</h3>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: getProgressWidth() }}
              />
            </div>
            <button onClick={onClose} className={styles.closeButton}>
              <X />
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>✏️</span>
                </div>
                <h3 className={styles.stepTitle}>
                  Modifica evento: {initialData.title}
                </h3>
              </div>

              <div className={styles.formGroup}>
                <label>Descrizione *</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Descrizione dell'evento..."
                  rows={4}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Numero massimo partecipanti</label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="Lascia vuoto per illimitato"
                  min="1"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>☑️ Confermo le modifiche</span>
                </label>
              </div>

              <div className={styles.controls}>
                <button onClick={onClose} className={styles.controlButton}>
                  Annulla
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!acceptTerms || !eventDescription.trim()}
                  className={`${styles.createButton} ${
                    acceptTerms && eventDescription.trim()
                      ? styles.enabled
                      : styles.disabled
                  }`}
                >
                  💾 Salva Modifiche
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{getStepTitle()}</h3>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: getProgressWidth() }}
            />
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X />
          </button>
        </div>

        <div className={styles.content}>
          {/* Step 1: Categoria */}
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>🪄</span>
                </div>
                <h3 className={styles.stepTitle}>Scegli la Categoria</h3>
              </div>

              <div className={styles.categoryGrid}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category ? styles.selected : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className={styles.controls}>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Titolo e Descrizione */}
          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>✍️</span>
                </div>
                <h3 className={styles.stepTitle}>Titolo e Descrizione</h3>
              </div>

              {/* <div className={styles.formGroup}>
                <label>Titolo dell'evento *</label>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder='Es: "Boardgame Night a San Salvario"'
                  className={styles.input}
                />
              </div> */}

              <div className={styles.formGroup}>
                <label>Titolo dell'evento *</label>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={eventTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 30) {
                      setEventTitle(value);
                    }
                  }}
                  placeholder='Es: "Boardgame Night a San Salvario"'
                  className={styles.input}
                />
                <small className={styles.charCounter}>
                  {eventTitle.length}/30 caratteri
                </small>
              </div>

              <div className={styles.formGroup}>
                <label>Descrizione *</label>
                <textarea
                  ref={descriptionRef}
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Spiega cosa farete, per chi è, cosa portare o aspettarsi..."
                  rows={4}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Data, Ora, Partecipanti */}
          {currentStep === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>📅</span>
                </div>
                <h3 className={styles.stepTitle}>Data, Ora, Partecipanti</h3>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Data inizio *</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={getTodayDate()}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Ora inizio *</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={styles.input}
                  >
                    <option value="">Seleziona orario</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Ora fine *</label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={styles.input}
                  >
                    <option value="">Seleziona orario</option>
                    {timeSlots.map((time) => (
                      <option
                        key={time}
                        value={time}
                        disabled={startTime && time <= startTime}
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                  {startTime && endTime && startTime >= endTime && (
                    <small className={styles.errorText}>
                      L'orario di fine deve essere dopo l'orario di inizio
                    </small>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label>Max partecipanti</label>
                  <input
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    placeholder="Illimitato"
                    min="1"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Luogo */}
          {currentStep === 4 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>📍</span>
                </div>
                <h3 className={styles.stepTitle}>Luogo dell'evento</h3>
              </div>

              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="eventType"
                    value="presenza"
                    checked={eventType === "presenza"}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                  <span> In presenza</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="eventType"
                    value="online"
                    checked={eventType === "online"}
                    onChange={(e) => setEventType(e.target.value)}
                  />
                  <span> Online</span>
                </label>
              </div>

              {eventType === "online" ? (
                <div className={styles.formGroup}>
                  <label>Link dell'evento *</label>
                  <input
                    type="url"
                    value={onlineLink}
                    onChange={(e) => setOnlineLink(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className={styles.input}
                  />
                </div>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label>Nome luogo *</label>
                    <input
                      type="text"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      placeholder="Es: Café Central"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Indirizzo *</label>
                    <input
                      type="text"
                      value={placeAddress}
                      onChange={(e) => setPlaceAddress(e.target.value)}
                      placeholder="Via Roma 123, Torino"
                      className={styles.input}
                    />
                  </div>
                </>
              )}

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Lingua */}
          {currentStep === 5 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>🗣️</span>
                </div>
                <h3 className={styles.stepTitle}>Lingua</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Lingua principale dell'evento *</label>
                <div className={styles.radioGroup}>
                  {languages.map((lang) => (
                    <label key={lang.value} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="language"
                        value={lang.value}
                        checked={eventLanguage === lang.value}
                        onChange={(e) => setEventLanguage(e.target.value)}
                      />
                      <span>{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {eventLanguage === "altro" && (
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    placeholder="Specifica la lingua..."
                    className={styles.input}
                  />
                </div>
              )}

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Immagine */}
          {currentStep === 6 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>📸</span>
                </div>
                <h3 className={styles.stepTitle}>Immagine copertina</h3>
              </div>

              <div className={styles.formGroup}>
                <label>Carica immagine copertina (facoltativo)</label>
                <div className={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="coverImage"
                    className={styles.fileInput}
                  />
                  <label htmlFor="coverImage" className={styles.fileLabel}>
                    <Upload size={20} />
                    {coverImage ? coverImage.name : "Scegli immagine"}
                  </label>
                </div>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className={`${styles.continueButton} ${
                    isNextDisabled() ? styles.disabled : styles.enabled
                  }`}
                >
                  Avanti →
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Conferma */}
          {currentStep === 7 && (
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <div className={styles.iconContainer}>
                  <span>✅</span>
                </div>
                <h3 className={styles.stepTitle}>Conferma evento</h3>
              </div>

              <div className={styles.previewCard}>
                <div className={styles.previewPadding}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewIconContainer}>
                      <span className={styles.previewIconLarge}>🎉</span>
                    </div>
                    <div>
                      <h4 className={styles.previewTitle}>{eventTitle}</h4>
                      <p className={styles.previewDescription}>
                        {eventDescription.substring(0, 60)}...
                      </p>
                    </div>
                  </div>

                  <div className={styles.eventSummary}>
                    <div className={styles.eventSummaryCategory}>
                      <strong>Categoria:</strong>
                      <br />
                      {selectedCategory}
                    </div>
                    <div className={styles.eventSummaryData}>
                      <strong>Data:</strong>
                      <br />
                      {startDate} {startTime}-{endTime}
                    </div>
                    <div className={styles.eventSummaryPArtecipanti}>
                      <strong>Partecipanti:</strong>
                      <br />
                      {maxParticipants || "Illimitato"}
                    </div>
                    <div>
                      <strong>Tipo:</strong>
                      <br />
                      {eventType === "presenza" ? "In presenza" : "Online"}
                    </div>
                    <div>
                      <strong>Lingua:</strong>
                      <br />
                      {eventLanguage === "altro"
                        ? customLanguage
                        : eventLanguage}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>☑️ Accetto i termini e condizioni</span>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={wantNotifications}
                    onChange={(e) => setWantNotifications(e.target.checked)}
                  />
                  <span>🔔 Voglio ricevere notifiche per le iscrizioni</span>
                </label>
              </div>

              <div className={styles.controls}>
                <button onClick={handleBack} className={styles.controlButton}>
                  <ArrowLeft size={16} /> Indietro
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!acceptTerms}
                  className={`${styles.createButton} ${
                    acceptTerms ? styles.enabled : styles.disabled
                  }`}
                >
                  🎉 Pubblica evento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
