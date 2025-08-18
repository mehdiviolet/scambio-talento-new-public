import React, { useState, useEffect, useRef } from "react";
import { X, Edit3, Trash2, Save, ArrowLeft } from "lucide-react";

const ViewExperienceModal = ({
  isOpen,
  onClose,
  experience,
  onUpdate,
  onDelete,
  formData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    detail: "",
    description: "",
    config: {
      modalita: "online",
      lingua: "IT",
      partecipanti: "1",
      lezioni: "1",
      durata: "1",
      costo: "20",
    },
  });

  const detailInputRef = useRef(null);
  const descriptionRef = useRef(null);

  // Opzioni per i menu a tendina (stesse di AddExperience)
  const configOptions = {
    modalita: [
      { value: "online", label: "🌐 Online" },
      { value: "presenza", label: "🏢 In Presenza" },
    ],
    lingua: [
      { value: "IT", label: "🇮🇹 Italiano" },
      { value: "EN", label: "🇬🇧 English" },
      { value: "FR", label: "🇫🇷 Français" },
      { value: "DE", label: "🇩🇪 Deutsch" },
      { value: "ES", label: "🇪🇸 Español" },
    ],
    partecipanti: [
      { value: "1", label: "👤 1 Persona" },
      { value: "2", label: "👥 2 Persone" },
      { value: "3", label: "👥 3 Persone" },
      { value: "4", label: "👥 4 Persone" },
    ],
    lezioni: [
      { value: "1", label: "📚 1 Lezione" },
      { value: "2", label: "📚 2 Lezioni" },
      { value: "3", label: "📚 3 Lezioni" },
      { value: "4", label: "📚 4 Lezioni" },
    ],
    durata: [
      { value: "1", label: "⏰ 1 Ora" },
      { value: "2", label: "⏰ 2 Ore" },
      { value: "3", label: "⏰ 3 Ore" },
      { value: "4", label: "⏰ 4 Ore" },
    ],
    costo: [
      { value: "10", label: "💎 10 GEM" },
      { value: "20", label: "💎 20 GEM" },
      { value: "30", label: "💎 30 GEM" },
      { value: "40", label: "💎 40 GEM" },
      { value: "50", label: "💎 50 GEM" },
      { value: "60", label: "💎 60 GEM" },
      { value: "70", label: "💎 70 GEM" },
      { value: "80", label: "💎 80 GEM" },
      { value: "90", label: "💎 90 GEM" },
    ],
  };

  // Carica i dati dell'esperienza quando si apre
  useEffect(() => {
    if (isOpen && experience) {
      setEditedData({
        detail: experience.detail || "",
        description: experience.description || "",
        config: experience.config || {
          modalita: "online",
          lingua: "IT",
          partecipanti: "1",
          lezioni: "1",
          durata: "1",
          costo: "20",
        },
      });
      setIsEditing(false);
    }
  }, [isOpen, experience]);

  // Auto-focus quando entra in modalità editing
  useEffect(() => {
    if (isEditing && detailInputRef.current) {
      detailInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedExperience = {
      ...experience,
      ...editedData,
      gems: parseInt(editedData.config.costo),
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedExperience);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Ripristina i valori originali
    if (experience) {
      setEditedData({
        detail: experience.detail || "",
        description: experience.description || "",
        config: experience.config || {
          modalita: "online",
          lingua: "IT",
          partecipanti: "1",
          lezioni: "1",
          durata: "1",
          costo: "20",
        },
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare l'esperienza "${experience.detail}"?`
      )
    ) {
      onDelete(experience);
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfigChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value,
      },
    }));
  };

  const canSave = () => {
    return editedData.detail.trim() && editedData.description.trim();
  };

  const getModalityIcon = (modality) => {
    return modality === "online" ? "💻" : "🏢";
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      IT: "🇮🇹",
      EN: "🇬🇧",
      FR: "🇫🇷",
      DE: "🇩🇪",
      ES: "🇪🇸",
    };
    return flags[lang] || "🇮🇹";
  };

  if (!isOpen || !experience) return null;

  return (
    <div className="glass-overlay" onClick={handleOverlayClick}>
      <div className="glass-modal">
        {/* Header */}
        <div className="glass-header">
          <h2>{isEditing ? "✏️ Modifica Esperienza" : "📋 Esperienza"}</h2>
          <button onClick={onClose} className="glass-close-button">
            <X />
          </button>
        </div>

        <div className="glass-content">
          {!isEditing ? (
            /* === MODALITÀ VISUALIZZAZIONE - STILE CARD === */
            <div className="experience-card">
              {/* Header della card con titolo e icone */}
              <div className="experience-card-header">
                <div className="experience-title-section">
                  <h3 className="experience-main-title">{experience.detail}</h3>
                </div>
                <div className="experience-icons">
                  <div
                    className="experience-icon"
                    title={
                      experience.config?.modalita === "online"
                        ? "Online"
                        : "In presenza"
                    }
                  >
                    {getModalityIcon(experience.config?.modalita)}
                  </div>
                  <div
                    className="experience-icon"
                    title={`${experience.config?.partecipanti} partecipanti`}
                  >
                    👥
                  </div>
                  <div className="experience-icon" title="Lingua">
                    {getLanguageFlag(experience.config?.lingua)}
                  </div>
                  <div className="experience-icon" title="Profilo">
                    👤
                  </div>
                </div>
              </div>

              {/* Informazioni lezione */}
              <div className="experience-info-row">
                <span>
                  <strong>Lezioni:</strong> {experience.config?.lezioni}
                </span>
                <span>
                  <strong>Durata lezione:</strong> {experience.config?.durata}{" "}
                  ora
                </span>
                <span>
                  <strong>Costo:</strong> {experience.config?.costo} gem
                </span>
              </div>

              {/* Descrizione in box centrale */}
              <div className="experience-description-box">
                <p>{experience.description}</p>
              </div>

              {/* Avatars partecipanti */}
              <div className="experience-participants">
                <div className="participant-avatar">👨‍🎨</div>
                <div className="participant-avatar">👩‍🎨</div>
                <div className="participant-avatar">👨‍💼</div>
              </div>

              {/* Footer con creator info */}
              <div className="experience-card-footer">
                <div className="creator-section">
                  <div className="creator-avatar">
                    {formData?.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(formData.profilePhoto)}
                        alt="Profile"
                        className="creator-avatar-img"
                      />
                    ) : (
                      <span className="creator-avatar-emoji">👩‍🎨</span>
                    )}
                  </div>
                  <span className="creator-name">
                    {formData?.firstName || "Sara"}{" "}
                    {formData?.lastName || "Dormand"}
                  </span>
                </div>
                <div className="experience-gems">
                  <span className="gems-icon">💎</span>
                  <span className="gems-count">{experience.config?.costo}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="experience-actions">
                <button className="action-btn edit-btn" onClick={handleEdit}>
                  <Edit3 size={16} />
                  Modifica
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />
                  Elimina
                </button>
              </div>
            </div>
          ) : (
            /* === MODALITÀ EDITING === */
            <div className="glass-step-content">
              {/* Header skill */}
              <div className="glass-step-header">
                <div className="glass-icon-container">
                  <span>{experience.icon}</span>
                </div>
                <h3 className="glass-step-title">{experience.name}</h3>
              </div>

              {/* Form di modifica */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {/* Dettaglio */}
                <div className="form-group">
                  <label className="form-label">Dettaglio esperienza:</label>
                  <input
                    ref={detailInputRef}
                    type="text"
                    value={editedData.detail}
                    onChange={(e) =>
                      setEditedData((prev) => ({
                        ...prev,
                        detail: e.target.value,
                      }))
                    }
                    placeholder="es. Pittura / Acquerello"
                    className="form-input"
                  />
                </div>

                {/* Descrizione */}
                <div className="form-group">
                  <label className="form-label">Descrizione:</label>
                  <textarea
                    ref={descriptionRef}
                    value={editedData.description}
                    onChange={(e) =>
                      setEditedData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Descrivi la tua esperienza..."
                    rows={5}
                    className="form-textarea"
                  />
                </div>

                {/* Configurazione */}
                <h4
                  style={{
                    margin: "0.5rem 0 1rem 0",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "rgb(17, 24, 39)",
                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                  }}
                >
                  ⚙️ Configurazione Lezione
                </h4>

                <div className="form-grid">
                  {/* Modalità */}
                  <div className="form-group">
                    <label className="form-label">Modalità:</label>
                    <select
                      value={editedData.config.modalita}
                      onChange={(e) =>
                        handleConfigChange("modalita", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.modalita.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lingua */}
                  <div className="form-group">
                    <label className="form-label">Lingua:</label>
                    <select
                      value={editedData.config.lingua}
                      onChange={(e) =>
                        handleConfigChange("lingua", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.lingua.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Partecipanti */}
                  <div className="form-group">
                    <label className="form-label">N. Partecipanti:</label>
                    <select
                      value={editedData.config.partecipanti}
                      onChange={(e) =>
                        handleConfigChange("partecipanti", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.partecipanti.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lezioni */}
                  <div className="form-group">
                    <label className="form-label">Lezioni:</label>
                    <select
                      value={editedData.config.lezioni}
                      onChange={(e) =>
                        handleConfigChange("lezioni", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.lezioni.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Durata */}
                  <div className="form-group">
                    <label className="form-label">Durata:</label>
                    <select
                      value={editedData.config.durata}
                      onChange={(e) =>
                        handleConfigChange("durata", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.durata.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Costo */}
                  <div className="form-group">
                    <label className="form-label">Costo:</label>
                    <select
                      value={editedData.config.costo}
                      onChange={(e) =>
                        handleConfigChange("costo", e.target.value)
                      }
                      className="form-select"
                    >
                      {configOptions.costo.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bottoni azione */}
              <div className="form-buttons" style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={handleCancel}
                  className="button button-secondary"
                >
                  <ArrowLeft size={16} />
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  disabled={!canSave()}
                  className={`button ${
                    canSave() ? "button-primary" : "button-disabled"
                  }`}
                >
                  <Save size={16} />
                  Salva Modifiche
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Experience Card Styles */
        .experience-card {
          background: linear-gradient(135deg, #a7f3d0 0%, #86efac 100%);
          border-radius: 1.5rem;
          padding: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          max-height: 70vh;
          overflow-y: auto;
        }

        .experience-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .experience-title-section {
          flex: 1;
        }

        .experience-main-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          line-height: 1.2;
        }

        .experience-icons {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .experience-icon {
          width: 2rem;
          height: 2rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .experience-icon:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
        }

        .experience-info-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #374151;
          flex-wrap: wrap;
        }

        .experience-info-row span {
          background: rgba(255, 255, 255, 0.6);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .experience-description-box {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 1rem;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .experience-description-box p {
          margin: 0;
          color: #374151;
          line-height: 1.6;
          font-size: 0.875rem;
        }

        .experience-participants {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          justify-content: flex-end;
        }

        .participant-avatar {
          width: 2rem;
          height: 2rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          border: 2px solid rgba(255, 255, 255, 0.9);
        }

        .experience-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        .creator-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .creator-avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.9);
        }

        .creator-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .creator-avatar-emoji {
          font-size: 1.25rem;
        }

        .creator-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 0.875rem;
        }

        .experience-gems {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .gems-icon {
          font-size: 1rem;
        }

        .gems-count {
          font-weight: 700;
          color: #1f2937;
          font-size: 0.875rem;
        }

        .experience-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: rgba(59, 130, 246, 0.2);
          color: #1e40af;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.3);
          transform: translateY(-1px);
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.2);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-1px);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .experience-card-header {
            flex-direction: column;
            gap: 1rem;
          }

          .experience-icons {
            align-self: flex-start;
          }

          .experience-info-row {
            flex-direction: column;
            gap: 0.5rem;
          }

          .experience-card-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .experience-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewExperienceModal;
