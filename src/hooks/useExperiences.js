// src/hooks/useExperiencesRedux.js
import { useAppDispatch, useAppSelector } from "./redux";
import {
  setAddExperienceModalOpen,
  addExperience,
  removeExperience,
  updateExperience,
  removeExperiencesBySkill,
  cleanupExperiencesIfNoSkills,
  validateExperiencesAgainstSkills,
  resetExperiences,
  selectExperiencesBySkill,
  selectExperiencesCount,
} from "../store/slices/experiencesSlice";

export const useExperiences = () => {
  const dispatch = useAppDispatch();
  const experiencesState = useAppSelector((state) => state.experiences);

  const experiencesActions = {
    // Modal management
    openAddExperienceModal: () => dispatch(setAddExperienceModalOpen(true)),
    closeAddExperienceModal: () => dispatch(setAddExperienceModalOpen(false)),
    setIsAddExperienceModalOpen: (open) =>
      dispatch(setAddExperienceModalOpen(open)),

    // Experience management
    addExperience: (skillData) => {
      const result = dispatch(addExperience(skillData));
      return result.payload; // Ritorna l'esperienza trasformata come nel Context originale
    },

    removeExperience: (experienceId) =>
      dispatch(removeExperience(experienceId)),

    updateExperience: (experienceId, updates) =>
      dispatch(updateExperience({ experienceId, updates })),

    // Dependency management con skills
    removeExperiencesBySkill: (deletedSkill) =>
      dispatch(removeExperiencesBySkill(deletedSkill)),

    cleanupExperiencesIfNoSkills: (currentSkills) =>
      dispatch(cleanupExperiencesIfNoSkills(currentSkills)),

    validateExperiencesAgainstSkills: (currentSkills) =>
      dispatch(validateExperiencesAgainstSkills(currentSkills)),

    // Reset
    resetExperiences: () => dispatch(resetExperiences()),
  };

  // Selectors utili
  const getExperiencesBySkill = (skillId) =>
    useAppSelector((state) => selectExperiencesBySkill(state, skillId));

  const getExperiencesCount = () => useAppSelector(selectExperiencesCount);

  return {
    // Stati
    ...experiencesState,

    // Actions
    ...experiencesActions,

    // Selectors utili
    getExperiencesBySkill,
    getExperiencesCount,
  };
};
