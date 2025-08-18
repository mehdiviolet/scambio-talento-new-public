import React, { useEffect, useState } from "react";
import { Book, ChevronDown, Edit, Gem, Save, Trash2, X } from "lucide-react";
import styles from "./SkillsSection.module.css";
import { useAppSelector, useAppDispatch } from "./../hooks/redux";
import {
  removeUserSkill,
  selectCurrentUserProfile,
  selectCurrentUserSkills,
  updateUserSkill,
  addUserSkill,
} from "@/services/userService";
import AddSkillModal from "@/components/MainApp/Shared/Modals/AddSkillModal";

const SkillsSection = () => {
  const [editingSkill, setEditingSkill] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localExpandedSkillId, setLocalExpandedSkillId] = useState(null);

  const dispatch = useAppDispatch();

  // ✅ Leggi direttamente da Redux
  const skills = useAppSelector(selectCurrentUserSkills);
  const { isOwner } = useAppSelector((state) => state.onboarding);
  const currentProfile = useAppSelector(selectCurrentUserProfile);

  // Helper per verificare se una skill è espansa
  const isExpanded = (skill) => {
    const skillId = `skill-${skill.createdAt}-${skill.name}`;
    return localExpandedSkillId === skillId;
  };

  console.log(
    "📊 Onboarding skills:",
    useAppSelector((state) => state.onboarding.formData.skills)
  );
  console.log(
    "🎯 UserService skills:",
    useAppSelector(selectCurrentUserSkills)
  );

  // Gestione toggle espansione
  const handleSkillToggle = (skill) => {
    const skillId = `skill-${skill.createdAt}-${skill.name}`;
    setLocalExpandedSkillId(localExpandedSkillId === skillId ? null : skillId);
  };

  // Gestione editing inline
  const handleEditStart = (skill) => {
    console.log("✏️ Inizio editing per skill:", skill);
    setEditingSkill(skill);
    setEditedDescription(skill.description || "");
  };

  const handleEditCancel = () => {
    setEditingSkill(null);
    setEditedDescription("");
  };

  useEffect(() => {
    console.log(
      "🔍 DEBUG SkillsSection - Skills attuali:",
      skills.map((s) => ({
        id: s.id,
        name: s.name,
        createdAt: s.createdAt,
        description: s.description,
      }))
    );
  }, [skills]);

  const handleEditSave = () => {
    console.log("💾 Tentativo di salvare skill:", {
      skillId: editingSkill.id,
      skillCreatedAt: editingSkill.createdAt,
      newDescription: editedDescription,
    });

    if (editingSkill) {
      const updates = {
        description: editedDescription.trim(),
        updatedAt: new Date().toISOString(),
      };

      console.log("🚀 Dispatchando updateUserSkill con:", {
        userId: "currentUser",
        skillId: editingSkill.id,
        updates: updates,
      });

      dispatch(
        updateUserSkill({
          userId: "currentUser",
          skill: editingSkill,
          updates: updates,
        })
      );

      setEditingSkill(null);
      setEditedDescription("");
    }
    console.log("🔍 editingSkill stato:", editingSkill);
  };

  const handleDeleteClick = (skill, e) => {
    e?.stopPropagation();
    if (
      window.confirm(
        `Sei sicuro di voler eliminare la skill "${
          skill.detail || skill.name
        }"?`
      )
    ) {
      dispatch(removeUserSkill({ userId: "currentUser", skillId: skill.id }));
      console.log(
        "🗑️ Eliminando skill:",
        removeUserSkill({ userId: "currentUser", skillId: skill.id })
      );
    }
  };

  const handleAddSkill = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveNewSkill = (newSkill) => {
    dispatch(addUserSkill({ userId: "currentUser", skill: newSkill }));
    setIsAddModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Header - conditional add button for owner only */}
      <div className={styles.header}>
        <h2 className={styles.title}>Skills ({skills.length})</h2>
        {isOwner && (
          <button
            onClick={handleAddSkill}
            className={styles.addButton}
            title="Aggiungi nuova skill"
          >
            +
          </button>
        )}
      </div>

      {/* Content - same structure as ShareModal */}
      <div className={styles.content}>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => {
            const isSkillExpanded = isExpanded(skill);
            const isEditing =
              editingSkill && editingSkill.createdAt === skill.createdAt;

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
                    <span className={styles.skillIcon}>{skill.icon}</span>
                    <div className={styles.skillName}>
                      {skill.detail || skill.name}
                    </div>
                  </div>

                  <div className={styles.skillMeta}>
                    <span className={styles.skillGems}>
                      <Gem size={16} />
                      <span className={styles.gemsCount}>
                        {skill.gems || 0}
                      </span>
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
                    {/* Description Box - conditional editing for owner only */}
                    {isEditing && isOwner ? (
                      <div className={styles.editDescriptionContainer}>
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          rows={4}
                          className={styles.editDescriptionTextarea}
                          placeholder="Descrivi come hai ottenuto questo skill"
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
                                  title="Elimina esperienza"
                                >
                                  <Trash2 size={16} />
                                  <span>Elimina</span>
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
                          {skill.description ? (
                            skill.description
                          ) : isOwner ? (
                            <span className={styles.descriptionPlaceholder}>
                              Nessuna descrizione disponibile. Clicca per
                              aggiungerne una.
                            </span>
                          ) : (
                            <span className={styles.descriptionPlaceholder}>
                              Nessuna descrizione disponibile.
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* Divider - same as ShareModal */}
                    <div className={styles.divider}></div>

                    {/* Footer - same as ShareModal */}
                    <div className={styles.footer}>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                          {currentProfile?.profilePhoto ? (
                            <img
                              src={
                                currentProfile.profilePhoto instanceof File
                                  ? URL.createObjectURL(
                                      currentProfile.profilePhoto
                                    )
                                  : currentProfile.profilePhoto
                              }
                              alt={`${currentProfile?.firstName || "Sara"} ${
                                currentProfile?.lastName || "Dormand"
                              }`}
                            />
                          ) : (
                            <div className={styles.avatarEmoji}>👩‍🎨</div>
                          )}
                        </div>
                        <span className={styles.userName}>
                          {currentProfile?.firstName || "Sara"}{" "}
                          {currentProfile?.lastName || "Dormand"}
                        </span>
                      </div>

                      {/* <div className={styles.skillGemsDisplay}>
                        <span className={styles.gemsIcon}>⚡</span>
                        <span className={styles.gemsCount}>
                          {skill.gems || 0}
                        </span>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎯</div>
            <p className={styles.emptyTitle}>Nessuna skill aggiunta ancora</p>
            <p className={styles.emptyDescription}>
              Clicca il pulsante + per aggiungere la tua prima competenza
            </p>
          </div>
        )}
      </div>

      {/* Modal per aggiungere nuova skill */}
      <AddSkillModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewSkill}
        formData={{ skills }}
      />
    </div>
  );
};

export default SkillsSection;
