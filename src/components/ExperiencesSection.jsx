import React, { useState } from "react";
import TestCard from "./MainApp/Shared/Modals/TestCard";
import styles from "./ExperiencesSection.module.css";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import CompletionCardsTest from "./CompletionCardsTest";
import { useSelector } from "react-redux";
import {
  selectCurrentUserSkills,
  selectCurrentUserProfile,
} from "@/services/userService";
import { useExperiences } from "../hooks/useExperiences";
import AddExperienceModal from "@/components/MainApp/Shared/Modals/AddExperienceModal";
import ExperiencesSectionStudente from "./ExperiencesSectionStudente";
import { useStatusFilter } from "./useStatusFilter";
import StatusFilterButtons from "./StatusFilterButtons";
import { HeaderAddButton } from "./ui/AddButtons";
import { DropdownFilters } from "./ui/SmartFilters";

const ExperiencesSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useAppDispatch();

  // ✅ Leggi direttamente da Redux
  const skills = useAppSelector(selectCurrentUserSkills);
  const currentProfile = useAppSelector(selectCurrentUserProfile);
  const { isOwner } = useAppSelector((state) => state.onboarding);

  // ✅ Hook per gestire experiences
  const { experiences, addExperience, removeExperience, updateExperience } =
    useExperiences();

  const userCompletionCards = useSelector((state) => {
    const userId = state.experienceSliceTest.currentUserId;
    return state.experienceSliceTest.completedCourses[userId] || [];
  });

  // ✅ HELPER: Trova la skill associata all'esperienza per ottenere i gem corretti
  const findSkillForExperience = (experience) => {
    if (!skills || skills.length === 0) return null;

    // Cerca la skill usando diversi criteri di matching
    const associatedSkill = skills.find(
      (skill) =>
        skill.id === experience.skillId ||
        skill.name === experience.skillName ||
        skill.detail === experience.skillDetail
    );

    if (associatedSkill) {
      console.log(
        `✅ Skill trovata per esperienza "${experience.title}":`,
        associatedSkill
      );
      return associatedSkill;
    }

    console.warn(`⚠️ Skill non trovata per esperienza "${experience.title}"`);
    return null;
  };

  // ✅ HELPER: Ottiene la foto profilo dell'owner
  const getOwnerPhoto = () => {
    const photo = currentProfile?.profilePhoto;

    if (!photo) return null;

    // Se è già un URL string, usalo direttamente
    if (typeof photo === "string") {
      return photo;
    }

    // Se è un File object, convertilo
    if (photo instanceof File) {
      try {
        return URL.createObjectURL(photo);
      } catch (error) {
        console.warn("Errore nella conversione foto profilo:", error);
        return null;
      }
    }

    return null;
  };

  // ✅ Gestori per modal e azioni
  const handleAddExperience = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveExperience = (newExperience) => {
    console.log("💾 Salvando nuova esperienza:", newExperience);
    addExperience(newExperience);
    setIsAddModalOpen(false);
  };

  const handleEditExperience = (experience) => {
    setExperienceToEdit(experience);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setExperienceToEdit(null);
  };

  const handleSaveEditedExperience = (updatedExperienceData) => {
    console.log("💾 Salvando modifiche esperienza:", updatedExperienceData);

    const updatedExperience = {
      title: updatedExperienceData.detail,
      lezioni: parseInt(updatedExperienceData.config.lezioni),
      durataLezione: `${updatedExperienceData.config.durata} or${
        parseInt(updatedExperienceData.config.durata) > 1 ? "e" : "a"
      }`,
      costo: parseInt(updatedExperienceData.config.costo),
      descrizione: updatedExperienceData.description,
      partecipanti: parseInt(updatedExperienceData.config.partecipanti),
      gemDisponibili: parseInt(updatedExperienceData.config.costo),
      modalita: updatedExperienceData.config.modalita,
      lingua: updatedExperienceData.config.lingua,
      skillId: updatedExperienceData.id,
      skillName: updatedExperienceData.name,
      skillDetail: updatedExperienceData.detail,
      icon: updatedExperienceData.icon,
      updatedAt: new Date().toISOString(),
    };

    updateExperience(experienceToEdit.id, updatedExperience);
    setIsEditModalOpen(false);
    setExperienceToEdit(null);
    console.log("✅ Esperienza modificata con successo");
  };

  const handleDeleteExperience = (experienceToDelete) => {
    console.log("🗑️ Eliminando esperienza:", experienceToDelete);

    if (
      window.confirm(
        `Sei sicuro di voler eliminare l'esperienza "${
          experienceToDelete.title || experienceToDelete.detail
        }"?`
      )
    ) {
      removeExperience(experienceToDelete.id);
    }
  };

  // 🎯 Configurazione filtri personalizzata per eventi
  const eventFilterConfig = {
    idle: {
      label: "Idle",
      icon: "BookmarkCheckIcon",
      statuses: ["idle"],
    },
    waiting: {
      label: "waiting",
      icon: "BookmarkCheckIcon",
      statuses: ["waiting"],
    },
    inCorso: {
      label: "in corso",
      icon: "BookmarkCheckIcon",
      statuses: ["confirmed", "in svolgimento"],
    },
    completed: {
      label: "Completati",
      icon: "Flame",
      statuses: ["completed"],
    },
    // all: {
    //   label: "Tutti",
    //   icon: null,
    //   statuses: null,
    // },
  };

  // 🎯 USA IL CUSTOM HOOK
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredEvents, // <- cambia nome
    filterCounts,
    filterConfig,
  } = useStatusFilter(
    experiences, // <- usa events invece di mockExperiences
    null, // <- o il path Redux giusto per gli eventi
    eventFilterConfig // <- passa la configurazione personalizzata
  );

  return (
    <>
      {/* Modal per aggiungere nuova esperienza */}
      <AddExperienceModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveExperience}
        userSkills={skills || []}
        formData={currentProfile}
      />

      {/* Modal per modificare esperienza */}
      <AddExperienceModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditedExperience}
        userSkills={skills || []}
        formData={currentProfile}
        editMode={true}
        initialData={experienceToEdit}
      />
      <div className={styles.container}>
        <div
          className={`${styles.filtersContainer} ${
            showFilters ? styles.expanded : ""
          }`}
        >
          <div className={styles.filtersContainer}>
            <button
              className={styles.toggleFiltersBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtri {showFilters ? "↑" : "↓"}
            </button>
            <div
              className={`${styles.filterContent} ${
                showFilters ? styles.open : ""
              }`}
            >
              <StatusFilterButtons
                activeFilter={statusFilter}
                onFilterChange={setStatusFilter}
                filterCounts={filterCounts}
                filterConfig={filterConfig}
                totalCount={experiences.length} // ← AGGIUNGI QUESTA LINEA
              />
            </div>
          </div>
        </div>
        {/* Header */}
        <div className={styles.header}>
          {isOwner && skills?.length > 0 && (
            <div
              className={`${styles.addButtonContainer} ${
                showFilters ? styles.hidden : ""
              }`}
            >
              <HeaderAddButton
                onClick={handleAddExperience}
                title="Crea nuova esperienza"
                txt="EXPERIENCE"
              />
            </div>
          )}
        </div>
        {/* Content */}
        <div className={styles.content}>
          {experiences.length > 0 ? (
            <>
              <div className={styles.experiencesGrid}>
                {experiences.map((experience) => {
                  // ✅ Trova la skill associata per ottenere i gem corretti
                  const associatedSkill = findSkillForExperience(experience);
                  const skillGems = associatedSkill?.gems || 0;

                  // ✅ Ottieni foto profilo owner
                  const ownerPhoto = getOwnerPhoto();

                  return (
                    <TestCard
                      key={experience.id}
                      lingua={experience.lingua}
                      modalita={experience.modalita}
                      icon={experience.icon}
                      title={experience.title}
                      lezioni={experience.lezioni}
                      durataLezione={experience.durataLezione}
                      costo={experience.costo}
                      descrizione={experience.descrizione}
                      istruttore={`${currentProfile?.firstName || "Tu"} ${
                        currentProfile?.lastName || ""
                      }`}
                      // ✅ Passa foto profilo owner
                      ownerPhoto={ownerPhoto}
                      // ✅ Usa gem della skill invece di esperienza
                      skillGems={skillGems}
                      partecipanti={experience.partecipanti}
                      experienceData={experience}
                      isOwner={isOwner}
                      onEdit={isOwner ? handleEditExperience : undefined}
                      onDelete={isOwner ? handleDeleteExperience : undefined}
                      userXP={100}
                      onXPChange={(amount) =>
                        console.log(`XP changed: ${amount}`)
                      }
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              {isOwner && skills.length === 0 ? (
                <p>Aggiungi prima uno skill</p>
              ) : (
                <p>Nessuna esperienza</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExperiencesSection;
