import React, { useState } from "react";
import {
  ChevronDown,
  Edit,
  Trash2,
  X,
  Save,
  Gem,
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
import styles from "./SkillsSection.module.css";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import AddWantedSkillModal from "./AddWantedSkillModal";
// ✅ IMPORTA LE ACTIONS REDUX
import {
  addWantedSkill,
  updateWantedSkillDescription,
  removeWantedSkill,
} from "../store/slices/onboardingSlice";
import { HeaderAddButton } from "./ui/AddButtons";
import { Button } from "./ui/Button";
import { ButtonCancel, ButtonSave, ButtonTrash } from "./ui/ButtonActions";

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
    <>
      {/* ✅ MODAL PER AGGIUNGERE WANTED SKILLS */}
      <AddWantedSkillModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewWantedSkill}
        currentWantedSkills={currentProfile?.wantedSkills || []}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {/* <span className={styles.searchIcon}>🎯</span> */}
            Alla Ricerca
          </h3>
        </div>

        <div className={styles.content}>
          {isOwner && (
            // <button
            //   onClick={handleAddSkill}
            //   className={styles.addButton}
            //   title="Aggiungi skill da cercare"
            // >
            //   +
            // </button>
            <div className={styles.header}>
              <HeaderAddButton onClick={handleAddSkill} />
            </div>
          )}
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
                    {/* <div className={styles.skillInfo}>
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
                    */}
                    <div className={styles.skillInfo}>
                      <span className={styles.skillIcon}>
                        {skill.IconComponent ? (
                          <skill.IconComponent size={24} />
                        ) : skill.icon ? (
                          typeof skill.icon === "string" ? (
                            skill.icon
                          ) : (
                            <skill.icon size={24} />
                          )
                        ) : (
                          "⚡" // fallback
                        )}
                      </span>
                      <div className={styles.skillName}>
                        {skill.detail || skill.name}
                      </div>
                    </div>

                    <div className={styles.skillMeta}>
                      {/* <span className={styles.skillGems}>
                        <Gem size={20} />
                        <span className={styles.gemsCount}>
                          {skill.gems || 0}
                        </span>
                      </span> */}
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
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
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
                                  <ButtonTrash
                                    onClick={(e) => handleDeleteClick(skill, e)}
                                  />

                                  <ButtonCancel onClick={handleEditCancel} />

                                  <ButtonSave
                                    onClick={handleEditSave}
                                    disabled={!editedDescription.trim()}
                                    disabledMessage="Inserisci una descrizione"
                                  />
                                </div>
                              </div>
                            )}
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
                              wantedSkill?.description
                            ) : isOwner ? (
                              <span className={styles.descriptionPlaceholder}>
                                Clicca per aggiungere una descrizione.
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
                      {/* <div className={styles.divider}></div> */}

                      {/* Footer - same as ShareModal */}
                      {/* <div className={styles.footer}>
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
                                             <User2 />
                                           )}
                                         </div>
                                         <span className={styles.userName}>
                                           {currentProfile?.firstName || "Sara"}{" "}
                                           {currentProfile?.lastName || "Dormand"}
                                         </span>
                                       </div>
                                     </div> */}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // <div className={styles.emptyState}>
            //   <div className={styles.emptyIcon}>🎪</div>
            //   <p className={styles.emptyTitle}>Nessuna skill selezionata</p>
            //   <p className={styles.emptyDescription}>
            //     Seleziona le skill che stai cercando di imparare
            //   </p>
            // </div>
            <p>Nessuna skill selezionata </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchSection;
