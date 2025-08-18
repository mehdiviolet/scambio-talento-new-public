import React, { useState, useEffect } from "react";
import { X, Edit3, Trash2, Save } from "lucide-react";
import styles from "./ViewSkillModal.module.css";

const ViewSkillModal = ({
  isOpen,
  onClose,
  skill,
  onUpdate,
  onDelete,
  formData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // Carica i dati della skill quando si apre
  useEffect(() => {
    if (isOpen && skill) {
      setEditedDetail(skill.detail || skill.name);
      setEditedDescription(skill.description || "");
      setIsEditing(false);
    }
  }, [isOpen, skill]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedSkill = {
      ...skill,
      detail: editedDetail.trim(),
      description: editedDescription.trim(),
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedSkill);
    setIsEditing(false);
    onClose();
  };

  const handleCancel = () => {
    // Ripristina i valori originali
    setEditedDetail(skill.detail || skill.name);
    setEditedDescription(skill.description || "");
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare la skill "${
          skill.detail || skill.name
        }"?`
      )
    ) {
      onDelete(skill);
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (isEditing) {
        handleCancel();
      } else {
        onClose();
      }
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && isEditing) {
      if (editedDetail.trim() && editedDescription.trim()) {
        handleSave();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isEditing, editedDetail, editedDescription]);

  if (!isOpen || !skill) return null;

  const isFormValid = editedDetail.trim() && editedDescription.trim();

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-title"
    >
      <div className={styles.container}>
        {/* Header con titolo e close button */}
        <div className={styles.header}>
          <h3 id="skill-title" className={styles.title}>
            {editedDetail}
          </h3>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Chiudi modale"
          >
            <X />
          </button>
        </div>

        <div className={styles.content}>
          {/* Box descrizione */}
          <div className={styles.descriptionBox}>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={5}
                className={styles.editTextarea}
                placeholder="Descrivi la tua esperienza..."
                aria-label="Descrizione della skill"
                autoFocus
              />
            ) : (
              <p
                className={styles.descriptionText}
                onClick={handleEdit}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleEdit();
                  }
                }}
                aria-label="Clicca per modificare la descrizione"
              >
                {editedDescription || "Nessuna descrizione disponibile"}
              </p>
            )}
          </div>

          {/* Linea tratteggiata */}
          <div className={styles.divider}></div>

          {/* Footer con info utente */}
          <div className={styles.footer}>
            {/* Avatar e nome */}
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {formData?.profilePhoto ? (
                  <img
                    src={
                      formData.profilePhoto instanceof File
                        ? URL.createObjectURL(formData.profilePhoto)
                        : formData.profilePhoto
                    }
                    alt={`Foto profilo di ${formData?.firstName || "Sara"} ${
                      formData?.lastName || "Dormand"
                    }`}
                    className={styles.avatarImage}
                  />
                ) : (
                  <span
                    className={styles.avatarEmoji}
                    role="img"
                    aria-label="Avatar"
                  >
                    👩‍🎨
                  </span>
                )}
              </div>
              <span className={styles.userName}>
                {formData?.firstName || "Sara"}{" "}
                {formData?.lastName || "Dormand"}
              </span>
            </div>

            {/* GEM counter con icona */}
            <div className={styles.gems}>
              <div className={styles.gemsContent}>
                <span className={styles.gemsIcon} role="img" aria-label="Gems">
                  ⚡
                </span>
                <span className={styles.gemsCount}>{skill.gems || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottoni principali */}
        <div className={styles.actions}>
          {isEditing ? (
            /* Modalità editing */
            <div className={styles.editActions}>
              <button
                onClick={handleCancel}
                className={styles.cancelButton}
                aria-label="Annulla modifiche"
              >
                <X />
                <span>Annulla</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className={`${styles.saveButton} ${
                  isFormValid ? styles.enabled : styles.disabled
                }`}
                aria-label="Salva modifiche"
              >
                <Save />
                <span>Salva</span>
              </button>
            </div>
          ) : (
            /* Modalità visualizzazione */
            <div className={styles.viewActions}>
              <button
                onClick={handleEdit}
                className={styles.editButton}
                aria-label="Modifica skill"
              >
                <Edit3 />
                <span>Modifica</span>
              </button>
              <button
                onClick={handleDelete}
                className={styles.deleteButton}
                aria-label="Elimina skill"
              >
                <Trash2 />
                <span>Elimina</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSkillModal;
