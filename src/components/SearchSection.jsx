import React, { useState } from "react";
import { ChevronDown, Edit, Trash2, X, Save } from "lucide-react";
import styles from "./SearchSection.module.css";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import AddWantedSkillModal from "./AddWantedSkillModal";
// ✅ IMPORTA LE ACTIONS REDUX
import {
  addWantedSkill,
  updateWantedSkillDescription,
  removeWantedSkill,
} from "../store/slices/onboardingSlice";

const SearchSection = () => {
  const [localExpandedSkillId, setLocalExpandedSkillId] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // ✅ NUOVO STATO

  const dispatch = useAppDispatch(); // ✅ AGGIUNTO DISPATCH

  // ✅ Leggi da onboarding formData
  const currentProfile = useAppSelector((state) => state.onboarding.formData);
  const { isOwner } = useAppSelector((state) => state.onboarding);

  // ✅ Skills data statici
  const skillsData = [
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

  // Ottieni le wantedSkills con i dati completi
  const selectedSkills =
    skillsData?.filter((skill) =>
      currentProfile?.wantedSkills?.find((s) => s.id === skill.id)
    ) || [];

  // Helper per verificare se una skill è espansa
  const isExpanded = (skill) => {
    const skillId = `wanted-skill-${skill.id}`;
    return localExpandedSkillId === skillId;
  };

  // Gestione toggle espansione
  const handleSkillToggle = (skill) => {
    const skillId = `wanted-skill-${skill.id}`;
    setLocalExpandedSkillId(localExpandedSkillId === skillId ? null : skillId);
  };

  // Gestione editing inline
  const handleEditStart = (skill) => {
    console.log("✏️ Inizio editing per wanted skill:", skill);
    setEditingSkill(skill);
    // Cerca la descrizione nel wantedSkills array
    const wantedSkill = currentProfile?.wantedSkills?.find(
      (s) => s.id === skill.id
    );
    setEditedDescription(wantedSkill?.description || "");
  };

  const handleEditCancel = () => {
    setEditingSkill(null);
    setEditedDescription("");
  };

  const handleEditSave = () => {
    console.log("💾 Salvando descrizione per wanted skill:", {
      skillId: editingSkill.id,
      newDescription: editedDescription,
    });

    // ✅ AGGIORNA REDUX
    dispatch(
      updateWantedSkillDescription({
        skillId: editingSkill.id,
        description: editedDescription,
      })
    );

    setEditingSkill(null);
    setEditedDescription("");
  };

  const handleDeleteClick = (skill, e) => {
    e?.stopPropagation();
    if (
      window.confirm(
        `Sei sicuro di voler rimuovere "${skill.name}" dalle skill che stai cercando?`
      )
    ) {
      console.log("🗑️ Rimuovendo wanted skill:", skill.id);
      // ✅ RIMUOVI DA REDUX
      dispatch(removeWantedSkill({ skillId: skill.id }));
    }
  };

  // ✅ NUOVE FUNZIONI PER IL MODAL
  const handleAddSkill = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveNewWantedSkill = (newWantedSkill) => {
    console.log("💾 Aggiungendo nuova wanted skill:", newWantedSkill);
    // ✅ AGGIUNGI A REDUX
    dispatch(addWantedSkill(newWantedSkill));
    setIsAddModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.searchIcon}>🎯</span>
          Alla Ricerca
        </h3>
        {isOwner && (
          <button
            onClick={handleAddSkill}
            className={styles.addButton}
            title="Aggiungi skill da cercare"
          >
            +
          </button>
        )}
      </div>

      <div className={styles.content}>
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill, index) => {
            const isSkillExpanded = isExpanded(skill);
            const isEditing = editingSkill && editingSkill.id === skill.id;
            const wantedSkill = currentProfile?.wantedSkills?.find(
              (s) => s.id === skill.id
            );

            return (
              <div
                key={`wanted-skill-${index}-${skill.id}`}
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
                    <div className={styles.skillName}>{skill.name}</div>
                  </div>

                  <div className={styles.skillMeta}>
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
                    {/* Description Box */}
                    {isEditing && isOwner ? (
                      <div className={styles.editDescriptionContainer}>
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          rows={4}
                          className={styles.editDescriptionTextarea}
                          placeholder="Perché vuoi imparare questa skill?"
                          autoFocus
                        />
                        <div className={styles.editActions}>
                          {/* Actions - only visible for owner */}
                          {isOwner && (
                            <div className={styles.actions}>
                              <div className={styles.actionButtons}>
                                <button
                                  className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                                  onClick={(e) => handleDeleteClick(skill, e)}
                                  title="Rimuovi dalla ricerca"
                                >
                                  <Trash2 size={16} />
                                  <span>Rimuovi</span>
                                </button>
                              </div>
                            </div>
                          )}
                          <button
                            onClick={handleEditCancel}
                            className={styles.editCancelButton}
                          >
                            <X size={14} />
                            Annulla
                          </button>
                          <button
                            onClick={handleEditSave}
                            disabled={!editedDescription.trim()}
                            className={styles.editSaveButton}
                          >
                            <Save size={14} />
                            Salva
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`${styles.descriptionBox} ${
                          isOwner ? styles.descriptionBoxHoverable : ""
                        }`}
                      >
                        <p
                          onClick={
                            isOwner ? () => handleEditStart(skill) : undefined
                          }
                          className={`${styles.descriptionText} ${
                            isOwner ? styles.descriptionClickable : ""
                          }`}
                          style={{ cursor: isOwner ? "pointer" : "default" }}
                        >
                          {wantedSkill?.description ? (
                            wantedSkill.description
                          ) : isOwner ? (
                            <span className={styles.descriptionPlaceholder}>
                              Nessuna descrizione. Clicca per aggiungere perché
                              vuoi imparare questa skill.
                            </span>
                          ) : (
                            <span className={styles.descriptionPlaceholder}>
                              Nessuna descrizione disponibile.
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎪</div>
            <p className={styles.emptyTitle}>Nessuna skill selezionata</p>
            <p className={styles.emptyDescription}>
              Seleziona le skill che stai cercando di imparare
            </p>
          </div>
        )}
      </div>

      {/* ✅ MODAL PER AGGIUNGERE WANTED SKILLS */}
      <AddWantedSkillModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewWantedSkill}
        currentWantedSkills={currentProfile?.wantedSkills || []}
      />
    </div>
  );
};

export default SearchSection;
