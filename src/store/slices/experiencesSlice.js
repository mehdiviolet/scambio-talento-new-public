// src/store/slices/experiencesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experiences: [],
  isAddExperienceModalOpen: false,
};

const experiencesSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {
    // Modal management
    setAddExperienceModalOpen: (state, action) => {
      state.isAddExperienceModalOpen = action.payload;
    },

    // Add experience con trasformazione dati
    addExperience: (state, action) => {
      const newSkillData = action.payload;

      // Trasforma i dati nel formato giusto per TestCard
      const transformedExperience = {
        id: `exp_${Date.now()}`,

        // Mapping dei campi da AddExperienceModal → TestCard
        title: newSkillData.detail,
        lezioni: parseInt(newSkillData.config.lezioni),
        durataLezione: `${newSkillData.config.durata} or${
          parseInt(newSkillData.config.durata) > 1 ? "e" : "a"
        }`,
        costo: parseInt(newSkillData.config.costo),
        descrizione: newSkillData.description,
        partecipanti: parseInt(newSkillData.config.partecipanti),

        // Dati derivati
        gemDisponibili: parseInt(newSkillData.config.costo),

        // Salva l'ID e i dettagli della skill associata
        skillId: newSkillData.id,
        skillName: newSkillData.name,
        skillDetail: newSkillData.detail,
        icon: newSkillData.icon,
        modalita: newSkillData.config.modalita,
        lingua: newSkillData.config.lingua,

        // Metadati
        createdAt: newSkillData.createdAt || new Date().toISOString(),
        isActive: true,
        rating: 0,
        totalBookings: 0,
      };

      state.experiences.push(transformedExperience);
    },

    // Remove single experience
    removeExperience: (state, action) => {
      const experienceId = action.payload;
      state.experiences = state.experiences.filter(
        (exp) => exp.id !== experienceId
      );
    },

    // Update experience
    updateExperience: (state, action) => {
      const { experienceId, updates } = action.payload;
      const index = state.experiences.findIndex(
        (exp) => exp.id === experienceId
      );

      if (index !== -1) {
        state.experiences[index] = {
          ...state.experiences[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Remove experiences by skill (quando una skill viene cancellata)
    removeExperiencesBySkill: (state, action) => {
      const deletedSkill = action.payload;

      state.experiences = state.experiences.filter((exp) => {
        const isAssociated =
          exp.skillId === deletedSkill.id ||
          exp.skillDetail === deletedSkill.detail ||
          exp.skillName === deletedSkill.name;

        return !isAssociated;
      });
    },

    // Cleanup completo quando non ci sono più skills
    cleanupExperiencesIfNoSkills: (state, action) => {
      const currentSkills = action.payload;

      if (!currentSkills || currentSkills.length === 0) {
        state.experiences = [];
      }
    },

    // Valida e pulisce esperienze orfane
    validateExperiencesAgainstSkills: (state, action) => {
      const currentSkills = action.payload;

      if (!currentSkills || currentSkills.length === 0) {
        state.experiences = [];
        return;
      }

      state.experiences = state.experiences.filter((exp) => {
        return currentSkills.some(
          (skill) =>
            skill.id === exp.skillId ||
            skill.detail === exp.skillDetail ||
            skill.name === exp.skillName
        );
      });
    },

    // Reset completo
    resetExperiences: (state) => {
      return initialState;
    },
  },
});

// Selectors utili
export const selectExperiencesBySkill = (state, skillId) => {
  return state.experiences.experiences.filter((exp) => exp.skillId === skillId);
};

export const selectExperiencesCount = (state) => {
  return state.experiences.experiences.length;
};

export const {
  setAddExperienceModalOpen,
  addExperience,
  removeExperience,
  updateExperience,
  removeExperiencesBySkill,
  cleanupExperiencesIfNoSkills,
  validateExperiencesAgainstSkills,
  resetExperiences,
} = experiencesSlice.actions;

export default experiencesSlice.reducer;
