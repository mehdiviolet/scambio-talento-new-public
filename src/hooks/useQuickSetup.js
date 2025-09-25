// src/hooks/useQuickSetupRedux.js
import { useAppDispatch, useAppSelector } from "./redux";
import {
  setCurrentStep,
  setXp,
  setLevel,
  setShowAchievement,
  setShowWelcome,
  setIsExiting,
  setCompletedSteps,
  updateProfileData,
  setProfileData,
  // addXP,
  triggerAchievement,
  checkXPMilestones,
  toggleSkill,
  toggleWantedSkill,
  toggleLanguage,
  setProfilePhoto,
  checkAchievements,
  resetForEdit,
  selectCanContinue,
  setLastXpReward,
  setShowXPCelebration,
  setCelebrationXP,
} from "../store/slices/quickSetupSlice";

import {
  addXP as addXPAction,
  selectCurrentUserXP,
  selectCurrentUserId,
} from "../services/xpService";

export const useQuickSetup = () => {
  const dispatch = useAppDispatch();

  // Selettori per tutti i dati
  const quickSetupState = useAppSelector((state) => state.quickSetup);
  const currentUserXP = useAppSelector(selectCurrentUserXP);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const canContinue = useAppSelector(selectCanContinue);

  // Funzioni con dispatch
  const quickSetupActions = {
    // Stati semplici
    setCurrentStep: (step) => dispatch(setCurrentStep(step)),
    setXp: (xp) => dispatch(setXp(xp)),
    setLevel: (level) => dispatch(setLevel(level)),
    setShowAchievement: (achievement) =>
      dispatch(setShowAchievement(achievement)),
    setShowWelcome: (show) => dispatch(setShowWelcome(show)),
    setIsExiting: (exiting) => dispatch(setIsExiting(exiting)),
    setCompletedSteps: (steps) => dispatch(setCompletedSteps(steps)),

    // ✅ NUOVE ACTIONS
    setShowXPCelebration: (show) => dispatch(setShowXPCelebration(show)),
    setCelebrationXP: (xp) => dispatch(setCelebrationXP(xp)),

    // Profile data
    updateProfileData: (data) => dispatch(updateProfileData(data)),
    setProfileData: (data) => dispatch(setProfileData(data)),

    // XP e Achievements
    addXP: (amount) => {
      dispatch(
        addXPAction({
          userId: currentUserId,
          amount,
          source: "quicksetup",
          metadata: { context: "manual_add" },
        })
      );
      dispatch(checkXPMilestones());
    },

    setLastXpReward: (amount) => dispatch(setLastXpReward(amount)),

    triggerAchievement: (achievement) => {
      dispatch(triggerAchievement(achievement));
      // Auto-hide achievement dopo 3 secondi
      setTimeout(() => dispatch(setShowAchievement(null)), 3000);
    },

    // Toggle functions
    toggleSkill: (skill) => {
      dispatch(toggleSkill(skill));
      dispatch(checkAchievements());
    },

    toggleWantedSkill: (skill) => {
      dispatch(toggleWantedSkill(skill));
      dispatch(checkAchievements());
    },

    toggleLanguage: (language) => {
      dispatch(toggleLanguage(language));
      dispatch(checkAchievements());
    },

    // Upload foto
    handleProfilePhotoUpload: (file) => {
      if (file && file instanceof File) {
        dispatch(setProfilePhoto(file));
      }
    },

    // Check achievements
    checkAchievements: () => dispatch(checkAchievements()),

    // Reset
    resetForEdit: () => dispatch(resetForEdit()),

    // Funzione canContinue come nel Context originale
    canContinue: () => canContinue,
  };

  // Restituisce tutto come il Context originale
  return {
    // Tutti gli stati
    ...quickSetupState,
    xp: currentUserXP, // Override con XP Service

    // Tutte le funzioni
    ...quickSetupActions,

    // canContinue come funzione (per compatibilità)
    canContinue: () => canContinue,
  };
};
