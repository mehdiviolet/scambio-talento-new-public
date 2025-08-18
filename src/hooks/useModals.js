// hooks/useModals.js
import { useState } from "react";
// import { useExperiences } from "@/components/Context/ExperiencesContext";
import { useExperiences } from "./useExperiences";

export const useModals = () => {
  const {
    isAddExperienceModalOpen,
    openAddExperienceModal,
    closeAddExperienceModal,
  } = useExperiences();

  // Stati per i modals delle skills - STESSO CODICE, RAGGRUPPATO
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isViewSkillModalOpen, setIsViewSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [expandedSkillId, setExpandedSkillId] = useState(null);

  // Stati per i modals delle esperienze - STESSO CODICE, RAGGRUPPATO
  const [isViewExperienceModalOpen, setIsViewExperienceModalOpen] =
    useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isEditExperienceModalOpen, setIsEditExperienceModalOpen] =
    useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState(null);

  // ===== SKILLS MODAL ACTIONS - STESSO CODICE =====
  const handleOpenAddSkillModal = () => {
    console.log("Aprendo modal creazione skill");
    setIsAddSkillModalOpen(true);
  };

  const handleCloseAddSkillModal = () => {
    console.log("Chiudendo modal creazione skill");
    setIsAddSkillModalOpen(false);
  };

  const handleSkillClick = (skill) => {
    console.log("Skill cliccata per espansione:", skill);
    const skillId = `skill-${skill.createdAt}-${skill.name}`;
    setExpandedSkillId(expandedSkillId === skillId ? null : skillId);
  };

  const handleCloseViewSkillModal = () => {
    console.log("Chiudendo modal visualizzazione skill");
    setIsViewSkillModalOpen(false);
    setSelectedSkill(null);
  };

  // ===== EXPERIENCES MODAL ACTIONS - STESSO CODICE =====
  const handleOpenAddExperienceModal = () => {
    console.log("Aprendo modal creazione esperienza");
    openAddExperienceModal();
  };

  const handleCloseAddExperienceModal = () => {
    console.log("Chiudendo modal creazione esperienza");
    closeAddExperienceModal();
  };

  const handleExperienceClick = (experience) => {
    console.log("Esperienza cliccata:", experience);
    setSelectedExperience(experience);
    setIsViewExperienceModalOpen(true);
  };

  const handleCloseViewExperienceModal = () => {
    console.log("Chiudendo modal visualizzazione esperienza");
    setIsViewExperienceModalOpen(false);
    setSelectedExperience(null);
  };

  const handleEditExperienceModal = (experienceData) => {
    console.log("🔧 Aprendo modal modifica esperienza:", experienceData);
    setExperienceToEdit(experienceData);
    setIsEditExperienceModalOpen(true);
  };

  const handleCloseEditExperienceModal = () => {
    console.log("Chiudendo modal modifica esperienza");
    setIsEditExperienceModalOpen(false);
    setExperienceToEdit(null);
  };

  return {
    // Skills modals state
    isAddSkillModalOpen,
    isViewSkillModalOpen,
    selectedSkill,

    // Skills modals actions
    handleOpenAddSkillModal,
    handleCloseAddSkillModal,
    handleSkillClick,
    handleCloseViewSkillModal,

    // Experiences modals - from context
    isAddExperienceModalOpen,
    handleOpenAddExperienceModal,
    handleCloseAddExperienceModal,

    // Experiences modals - local state
    isViewExperienceModalOpen,
    selectedExperience,
    isEditExperienceModalOpen,
    experienceToEdit,

    // Experiences modals actions
    handleExperienceClick,
    handleCloseViewExperienceModal,
    handleEditExperienceModal,
    handleCloseEditExperienceModal,
    expandedSkillId,
  };
};
